import axios from "axios";
import { useEffect, useState } from "react";

const CATEGORIE_URL = 'http://localhost:3000/categorias'
export function AddItemFormsController() {
    const [categoryName, setCategoryName] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [successSnackbar, setSuccessSnackbar] = useState(false)
    const [successSnackbarMessage, setSuccessSnackbarMessage] = useState('')
    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('')
    const [modal, setModal] = useState(false)

    function handleCategoryChange(e: any) { setCategoryName(e.target.value) }
    function handleCloseModal() { setModal(false) }
    function handleCloseSnackbar() { setSuccessSnackbar(false); setErrorSnackbar(false) }

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await axios.get(CATEGORIE_URL)
                let numberOfCategories = response.data.length
                setCategoryId(numberOfCategories)
                console.log(numberOfCategories)
            } catch (error) {
                console.log('erro buscar quantidade de objetos')
            }
        }
        getCategories()
    }, [])


    async function sendCategory() {
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
            setErrorSnackbarMessage('Tivemos um erro com sua solicitação, contate o suporte ou tente novamente mais tarde.')
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
        handleCloseSnackbar,
        handleCloseModal,
        setModal,
        sendCategory,
        handleCategoryChange,
    }
}