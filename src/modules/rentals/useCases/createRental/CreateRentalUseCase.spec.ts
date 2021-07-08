import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDataProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDataProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDataProvider: DayjsDataProvider;

describe("Create Rental", ()=> {
    const dayAdd24Hours = dayjs().add(1,"day").toDate();
    beforeEach( ()=>{
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayJsDataProvider = new DayjsDataProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory,dayJsDataProvider,carsRepositoryInMemory);
    });


    it("Should be able to create a new rental", async () => {
       const car = await carsRepositoryInMemory.create({
           name: "test",
           description: "Car test",
           daily_rate: 100,
           license_plate: "test",
           fine_amount: 40,
           category_id: "1234",
           brand: "brand"
       })  

       const rental =  await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });
        //console.log(rental);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");;
    })
    

    it("Should not to be able to create a new rental if there is another open same user", async() => {
        const rental = await rentalsRepositoryInMemory.create({
            car_id: "1111",
            expected_return_date: dayAdd24Hours,
            user_id: "1234",
            
        })
      //  console.log("Testando ", rental);

        await expect(
            createRentalUseCase.execute({
            user_id: "1234",
            car_id: "21111",
            expected_return_date: dayAdd24Hours,
        })
        ).rejects.toEqual(new AppError("There is a rental in progress for user!"))
        
        });


     it("Should not to be able to create a new rental if there is another open same car", async() => {
        
        
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            expected_return_date: dayAdd24Hours,
            user_id: "1234",
         
        })

        await expect(
        
            createRentalUseCase.execute({
            car_id: "test",     
            expected_return_date: dayAdd24Hours,
            user_id: "321",
        })

        ).rejects.toEqual(new AppError("Car unavailable!"));
        
     });


     it("Should not to be able to create a new rental with invalid return time", async() => {
        
        await expect(

            createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            })
    
          
        ).rejects.toEqual(new AppError("Invalid return time!!"))
        
     });


})