import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Rule} from "../entities/rule";
import {ParamCodePair} from "../add-rule-dialog/add-rule-dialog.component";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  private getRuleOfParamUrl = 'http://localhost:8080/api/v1/rules_of_param/'
  private getAllRulesUrl = 'http://localhost:8080/api/v1/rules'
  private createOrUpdateRuleUrl = 'http://localhost:8080/api/v1/rule/create_or_update'
  private validateRuleRegExpUrl = 'http://localhost:8080/api/v1/rule/validate'
  private getRoomTypeDictionaryUrl = 'http://localhost:8080/api/v1/openapi/room_type_ota_dictionary'

  constructor(private http: HttpClient) {
  }

  getRuleOfParam = (paramName: string) => this.http.get<Rule[]>(`${this.getRuleOfParamUrl}${paramName}`, httpOptions)

  getAllRules = () => this.http.get<Rule[]>(this.getAllRulesUrl, httpOptions)

  createOrUpdateRule = (rule: string) => this.http.post<Rule>(this.createOrUpdateRuleUrl, rule, httpOptions)

  validateRuleRegExp = (regExp: string) => this.http.post(this.validateRuleRegExpUrl, `{"regExp":"${regExp}"}`, httpOptions)

  getRoomTypeDictionary = () => this.http.get<ParamCodePair[]>(this.getRoomTypeDictionaryUrl, httpOptions)

}
