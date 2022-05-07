import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../entities/user";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getAllUsersUrl = 'http://localhost:8080/api/v1/admin/user/all';
  private createOrUpdateUserUrl = 'http://localhost:8080/api/v1/admin/user'
  private deleteUserUrl = 'http://localhost:8080/api/v1/admin/user/delete'

  constructor(private http: HttpClient) {
  }

  getAllUsers = () => this.http.get<User[]>(this.getAllUsersUrl, httpOptions);

  createOrUpdateUser = (user: string) => this.http.post(this.createOrUpdateUserUrl, user, httpOptions)
    .subscribe(res => console.log(res));

  deleteUser = (id: number) => this.http.post(this.deleteUserUrl, id, httpOptions)
    .subscribe(res => console.log(res));
}
