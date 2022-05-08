import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OtaDictionary} from "../entities/ota-dictionary";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OtaDictionaryService {

  private saveOTADictionaryUrl = 'http://localhost:8080/api/v1/map/dictionary/save';

  constructor(private http: HttpClient) {
  }

  saveOTADictionary = (dictionary: OtaDictionary) => this.http.post(this.saveOTADictionaryUrl, dictionary, httpOptions)
    .subscribe(res => console.log(res));
}
