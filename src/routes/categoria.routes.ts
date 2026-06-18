import { Router } from 'express';
import { CategoriaController } from '../controllers/categoria.controller';

const categoriaRoutes = Router();

const categoriaController = new CategoriaController();

categoriaRoutes.post('/categorias', categoriaController.criar);
categoriaRoutes.get('/categorias', categoriaController.selecionarTodos);
categoriaRoutes.get('/categorias/busca', categoriaController.selecionaByNome);
categoriaRoutes.get('/categorias/id', categoriaController.selecionaById);
categoriaRoutes.patch('/categorias', categoriaController.editar);
categoriaRoutes.delete('/categorias', categoriaController.deletar);

export default categoriaRoutes;