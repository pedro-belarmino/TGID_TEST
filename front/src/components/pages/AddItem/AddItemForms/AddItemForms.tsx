import { Alert, Button, Paper, Snackbar, TextField } from "@mui/material";
import ConfirmationModal from "../../../shared/ConfirmationModal/ConfirmationModal";
import { AddItemFormsController } from "./AddItemForms.controller";

export default function AddItemForms() {
    const { setModal, errorSnackbarMessage, categoryName, handleCategoryChange, successSnackbarMessage, errorSnackbar, successSnackbar, modal, handleCloseModal, sendCategory, handleCloseSnackbar } = AddItemFormsController()

    return (<>
        <div className="w-full flex justify-center items-center h-screen">

            <Paper className="p-10 w-11/12">
                <p className="text-3xl font-bold text-center">Painel do Criador:</p>
                <hr className="text-gray-400" />
                <Paper className="flex justify-around p-5">
                    <Paper className="w-5/12">produto</Paper>
                    <Paper className="w-5/12">
                        <p className="text-xl p-2 font-semibold text-center text-gray-800">Adicione uma Categoria:</p>
                        <hr className="text-gray-400 ml-5 mr-5" />
                        <Paper className="p-8 flex flex-col space-y-4">
                            <div>
                                <TextField label="Nome da Categoria" value={categoryName} onChange={handleCategoryChange} className="w-full" />
                            </div>
                            <div>
                                <Button variant="contained" className="flex" onClick={() => setModal(true)}>Salvar</Button>
                            </div>
                        </Paper>

                    </Paper>
                </Paper>
            </Paper>
        </div>
        <ConfirmationModal onConfirm={sendCategory} open={modal} onClose={handleCloseModal} />
        <Snackbar open={successSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
            <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                variant="standard"
                sx={{ width: '100%' }}
            >
                {successSnackbarMessage}
            </Alert>
        </Snackbar>
        <Snackbar open={errorSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
            <Alert
                onClose={handleCloseSnackbar}
                severity="error"
                variant="standard"
                sx={{ width: '100%' }}
            >
                {errorSnackbarMessage}
            </Alert>
        </Snackbar>
    </>

    )
}