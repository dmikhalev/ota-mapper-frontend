import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {MapperComponent} from "./mapper/mapper.component";
import {OtaDictionariesComponent} from "./ota-dictionaries/ota-dictionaries.component";
import {RulesViewComponent} from "./rules-view/rules-view.component";
import {DocumentationComponent} from "./documentation/documentation.component";

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
    path: 'rules',
    component: RulesViewComponent
  },
  {
    path: 'documentation',
    component: DocumentationComponent
  },
  {
    path: 'map/room-type',
    component: MapperComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
