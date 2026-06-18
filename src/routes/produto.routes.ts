import { Router } from 'express';
import { ProdutoController } from '../controllers/produto.controller';
import uploadImage from '../middlewares/uploadImage.middleware';

const produtoRouter = Router();
const produtoController = new ProdutoController();

produtoRouter.post('/produtos', uploadImage, produtoController.criar);

produtoRouter.get('/produtos', produtoController.selecionarTodos);

produtoRouter.get('/produtos/um', produtoController.selecionaById);

produtoRouter.put('/produtos', uploadImage, produtoController.editar);

produtoRouter.delete('/produtos', produtoController.deletar);

export default produtoRouter;