import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {AddUserDialog, EditUserDialog, UsersComponent} from './users/users.component';
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MapperComponent} from './mapper/mapper.component';
import {MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ChangeRuleDialogComponent} from './mapper/change-rule-dialog/change-rule-dialog.component';
import {OtaDictionariesComponent, RenameOtaDictionaryDialog} from './ota-dictionaries/ota-dictionaries.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {RulesViewComponent} from './rules-view/rules-view.component';
import {AddRuleDialogComponent} from './add-rule-dialog/add-rule-dialog.component';
import { DocumentationComponent } from './documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    UsersComponent,
    EditUserDialog,
    AddUserDialog,
    MapperComponent,
    ChangeRuleDialogComponent,
    OtaDictionariesComponent,
    RenameOtaDictionaryDialog,
    RulesViewComponent,
    AddRuleDialogComponent,
    DocumentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatRippleModule,
    MatGridListModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
