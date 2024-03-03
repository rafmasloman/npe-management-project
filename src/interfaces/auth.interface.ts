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
  firstname: string;
  lastname: string;
  role: string;
  memberId?: string;
  clientId?: string;
  member: {
    id: number;
    position: string;
    profilePicture: string;
  };
}

export interface IAuthRegisterParams {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
}
