import {Component, OnInit} from '@angular/core';

import {TokenStorageService} from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  role: string | undefined;

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getAuthorities();
    }
  }
}
