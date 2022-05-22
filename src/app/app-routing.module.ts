import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UsersComponent} from "./users/users.component";
import {MapperComponent} from "./mapper/mapper.component";
import {OtaDictionariesComponent} from "./ota-dictionaries/ota-dictionaries.component";
import {RulesViewComponent} from "./rules-view/rules-view.component";
import {DocumentationComponent} from "./documentation/documentation.component";
import {OrganizationsComponent} from "./organizations/organizations.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: LoginComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'user-management',
    component: UsersComponent
  },
  {
    path: 'organizations',
    component: OrganizationsComponent
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
