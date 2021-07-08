

import { app } from "@shared/infra/http/app";

import request from "supertest";
import createConnection from "@shared/infra/typeorm"
import {Connection} from "typeorm";
import {hash} from "bcryptjs";
import {v4 as uuidV4} from "uuid";


let connection: Connection;

describe("List All Categories", () => {

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
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to list all Categories", async()=> {
      const responseToken =  await request(app).post("/sessions").send({
            email:"admin@rentalx.com.br",
            password:"admin"
        });

       const { token }  = responseToken.body;
       //console.log(responseToken.body);

        await request(app)
        .post("/categories")
        .send({
            name: "Category supertest",
            description: "Category Description"
        })
        .set({
            Authorization: `Bearer ${token}`,
        })
        
        const response = await request(app).get("/");
        console.log(response.body)

        expect(response.body.length).toBe(1);        
        expect(response.status).toBe(200);
        
        
    });

    

})