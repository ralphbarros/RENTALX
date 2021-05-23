import { Request, Response } from "express";

import { ListCategoriesUseCase } from "../listCategories/listCategoriesUseCase"

class ListCategoriesController{
    constructor(private listCategoriesUsecase: ListCategoriesUseCase){}

    handle( request: Request, response: Response ):Response{
        const all = this.listCategoriesUsecase.execute();
        return response.json(all);
    }

}

export { ListCategoriesController }