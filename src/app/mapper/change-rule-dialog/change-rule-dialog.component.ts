import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RuleService} from "../../services/rule.service";
import {Rule} from "../../entities/rule";
import {MappedParameter} from "../../entities/mapped-parameter";
import {FormControl} from "@angular/forms";

interface RuleGroup {
  disabled?: boolean;
  name: string;
  rule: Rule[];
}

@Component({
  selector: 'app-change-rule-dialog',
  templateUrl: './change-rule-dialog.component.html',
  styleUrls: ['./change-rule-dialog.component.css']
})
export class ChangeRuleDialogComponent {

  ruleControl = new FormControl();

  ruleGroups: RuleGroup[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChangeRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mappedParameter: MappedParameter,
    private ruleService: RuleService
  ) {
    this.ruleService.getAllRules().subscribe(res => {
      this.ruleGroups = [
        {
          name: 'Mapped',
          rule: this.mappedParameter.rules,
          disabled: this.mappedParameter.rules[0].paramName === '',
        },
        {
          name: 'All',
          rule: res,
        }
      ];
    });
  }

  newRule: Rule = {
    "id": null,
    "name": 'RoomType',
    "otaType": 'GRI',
    "regExp": '',
    "paramName": '',
    "code": null,
    "priority": null
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


  onOkClick(rule: Rule): void {
    this.mappedParameter.rules.unshift(rule);
    let rules: Rule [] = []
    rules.push(rule);
    for (let i = 0; i < this.mappedParameter.rules.length; i++) {
      let r: Rule = this.mappedParameter.rules[i];
      if (r.paramName != '' && r.paramName != rule.paramName && r.regExp != rule.regExp) {
        rules.push(r);
      }
    }
    this.mappedParameter.rules = rules;
    this.dialogRef.close();
  }
}
