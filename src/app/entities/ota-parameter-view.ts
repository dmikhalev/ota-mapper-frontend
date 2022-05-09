export class OtaParameterView {
  id: number;
  value: string;
  paramName: string;
  regExp: string;
  code: number;


  constructor(id: number, value: string, paramName: string, regExp: string, code: number) {
    this.id = id;
    this.value = value;
    this.paramName = paramName;
    this.regExp = regExp;
    this.code = code;
  }
}
