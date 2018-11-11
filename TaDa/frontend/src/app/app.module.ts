import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArbeitPostCreateComponent } from './arbeit-post-create/arbeit-post-create.component';
import { ArbeitPostEditComponent } from './arbeit-post-edit/arbeit-post-edit.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpMainComponent } from './sign-up-main/sign-up-main.component';
import { SignUpEmployeeComponent } from './sign-up-employee/sign-up-employee.component';
import { SignUpEmployerComponent } from './sign-up-employer/sign-up-employer.component';
import { ArbeitBulletinComponent } from './arbeit-bulletin/arbeit-bulletin.component';
import { ArbeitPostDetailComponent } from './arbeit-post-detail/arbeit-post-detail.component';
import { ArbeitMainComponent } from './arbeit-main/arbeit-main.component';
import { TitleComponent } from './title/title.component';
import {HttpClientModule} from '@angular/common/http';
import { ArbeitPostPreviewComponent } from './arbeit-post-preview/arbeit-post-preview.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { EmployerPageComponent } from './employer-page/employer-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ArbeitPostCreateComponent,
    ArbeitPostEditComponent,
    MainComponent,
    SignInComponent,
    SignUpMainComponent,
    SignUpEmployeeComponent,
    SignUpEmployerComponent,
    ArbeitBulletinComponent,
    ArbeitPostDetailComponent,
    ArbeitMainComponent,
    TitleComponent,
    ArbeitPostPreviewComponent,
    EmployeePageComponent,
    EmployerPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
