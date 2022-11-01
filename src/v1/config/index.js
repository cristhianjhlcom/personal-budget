import * as dotenv from "dotenv";
dotenv.config();

export default {
    app: {
        PORT: process.env.PORT ?? 5000,
    },
    db: {
        USER: process.env.DB_USER ?? "root",
        HOST: process.env.DB_HOST ?? "localhost",
        DATABASE: process.env.DB_NAME ?? "postgres",
        PASSWORD: process.env.DB_PASSWORD ?? "",
        PORT: process.env.DB_PORT ?? 5368,
    }
}
