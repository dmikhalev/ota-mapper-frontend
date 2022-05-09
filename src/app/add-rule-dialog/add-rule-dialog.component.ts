import {Component} from '@angular/core';
import {Rule} from "../entities/rule";
import {MatDialogRef} from "@angular/material/dialog";
import {RuleService} from "../services/rule.service";

@Component({
  selector: 'app-add-rule-dialog',
  templateUrl: './add-rule-dialog.component.html',
  styleUrls: ['./add-rule-dialog.component.css']
})
export class AddRuleDialogComponent {

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
    private ruleService: RuleService
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.ruleService.validateRuleRegExp(this.rule.regExp).subscribe(valid => {
      console.log(valid)
      if (valid) {
        this.ruleService.createOrUpdateRule(JSON.stringify(this.rule)).subscribe(result => {
          this.dialogRef.close();
        });
      } else {
        alert("Wrong regular expression pattern.")
      }
    })
  }

}
