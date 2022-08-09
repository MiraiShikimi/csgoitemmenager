import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { tap } from 'rxjs';
import { CustomResponse } from '../interface/custom-response';
import { userItem } from '../interface/useritem';
import { UseritemService } from '../service/useritem.service';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { csgoItem } from '../interface/csgoItem';
import { CsgoitemService } from '../service/csgoitem.service';


@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {
  faPlus = faPlusCircle;
  faplus=faPlus;
  faPenSquare = faPenSquare;
  faTrash = faTrash;

  filterString: string = '';
  filterChooseItemString: string = '';

  public csgoItems: csgoItem[];
  public userItems: userItem[];
  public roles: String[];
  public updatingCSGOItem: csgoItem;
  public admin: boolean;
  public user: boolean;
  public updatingUserItem: userItem;


  constructor(private csogoItemService: CsgoitemService, 
              private userItemService: UseritemService,
              private localStorage: LocalStorageService
     ) { }

  ngOnInit(): void {
    this.getUserCSGOItems();
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
    this.csogoItemService.getCSGOItems().subscribe(
      (response: CustomResponse) => {
        console.log(response.data.csgoItems)
        this.csgoItems = response.data.csgoItems;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getUserCSGOItems(): void {
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

  public onOpenModal(userItem: userItem | csgoItem, mode: string): void {

    //const button = document.getElementById('addItemButton')
    const container = document.getElementById('mainContainer')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'addUserItem2'){
      button.setAttribute('data-target','#addUserItemModal2');
    }
    if(mode === 'addUserItem'){
      document.getElementById('userItemSelectClose').click();
      this.updatingCSGOItem = <csgoItem> userItem;
      button.setAttribute('data-target','#addUserItemModal');
    }
    if(mode === 'editItem'){
      console.log("yes")
      this.updatingUserItem = <userItem> userItem;
      button.setAttribute('data-target','#updateUserItemModal');
    }
    if(mode === 'deleteItem'){
      console.log("Deleteing Item")
      this.updatingUserItem = <userItem> userItem;
      button.setAttribute('data-target','#deleteUserItemModal');
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
        console.log("user item edit response")
        console.log(response);
        this.getCSGOItems();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddUserItem(theUserItem: userItem, updateForm: NgForm): void{
    document.getElementById('closeUserItemAddModal').click();
    console.log("this here ")
    theUserItem.csgoItem = this.updatingCSGOItem;
    this.userItemService.addCSGOItems(theUserItem).subscribe (
      (response: CustomResponse) => {
        console.log(response);
        this.getUserCSGOItems;
        //location.reload();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public onDeleteUserItem(): void{
   document.getElementById('closeUserItemDeleteModal').click();
    console.log("Deleting user Item")
    this.userItemService.deleteCSGOItems(this.updatingUserItem.id).subscribe (
      (response: CustomResponse) => {
        console.log(response);
        this.getUserCSGOItems();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }
}



