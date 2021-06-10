import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";



interface IRequest{
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationsUseCase {
    
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository ){}
        
        async execute({name,description}:IRequest):Promise<void>{
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);
        console.log("teste 333333");
        if(specificationAlreadyExists){
            throw new Error (" Specification already exists!!" );
        };
        console.log("use case especificação ")
        await this.specificationsRepository.create({name,description});
    }

}

export { CreateSpecificationsUseCase }