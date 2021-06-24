import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import {Router} from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";

import multer from "multer";

const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"))


const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImagesController = new UploadCarImageController();


carsRoutes.post("/cars",ensureAuthenticated,ensureAdmin, createCarController.handle);
carsRoutes.get("/cars/available", listAvailableCarsController.handle);
carsRoutes.post("/cars/specifications/:id",createCarSpecificationController.handle)
carsRoutes.post("/cars/images/:id",upload.array("images"),uploadCarsImagesController.handle)

export {carsRoutes}