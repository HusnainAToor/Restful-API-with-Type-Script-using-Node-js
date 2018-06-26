import { getConnection } from "typeorm";
import { Link } from "../entities/link";
import { Users } from "../entities/users";

export function getLinkRepository() {
    const conn = getConnection();
    return conn.getRepository(Link);
}
