import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Produto } from './Appbar.type';

export function useAppbarController() {
    const [produtosCarrinho, setProdutosCarrinho] = useState<Produto[]>([]);
    const [qtdCarrinho, setQtdCarrinho] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [emptyCart, setEmptyCart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const atualizarCarrinhoDoStorage = () => {
            const carrinhoLocal = localStorage.getItem("carrinho");
            const carrinhoAtual: string[] = carrinhoLocal ? JSON.parse(carrinhoLocal) : [];
            setQtdCarrinho(carrinhoAtual.length);
        };

        atualizarCarrinhoDoStorage();
        window.addEventListener("storage", atualizarCarrinhoDoStorage);

        return () => {
            window.removeEventListener("storage", atualizarCarrinhoDoStorage);
        };
    }, []);

    async function fetchStorageCart() {
        const carrinhoLocal = localStorage.getItem("carrinho");
        const carrinhoAtual: string[] = carrinhoLocal ? JSON.parse(carrinhoLocal) : [];

        if (carrinhoAtual.length === 0) {
            setEmptyCart(true);
            setProdutosCarrinho([]);
            return;
        }

        setEmptyCart(false);

        try {
            const responses = await Promise.all(
                carrinhoAtual.map(id =>
                    fetch(`http://localhost:3000/produtos/${id}`).then(res => res.json())
                ));
            setProdutosCarrinho(responses);
        } catch (error) {
            console.error("Erro ao buscar produtos do carrinho", error);
        }
    }

    function openStorageCart() {
        const getUrl = window.location.pathname;
        if (getUrl === "/compra") return;

        setOpenModal(true);
        fetchStorageCart();
    }

    function handleLimparCarrinho() {
        localStorage.removeItem('carrinho');
        setQtdCarrinho(0);
        setProdutosCarrinho([]);
        setEmptyCart(true);
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    function navigateToHome() {
        navigate('/');
    }

    function navigateToCheckout() {
        navigate('/compra');
    }

    return {
        produtosCarrinho,
        qtdCarrinho,
        openModal,
        emptyCart,
        openStorageCart,
        handleLimparCarrinho,
        handleCloseModal,
        navigateToHome,
        navigateToCheckout
    };
}