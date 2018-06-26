import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Users } from "./users";



@Entity()
export class Link {

@PrimaryGeneratedColumn()
public id: number;

@ManyToOne(type => Users, users => users.id)
public users: Users;

@Column()
public url: string;

@Column()
public title: string;
}
