import { IApiGetAllRoleQueryResponse } from '../role/role-api.interface';

export interface IApiCreatePostUserMutationParams {
  email: string;
  username: string;
  password: string;
  fullname: string;
  role: string;
}

export interface IApiCreatePostUserMutationResponse {
  id: string;
  email: string;
  username: string;
  password: string;
  fullname: string;
  roleId: number;
  memberId: string;
  clientId: string;
}

export interface IApiGetUserQueryResponse {
  id: string;
  email: string;
  fullname: string;
  role: 'STAFF' | 'ADMIN' | 'PROJECT_MANAGER';
}
