import { db } from "../database/connection.database";
import { Cliente, Pessoa } from "../models/pessoa.model";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class ClienteRepository {
    async create(cliente: Cliente): Promise<ResultSetHeader> {
        const sql = "INSERT INTO clientes (nome, email, cpf, endereco) VALUES (?,?,?,?);";
        const values = [
            cliente.nome,
            cliente.email,
            cliente.cpf,
            cliente.endereco];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }
    async findAll(): Promise<Cliente[]> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM clientes;");
        return rows.map(row => new Cliente(
            row.nome,
            row.email,
            row.cpf,
            row.endereco,
            new Date(row.data_cadastro)
        ));
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const [result] = await db.execute<ResultSetHeader>(
            "DELETE FROM clientes WHERE id=?;", [id]);
        return result;
    }

    async findById(id: number): Promise<Cliente | undefined> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM clientes WHERE id=?;", [id]);

        if (rows.length === 0) return undefined;

        const r = rows[0];
        return new Cliente(
            r.nome,
            r.email,
            r.cpf,
            r.endereco,
            new Date(r.data_cadastro)
        );
    }




    async update(id: number, cliente: Cliente): Promise<ResultSetHeader> {
        const sql = "UPDATE clientes SET nome=?, email=?, cpf=?, endereco=? WHERE id=?;";
        const values = [
            cliente.nome,
            cliente.email,
            cliente.cpf,
            cliente.endereco,
            id
        ];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }
}
