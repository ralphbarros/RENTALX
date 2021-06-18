import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;

describe("Create Car",()=> {

    beforeEach( () => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("should be able to create a new car",async ()=>{
        await createCarUseCase.execute({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate:"ABC-123",
            fine_amount:60,
            brand:"Brand",
            category_id:"category_id",
        });

    });

    it("should not be able to create a new car with exists license plate",
        async () => {
            await createCarUseCase.execute({
                name: "Car1",
                description: "Description car",
                daily_rate: 100,
                license_plate:"ABC-123",
                fine_amount:60,
                brand:"Brand",
                category_id:"category_id",
            });

            await expect(
                createCarUseCase.execute({
                name: "Car2",
                description: "Description car",
                daily_rate: 100,
                license_plate:"ABC-123",
                fine_amount:60,
                brand:"Brand",
                category_id:"category_id",
            })
        
        ).rejects.toBeInstanceOf(AppError)


    })

})