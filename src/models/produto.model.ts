import { RowDataPacket } from "mysql2";

export interface IProduto extends RowDataPacket {
    id?: number;
    nomeProd?: string;
    valor?: number;
    idcategoria?: number;
    imagem_url?: string | null;
    dataCad?: Date;
}

export class Produto {
    private _id?: number;
    private _nomeProd: string = "";
    private _valor: number;
    private _idCategoria?: number;
    private _imagem_url?: string | null;
    private _dataCad?: Date;

    constructor(nomeProd: string, valor: number, idCategoria: number, imagem_url?: string | null, id?: number) {
        this.nomeProd = nomeProd;
        this._valor = valor;
        this._idCategoria = idCategoria;
        this._imagem_url = imagem_url;
        this._id = id;
    }

    public get id(): number | undefined { return this._id; }

    public get nomeProd(): string { return this._nomeProd; }

    public get idCategoria(): number | undefined { return this._idCategoria; }
    
    public get valor(): number { return this._valor; }

    public get imagem_url(): string | null | undefined { return this._imagem_url; }

    public set nomeProd(value: string) {
        this._validarnomeProd(value);
        this._nomeProd = value;
    }

    public static criar(nomeProd: string, valor: number, idCategoria: number, imagem_url: string | null = null): Produto {
        return new Produto(nomeProd, valor, idCategoria, imagem_url);
    }

    public static editar(id: number, nomeProd: string, valor: number, idCategoria: number, imagem_url?: string): Produto {
        return new Produto(nomeProd, valor, idCategoria, imagem_url, id);
    }

    private _validarnomeProd(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome do Produto deve ter pelo menos 3 caracteres");
        }
        if (value.trim().length > 45) {
            throw new Error("Nome do Produto deve ter no máximo 45 caracteres");
        }
    }

    public static deletar(id: number): number {
        if (!id || id <= 0) {
            throw new Error("O id deve ser um número válido.");
        }
        return id;
    }
}
