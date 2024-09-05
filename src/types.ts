export interface IApiResponse {
  status: number;
  errorCode?: string;
  message: string;
  data?: any;
}
