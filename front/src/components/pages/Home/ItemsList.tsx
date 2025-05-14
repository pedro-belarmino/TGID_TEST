import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    type SelectChangeEvent,
    Card,
    CardContent,
    CardMedia,
    Typography,
    useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Product {
    id: string
    nome: string
    descricao: string
    preco: number
    categoriaId: string
    image: string
}

interface Categorie {
    id: string
    nome: string
}

export default function ItemsList() {
    const theme = useTheme()
    const navigate = useNavigate()

    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Categorie[]>([])
    const [selectedCategorie, setSelectedCategorie] = useState<string>('')

    useEffect(() => {
        axios.get('http://localhost:3000/produtos').then(res => {
            setProducts(res.data)
        })

        axios.get('http://localhost:3000/categorias').then(res => {
            setCategories(res.data)
        })
    }, [])

    const handleCategoriaChange = (event: SelectChangeEvent) => {
        const categoriaId = event.target.value
        setSelectedCategorie(categoriaId)

        const url = categoriaId
            ? `http://localhost:3000/produtos?categoriaId=${categoriaId}`
            : 'http://localhost:3000/produtos'

        axios.get(url).then(res => {
            setProducts(res.data)
        })
    }

    return (
        <div className="w-full p-4 space-y-6">
            <div className="w-full max-w-xs">
                <FormControl fullWidth>
                    <InputLabel id="categoria-label">Categoria</InputLabel>
                    <Select
                        labelId="categoria-label"
                        value={selectedCategorie}
                        onChange={handleCategoriaChange}
                        label="Categoria"
                    >
                        <MenuItem value="">Todas as Categorias</MenuItem>
                        {categories.map(cat => (
                            <MenuItem key={cat.id} value={cat.id}
                            >
                                {cat.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {products.map(produto => (
                    <div
                        id={produto.id}
                        key={produto.id}
                        className="cursor-pointer"
                        onClick={() => navigate(`/item?id=${produto.id}`)}
                    >
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                transition: "all 0.1s",
                                "&:hover": {
                                    boxShadow: theme.shadows[10],
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={produto.image || "https://via.placeholder.com/140"}
                                alt={produto.nome}
                                className="object-contain p-2"
                                style={{
                                    backgroundColor: theme.palette.background.default,
                                }}
                            />
                            <CardContent
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography variant="h6" noWrap>
                                    {produto.nome}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mt: "auto" }}>
                                    R$ {produto.preco.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

        </div>
    )
}
