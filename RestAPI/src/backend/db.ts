import { createConnection } from "typeorm";
import { Users } from "./entities/users";
import { Link } from "./entities/link";
import { Vote } from "./entities/vote";

export async function connecToDatabase() {

    const DATABASE_HOST ="localhost";
    const DATABASE_USER = "postgres";
    const DATABASE_PORT = 5432;
    const DATABASE_PASSWORD = "root";
    const DATABASE_DB = "demo";

    const entities = [
        Users,
Link,
Vote
    ];

    const conn = await createConnection({
        type: "postgres",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: entities,
        synchronize: true
    });

}
