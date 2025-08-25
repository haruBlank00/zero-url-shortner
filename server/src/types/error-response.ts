export type ErrorResponse = {
  status: number;

  message: string;

  data: null;

  error: {
    code: number;
    message: string;
  };
};
