import { Router, Request, Response } from "express";
import { getLinkRepository } from "../repositories/linkRepository";
import { getUsersRepository } from "../repositories/userRepository";
import { getVoteRepository } from "../repositories/voteRepository";
import { Repository } from "typeorm";
import { Link } from "../entities/link";
import { Users } from "../entities/users";
import { Vote } from "../entities/vote";
import { authMiddleware } from "../middleware/auth_middleware";

export function getHandlers(_linkRepository: Repository<Link>,_usersRepository: Repository<Users>,_voteRepository: Repository<Vote>) {
    
    const getAllLinksHandler = (req: Request, res: Response) => {
        (async () => {
            const links = await _linkRepository.find();
            res.json(links).send();
        })();
    };
    
    const getLinkByIdHandler = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const link = _linkRepository.findOne({
            where: {
                id: id
            }
        });
        if (link === undefined) {
            res.status(404).send();
        }
        res.json(link).send();
    };

    const createLink = (req: Request, res: Response) => {
        (async () => {
            const title = req.body.title; 
            const url = req.body.url;  
            const id=req.body.userId;
	const users= _usersRepository.findOne({
            where: {
                id: id
            }
        });
            if (!title) {
                res.status(400).send();
            } else {
                const newLink = await _linkRepository.save({ title: title,url:url,user: { id: id },});
                return res.json(newLink);
            }            
        })();
    };

   const deleteLink =  async (req: Request, res: Response) => {
        const id=req.body.userId;
        // TODO
 const link = _linkRepository.findOne({
            where: {
                users: id
            }
        });
        if (link === undefined) {
            res.status(404).send();
        }
	else{
await _linkRepository.removeById(link);
}

        res.json({});
    };

 const upVote = (req: Request, res: Response) => {
        (async () => {
            const lid = req.body.id; 
            const id=req.body.userId;
	const users= _usersRepository.findOne({
            where: {
                id: id
            }
        });
	const link= _linkRepository.findOne({
            where: {
                id: lid
            }
        });

const voteuser=_voteRepository.findOne({
            where: {
                users: users,
                isUpvote:true
            }
        });

	
            if (link===undefined || users=== undefined) {
                res.status(400).send();
            } else if(voteuser=== undefined){
                const newVote = await _voteRepository.save({ user: { id: id } ,isUpvote:true });
                return res.json(newVote);
            }      
	else{
	   res.status(400).send();
}      
        })();
    };

const downVote = (req: Request, res: Response) => {
        (async () => {
            const lid = req.body.id; 
            const id=req.body.userId;
	const users= _usersRepository.findOne({
            where: {
                id: id
            }
        });
	const link= _linkRepository.findOne({
            where: {
                id: lid
            }
        });

const voteuser=_voteRepository.findOne({
            where: {
                users: users,
                isUpvote:false
            }
        });

	
            if (link===undefined || users=== undefined) {
                res.status(400).send();
            } else if(voteuser=== undefined){
                const newVote = await _voteRepository.save({user: { id: id } ,isUpvote:false });
                return res.json(newVote);
            }      
	else{
	   res.status(400).send();
}      
        })();
    };

  

    return {
        getAllLinksHandler,
        getLinkByIdHandler,
        createLink,
       deleteLink,
       upVote,
       downVote
    };

}

export function getLinksRouter() {
    const handlers = getHandlers(getLinkRepository(),getUsersRepository(),getVoteRepository());
    const linkRouter = Router();
   linkRouter.get("/", handlers.getAllLinksHandler);  
    linkRouter.get("/:id", handlers.getLinkByIdHandler);  
    linkRouter.post("/", authMiddleware, handlers.createLink);  
   linkRouter.delete("/", authMiddleware, handlers.deleteLink);  
    linkRouter.post("/:id/upvote", authMiddleware, handlers. upVote);  
    linkRouter.post("/:id/downvote", authMiddleware, handlers.downVote);  
    return linkRouter;
}
