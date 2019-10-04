import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  

  public users:any = [];
  public page = {
		count: 0,
		limit: 0,
		offset: 0,
		pageSize: 0
  }
  
  constructor(private userService: UserService) { 
    this.page.offset = 0;
		this.page.limit = 10;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers(1,10).subscribe((res) => {
      console.log(res.data);
      this.users = res.data.users;
      console.log(this.users);
      this.page.count = res.data.count;
    }, err => {
    });
  }

  getAccess(row){

    this.userService.getAccessToken(row.shopUrl).subscribe((res) => {
      console.log(res.data);
      console.log(window.location);
      let url = environment.appUrl+'/app/auth?token='+res.data.token;
      console.log(url);
       window.open(url, '_blank');
    }, err => {
    });
   
  }
}
