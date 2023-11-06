import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SplashScreenComponent } from './pages/splash-screen/splash-screen.component';
import { StatusComponent } from './pages/status/status.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'status', component: StatusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
