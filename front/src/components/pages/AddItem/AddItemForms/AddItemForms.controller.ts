import axios from "axios";
import { useState } from "react";
import type { ProductType, ProductValidationType } from "./AddItemForms.type";

const CATEGORIE_URL = 'http://localhost:3000/categorias'
const PRODUCTS_URL = 'http://localhost:3000/produtos'

const defaultErrorMesage = 'Tivemos um erro com sua solicitação, contate o suporte ou tente novamente mais tarde.'

const initialProducts: ProductType = {
    nome: '',
    descricao: '',
    categoria: '',
    image: '',
    preco: '',
}

export function AddItemFormsController() {

    const [categoryName, setCategoryName] = useState('')
    const [product, setProduct] = useState<ProductType>(initialProducts)

    const [successSnackbar, setSuccessSnackbar] = useState(false)
    const [successSnackbarMessage, setSuccessSnackbarMessage] = useState('')
    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('')

    const [isCategory, setIsCategory] = useState(false)
    const [isProduct, setIsProduct] = useState(false)
    const [categoryValidateError, setCategoryValidadeError] = useState(false)

    const [validationResult, setValidationResult] = useState<ProductValidationType>({
        nome: false,
        descricao: false,
        categoria: false,
        image: false,
        preco: false,
    })


    const [modal, setModal] = useState(false)

    function handleCategoryChange(e: any) { setCategoryName(e.target.value); setCategoryValidadeError(false) }

    function handleProductChange(e: any) {
        const { name, value } = e.target
        let newValue = value

        setProduct((prevState) => ({
            ...prevState,
            [name]: newValue
        }))


    }



    function handleCloseModal() { setModal(false) }
    function handleCloseSnackbar() { setSuccessSnackbar(false); setErrorSnackbar(false) }

    async function getCategories(): Promise<number> {
        try {
            const response = await axios.get(CATEGORIE_URL);
            const numberOfCategories = response.data.length;
            console.log(numberOfCategories);
            return numberOfCategories;
        } catch (error) {
            console.log('erro buscar quantidade de objetos');
            return 9999;

        }
    }

    async function getProducts(): Promise<number> {
        try {
            const response = await axios.get(PRODUCTS_URL)
            let numberOfProducts = response.data.length
            return numberOfProducts
        } catch (error) {
            console.log('erro buscar quantidade de produtos')
            return 9999;
        }
    }

    async function sendProduct() {
        let productId = await getProducts()
        if (productId === 9999) {
            setErrorSnackbarMessage(defaultErrorMesage)
            setErrorSnackbar(true)
            return
        }
        try {
            await axios.post(PRODUCTS_URL,
                {
                    nome: product?.nome,
                    preco: Number(product?.preco),
                    image: product?.image,
                    descricao: product?.descricao,
                    categoria: product?.categoria,
                    id: productId + 1,
                }
            )
            setProduct(initialProducts)
            setSuccessSnackbarMessage('Produto criado com sucesso!')
            setSuccessSnackbar(true)
            setModal(false)
        } catch (error) {
            setErrorSnackbarMessage(defaultErrorMesage)
            setErrorSnackbar(true)
        }
    }

    async function sendCategory() {
        let categoryId = await getCategories()
        if (categoryId === 9999) {
            setErrorSnackbarMessage(defaultErrorMesage)
            setErrorSnackbar(true)
            return
        }
        try {
            await axios.post(CATEGORIE_URL,
                {
                    nome: categoryName,
                    id: categoryId + 1
                }
            )
            setCategoryName('')
            setSuccessSnackbarMessage('Categoria criada com sucesso!')
            setSuccessSnackbar(true)
            setModal(false)
        } catch (error) {
            setErrorSnackbarMessage(defaultErrorMesage)
            setErrorSnackbar(true)
        }
    }

    function validateCategory() {
        if (!categoryName) {
            setCategoryValidadeError(true)
            setErrorSnackbarMessage("Insira o nome da Categoria!")
            setErrorSnackbar(true)
            setModal(false)
            return false
        } else {
            setCategoryValidadeError(false)
            return true
        }
    }

    function validateProduct() {
        const newValidation: ProductValidationType = {
            nome: !product.nome.trim(),
            descricao: !product.descricao.trim(),
            categoria: !product.categoria.trim(),
            image: !product.image.trim(),
            preco: !product.preco || isNaN(Number(product.preco)) || Number(product.preco) <= 0,
        }

        const hasErrors = Object.values(newValidation).some((v) => v === true)

        if (hasErrors) {
            setErrorSnackbarMessage("Preencha todos os campos obrigatórios corretamente.")
            setErrorSnackbar(true)
            setModal(false)
        }

        setValidationResult(newValidation)
        return !hasErrors
    }




    function manage() {
        if (isCategory && !isProduct) {
            let ok = validateCategory()
            if (ok) {
                sendCategory()
            }
        } else if (isProduct && !isCategory) {
            const isValid = validateProduct()
            if (isValid) {
                sendProduct()
            }
        } else {
            setErrorSnackbarMessage(defaultErrorMesage)
            setErrorSnackbar(true)
        }
    }


    return {
        successSnackbar,
        successSnackbarMessage,
        errorSnackbar,
        errorSnackbarMessage,
        categoryName,
        modal,
        product,
        categoryValidateError,
        validationResult,
        setIsProduct,
        setIsCategory,
        manage,
        handleProductChange,
        handleCloseSnackbar,
        handleCloseModal,
        setModal,
        sendCategory,
        handleCategoryChange,
        sendProduct,
    }
}