import { useEffect, useState } from 'react';
import axios from 'axios';
import type { SelectChangeEvent } from '@mui/material';
import type { Product, Categorie } from './ItemsList.type';

export function useItemsListController() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Categorie[]>([]);
    const [selectedCategorie, setSelectedCategorie] = useState<string>('');

    const [sortOrder, setSortOrder] = useState<string>('1');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get('http://localhost:3000/produtos'),
                    axios.get('http://localhost:3000/categorias')
                ]);
                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const getFilteredAndSortedProducts = () => {
        let filtered = [...products];

        // A ordenação será aplicada depois de já termos os produtos da categoria ou todos, conforme o selectedCategorie
        switch (sortOrder) {
            case '2': // Menor preço
                filtered.sort((a, b) => a.preco - b.preco);
                break;
            case '3': // Maior preço
                filtered.sort((a, b) => b.preco - a.preco);
                break;
            default:
                break; // Padrão, sem ordenação específica
        }

        return filtered;
    };

    const handleSortOrderChange = (event: SelectChangeEvent) => {
        setSortOrder(event.target.value);
    };

    const handleCategoriaChange = async (event: SelectChangeEvent) => {
        const categoriaId = event.target.value;
        setSelectedCategorie(categoriaId);

        try {
            const url = categoriaId
                ? `http://localhost:3000/produtos?categoriaId=${categoriaId}`
                : 'http://localhost:3000/produtos';

            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    };

    return {
        categories,
        selectedCategorie,
        sortOrder,
        handleCategoriaChange,
        handleSortOrderChange,
        products: getFilteredAndSortedProducts(),
    };
}