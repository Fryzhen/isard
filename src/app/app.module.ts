import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent, // Declare your component here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
  ],
})
export class AppModule {}
