import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextfieldComponent } from './components/textfield/textfield.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { FinalTextComponent } from './components/final-text/final-text.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'game', component: GameComponent},
  { path: 'finalText', component: FinalTextComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
