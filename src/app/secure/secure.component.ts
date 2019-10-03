import { Component, OnInit, ViewChild } from '@angular/core';
import { SecureService } from "./secure.service";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {


  constructor(private router: Router, private secureService: SecureService) { 
   
  }

  ngOnInit() {
    
  }

}