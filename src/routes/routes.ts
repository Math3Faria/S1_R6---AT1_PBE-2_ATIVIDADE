import { Router } from "express";
import categoriaRouter from "./categoria.routes";
import produtoRouter from "./produto.routes";
import { vendedorRouter } from "./vendedor.routes";
import { clienteRouter } from "./cliente.routes";
const router = Router();

router.use(vendedorRouter);
router.use(clienteRouter);
router.use(categoriaRouter);
router.use(produtoRouter);

export default router;