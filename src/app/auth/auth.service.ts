import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenInfo} from "./token-info";
import {Observable} from "rxjs";
import {AuthLoginInfo} from "./login-info";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/v1/auth/login';

  attemptAuth(credentials: AuthLoginInfo): Observable<TokenInfo> {
    return this.http.post<TokenInfo>(this.loginUrl, credentials, httpOptions);
  }

  constructor(private http: HttpClient) {
  }
}
