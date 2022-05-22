import {Component} from '@angular/core';
import {MapperService} from "../services/mapper.service";
import {MappedParameter} from "../entities/mapped-parameter";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ChangeRuleDialogComponent} from "./change-rule-dialog/change-rule-dialog.component";
import {OtaParameter} from "../entities/ota-parameter";
import {OtaDictionary} from "../entities/ota-dictionary";
import {OtaDictionaryService} from "../services/ota-dictionary.service";


@Component({
  selector: 'app-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.css']
})
export class MapperComponent {

  displayedColumns: string[] = ['paramName', 'value', 'regExp', 'edit'];
  dictionaryName: string = ''
  dataSource = null;
  isDictionarySaved: boolean = false

  mappedParameters: MappedParameter[] = []
  mappedParametersWithUniqueValue: MappedParameter[] = []

  constructor(
    private mapperService: MapperService,
    private dictionaryService: OtaDictionaryService,
    public dialog: MatDialog) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mapRoomTypeCSV(files: FileList) {
    this.isDictionarySaved = false;
    if (files && files.length > 0) {
      let file: File = <File>files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);

      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        let csv: any = reader.result;
        let text: string[] = csv.split(/[\r\n]/).filter((e: string) => e != null && e != '');
        this.mapperService.mapRoomType(text).subscribe(data => {
          this.mappedParameters = data;
          this.initMappedParametersWithUniqueValue();
        })
      }
    }
  }

  private initMappedParametersWithUniqueValue(): void {
    this.mappedParametersWithUniqueValue = [];
    let roomTypes: string[] = [];
    this.mappedParameters.forEach(mp => {
      if (mp.rules == null || mp.rules.length === 0) {
        mp.rules = [
          {
            "id": null,
            "name": 'RoomType',
            "otaType": 'GRI',
            "regExp": '',
            "paramName": '',
            "code": null,
            "priority": null
          }
        ]
      }
      if (!roomTypes.includes(mp.value)) {
        this.mappedParametersWithUniqueValue.push(mp);
        roomTypes.push(mp.value);
      }
    })
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.mappedParametersWithUniqueValue);
  }

  saveDictionary(): void {
    if (!confirm("Are you sure to save the dictionary?")) {
      return;
    }
    let ruleMap = new Map();
    for (const mp of this.mappedParametersWithUniqueValue) {
      if (mp.rules[0].id == null) {
        alert('Dictionary has not been saved\nPlease choose a rule for value \'' + mp.value + '\'')
        return;
      }
      ruleMap.set(mp.value, mp.rules[0].id)
    }

    let otaParameters: OtaParameter[] = [];
    this.mappedParameters.forEach(mp => {
      let param: OtaParameter = {
        "id": null,
        "value": mp.value,
        "additionalDetails": mp.additionalDetails,
        "ruleId": ruleMap.get(mp.value),
      }
      otaParameters.push(param);
    })

    let otaDictionary: OtaDictionary = {
      "id": null,
      "name": this.dictionaryName,
      "otaParameters": otaParameters
    }
    this.dictionaryService.saveOTADictionary(otaDictionary);

    this.dataSource = null
    this.dictionaryName = ''
    this.mappedParameters = []
    this.mappedParametersWithUniqueValue = []
    this.isDictionarySaved = true
  }


  openChangeRuleDialog(mappedParameter: MappedParameter): void {
    const dialogRef = this.dialog.open(ChangeRuleDialogComponent, {
      width: '600px',
      data: mappedParameter,
    });

    dialogRef.afterClosed().subscribe(result => {
      mappedParameter.rules.unshift(result);
    });
  }
}
