import csvParse from "csv-parse";
import fs from "fs";
import { CategoriesRepository } from "../../repositories/implementation/CategoriesRepository";


interface IImportCategory {
    name: string;
    description: string
}

class ImportCategoryUseCase{
    constructor(private categoryRepository:CategoriesRepository){}

    loadCategories(file:Express.Multer.File): Promise<IImportCategory[]>{

        return new Promise((resolve,reject)=>{

                const stream = fs.createReadStream(file.path);
                const categories: IImportCategory[]=[];
                const parseFile = csvParse();

                stream.pipe(parseFile);

                parseFile.on("data",async (line)=>{
                    const [name,description] = line;
                    categories.push({name,description});
                
                })
                .on("end",() =>{
                    fs.promises.unlink(file.path)
                    resolve(categories);
                
                })
                .on("error", (err)=> {
                    reject(err);
                });
                
        });
    }


    async execute(file:Express.Multer.File):Promise<void>{
        const categories = await this.loadCategories(file);
        categories.map(async(category)=> {
            const { name, description } = category;
            const existCategory = this.categoryRepository.findByName(name);

            if(!existCategory)
            {
                this.categoryRepository.create({
                    name,
                    description
                })
            }
        })
        

    }

}


export { ImportCategoryUseCase }