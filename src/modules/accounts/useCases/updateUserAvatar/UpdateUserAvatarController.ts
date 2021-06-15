import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import {container} from "tsyringe";
import { send } from "process";


class UpdateUserAvatarController{
    async handle (request: Request, response: Response) {
        const { id } =  request.user;

        const avatar_file = null;

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

        return response.status(204).send();

    }

}

export { UpdateUserAvatarController }