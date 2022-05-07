import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MappedParameter} from "../entities/mapped-parameter";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  private mapRoomTypeUrl = 'http://localhost:8080/api/v1/map/room_type';

  constructor(private http: HttpClient) {
  }

  mapRoomType = (data: string[]) => this.http.post<MappedParameter[]>(this.mapRoomTypeUrl, data, httpOptions)
}
