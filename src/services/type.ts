// interface GResponse {
//   status: number;
//   timestamp: string;
//   message: string;
// }

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  age: string;
  gender: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
