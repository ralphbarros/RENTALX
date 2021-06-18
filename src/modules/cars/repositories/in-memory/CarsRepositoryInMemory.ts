import { ICreateDTO } from "@modules/cars/dtos/ICreateCarDto";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository{


    cars: Car[]=[];



    
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find( (car) => car.license_plate === license_plate );
    }
    async create({brand,category_id,daily_rate,description,fine_amount,name,license_plate}: ICreateDTO): Promise<Car> {

        const car = new Car();
        Object.assign(car,{
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            name,
            license_plate 
        })
        this.cars.push(car)
        return car
    }

}

export {CarsRepositoryInMemory}