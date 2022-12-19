import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  path : string = "";
  file : any;
  usersname :string;

  constructor(private storage: AngularFireStorage,
    private localStorage: LocalStorageService) { }
  ngOnInit(): void {
    this.usersname = this.localStorage.retrieve('username');
  }

  upload(event){
    this.file = event.target.files[0];
  }

  uploadImage(){
    console.log(this.path)
    const filePath = this.usersname;
    const task = this.storage.upload(filePath, this.file);
  }


 

}
