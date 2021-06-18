
import {ICreateDTO} from "../dtos/ICreateCarDto"
import { Car } from "../infra/typeorm/entities/Car"

interface ICarsRepository{
    create(data: ICreateDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car> 
}

export {ICarsRepository}