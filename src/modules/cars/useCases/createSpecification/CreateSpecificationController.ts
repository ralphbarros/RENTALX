import { CreateSpecificationsUseCase } from "./CreateSpecificationUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";


class  CreateSpecificationController {
    
   async handle(request:Request, response:Response):Promise<Response>{
         console.log("cheguei ao controler especificarin");
        const {name, description} = request.body;
        const createSpecificationUseCase = container.resolve(CreateSpecificationsUseCase);
        await createSpecificationUseCase.execute({name, description});
        return response.status(201).send();
    }

}

export { CreateSpecificationController }