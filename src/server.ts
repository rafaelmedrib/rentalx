import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const port = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.listen(port, () => console.log(`Express server running on port ${port}`));
