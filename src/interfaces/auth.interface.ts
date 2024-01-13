import { IApiGetAllRoleQueryResponse } from './api/role/role-api.interface';

export interface IAuthLoginParams {
  email: string;
  password: string;
  authToken?: string;
}

export interface IAuthCredentialResponse {
  id: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  role: string;
  memberId?: string;
  clientId?: string;
}
