import { db } from "../database/connection.database";
import { IProduto } from "../models/produto.model";
import { ResultSetHeader } from "mysql2/promise";

export class ProdutoRepository {

    async findAll(): Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>(
            'SELECT * FROM produtos;'
        );
        return rows;
    }

    // Atualizado para incluir a coluna imagem_url no INSERT
    async create(dados: Omit<IProduto, 'id'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO produtos (nomeProd, valor, idCategoria, imagem_url) VALUES (?,?,?,?);';
        
        // Acessando as propriedades usando os Getters públicos da sua Model Produto
        const values = [dados.nomeProd, dados.valor, dados.idCategoria, dados.imagem_url || null];
        
        console.log('Dados enviados para o banco: ', values);
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    // Atualizado para incluir a coluna imagem_url no UPDATE
    async update(id: number, dados: Omit<IProduto, 'id'>): Promise<ResultSetHeader> {
        let sql = 'UPDATE produtos SET nomeProd=?, valor=?, idCategoria=?';
        const values = [dados.nomeProd, dados.valor, dados.idCategoria];

        // Se uma nova imagem foi enviada na edição, nós a atualizamos. 
        // Caso contrário (undefined), a query mantém a imagem antiga intacta.
        if (dados.imagem_url !== undefined) {
            sql += ', imagem_url=?';
            values.push(dados.imagem_url);
        }

        sql += ' WHERE id=?;';
        values.push(id);

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM produtos WHERE id = ?;';
        const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
        return rows;
    }

    async findById(id: number): Promise<IProduto | undefined> {
        const sql = 'SELECT * FROM produtos WHERE id = ?;';
        const [rows] = await db.execute<IProduto[]>(sql, [id]);
        return rows[0];
    }

    async findByName(nomeProd: string): Promise<IProduto> {
        const sql = 'SELECT * FROM produtos WHERE nomeProd = ?;';
        const [rows] = await db.execute<IProduto[]>(sql, [nomeProd]);
        return rows[0];
    }

    async findAlfabetic(): Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>(
            'SELECT * FROM produtos ORDER BY nomeProd ASC;');
        return rows;
    }
}
