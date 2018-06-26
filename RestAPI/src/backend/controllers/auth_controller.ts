import { Router, Request, Response } from "express";
import { getUsersRepository } from "../repositories/userRepository";
import { Repository } from "typeorm";
import { Users } from "../entities/users";
import * as jwt from "jsonwebtoken";

export function getHandlers(_usersRepository: Repository<Users>) {
    
    const getTokenHandler = (req: Request, res: Response) => {
        (async () => {
            const body = req.body;
            const email = body.email;
            const password = body.password;
            if (!email || !password) {
                res.status(400).send();
            } else {
                const user = await _usersRepository.findOne({
                    where: {
                        email: email,
                        password: password
                    }
                });
                if (!user) {
                    res.status(401).send();
                } else {
                    const payload = { id: user.id };
                    const secret = process.env.AUTH_SECRET;
                    if (typeof secret === "string") {
                        const token = jwt.sign(payload, secret);
                        res.json({ token: token });
                    } else {
                        res.status(500).send();
                    }
                    
                }
            }
        })();
    };

    return {
        getTokenHandler
    };

}

export function getAuthRouter() {
    const handlers = getHandlers(getUsersRepository());
    const authRouter = Router();
    authRouter.post("/login", handlers.getTokenHandler);
    return authRouter;
}
