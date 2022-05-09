import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {MapperComponent} from "./mapper/mapper.component";
import {OtaDictionariesComponent} from "./ota-dictionaries/ota-dictionaries.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'user-management',
    component: UsersComponent
  },
  {
    path: 'ota-dictionaries',
    component: OtaDictionariesComponent
  },
  {
    path: 'map/room-type',
    component: MapperComponent
  },

  // {
  //   path: '',
  //   loadChildren: () => import('./_pages/users/users.module').then(m => m.UsersModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
