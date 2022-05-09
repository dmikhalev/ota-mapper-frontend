import {Component, Inject, OnInit} from '@angular/core';
import {OtaDictionary} from "../entities/ota-dictionary";
import {OtaDictionaryService} from "../services/ota-dictionary.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../auth/token-storage.service";
import {OtaParameterView} from "../entities/ota-parameter-view";

@Component({
  selector: 'app-ota-dictionaries',
  templateUrl: './ota-dictionaries.component.html',
  styleUrls: ['./ota-dictionaries.component.css']
})
export class OtaDictionariesComponent implements OnInit {
  role: string | undefined;

  dictionariesDisplayedColumns: string[] = ['name', 'edit'];
  otaDictionaries: OtaDictionary[] = [];

  parametersDisplayedColumns: string[] = ['value', 'paramName', 'code', 'regExp'];
  otaParameters: OtaParameterView[] = [];

  dictionaryName: string = '';

  constructor(public dialog: MatDialog,
              private otaDictionaryService: OtaDictionaryService,
              private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.loadOtaDictionaries();
    this.role = this.token.getAuthorities();
  }

  loadOtaDictionaries(): void {
    this.otaDictionaryService.getAllOTADictionariesWithoutParams().subscribe(result => {
      this.otaDictionaries = result;
    })
  }

  loadOtaParameters(id: number): void {
    this.otaDictionaryService.getOTAParametersByDictionaryId(id).subscribe(result => {
      this.otaParameters = result;
    })
  }

  onDictionaryClick(dictionary: OtaDictionary): void {
    this.loadOtaParameters(<number>dictionary.id);
    this.dictionaryName = dictionary.name;
  }

  deleteOtaDictionary(id: number): void {
    if (!confirm("Are you sure to delete this dictionary?")) {
      return;
    }
    this.otaDictionaryService.deleteOTADictionary(id).subscribe(result => {
      this.loadOtaDictionaries();
    });
  }

  openRenameOtaDictionaryDialog(otaDictionary: OtaDictionary) {
    let editedOtaDictionary: OtaDictionary = {
      "id": otaDictionary.id,
      "name": otaDictionary.name,
      "otaParameters": null
    }
    const dialogRef = this.dialog.open(RenameOtaDictionaryDialog, {
      width: '400px',
      data: editedOtaDictionary
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadOtaDictionaries();
      if (this.dictionaryName != '') {
        this.dictionaryName = result;
      }
    });
  }

}


@Component({
  selector: 'rename-ota-dictionary-dialog',
  templateUrl: 'rename-ota-dictionary-dialog.html',
})
export class RenameOtaDictionaryDialog {
  constructor(
    public dialogRef: MatDialogRef<RenameOtaDictionaryDialog>,
    @Inject(MAT_DIALOG_DATA) public otaDictionary: OtaDictionary,
    private otaDictionaryService: OtaDictionaryService
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onOkClick(otaDictionary: OtaDictionary): void {
    this.otaDictionaryService.renameOTADictionary(JSON.stringify(otaDictionary)).subscribe(result => {
      this.dialogRef.close(otaDictionary.name);
    });
  }
}
