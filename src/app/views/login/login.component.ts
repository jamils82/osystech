import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  user: any;
  ngOnInit() {
  }
  constructor(  private route: Router , private http: HttpClient  ) {
  }
  login( username , password ) {
      if ( username.length < 5 ) {
     alert( 'Username should be at least 5 Characters');
    } else {
      if ( password.length < 8 ) {
        alert('Password should be 8 characters');
      } else {
        return this.http.get('http://localhost:3000/api/getdata/' + username  ).subscribe(data => {
      // alert( data );
       this.user = data;
      if ( username === this.user.username ) {
        if ( password === this.user.password ) {
          if ( this.user.role === 'admin' ) {
          this.route.navigate( ['/dashboard' ]);
          } else {
            alert('You dont have permission to View');
          }
        } else {
          alert('Password mismatched');
        }
      } else {
        alert('No user Found');
      }
    } , error => {
      alert('No User Found');
    },
    ) ;
      }
    }
  }
}
