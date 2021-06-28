import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import {Router} from "express";


const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
rentalRoutes.post("/rentals",createRentalController.handle);

export {rentalRoutes}