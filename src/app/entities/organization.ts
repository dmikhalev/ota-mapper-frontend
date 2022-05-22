export class Organization {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;

  constructor(id: number, name: string, email: string, phone: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}
