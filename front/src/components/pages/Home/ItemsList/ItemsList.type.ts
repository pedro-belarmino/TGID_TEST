export interface Product {
    id: string
    nome: string
    descricao: string
    preco: number
    categoriaId: string
    image: string
}

export interface Categorie {
    id: string
    nome: string
}