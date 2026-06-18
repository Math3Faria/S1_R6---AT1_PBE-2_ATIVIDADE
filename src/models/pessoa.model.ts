export interface IPessoa {
    mostrarDados(): string;
}

export abstract class Pessoa implements IPessoa {
    private _nome: string;
    private _email: string;
    constructor(nome: string, email: string) {
        this._nome = nome;
        this._email = email;
    }
    public get nome(): string { return this._nome; }
    public get email(): string { return this._email; }
 


    public mostrarDados(): string {
        return `Nome: ${this._nome} | Email: ${this._email}`;
    }
}

export class Cliente extends Pessoa {
    private _cpf: string;
    private _endereco: string;
    private _dataCad: Date;

    constructor(nome: string, email: string, cpf: string, endereco: string, dataCad: Date) {
        super(nome, email);
        this._cpf = cpf;
        this._endereco = endereco;
        this._dataCad = dataCad;
    }

    public get cpf(): string { return this._cpf; }
    public get endereco(): string { return this._endereco; }
    public get dataCad(): Date { return this._dataCad; }

    public mostrarDados(): string {
        return `${super.mostrarDados()} | CPF: ${this._cpf} | Endereço: ${this._endereco}`;
    }
}

export class Vendedor extends Pessoa {
    private _matricula: string;
    private _idPedido: number;
    private _dataAdmissao: Date;

    constructor(nome: string, email: string, idPedido: number, matricula: string, dataAdmissao: Date) {
        super(nome, email);
        this._idPedido = idPedido;
        this._matricula = matricula;
        this._dataAdmissao = dataAdmissao;
    }

    public get matricula(): string { return this._matricula; }
    public get idPedido(): number { return this._idPedido; }
    public get dataAdmissao(): Date { return this._dataAdmissao; }

    public mostrarDados(): string {
        return `${super.mostrarDados()} | Matrícula: ${this._matricula}`;
    }
}
