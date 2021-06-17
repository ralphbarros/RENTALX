import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Shoul be able to authenticate an user", async () => {
        const user: ICreateUserDTO ={
            driver_license: "000123",
            email:"aaa@test.com",
            password: "123",
            name:"user test"
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");

    });

    it("Shoul be not able to authenticate an non exist user",  () => {
      expect(async()=>{

        await authenticateUserUseCase.execute({
            email: "fase@email.com",
            password: "13123",
        });
      }).rejects.toBeInstanceOf(AppError);

    });

    it("Shoul be not able to authenticate with incorrect passoword",  () => {
        expect(async()=>{
            const user: ICreateUserDTO ={
                driver_license: "0ddd00123",
                email:"aaaaaaa@test.com",
                password: "123",
                name:"user test"
            };
            await createUserUseCase.execute(user);
    
          await authenticateUserUseCase.execute({
              email: user.email,
              password: "incorretc",
          });
        }).rejects.toBeInstanceOf(AppError);
  
      });





});