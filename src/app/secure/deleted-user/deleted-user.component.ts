import { Component, OnInit } from '@angular/core';
import { DeletedUserService } from './deleted-user.service';

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


  constructor(private deletedUserService: DeletedUserService) {
    this.page.offset = 0;
    this.page.limit = localStorage.getItem('pageLimit') ? parseInt(localStorage.getItem('pageLimit')) : 10;
  }

  ngOnInit() {
    this.getUsers(this.page);
  }

  getUsers(page) {
    this.loading = true;

    this.deletedUserService.getUsers(page.offset + 1, page.limit).subscribe((res) => {
      this.users = res.data.users;
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


  pageLimit() {
    this.getUsers(this.page);
    localStorage.setItem('pageLimit', this.page.limit.toString());
  }
}
