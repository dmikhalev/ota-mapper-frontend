import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Rule} from "../entities/rule";
import {OtaDictionary} from "../entities/ota-dictionary";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  private getRuleOfParamUrl = 'http://localhost:8080/api/v1/rules_of_param/'
  private createOrUpdateRuleUrl = 'http://localhost:8080/api/v1/rule'
  private saveOTADictionaryUrl = 'http://localhost:8080/api/v1/map/dictionary/save';

  constructor(private http: HttpClient) {
  }

  getRuleOfParam = (paramName: string) => this.http.get(`${this.getRuleOfParamUrl}${paramName}`, httpOptions)
    .subscribe(res => console.log(res));

  createOrUpdateRule = (rule: Rule) => this.http.post(this.createOrUpdateRuleUrl, rule, httpOptions)
    .subscribe(res => console.log(res));

  saveOTADictionary = (dictionary: OtaDictionary) => this.http.post(this.saveOTADictionaryUrl, dictionary, httpOptions)
    .subscribe(res => console.log(res));
}