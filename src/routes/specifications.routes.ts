

import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController"



const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post("/specifications",createSpecificationController.handle);
 
specificationsRoutes.get("/specifications",(request,response)=>{
    //return listCategoriesController.handle(request,response);
})

export {specificationsRoutes}