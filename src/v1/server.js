import express from "express";
import envelopes_router from "./routes/envelopesRouter.js";
import transactions_router from "./routes/transactionsRouter.js";
import config from "./config/index.js";

const app = express();
const { PORT } = config.app;

app.use(express.json());
app.use("/api/v1/envelopes", envelopes_router);
app.use("/api/v1/transactions", transactions_router);

app.get("/", (_request, response) => {
    response.json({info: "Node.js, Express, and Postgres API"});
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});

export default app;
