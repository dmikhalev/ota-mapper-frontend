export class User {
  id: number;
  username: string;
  password: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  organization: string;


  constructor(id: number, username: string, password: string, name: string, email: string, phone: string, role: string, organization: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.organization = organization;
  }
}
