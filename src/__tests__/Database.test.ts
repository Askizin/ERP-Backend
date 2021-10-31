import request from 'supertest';
import {app} from '../app'
import  {createConnection} from '../database';


describe('User', () =>{

    beforeAll( async () =>{
        const connection = await createConnection();
    })

    it('should be able to create a new user', async() =>{
        const response = await request(app).post("/users").send({
            email: 'test@example.com',
            name: 'test name',
            password: 'test password'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id")
    });

    it("should not be able to create a user with exists email", async() =>{
        const response = await request(app).post("/users").send({
            email: 'test@example.com',
            name: 'test name'
        });

        const data = {
            "status": "error",
            "message": "Email address already used"
        }


        expect(response.status).toBe(400);
    })
})
