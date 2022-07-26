import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import {Chart, registerables} from 'node_modules/chart.js'
import { CustomResponse } from '../interface/custom-response';
import { userInventoryValues } from '../interface/userInventoryValues';
import { UserInventoryValueServiceService } from '../service/user-inventory-value-service.service';

@Component({
  selector: 'app-user-inventory-values',
  templateUrl: './user-inventory-values.component.html',
  styleUrls: ['./user-inventory-values.component.css']
})
export class UserInventoryValuesComponent implements OnInit {

  public userInventory: userInventoryValues[];

  constructor(private userInventoryValueService: UserInventoryValueServiceService, private localStorage: LocalStorageService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
  
    
    
    this.getUserInventoryValue();

  }


   public  chartSerup(): void{
    const values = [];
    const values2 = [];
    const dates = [];
    this.userInventory.forEach(element => {
        values.push(element.inventoryValue)
        values2.push(element.inventoryValueTaxed)
        dates.push(element.dateOfValue)
      
    });
    console.log(values2)
    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
            label: 'inventory values taxed',
            data: values2,
            backgroundColor: [ 'rgba( 100, 100, 100, 1)'
            ],
            borderColor: [
                'rgba(100, 100, 100, 1)'
            ],
            borderWidth: 1,
            fill: true,
            
        },{
          label: 'inventory values',
          data: values,
          backgroundColor: [ 'rgba( 8, 148, 0, 1)'
          ],
          borderColor: [
              'rgba(100, 100, 100, 1)'
          ],
          borderWidth: 1,
          fill: true,
      }
        ]
      },
      options: {
          scales: {
            x: {
              
              
              title: {
                display: true,
                text: 'Date'
              }
            },
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  public getUserInventoryValue(): void {
    this.userInventoryValueService.getUserInventoryValues().subscribe(
      (response: CustomResponse) => {
        console.log(response);
        this.userInventory = response.data.userInventoryValues;
        this.chartSerup();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
