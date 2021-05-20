

import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationsService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/specifications",(request,response)=>{
    const { name, description } = request.body;

    const specificationsService = new CreateSpecificationsService(specificationsRepository);
    specificationsService.execute({ name, description });
    return response.status(201).send();
    
});

specificationsRoutes.get("/specifications",(request,response)=>{
    return response.json(specificationsRepository);
})

export {specificationsRoutes}