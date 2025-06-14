export interface ProductType {
    nome: string
    preco: string
    image: string
    descricao: string
    categoria: string
}

export interface ProductValidationType {
    nome: boolean
    preco: boolean
    image: boolean
    descricao: boolean
    categoria: boolean
}
