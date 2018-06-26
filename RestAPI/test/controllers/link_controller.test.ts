import { expect } from "chai";
import request from "supertest";
import { getApp } from "../../src/app";
import { getHandlers } from "../../src/controllers/link_controller";
import { Users } from "../../src/entity/users";
import { Link } from "../../src/entity/link";

import { getLinkRepository } from "../../src/repositories/linkRepository";
import { getUsersRepository } from "../../src/repositories/usersRepository";

// test suite
describe("LinkController", () => {

   test('should create a new link in the database', async (done) => {
        const link = new Link();
        link.url = 'www.google.com';
        link.title = 'Google';
const users=new Users();
users.email="a@gmail.com";
users.password="abcs";
const resultCreate = await _usersRepository.createUsers(users);

       link.users=users;
const resultCreateLink = await _linkRepository.createLink(link);
        expect(resultCreateLink.url).toBe(link.url); 

        const resultFind = await service.findOne(resultCreate.id);
        if (resultFind) {
            expect(resultFind.url).toBe(link.url);
            expect(resultFind.title).toBe(link.title);
        } else {
            fail('Could not find Link');
        }
        done();
    });

     

    
    });

});