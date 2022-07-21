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
    const dates = [];
    this.userInventory.forEach(element => {
        values.push(element.inventoryValue)
        dates.push(element.dateOfValue)
      
    });
    console.log(values)
    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: '# of Votes',
              data: values,
              backgroundColor: [ 'rgba( 100, 100, 100, 1)'
              ],
              borderColor: [
                  'rgba(100, 100, 100, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
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
