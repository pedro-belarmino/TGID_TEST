import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Produto } from './Appbar.type';

export function useAppbarController() {
    const [produtosCarrinho, setProdutosCarrinho] = useState<Produto[]>([]);
    const [qtdCarrinho, setQtdCarrinho] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [emptyCart, setEmptyCart] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Produto[]>([]);
    const [todosProdutos, setTodosProdutos] = useState<Produto[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Carrega todos os produtos uma vez só
        fetch('http://localhost:3000/produtos')
            .then(res => res.json())
            .then(data => setTodosProdutos(data))
            .catch(err => console.error("Erro ao buscar produtos:", err));
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchTerm.trim() === '') {
                setSearchResults([]);
            } else {
                const filtrados = todosProdutos.filter(produto =>
                    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setSearchResults(filtrados);
            }
        }, 300); // debounce

        return () => clearTimeout(timeout);
    }, [searchTerm, todosProdutos]);

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value);
    }

    function handleSelectProduct(id: string) {
        navigate(`/item?id=${id}`);
        setSearchTerm('');
        setSearchResults([]);
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

    return {
        produtosCarrinho,
        qtdCarrinho,
        openModal,
        emptyCart,
        openStorageCart,
        handleLimparCarrinho,
        handleCloseModal,
        navigateToHome,
        navigateToCheckout,
        searchTerm,
        searchResults,
        handleSearchChange,
        handleSelectProduct
    };
}
