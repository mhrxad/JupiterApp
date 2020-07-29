export interface ILoginUserResponse {
  token: string;
  expireTime: number;
  message: string;
  firstName : string;
  lastName : string;
  userId : number;
  avatar : string;
  role : string;
}
