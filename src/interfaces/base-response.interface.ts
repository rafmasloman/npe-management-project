export interface IApiBaseResponse<T> {
  message: string;
  statusCode: number;
  data?: T;
}
