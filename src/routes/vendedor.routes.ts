import { Router } from "express";
import { VendedorController } from "../controllers/vendedor.controller";

const vendedorRouter = Router();
const controller = new VendedorController();

vendedorRouter.get("/cliente", controller.selecionarTodos);
vendedorRouter.get("/cliente/buscar", controller.selecionaById);
vendedorRouter.post("/cliente", controller.criar);
vendedorRouter.put("/cliente/:id", controller.editar);
vendedorRouter.delete("/cliente", controller.deletar);

export { vendedorRouter };
