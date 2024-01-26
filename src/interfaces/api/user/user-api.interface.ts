import { IApiGetAllRoleQueryResponse } from '../role/role-api.interface';

export interface IApiCreatePostUserMutationParams {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
}

export interface IApiCreatePostUserMutationResponse {
  id: string;
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  roleId: number;
  memberId: string;
  clientId: string;
}

export interface IApiGetUserQueryResponse {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: 'STAFF' | 'ADMIN' | 'PROJECT_MANAGER';
}
