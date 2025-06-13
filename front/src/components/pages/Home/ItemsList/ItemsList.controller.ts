import { useEffect, useState } from 'react';
import axios from 'axios';
import type { SelectChangeEvent } from '@mui/material';
import type { Product, Categorie } from './ItemsList.type';

export function useItemsListController() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Categorie[]>([]);
    const [selectedCategorie, setSelectedCategorie] = useState<string>('');

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
        products,
        categories,
        selectedCategorie,
        handleCategoriaChange
    };
}