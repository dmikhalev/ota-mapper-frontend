import {Component, Inject, OnInit} from '@angular/core';
import {Organization} from "../entities/organization";
import {OrganizationService} from "../services/organization.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'phone'];
  organizations: Organization[] = [];

  constructor(private organizationService: OrganizationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadOrganizations();
  }

  openEditOrganizationDialog(organization: Organization): void {
    let editedOrganization: Organization = {
      "id": organization.id,
      "name": organization.name,
      "email": organization.email,
      "phone": organization.phone
    }
    const dialogRef = this.dialog.open(EditOrganizationDialog, {
      width: '400px',
      data: editedOrganization
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadOrganizations();
    });
  }

  openAddOrganizationDialog(): void {
    const dialogRef = this.dialog.open(AddOrganizationDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.organizations.push(result);
      }
      this.loadOrganizations();
    });
  }

  private loadOrganizations(): void {
    this.organizationService.getAllOrganizations().subscribe(data => {
      this.organizations = data;
    })
  }
}

@Component({
  selector: 'edit-organization-dialog',
  templateUrl: 'edit-organization-dialog.html',
})
export class EditOrganizationDialog {
  constructor(
    public dialogRef: MatDialogRef<EditOrganizationDialog>,
    @Inject(MAT_DIALOG_DATA) public organization: Organization,
    private organizationService: OrganizationService
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onOkClick(organization: Organization): void {
    this.organizationService.createOrUpdateOrganization(JSON.stringify(organization)).subscribe(result => {
      this.dialogRef.close(organization);
    });
  }
}


@Component({
  selector: 'add-organization-dialog',
  templateUrl: 'add-organization-dialog.html',
})
export class AddOrganizationDialog {

  organization: Organization = {
    "id": -1,
    "name": '',
    "email": null,
    "phone": null
  }

  constructor(
    public dialogRef: MatDialogRef<AddOrganizationDialog>,
    private organizationService: OrganizationService
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


  onAddClick(organization: Organization): void {
    this.organizationService.createOrUpdateOrganization(JSON.stringify(organization)).subscribe(result => {
      this.dialogRef.close(organization);
    });
  }
}
