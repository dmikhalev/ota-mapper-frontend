export class OtaParameter {
  id: number;
  value: string;
  additionalDetails: string;
  ruleId: number;

  constructor(id: number, value: string, additionalDetails: string, ruleId: number) {
    this.id = id;
    this.value = value;
    this.additionalDetails = additionalDetails;
    this.ruleId = ruleId;
  }
}
