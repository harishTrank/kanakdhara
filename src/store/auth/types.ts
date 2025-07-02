export type LoginPayload = {
  phone: string;
  password: string;
};

export type AuthSliceState = {
  isLoading: boolean;
  userId: number | null;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPass: string;
};
