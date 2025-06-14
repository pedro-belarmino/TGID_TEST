import { Alert, Button, Paper, Snackbar, TextField } from "@mui/material";
import ConfirmationModal from "../../../shared/ConfirmationModal/ConfirmationModal";
import { AddItemFormsController } from "./AddItemForms.controller";
import { useNavigate } from "react-router-dom";

export default function AddItemForms() {
    const {
        errorSnackbarMessage,
        categoryName,
        successSnackbarMessage,
        errorSnackbar,
        successSnackbar,
        modal,
        product,
        categoryValidateError,
        validationResult,
        setIsCategory,
        setIsProduct,
        manage,
        handleProductChange,
        handleCategoryChange,
        setModal,
        handleCloseModal,
        handleCloseSnackbar
    } = AddItemFormsController()

    const navigate = useNavigate()

    return (<>
        <div className="w-full flex flex-col justify-center items-center min-h-screen p-4">
            <Paper className="p-6 w-full max-w-7xl">
                <p className="text-3xl font-bold text-center mb-4">Painel do Criador:</p>
                <hr className="text-gray-400 mb-4" />

                <Paper className="flex flex-col lg:flex-row justify-around p-5 space-y-6 lg:space-y-0 lg:space-x-6">
                    {/* Formulário de Produto */}
                    <Paper className="w-full lg:w-1/2">
                        <p className="text-xl p-2 font-semibold text-center text-gray-800">Adicione um Produto:</p>
                        <hr className="text-gray-400 ml-5 mr-5 mb-4" />
                        <Paper className="p-6 flex flex-col space-y-4">
                            <div>

                                <TextField
                                    label="Nome do Produto"
                                    name="nome"
                                    value={product.nome}
                                    error={validationResult.nome}
                                    onChange={handleProductChange}
                                    className="w-full"
                                />
                            </div>
                            <div>

                                <TextField
                                    label="Descrição do Produto"
                                    name="descricao"
                                    value={product.descricao}
                                    error={validationResult.descricao}
                                    onChange={handleProductChange}
                                    className="w-full"
                                />
                            </div>
                            <div>

                                <TextField
                                    label="Preço do Produto"
                                    type="number"
                                    name="preco"
                                    value={product.preco}
                                    error={validationResult.preco}
                                    onChange={handleProductChange}
                                    className="w-full"
                                />
                            </div>
                            <div>

                                <TextField
                                    label="Categoria"
                                    type="number"
                                    name="categoria"
                                    value={product.categoria}
                                    error={validationResult.categoria}
                                    onChange={handleProductChange}
                                    className="w-full"
                                />
                            </div>
                            <div>

                                <TextField
                                    label="Link da Imagem do Produto"
                                    name="image"
                                    value={product.image}
                                    error={validationResult.image}
                                    onChange={handleProductChange}
                                    className="w-full"
                                />
                            </div>
                            <Button
                                variant="contained"
                                className="w-full"
                                onClick={() => { setModal(true); setIsProduct(true); setIsCategory(false) }}
                            >
                                Salvar Produto
                            </Button>
                        </Paper>
                    </Paper>

                    {/* Formulário de Categoria */}
                    <Paper className="w-full lg:w-1/2 flex flex-col justify-between">
                        <div>
                            <p className="text-xl p-2 font-semibold text-center text-gray-800">Adicione uma Categoria:</p>
                            <hr className="text-gray-400 ml-5 mr-5 mb-4" />
                            <Paper className="p-6 flex flex-col space-y-4">
                                <div>

                                    <TextField
                                        label="Nome da Categoria"
                                        error={categoryValidateError}
                                        helperText={categoryValidateError ? "Campo Obrigatório" : ""}
                                        value={categoryName}
                                        onChange={handleCategoryChange}
                                        className="w-full"
                                    />
                                </div>
                                <Button
                                    variant="contained"
                                    className="w-full"
                                    onClick={() => { setModal(true); setIsProduct(false); setIsCategory(true) }}
                                >
                                    Salvar Categoria
                                </Button>
                            </Paper>
                        </div>

                        <div className="mt-4 lg:mt-auto p-4">
                            <Button
                                variant="outlined"
                                fullWidth
                                className="shadow-xl"
                                onClick={() => navigate('/')}
                            >
                                Voltar à Navegação
                            </Button>
                        </div>
                    </Paper>
                </Paper>
            </Paper>
        </div>

        {/* Modal e Snackbars */}
        <ConfirmationModal onConfirm={manage} open={modal} onClose={handleCloseModal} />
        <Snackbar open={successSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>
                {successSnackbarMessage}
            </Alert>
        </Snackbar>
        <Snackbar open={errorSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error" variant="filled" sx={{ width: '100%' }}>
                {errorSnackbarMessage}
            </Alert>
        </Snackbar>
    </>)
}
