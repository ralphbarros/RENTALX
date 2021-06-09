import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user:{
        name: string;
        email: string;
    };
    token:string;
}


@injectable()
class AuthenticateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private  usersRepository: IUsersRepository
    ){}


   async execute({ email, password }: IRequest ): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new Error(" Email or Password Incorrect");
        }

        const passwordMatch = await compare(password,user.password);
        if(passwordMatch){
            throw new Error(" Email or Password Incorrect");
        }
        const token = sign({},"698dc19d489c4e4db73e28a713eab07b",
        {
            subject:user.id,
            expiresIn:"1d"
        });

    return {
        user,
        token
    };
   }
}

export { AuthenticateUserUseCase }