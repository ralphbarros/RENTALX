import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";



class SpecificationsRepository implements ISpecificationsRepository {
private repository: Repository<Specification>

constructor(){
    this.repository = getRepository(Specification)
}
    async findbyIds(ids: string[]): Promise<Specification[]> {
     const specifications = await this.repository.findByIds(ids);
     return specifications;
    }
    
   async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
       
        const specification = this.repository.create({
            description,
            name
        });
        
        await this.repository.save(specification);
        return specification
    }

    async findByName(name: string):Promise<Specification>{
        const specification = await this.repository.findOne({
            name,
            });
        return specification;
    }

     async list(): Promise<Specification[]> {
        const all = await this.repository.find();
        return all
    }
   
}

export { SpecificationsRepository }