import {Component, OnInit} from '@angular/core';
import {Rule} from "../entities/rule";
import {RuleService} from "../services/rule.service";
import {MatDialog} from "@angular/material/dialog";
import {AddRuleDialogComponent} from "../add-rule-dialog/add-rule-dialog.component";

@Component({
  selector: 'app-rules-view',
  templateUrl: './rules-view.component.html',
  styleUrls: ['./rules-view.component.css']
})
export class RulesViewComponent implements OnInit {

  displayedColumns: string[] = ['name', 'paramName', 'code', 'regExp', 'priority'];
  rules: Rule[] = [];

  constructor(private ruleService: RuleService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadRules();
  }

  loadRules(): void {
    this.ruleService.getAllRules().subscribe(result => {
      this.rules = result;
    })
  }

  openAddRuleDialog(): void {
    const dialogRef = this.dialog.open(AddRuleDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadRules();
    });
  }

}
