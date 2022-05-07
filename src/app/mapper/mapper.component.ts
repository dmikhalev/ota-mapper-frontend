import {Component, OnInit} from '@angular/core';
import {MapperService} from "../services/mapper.service";
import {MappedParameter} from "../entities/mapped-parameter";
import {FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {RuleService} from "../services/rule.service";

@Component({
  selector: 'app-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.css']
})
export class MapperComponent implements OnInit {
  displayedColumns: string[] = ['paramName', 'value', 'regExp', 'edit'];

  form: FormGroup = new FormGroup({
    dictionaryName: new FormControl('')
  });

  dataSource = null;

  mappedParameters: MappedParameter[] = []
  mappedParametersWithUniqueValue: MappedParameter[] = []

  constructor(
    private mapperService: MapperService,
    private ruleService: RuleService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // @ts-ignore
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mapRoomTypeCSV(files: FileList) {
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
    //toDo  !!!
  }
}
