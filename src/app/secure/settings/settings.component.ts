import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public name: String;
  public email: String;
  public phone: String;

  constructor(private settingsService: SettingsService, ) { }

  ngOnInit() {
      this.getUser()
  }
  getUser() {
    this.settingsService.getUser().subscribe((res) => {
      this.name = res.data.name;
      this.email = res.data.email;
      this.phone = res.data.phone;
    }, err => {
    });
  }
 
}
