import {OtaParameter} from "./ota-parameter";

export class OtaDictionary {
  id: number | null;
  name: string;
  otaParameters: OtaParameter[] | null;

  constructor(id: number, name: string, otaParameters: OtaParameter[]) {
    this.id = id;
    this.name = name;
    this.otaParameters = otaParameters;
  }
}
