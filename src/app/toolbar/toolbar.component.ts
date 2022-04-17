import {Component, Input} from '@angular/core';
import {TokenInfo} from "../auth/token-info";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Input()
  role: string | undefined;

  info: TokenInfo | undefined;

  constructor(private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
