import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OtaDictionary} from "../entities/ota-dictionary";
import {OtaParameterView} from "../entities/ota-parameter-view";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OtaDictionaryService {

  private saveOTADictionaryUrl = 'http://localhost:8080/api/v1/dictionary/save';
  private getAllOTADictionariesWithoutParamsUrl = 'http://localhost:8080/api/v1/dictionary/all_without_params';
  private getOTADictionaryByIdUrl = 'http://localhost:8080/api/v1/dictionary/parameters/';
  private renameOTADictionaryUrl = 'http://localhost:8080/api/v1/dictionary/rename';
  private deleteOTADictionaryUrl = 'http://localhost:8080/api/v1/dictionary/delete';

  constructor(private http: HttpClient) {
  }

  saveOTADictionary = (dictionary: OtaDictionary) => this.http.post(this.saveOTADictionaryUrl, dictionary, httpOptions)
    .subscribe(res => console.log(res));

  getAllOTADictionariesWithoutParams = () => this.http.get<OtaDictionary[]>(this.getAllOTADictionariesWithoutParamsUrl, httpOptions)

  getOTAParametersByDictionaryId = (id: number) => this.http.get<OtaParameterView[]>(`${this.getOTADictionaryByIdUrl}${id}`, httpOptions)

  renameOTADictionary = (dictionary: string) => this.http.post(this.renameOTADictionaryUrl, dictionary, httpOptions)

  deleteOTADictionary = (id: number) => this.http.post(this.deleteOTADictionaryUrl, JSON.stringify(id), httpOptions)
}
