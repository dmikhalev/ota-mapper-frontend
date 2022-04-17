export class JwtResponse {
  token: string;
  username: string;
  role: string;

  constructor(token: string, username: string, role: string) {
    this.token = token;
    this.username = username;
    this.role = role;
  }
}
