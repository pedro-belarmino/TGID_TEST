import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Produto } from "./ItemVisualization.type";


export function useItemVisualizationController() {
    const [produto, setProduto] = useState<Produto | null>(null);
    const [loading, setLoading] = useState(true);
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getProduto = async (id: string) => {
            try {
                const response = await axios.get<Produto>(`http://localhost:3000/produtos/${id}`);
                setProduto(response.data);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            } finally {
                setLoading(false);
            }
        };

        const getUrl = window.location.href;
        const getId = new URL(getUrl);
        const idParam = getId.searchParams.get("id");
        if (idParam) {
            getProduto(idParam);
        } else {
            setLoading(false);
        }
    }, []);

    const toStorageCart = () => {
        const carrinhoLocal = localStorage.getItem("carrinho");
        const carrinhoAtual: string[] = carrinhoLocal ? JSON.parse(carrinhoLocal) : [];

        if (produto && !carrinhoAtual.includes(produto.id)) {
            const novoCarrinho = [...carrinhoAtual, produto.id];
            localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
        }
        setSuccessSnackbar(true);
        window.dispatchEvent(new Event("storage"));
    };

    const handleCloseSnackbar = () => setSuccessSnackbar(false);
    const handleGoBack = () => navigate(-1);

    return {
        produto,
        loading,
        successSnackbar,
        toStorageCart,
        handleCloseSnackbar,
        handleGoBack
    };
}