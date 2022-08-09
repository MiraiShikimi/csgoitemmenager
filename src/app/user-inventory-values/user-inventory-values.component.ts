import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import {Chart, registerables} from 'node_modules/chart.js'
import { CustomResponse } from '../interface/custom-response';
import { userInventoryValues } from '../interface/userInventoryValues';
import { UserInventoryValueServiceService } from '../service/user-inventory-value-service.service';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-user-inventory-values',
  templateUrl: './user-inventory-values.component.html',
  styleUrls: ['./user-inventory-values.component.scss']
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
            backgroundColor: ['rgba( 3, 115, 252, 1)'],
            borderColor: ['rgba( 3, 115, 252, 1)'],
            borderWidth: 2,
            fill: false,
            pointRadius: 1,
            pointHitRadius: 10,
            tension: 0.33
            
        },{
          label: 'inventory values',
          data: values,
          backgroundColor: [ 'rgba( 11, 168, 0, 1)'
          ],
          borderColor: [
              'rgba( 11, 168, 0, 1)'
          ],
          borderWidth: 2,
          fill: false,
          pointRadius: 1,
          pointHitRadius: 10,
          tension: 0.33
      }
        ]
      },
      options: {
          scales: {
            x:{
              type: 'time',
              time: {
                unit: 'day'
            }

            },
              y: {
                  beginAtZero: false
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
