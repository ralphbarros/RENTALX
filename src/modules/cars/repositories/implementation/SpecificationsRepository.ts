import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";



class SpecificationsRepository implements ISpecificationsRepository {
private specifications: Specification[];

constructor(){
    this.specifications = [];
}
    
    create({ name, description }: ICreateSpecificationDTO): void {
        const specifications = new Specification();

        Object.assign(specifications,{
            name,
            description,
            created_at: new Date()
        });

        this.specifications.push(specifications);
    }
    findByName(name: string){
        const specification = this.specifications.find((specifications)=> specifications.name === name );
        return specification;
    }

    list(): Specification[] {
        return this.specifications;
    }
   
}

export { SpecificationsRepository }