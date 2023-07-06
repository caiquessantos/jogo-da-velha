import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JogoDaVelhaModule } from './jogo-da-velha';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, JogoDaVelhaModule, HttpClient],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
