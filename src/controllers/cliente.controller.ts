import { Request, Response } from "express";
import { ClienteService } from "../services/cliente.service";

export class ClienteController {

    constructor(private _service = new ClienteService()) { }
    criar = async (req: Request, res: Response) => {
        try {
            const { nome, email, cpf, endereco } = req.body;

            const result = await this._service.criar(
                nome,
                email,
                cpf,
                endereco
            );
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const clientes = await this._service.selecionarTodos();
            res.status(200).json(clientes);
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
                    message: "Este cliente não foi encontrado na base de dados"
                });
            }
            res.status(200).json({
                message: "O cliente foi excluído da base de dados"
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

            const cliente = await this._service.selecionaById(id);

            if (!cliente) {
                return res.status(404).json({ message: "" });
            }

            res.status(200).json(cliente);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }


    editar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            if (!id) return res.status(400).json({ message: "ID inválido" });
            const { nome, email, cpf, endereco } = req.body;

            const result = await this._service.editar(
                id,
                nome,
                email,
                cpf,
                endereco
            );
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor" });
        }
    }




}
