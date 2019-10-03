import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//services
import { DashboradService } from './secure/dashboard/dashborad.service';
import { LoginService } from './public/login/login.service';
import { AuthGuard } from './services/auth-guard.service';
import { AntiAuthGuardService } from './services/anti-auth-guard.service';
import { SecureService } from './secure/secure.service';
import { UserService } from './secure/user/user.service';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';

//component
import { AppComponent } from './app.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { LoginComponent } from './public/login/login.component';
import { LoadingComponent } from './common/loading/loading.component';
import { ChartsModule } from 'ng2-charts';
import { ForgotPasswordComponent } from './public/forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from './public/set-new-password/set-new-password.component';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { UserComponent } from './secure/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    LoginComponent,
    LoadingComponent,
    ForgotPasswordComponent,
    SetNewPasswordComponent,
    PublicComponent,
    SecureComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ChartsModule,
    NgxDatatableModule,
    NgbModule
  ],
  providers: [
    DashboradService,
    AuthGuard,
    AntiAuthGuardService,
    LoginService,
    SecureService,
    UserService
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
