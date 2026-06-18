import { Router } from 'express';
import { CategoriaController } from '../controllers/categoria.controller';

const categoriaRouter = Router();

const categoriaController = new CategoriaController();

categoriaRouter.post('/categorias', categoriaController.criar);
categoriaRouter.get('/categorias', categoriaController.selecionarTodos);
categoriaRouter.get('/categorias/busca', categoriaController.selecionaByNome);
categoriaRouter.get('/categorias/id', categoriaController.selecionaById);
categoriaRouter.patch('/categorias', categoriaController.editar);
categoriaRouter.delete('/categorias', categoriaController.deletar);

export default categoriaRouter;