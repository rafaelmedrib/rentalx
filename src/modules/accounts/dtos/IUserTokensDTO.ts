interface IUserTokensDTO {
  user_id: string;
  expiration_date: Date;
  refresh_token: string;
}

export { IUserTokensDTO };
