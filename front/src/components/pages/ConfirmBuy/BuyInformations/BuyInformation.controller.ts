import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Product, Informations } from "./BuyInformations.type";

export function useBuyInformationController() {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [informations, setInformations] = useState<Informations>({
        name: "",
        telephone: "",
        email: "",
        address: ""
    });
    const [errors, setErrors] = useState<Partial<Informations>>({});
    const [validationSnackbar, setValidationSnackbar] = useState(false);
    const [modal, setModal] = useState(false);

    const total = products.reduce((sum, p) => sum + p.preco, 0);

    useEffect(() => {
        const sotageCartIds: string[] = JSON.parse(localStorage.getItem("carrinho") || "[]");

        const fetchProducts = async () => {
            const response = await axios.get("http://localhost:3000/produtos");
            const selecionados = response.data.filter((p: Product) => sotageCartIds.includes(p.id));
            setProducts(selecionados);
        };
        fetchProducts();
    }, []);

    const handleChange = (field: keyof Informations, value: string) => {
        let processedValue = value;

        switch (field) {
            case 'telephone':
                processedValue = value.replace(/\D/g, '');
                break;
            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    setErrors({ ...errors, email: "Email inválido" });
                } else {
                    const newErrors = { ...errors };
                    delete newErrors.email;
                    setErrors(newErrors);
                }
                break;
            case 'name':
                if (value && value.length < 2) {
                    setErrors({ ...errors, name: "Nome muito curto" });
                } else {
                    const newErrors = { ...errors };
                    delete newErrors.name;
                    setErrors(newErrors);
                }
                break;
            case 'address':
                if (value && value.length < 5) {
                    setErrors({ ...errors, address: "Endereço muito curto" });
                } else {
                    const newErrors = { ...errors };
                    delete newErrors.address;
                    setErrors(newErrors);
                }
                break;
        }

        setInformations({
            ...informations,
            [field]: processedValue
        });
    };

    const handleFinalizarCompra = () => {
        const hasErrors = Object.keys(errors).length > 0;
        const hasEmptyFields = Object.values(informations).some(v => !v.trim());

        if (hasErrors || hasEmptyFields) {
            setValidationSnackbar(true);
            return;
        } else {
            setModal(true);
        }
    };

    const handleCloseModal = () => { setModal(false); }
    const handleCloseSnackbar = () => { setValidationSnackbar(false); }
    const handleConfirmPurchase = () => { navigate('/compra-confirmada'); localStorage.removeItem('carrinho'); };

    return {
        products,
        informations,
        errors,
        validationSnackbar,
        modal,
        total,

        handleChange,
        handleFinalizarCompra,
        handleCloseModal,
        handleCloseSnackbar,
        handleConfirmPurchase
    };
}