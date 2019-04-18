import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  users: any;
  names: any = [ 1 , 3 , 5 , 6, 7 , 8 ];
  constructor(  private route: Router , private http: HttpClient  ) {
  }

  // lineChart1

  ngOnInit(): void {
    // generate random values for mainChart
    this.http.get('https://osystech.herokuapp.com/api/get'   ).subscribe(data => {
      console.log(data);
      this.users = data;
    });
  }
}
