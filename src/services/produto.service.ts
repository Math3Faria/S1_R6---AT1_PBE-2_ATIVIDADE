import { ProdutoRepository } from "../repositories/produto.repository";
import { Produto } from "../models/produto.model";

export class ProdutoService {
    constructor(private _repository = new ProdutoRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(nomeProd: string, valor: number, idCategoria: number, imagem_url: string | null = null) {
        const produto = Produto.criar(nomeProd, valor, idCategoria, imagem_url);
        return await this._repository.create(produto);
    }

    async editar(id: number, nomeProd: string, valor: number, idCategoria: number, imagem_url?: string){
        const produto = Produto.editar(id, nomeProd, valor, idCategoria, imagem_url)
        return await this._repository.update(id, produto)
    }

    async deletar(id: number){
        const result =  await this._repository.delete(id)
        return result;
    }

    async selecionaById(id: number){
        const result =  await this._repository.findById(id)
        return result;
    }

    async selecionaByNome(nomeProd: string){
        const result =  await this._repository.findByName(nomeProd)
        return result;
    }
    async selecionaAbc() {
        return await this._repository.findAlfabetic();
    }

}
