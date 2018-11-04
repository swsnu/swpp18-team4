import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArbeitPostCreateComponent } from './arbeit-post-create/arbeit-post-create.component';
import { ArbeitPostEditComponent } from './arbeit-post-edit/arbeit-post-edit.component';
import { FormsModule } from "@angular/forms";
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ArbeitPostCreateComponent,
    ArbeitPostEditComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
