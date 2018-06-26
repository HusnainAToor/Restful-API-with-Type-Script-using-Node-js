import { getConnection } from "typeorm";
import { Users } from "../entities/users";

export function getUsersRepository() {
    const conn = getConnection();
    return conn.getRepository(Users);
}
