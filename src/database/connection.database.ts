import mysql, { Pool } from 'mysql2/promise';
import { EnvVar } from '../config/EnvVar'

class Database {
    private static instance: Database;
    private pool!: Pool;

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
            Database.instance.createPool();
        }
        return Database.instance;
    }

    private createPool(): void {
        this.pool = mysql.createPool({
            host: EnvVar.DB_HOST,
            user: EnvVar.DB_USER,
            password: EnvVar.DB_PASSWORD,
            database: EnvVar.DB_DATABASE,
            port: EnvVar.DB_PORT,
            waitForConnections: true,
            connectionLimit: 100,
            queueLimit: 0
        })
    }

    public getPool(): Pool {
        return this.pool
    }

}
export const db = Database.getInstance().getPool();


export async function initializeDatabase(): Promise<void> {
    console.log("Inicializando o banco de dados e tabelas...");
    try {
        const tempConnection = await mysql.createConnection({
            host: EnvVar.DB_HOST,
            user: EnvVar.DB_USER,
            password: EnvVar.DB_PASSWORD,
            port: EnvVar.DB_PORT
        });

        const dbName = EnvVar.DB_DATABASE || 'atividade3_db';

        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await tempConnection.query(`USE \`${dbName}\`;`);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS categorias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                descricao VARCHAR(255) NOT NULL,
                ativo TINYINT(1) DEFAULT 1
            );
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS clientes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(150) NOT NULL,
                email VARCHAR(150) NOT NULL,
                cpf VARCHAR(14) NOT NULL UNIQUE,
                endereco VARCHAR(255) NOT NULL,
                data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nomeProd VARCHAR(150) NOT NULL,
                valor DECIMAL(10, 2) NOT NULL,
                idCategoria INT NOT NULL,
                FOREIGN KEY (idCategoria) REFERENCES categorias(id) ON DELETE CASCADE
            );
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS vendedores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(150) NOT NULL,
                email VARCHAR(150) NOT NULL,
                id_pedido INT NOT NULL,
                matricula VARCHAR(50) NOT NULL UNIQUE,
                data_admissao DATE NOT NULL
            );
        `);

        await tempConnection.end();
        console.log("Banco de dados e tabelas verificados/criados com sucesso.");
    } catch (error) {
        console.error("Erro ao criar o banco ou as tabelas:", error);
        throw error;
    }
}
