export interface ApiError {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
  errors: string[];
}