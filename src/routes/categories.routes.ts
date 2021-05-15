import { Router } from 'express';
import { CategoriesRepository } from "../Repositories/CategoriesRepository"


const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/categories",(request,respose)=>{

const { name, description } = request.body;

categoriesRepository.create({ name, description });

return respose.status(201).send();
});

categoriesRoutes.get("/",(request,respose)=>{
const all = categoriesRepository.list();
return respose.json(all);
});

export { categoriesRoutes }