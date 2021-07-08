



interface ICreateUserTokenDTO {

    user_id: string;
    expires_dates: Date;
    refresh_token: string;
}

export {ICreateUserTokenDTO}