import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from "./users";

import { Link } from "./link";

@Entity()
export class Vote {
@PrimaryGeneratedColumn()

public id: number;
@ManyToOne(type => Users , users => users.id)
public users: Users;

@Column()
public isUpvote: boolean;
}