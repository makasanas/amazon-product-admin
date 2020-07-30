import { Component, OnInit } from '@angular/core';
import { DeletedUserService } from './deleted-user.service';
import { UserService } from "././../user/user.service";
import { countryData } from './../../country.data';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-deleted-user',
  templateUrl: './deleted-user.component.html',
  styleUrls: ['./deleted-user.component.scss']
})
export class DeletedUserComponent implements OnInit {

  public users: any = [];
  public page = {
    count: 0,
    limit: 0,
    offset: 0,
    pageSize: 0
  }
  public loading = false;


  constructor(private Router : Router, private userService: UserService , private deletedUserService: DeletedUserService, private FormBuilder : FormBuilder) {

    this.countryForm = this.FormBuilder.group({
      countryValue : {}
    });

    this.page.offset = 0;
    this.page.limit = localStorage.getItem('pageLimit') ? parseInt(localStorage.getItem('pageLimit')) : 10;
  }

  public countryData = countryData ;
  public countryForm : any ; 
  public categoryData :any ;



  ngOnInit() {
    // this.getUsers(this.page);
    // console.log(this.users);
    this.getCategoryData(this.page);

  }


  getCategoryData(page) {
    this.userService.getCategoryData(page.offset + 1, page.limit).subscribe((res)=> {
      console.log(res)
      this.categoryData = res.data.category;
      this.page.count = res.data.count;
      this.page = page;
      this.page.count = res.data.count;
    })
  }

  updateCountry(value) {
    let Data = {
      "title" : value.document.title , 
      "country" : {
        "name" : this.countryForm.value.countryValue.itemName , 
        "code" : this.countryForm.value.countryValue.itemCode 
      }
    }

    this.userService.updateData(Data).subscribe((res)=>{
    this.getCategoryData(this.page);
    this.countryForm.reset()
    }),error  => {
    }
  }

  getUsers(page) {
    this.loading = true;
    this.deletedUserService.getUsers(page.offset + 1, page.limit).subscribe((res) => {
      this.users = res.data.deletedUser;
      console.log(this.users);
      this.page = page;
      this.page.count = res.data.count;
      this.loading = false;

      
      this.users.forEach(user => {
        var today = new Date(new Date().toJSON().slice(0, 10));
        let diffTime = Math.abs(today.getTime() - new Date(user.trial_start).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        user.trial_days = user.trial_days - diffDays > 0 ? user.trial_days - diffDays : 0;
        let dt1 = new Date(user.created);
        let dt2 = new Date(user.updated);
        user.appUsed = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
      });
    }, err => {
      this.loading = false;
    });
  }


  pageLimit() {
    this.page.offset = 0;
    localStorage.setItem('pageLimit', this.page.limit.toString());
    this.getCategoryData(this.page);
  }
}
