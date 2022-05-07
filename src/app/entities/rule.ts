export class Rule {
  id: number | null;
  name: string;
  otaType: string;
  regExp: string;
  paramName: string;
  code: number | null;
  priority: number | null;


  constructor(id: number, name: string, otaType: string, regExp: string, paramName: string, code: number, priority: number) {
    this.id = id;
    this.name = name;
    this.otaType = otaType;
    this.regExp = regExp;
    this.paramName = paramName;
    this.code = code;
    this.priority = priority;
  }
}
