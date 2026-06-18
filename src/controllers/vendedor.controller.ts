import { Request, Response } from "express";
import { VendedorService } from "../services/vendedor.service";

export class VendedorController {

    constructor(private _service = new VendedorService()) { }

    criar = async (req: Request, res: Response) => {
        try {
            const { nome, email, idPedido, matricula, dataAdmissao } = req.body;

            const result = await this._service.criar(
                nome,
                email,
                idPedido,
                matricula,
                new Date(dataAdmissao) // Garante a conversão da string da requisição para Date
            );
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const vendedores = await this._service.selecionarTodos();
            res.status(200).json(vendedores);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro no servidor"
            });
        }
    }

    deletar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.body.id);
            if (!id) {
                return res.status(400).json({
                    message: "ID inválido"
                });
            }
            const result = await this._service.deletar(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Este vendedor não foi encontrado na base de dados"
                });
            }
            res.status(200).json({
                message: "O vendedor foi excluído da base de dados"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }

    selecionaById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    message: "ID não está certo ou não fornecido confira"
                });
            }

            const vendedor = await this._service.selecionaById(id);

            if (!vendedor) {
                return res.status(404).json({ message: "" });
            }

            res.status(200).json(vendedor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }

        editar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            if (!id) return res.status(400).json({ message: "ID inválido" });
            
            const { nome, email, idPedido, matricula, dataAdmissao } = req.body;
            const dataValida = dataAdmissao ? new Date(dataAdmissao) : new Date();

            const result = await this._service.editar(
                id,
                nome,
                email,
                idPedido,
                matricula,
                dataValida
            );
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }

}
