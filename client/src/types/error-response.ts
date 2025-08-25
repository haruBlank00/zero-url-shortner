export type ErrorResponse = {
  status: number;

  message: string;

  error: {
    code: string;

    message: string;
  };

  data: null;
};
