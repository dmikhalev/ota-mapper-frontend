import {Component, Inject} from '@angular/core';
import {Rule} from "../entities/rule";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RuleService} from "../services/rule.service";
import {FormControl} from "@angular/forms";

export interface InitialAddRuleData {
  paramName: string,
  regExp: string,
}

export interface ParamCodePair {
  paramName: string,
  code: string,
}

@Component({
  selector: 'app-add-rule-dialog',
  templateUrl: './add-rule-dialog.component.html',
  styleUrls: ['./add-rule-dialog.component.css']
})
export class AddRuleDialogComponent {

  paramControl = new FormControl();
  params: ParamCodePair[] = []

  rule: Rule = {
    "id": null,
    "name": 'RoomType',
    "otaType": 'GRI',
    "regExp": '',
    "paramName": '',
    "code": null,
    "priority": null
  }

  constructor(
    public dialogRef: MatDialogRef<AddRuleDialogComponent>,
    private ruleService: RuleService,
    @Inject(MAT_DIALOG_DATA) public data: InitialAddRuleData,
  ) {
    if (data != null) {
      this.rule.regExp = data.regExp;
      this.rule.paramName = data.paramName;
    }
    this.loadRoomTypeDictionary();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    let regExp = 'IF ' + this.rule.regExp + ' THEN ' + this.paramControl.value.code;
    this.ruleService.validateRuleRegExp(regExp).subscribe(valid => {
      if (valid) {
        this.rule.regExp = regExp;
        this.rule.paramName = this.paramControl.value.paramName;
        this.rule.code = this.paramControl.value.code;
        this.ruleService.createOrUpdateRule(JSON.stringify(this.rule)).subscribe(result => {
          this.dialogRef.close(result);
        });
      } else {
        alert("Wrong rule pattern.")
      }
    })
  }

  loadRoomTypeDictionary(): void {
    this.ruleService.getRoomTypeDictionary().subscribe(result => {
      this.params = result;
    })
  }

}
