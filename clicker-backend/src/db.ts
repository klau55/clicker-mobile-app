import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "clickerdb",
    password: "NDKJB-UQJMP-4VL8W-XBLQX-MPCNR",
    port: 5432,
});
