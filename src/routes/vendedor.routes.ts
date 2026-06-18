import { Router } from "express";
import { VendedorController } from "../controllers/vendedor.controller";

const vendedorRouter = Router();
const controller = new VendedorController();

vendedorRouter.get("/", controller.selecionarTodos);
vendedorRouter.get("/buscar", controller.selecionaById);
vendedorRouter.post("/", controller.criar);
vendedorRouter.put("/:id", controller.editar);
vendedorRouter.delete("/", controller.deletar);

export { vendedorRouter };
