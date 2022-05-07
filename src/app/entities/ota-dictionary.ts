import {OtaParameter} from "./ota-parameter";

export class OtaDictionary {
  id: number;
  additionalDetails: string;
  parameters: OtaParameter[];

  constructor(id: number, additionalDetails: string, parameters: OtaParameter[]) {
    this.id = id;
    this.additionalDetails = additionalDetails;
    this.parameters = parameters;
  }
}
