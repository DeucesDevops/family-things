export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AccessTokenPayload = {
  sub: string;
  email: string;
  name: string;
};
