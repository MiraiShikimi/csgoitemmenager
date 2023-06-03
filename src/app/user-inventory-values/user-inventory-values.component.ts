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
  public values = [];
  public values2 = [];
  public dates = [];
  public myChart;
  public monthlyChartScale = false;

  constructor(private userInventoryValueService: UserInventoryValueServiceService, private localStorage: LocalStorageService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    this.getUserInventoryValue();
  }
  
  public updateDateScale(): void {
    if(this.monthlyChartScale){
      this.setTotal();
    }
    else {
      this.setMonthly();
    }
  }

  public setMonthly(): void 
  {
    this.values.splice(0, this.values.length - 90);
    this.values2.splice(0, this.values2.length - 90);
    this.dates.splice(0, this.dates.length - 90);
    this.monthlyChartScale = true;
    this.myChart.update();
  }

  public setTotal(): void {
    this.values.splice(0,this.values.length)
    this.values2.splice(0,this.values2.length)
    this.dates.splice(0,this.dates.length)
    this.userInventory.forEach(element => 
      {
        this.values.push(element.inventoryValue);
        this.values2.push(element.inventoryValueTaxed);
        this.dates.push(element.dateOfValue);
      });
      this.monthlyChartScale = false;
      this.myChart.update();
  }

  public  chartSerup(): void{
    this.userInventory.forEach(element => 
    {
      this.values.push(element.inventoryValue)        
      this.values2.push(element.inventoryValueTaxed)
      this.dates.push(element.dateOfValue)

    });

    this.myChart = new Chart("myChart", {
      type: 'line',
      data: {
          labels: this.dates,
          datasets: [{
            label: 'inventory values taxed',
            data: this.values2,
            backgroundColor: ['rgba( 3, 115, 252, 1)'],
            borderColor: ['rgba( 3, 115, 252, 1)'],
            borderWidth: 2,
            fill: false,
            pointRadius: 1,
            pointHitRadius: 10,
            tension: 0.33
            
        },{
          label: 'inventory values',
          data: this.values,
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
