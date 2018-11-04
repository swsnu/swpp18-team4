import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbeitPostCreateComponent } from "./arbeit-post-create/arbeit-post-create.component";
import { ArbeitPostEditComponent } from "./arbeit-post-edit/arbeit-post-edit.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'arbeit/create', component: ArbeitPostCreateComponent },
  { path: 'arbeit/:id/edit', component: ArbeitPostEditComponent },
  { path: '**', redirectTo: 'main'},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
