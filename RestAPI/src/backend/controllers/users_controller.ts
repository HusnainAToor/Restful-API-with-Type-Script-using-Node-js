import { Router, Request, Response } from "express";
import { getUsersRepository } from "../repositories/userRepository";
import { Repository } from "typeorm";
import { Users } from "../entities/users";
import { authMiddleware } from "../middleware/auth_middleware";

export function getHandlers(_usersRepository: Repository<Users>) {
    
    const getAllUsersHandler = (req: Request, res: Response) => {
        (async () => {
            const users = await _usersRepository.find();
            res.json(users).send();
        })();
    };
    
    const getUsersByIdHandler = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const user = _usersRepository.findOne({
            where: {
                id: id
            }
        });
        if (user === undefined) {
            res.status(404).send();
        }
        res.json(user).send();
    };

    const createUsers = (req: Request, res: Response) => {
        (async () => {
            const email = req.body.email;
            const password=req.body.password;
	const user = _usersRepository.findOne({
            where: {
                email:email
            }
        });
           if(user === undefined){
	 const newUser = await _usersRepository.save({ email:email,password:password,});
                return res.json(newUser);
	}
	else {
                  res.status(400).send();
            }            
        })();
    };

   


    return {
        getAllUsersHandler,
        getUsersByIdHandler,
        createUsers
        
    };

}

export function getUsersRouter() {
    const handlers = getHandlers(getUsersRepository());
    const usersRouter = Router();
    usersRouter.get("/", handlers.getAllUsersHandler);  
    usersRouter.get("/:id", handlers.getUsersByIdHandler); 
    usersRouter.post("/",  handlers.createUsers); 
   
    return usersRouter;
}
