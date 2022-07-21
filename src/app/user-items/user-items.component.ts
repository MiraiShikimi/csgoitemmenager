import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { tap } from 'rxjs';
import { CustomResponse } from '../interface/custom-response';
import { userItem } from '../interface/useritem';
import { UseritemService } from '../service/useritem.service';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.css']
})
export class UserItemsComponent implements OnInit {

  public userItems: userItem[];
  public roles: String[];
  public admin: boolean;
  public user: boolean;
  public updatingUserItem: userItem;


  constructor(private userItemService: UseritemService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.getCSGOItems();
    this.roles = this.localStorage.retrieve('roles')
    this.roles.forEach(role =>  {
      console.log(role)
     


      switch(role){
        case "ROLE_USER":
         this.user = true;
          break;
        case "ROLE_ADMIN":
          this.admin=true;
          break;
        }
        
     }
      )
  }

  public getCSGOItems(): void {
    this.userItemService.getUserItems().subscribe(
      (response: CustomResponse) => {
        console.log(response)
        this.userItems = response.data.userItems;
        console.log(this.userItems)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onOpenModal(userItem: userItem, mode: string): void {

    //const button = document.getElementById('addItemButton')
    const container = document.getElementById('mainContainer')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addItemModal');
    }
    if(mode === 'editItem'){
      console.log("yes")
      this.updatingUserItem = userItem;
      
      button.setAttribute('data-target','#updateUserItemModal');
    }

    container.appendChild(button);
    button.click();
  }

  public onEditItem(userItem: userItem, updateForm: NgForm): void {
    document.getElementById('closeUpdateUserItemModal').click();
    userItem.csgoItem = this.updatingUserItem.csgoItem;
    console.log(userItem);
    this.userItemService.updateCSGOItems(userItem).subscribe(
      (response: CustomResponse) => {
        console.log(response);
        this.getCSGOItems();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
