import { Router } from 'express';
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository"
import { CreateCategoryUseCase } from '../modules/cars/useCases/createCategory/CreateCategoryUseCase';


const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/categories",(request,response)=>{

    
});

categoriesRoutes.get("/",(request,response)=>{
const all = categoriesRepository.list();
return response.json(all);
});

export { categoriesRoutes }