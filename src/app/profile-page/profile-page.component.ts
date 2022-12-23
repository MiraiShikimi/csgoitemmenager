import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { UserProfileService } from '../service/user-profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  @Output()
  outputUrl = new EventEmitter();

  path : string = "";
  file : any;
  usersname :string;
  imageUrl :string;
  downloadURL: Observable<string>;
  profileImage : HTMLImageElement;
  fr = new FileReader();
  imageSrc: string;



  constructor(private storage: AngularFireStorage,
    private localStorage: LocalStorageService,
    private userProfileService: UserProfileService) { }
  ngOnInit(): void {
    this.usersname = this.localStorage.retrieve('username');
    this.imageUrl = this.localStorage.retrieve('pictureurl');
    this.profileImage = document.getElementById('profileImage') as HTMLImageElement;

    this.imageSrc = "https://firebasestorage.googleapis.com/v0/b/steam-invest-tracker.appspot.com/o/" 
                              + this.imageUrl + "?alt=media&t=" + Date.now();

    

  }

  upload(event){
    if (event.target.files[0]){
    this.file = event.target.files[0];
    const filePath = this.usersname;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file);
    const profileImage = this.profileImage;
    if (FileReader && this.file ) {
      var fr = new FileReader();
      fr.onload = function () {
        profileImage.src = fr.result as string;
      }
      fr.readAsDataURL(this.file);
  }
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
   )
  .subscribe(
    data  => {
      if (data.state === "success"){
      console.log(data.state);
       this.localStorage.store('pictureUrl', filePath);
       this.imageUrl = filePath;
       this.outputUrl.emit(filePath);
       this.userProfileService.updateProfilePictureUrl(this.usersname).subscribe(
        data => {
          console.log(data)
      }, error => {
        console.log(error);
      }
       );
       this.updateImage(profileImage);
      }
    }
  )
    
}
  }
  updateImage(element: HTMLImageElement){
    this.imageSrc = "https://firebasestorage.googleapis.com/v0/b/steam-invest-tracker.appspot.com/o/"
                       + this.imageUrl + "?alt=media&t=" + Date.now();
  }


 

}
