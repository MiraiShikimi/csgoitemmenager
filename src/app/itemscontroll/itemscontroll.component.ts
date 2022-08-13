import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth/shared/auth.service';
import { csgoItem } from '../interface/csgoItem';
import { CustomResponse } from '../interface/custom-response';
import { MyRoles } from '../interface/roles';
import { userItem } from '../interface/useritem';
import { CsgoitemService } from '../service/csgoitem.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itemscontroll',
  templateUrl: './itemscontroll.component.html',
  styleUrls: ['./itemscontroll.component.scss']
})
export class ItemscontrollComponent implements OnInit {
  faHome = faHome;
  faSync = faSync;
  faPlusCircle = faPlusCircle;
  faPen = faPenSquare;
  faTrash = faTrash;

  filterString: string = '';

  public csgoItems: csgoItem[];
  public updatingCSGOItem: csgoItem;
  public newUserItem: userItem;
  public theUserItem: userItem;
  public myRoles: MyRoles;
  public isLoggedIn: boolean;

  constructor(private csogoItemService: CsgoitemService,
    private localStorage: LocalStorageService,
    private authService: AuthService,
    private router: Router
    ) { this.myRoles = {
      user: false,
      admin: false,
      masterAdmin: false
    };
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn){
    this.getCSGOItems();
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


  public onAddItem(addForm: NgForm): void{
    document.getElementById('closeModal').click();
    this.csogoItemService.addCSGOItems(addForm.value).subscribe (
      (response: CustomResponse) => {
        console.log(response);
        this.getCSGOItems();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )

    
  }


  public onRefreshPrices(): void{
    console.log("refreshing")
    this.csogoItemService.refreshAllCSGOItems(null).subscribe (
      (response: CustomResponse) => {
        console.log(response);
        this.getCSGOItems();
  
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
       
      }
    )
      
    
  }


  public onUpdateItem(csgoItem: csgoItem, updateForm: NgForm): void{
    document.getElementById('closeupdateModal').click();
    this.csogoItemService.updateCSGOItems(csgoItem).subscribe (
      (response: CustomResponse) => {
        console.log(response);
        this.getCSGOItems();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  public onDeleteCSGOItem(): void{
    document.getElementById('closeCSGOItemDeleteModal').click();
     console.log("Deleting user Item")
     this.csogoItemService.deleteCSGOItems(this.updatingCSGOItem.id).subscribe (
       (response: CustomResponse) => {
         console.log(response);
         this.getCSGOItems();
       },
       (error: HttpErrorResponse) =>{
         alert(error.message);
       }
     )
   }




  public onOpenModal(csgoItem: csgoItem, mode: string): void {
    //const button = document.getElementById('addItemButton')
    const container = document.getElementById('mainContainer')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addItemModal');
    }
    if(mode === 'update'){
      this.updatingCSGOItem = csgoItem;
      button.setAttribute('data-target','#updateItemModal');
    }
    if(mode === 'delete'){
      this.updatingCSGOItem = csgoItem;
      button.setAttribute('data-target','#deleteCSGOItemModal');
    }
    if(mode === 'addUserItem'){
      document.getElementById('userItemSelectClose').click();
      this.updatingCSGOItem = csgoItem;
      button.setAttribute('data-target','#addUserItemModal');
    }

    if(mode === 'addUserItem2'){
      this.updatingCSGOItem = csgoItem;
      button.setAttribute('data-target','#addUserItemModal2');
    }


    container.appendChild(button);
    button.click();


  }



}
