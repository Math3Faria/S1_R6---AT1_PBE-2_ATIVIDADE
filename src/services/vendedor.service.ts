import { VendedorRepository } from "../repositories/vendedor.repository";
import { Vendedor } from "../models/pessoa.model";

export class VendedorService {
    constructor(private _repository = new VendedorRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(nome: string, email: string, idPedido: number, matricula: string, dataAdmissao: Date) {
        const vendedor = new Vendedor(nome, email, idPedido, matricula, dataAdmissao);
        return await this._repository.create(vendedor);
    }

    async editar(id: number, nome: string, email: string, idPedido: number, matricula: string, dataAdmissao: Date) {
        const vendedor = new Vendedor(nome, email, idPedido, matricula, dataAdmissao);
        return await this._repository.update(id, vendedor);
    }

    async deletar(id: number) {
        const result = await this._repository.delete(id);
        return result;
    }

    async selecionaById(id: number) {
        const result = await this._repository.findById(id);
        return result;
    }
}
