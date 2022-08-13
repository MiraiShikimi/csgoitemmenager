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
  public myRoles: MyRoles;

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

    this.initializeTheme();


    this.localStorage.retrieve('roles').forEach(role => 
      {
        console.log(role)
        switch(role){
          case "ROLE_USER":
           this.myRoles.user = true;
           console.log(this.myRoles.user)
            break;
          case "ROLE_ADMIN":
            this.myRoles.admin=true;
            break;
          }
      }
      )
    
 
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
    window.location.reload()
  }

}

export type Theme = 'light-theme' | 'dark-theme' ; 
