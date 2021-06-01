import {Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import {container } from "tsyringe";

class CreateCategoryController {

    

    async handle(request: Request, response: Response): Promise<Response>{
        const { name, description } = request.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
        await createCategoryUseCase.execute({ description,name });
        return response.status(201).send();
    }

}


export { CreateCategoryController }