import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextfieldComponent } from './components/textfield/textfield.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { OptionsEditorComponent } from './components/options-editor/options-editor.component';
import { GameComponent } from './components/game/game.component';
import { FinalTextComponent } from './components/final-text/final-text.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditorComponent } from './components/editor/editor.component';
import { TextExplorerComponent } from './components/text-explorer/text-explorer.component';
import { HomeSidebarComponent } from './components/home-sidebar/home-sidebar.component'

@NgModule({
  declarations: [
    AppComponent,
    TextfieldComponent,
    SidebarComponent,
    HomeComponent,
    OptionsEditorComponent,
    GameComponent,
    FinalTextComponent,
    LoginComponent,
    SignupComponent,
    EditorComponent,
    TextExplorerComponent,
    HomeSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
