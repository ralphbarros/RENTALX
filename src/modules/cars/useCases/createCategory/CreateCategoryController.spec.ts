import { app } from "@shared/infra/http/app";

import request from "supertest";
import createConnection from "@shared/infra/typeorm"
import {Connection} from "typeorm";
import {hash} from "bcryptjs";
import {v4 as uuidV4} from "uuid";


let connection: Connection;

describe("Create Category Controller", () => {

    beforeAll(async ()=> {
        connection = await createConnection();
        await connection.runMigrations();
        
        const id = uuidV4();
        const password = await hash("admin",8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
                values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'xxxxx')
                `
            );
    })

    afterAll(async ()=>{
       // await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new category", async()=> {
        const responseToken = await request(app).post("/sessions").send({
            email:"admin@rentalx.com.br",
            password:"admin"
        });

        console.log(responseToken.body);

        const response = await request(app)
        .post("/cars/categories")
        .send({
            name: "Category supertest",
            description: "Category Description"
        })
        expect(response.status).toBe(201);
    });

})