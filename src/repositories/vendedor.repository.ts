import { db } from "../database/connection.database";
import { Vendedor } from "../models/pessoa.model";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class VendedorRepository {
    async create(vendedor: Vendedor): Promise<ResultSetHeader> {
        const sql = "INSERT INTO vendedores (nome, email, id_pedido, matricula, data_admissao) VALUES (?,?,?,?,?);";
        const values = [
            vendedor.nome,
            vendedor.email,
            vendedor.idPedido,
            vendedor.matricula,
            vendedor.dataAdmissao
        ];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async findAll(): Promise<Vendedor[]> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM vendedores;"
        );
        return rows.map(row => new Vendedor(
            row.nome,
            row.email,
            row.id_pedido,
            row.matricula,
            new Date(row.data_admissao)
        ));
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const [result] = await db.execute<ResultSetHeader>(
            "DELETE FROM vendedores WHERE id=?;", [id]
        );
        return result;
    }

    async findById(id: number): Promise<Vendedor | undefined> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "SELECT * FROM vendedores WHERE id=?;", [id]
        );

        if (rows.length === 0) return undefined;

        const r = rows[0]; 
        return new Vendedor(
            r.nome,
            r.email,
            r.id_pedido,
            r.matricula,
            new Date(r.data_admissao)
        );
    }

    async update(id: number, vendedor: Vendedor): Promise<ResultSetHeader> {
        const sql = "UPDATE vendedores SET nome=?, email=?, id_pedido=?, matricula=?, data_admissao=? WHERE id=?;";
        const values = [
            vendedor.nome,
            vendedor.email,
            vendedor.idPedido,
            vendedor.matricula,
            vendedor.dataAdmissao,
            id
        ];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }
}
