import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MusicDisc } from './app.musicdisc';
import { ControlBar } from './app.controlbar';
import { SearchPanel } from './app.searchpanel';
import { TimeFormat } from './app.timeformat';
import { HtmlEncode } from './app.htmlencode';

@NgModule({
  declarations: [
    AppComponent,
    MusicDisc,
    ControlBar,
    SearchPanel,
    TimeFormat,
    HtmlEncode
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
