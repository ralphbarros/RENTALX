import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import {Router} from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
rentalRoutes.post("/rentals",ensureAuthenticated, createRentalController.handle);

const devolutionRentalController = new DevolutionRentalController();
rentalRoutes.post("/rentals/devolution/:id",ensureAuthenticated, devolutionRentalController.handle);

const listRentalsByUserController = new ListRentalsByUserController();
rentalRoutes.get("/rentals/user",ensureAuthenticated, listRentalsByUserController.handle);

export {rentalRoutes}