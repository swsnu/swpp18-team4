import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './shared/nav/nav.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AuthGuard } from './core/guard/auth.guard';
import { UserService } from './core/services/user.service';
import { PostService } from './core/services/post.service';
import { CommentService } from './core/services/comment.service';
import { TalkService } from './core/services/talk.service';
import { TimeblockService } from './core/services/timeblock.service';
import { NgbdModalComponent, NgbdModalContentComponent } from './shared/modal/modal.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SigninComponent,
    SignupComponent,
    NgbdModalContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYOybP6ZEj4V4tWM8367t_EKIXVHD4ado'
    }),
    NgbModule.forRoot(),
  ],
  entryComponents: [NgbdModalContentComponent],
  providers: [
    AuthGuard,
    UserService,
    PostService,
    CommentService,
    TalkService,
    TimeblockService,
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
  ) { }
}
