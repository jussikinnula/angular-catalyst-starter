import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FooterComponent, HeaderComponent } from './components';
import { UserService } from './services';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule],
  declarations: [FooterComponent, HeaderComponent],
  providers: [UserService],
  exports: [RouterModule, FooterComponent, HeaderComponent]
})
export class CoreModule {}
