import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { csgoItem } from './interface/csgoItem';
import { CustomResponse } from './interface/custom-response';
import { CsgoitemService } from './service/csgoitem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'investementApp' 
  public csgoItems: csgoItem[];
  public updatingCSGOItem: csgoItem;

  constructor(private csogoItemService: CsgoitemService) {  }


  ngOnInit(): void {
    this.getCSGOItems();
  }

  public getCSGOItems(): void {
    this.csogoItemService.getCSGOItems().subscribe(
      (response: CustomResponse) => {
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

  

}
