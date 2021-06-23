import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import {Router} from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
const carsRoutes = Router();




const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post("/cars",ensureAuthenticated,ensureAdmin, createCarController.handle);
carsRoutes.get("/cars/available", listAvailableCarsController.handle);

export {carsRoutes}