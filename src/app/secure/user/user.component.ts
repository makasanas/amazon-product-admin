import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { environment } from './../../../environments/environment';
import { countryData } from './../../country.data';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public users: any = [];
  public page = {
    count: 0,
    limit: 0,
    offset: 0,
    pageSize: 0
  }
  public loading = false;
  public brandData :any ;
  public countryData = countryData ;
  public countryForm : any ; 

  constructor(private Router : Router,private userService: UserService , private FormBuilder : FormBuilder) {
    this.page.offset = 0;
    this.page.limit = localStorage.getItem('pageLimit') ? parseInt(localStorage.getItem('pageLimit')) : 10;

    this.countryForm = this.FormBuilder.group({
      countryValue : {}
      // title : '' , 
      // country : this.FormBuilder.group({
      //   name : '',
      //   code : ''
      // })
    });
  }

  ngOnInit() {
    // this.getUsers(this.page);
    this.getBrandData(this.page);
  }

  getBrandData(page) {
    this.userService.getBrandData(page.offset + 1, page.limit).subscribe((res)=> {
      this.brandData = res.data.brand;
      this.page.count = res.data.count;
      this.page = page;
      this.page.count = res.data.count;
      this.loading = false;
    })
  }

  updateCountry(value) {
    // this.loading = true;
    let Data = {
      "title" : value.title , 
      "country" : {
        "name" : this.countryForm.value.countryValue.itemName , 
        "code" : this.countryForm.value.countryValue.itemCode 
      }
    }

    this.userService.updateData(Data).subscribe((res)=>{
      window.location.reload()
    }),error  => {
      window.location.reload()
    }
  }

  getUsers(page) {
    this.loading = true;
    this.userService.getUsers(page.offset + 1, page.limit).subscribe((res) => {
      this.users = res.data.user;
      this.page = page;
      this.page.count = res.data.count;
      this.loading = false;

      this.users.forEach(user => {
        var today = new Date(new Date().toJSON().slice(0, 10));
        let diffTime = Math.abs(today.getTime() - new Date(user.trial_start).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        user.trial_days = user.trial_days - diffDays > 0 ? user.trial_days - diffDays : 0;
      });
    }, err => {
      this.loading = false;
    });
  }

  getAccess(row) {
    this.userService.getAccessToken(row.shopUrl).subscribe((res) => {
      let url = environment.appUrl + '/app/auth?token=' + res.data.token;
    }, err => {
    });
  }


  pageLimit() {
    this.page.offset = 0;
    localStorage.setItem('pageLimit', this.page.limit.toString());
    this.getBrandData(this.page);
  }
}
