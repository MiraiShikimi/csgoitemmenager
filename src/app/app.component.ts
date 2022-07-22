import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from './auth/shared/auth.service';
import { csgoItem } from './interface/csgoItem';
import { CustomResponse } from './interface/custom-response';
import { MyRoles } from './interface/roles';
import { userItem } from './interface/useritem';
import { CsgoitemService } from './service/csgoitem.service';
import { UseritemService } from './service/useritem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'investementApp' 
  public csgoItems: csgoItem[];
  public updatingCSGOItem: csgoItem;
  public newUserItem: userItem;
  public theUserItem: userItem;
  public myRoles: MyRoles;
  public isLoggedIn: boolean;
 

  constructor(private csogoItemService: CsgoitemService, 
    private userItemService: UseritemService,
    private localStorage: LocalStorageService,
    private authService: AuthService
    ) {
      this.myRoles = {
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


  public onAddItem(addForm: NgForm): void{
    document.getElementById('closeModal').click();
    this.csogoItemService.addCSGOItems(addForm.value).subscribe (
      (response: CustomResponse) => {
        console.log(response);
        this.getCSGOItems();
        addForm.reset;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset;
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

  public onAddUserItem(theUserItem: userItem, updateForm: NgForm): void{
    document.getElementById('closeUserItemAddModal').click();
    console.log("this here ")
    theUserItem.csgoItem = this.updatingCSGOItem;
    this.userItemService.addCSGOItems(theUserItem).subscribe (
      (response: CustomResponse) => {
        console.log(response);
        //location.reload();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }

  

}
