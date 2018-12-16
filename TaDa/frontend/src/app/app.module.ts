import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { TimeblockComponent } from './shared/timeblock/timeblock.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AuthGuard } from './core/guard/auth.guard';
import { UserService } from './core/services/user.service';
import { PostService } from './core/services/post.service';
import { CommentService } from './core/services/comment.service';
import { TalkService } from './core/services/talk.service';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { NgbdModalComponent, NgbdModalContentComponent } from './shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavComponent,
    TimeblockComponent,
    SigninComponent,
    SignupComponent,
    NgbdModalComponent,
    NgbdModalContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYOybP6ZEj4V4tWM8367t_EKIXVHD4ado'
    }),
    NgbModule.forRoot(),
    DragToSelectModule.forRoot()

  ],
  entryComponents: [NgbdModalContentComponent],
  providers: [
    AuthGuard,
    UserService,
    PostService,
    CommentService,
    TalkService,
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
  ) { }
}
