import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
  localUrl: any[];
  constructor( private http: HttpClient ) {}
  options = [ 'Programs', 'Reports', 'Announcements', 'Classes' ];
  option: any;
  ngOnInit(): void {
  }
  submit( title , discription , value ) {
    this.option = value;
    if ( !this.localUrl  ) {
      alert('Please Select a file type');
      return;
    } else {
      // tslint:disable-next-line:max-line-length
      this.http.post('http://localhost:3000/api/submit/' , { title: title  , description: discription , option : this.option , url : this.localUrl }  ).subscribe(data => {
        console.log(data);
       });
    }
  }
  docupload( event) {
     if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (eve: any) => {
                this.localUrl = eve.target.result;
                alert(this.localUrl );
            };
            reader.readAsDataURL(event.target.files[0]);
        }
  }
}
