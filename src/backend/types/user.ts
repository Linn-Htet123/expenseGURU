export interface UserObject {
  _id: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  _v: number;
}

export interface UserCreateObject {
  username: string;
  email: string;
  password: string;
}

export interface UserResponseObject {
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}
