import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { TimeblockService } from './core/services/timeblock.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCGdFwTXy8_d6emqQWwS5ww3AaSL9wRw9Q'
    }),
    NgbModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    UserService,
    PostService,
    CommentService,
    TalkService,
    TimeblockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
  ) { }
}