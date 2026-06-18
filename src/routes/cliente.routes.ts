import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";

const clienteRouter = Router();
const controller = new ClienteController();

clienteRouter.get("/cliente", controller.selecionarTodos);
clienteRouter.get("/cliente/buscar", controller.selecionaById);
clienteRouter.post("/cliente", controller.criar);
clienteRouter.put("/cliente/:id", controller.editar);
clienteRouter.delete("/cliente", controller.deletar);

export { clienteRouter };
