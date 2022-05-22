import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Organization} from "../entities/organization";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private getAllOrganizationsUrl = 'http://localhost:8080/api/v1/organization/all';
  private createOrUpdateOrganizationUrl = 'http://localhost:8080/api/v1/admin/organization/create_or_update'

  constructor(private http: HttpClient) {
  }

  getAllOrganizations = () => this.http.get<Organization[]>(this.getAllOrganizationsUrl, httpOptions);

  createOrUpdateOrganization = (organization: string) => this.http.post(this.createOrUpdateOrganizationUrl, organization, httpOptions)
}
