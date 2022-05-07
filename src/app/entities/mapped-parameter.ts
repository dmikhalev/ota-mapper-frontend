import {Rule} from "./rule";

export class MappedParameter {
  value: string;
  additionalDetails: string;
  rules: Rule[];

  constructor(value: string, additionalDetails: string, rules: Rule[]) {
    this.value = value;
    this.additionalDetails = additionalDetails;
    this.rules = rules;
  }
}
