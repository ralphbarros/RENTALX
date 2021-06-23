import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";



let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach( () => {

        carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars by name", async() => {
        
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Description car",
            daily_rate: 100,
            license_plate:"ABC-123",
            fine_amount:60,
            brand:"Brand",
            category_id:"category_id",
        })
        
        const cars = await listAvailableCarsUseCase.execute({
            name:"Car1"
        });
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async() => {
        
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Description car",
            daily_rate: 100,
            license_plate:"ABC-123",
            fine_amount:60,
            brand:"Brand",
            category_id:"category_id",
        })
        
        const cars = await listAvailableCarsUseCase.execute({
            category_id:"category_id"
        });
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async() => {
        
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Description car",
            daily_rate: 100,
            license_plate:"ABC-123",
            fine_amount:60,
            brand:"Brand",
            category_id:"category_id",
        })
        
        const cars = await listAvailableCarsUseCase.execute({
            brand:"Brand"
        });
        expect(cars).toEqual([car]);
    });
})