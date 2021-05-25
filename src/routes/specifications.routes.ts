

import { Router } from "express";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification"



const specificationsRoutes = Router();



specificationsRoutes.post("/specifications",(request,response)=>{
    
    return createSpecificationController.handle(request,response);
    
});

specificationsRoutes.get("/specifications",(request,response)=>{
    //return listCategoriesController.handle(request,response);
})

export {specificationsRoutes}