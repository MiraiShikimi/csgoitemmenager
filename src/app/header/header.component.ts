import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { animationFrameScheduler } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { MyRoles } from '../interface/roles';
import { url } from 'inspector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  


  theme: Theme = 'light-theme';

  faMoon = faMoon;
  faSun = faSun;
  faUser = faUser;
  isLoggedIn: boolean;
  username: string;
  imageUrl: string;
  public myRoles: MyRoles;
 profileImage : HTMLImageElement;
 tempImgUrl: string;


  constructor(private authService: AuthService,
     private router: Router,
     @Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2,
      private localStorage: LocalStorageService,
     ) {
      this.myRoles = {
        user: false,
        admin: false,
        masterAdmin: false
      };
     }

  ngOnInit(): void {
    if (this.localStorage.retrieve('darkMode')===null){
      this.localStorage.store('darkMode',this.theme)
    }else{
      this.theme = this.localStorage.retrieve('darkMode')
    }
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
     this.imageUrl = this.localStorage.retrieve('pictureurl');
     this.initializeTheme();


    this.localStorage.retrieve('roles').forEach(role => 
      {
       
        switch(role){
          case "ROLE_USER":
           this.myRoles.user = true;
            break;
          case "ROLE_ADMIN":
            this.myRoles.admin=true;
            break;
          }
      }
      )
      this.tempImgUrl = "https://firebasestorage.googleapis.com/v0/b/steam-invest-tracker.appspot.com/o/" + this.imageUrl + "?alt=media";
       

      this.profileImage = document.getElementById('HeaderProfileImage') as HTMLImageElement;
     
      
      if (this.profileImage){
        this.profileImage.src = "https://firebasestorage.googleapis.com/v0/b/steam-invest-tracker.appspot.com/o/" + this.imageUrl + "?alt=media";
       
      }
    
 
  }



  updatePictureUrl(url) {
    this.tempImgUrl = "https://firebasestorage.googleapis.com/v0/b/steam-invest-tracker.appspot.com/o/" + url + "?alt=media&t=" + Date.now();
  }



  initializeTheme = (): void =>  this.renderer.addClass(this.document.body, this.theme);
  switchTheme() {
    this.document.body.classList.replace(
      this.theme,
      this.theme === 'light-theme'
        ? (this.theme = 'dark-theme')
        : (this.theme = 'light-theme')
    );
    this.localStorage.store('darkMode',this.theme)
  }

  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

}

export type Theme = 'light-theme' | 'dark-theme' ; 
