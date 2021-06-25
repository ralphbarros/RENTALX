import { AppError } from "@shared/errors/AppError";


interface IRquest{
    user_id:string;
    car_id:string;
    expected_return_date: Date;
    
}


class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({user_id,car_id,expected_return_date}: IRquest): Promise<void>{

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError("Car unavailable!");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser){
            throw new AppError("There is a rental in progress for user!");
        }
        



    }
}

export {CreateRentalUseCase}

