import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    useTheme,
    Snackbar,
    Alert,
    Modal
} from "@mui/material";
import { useBuyInformationController } from "./BuyInformation.controller";

export default function BuyInformation() {
    const theme = useTheme();

    const {
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
    } = useBuyInformationController();

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 4,
                    p: 4,
                    minHeight: "calc(100vh - 64px)",
                    boxSizing: "border-box"
                }}
            >
                <Box flex={1}>
                    <Typography variant="h5" gutterBottom>
                        Itens no Carrinho
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {products.map(produto => (
                            <Card key={produto.id} sx={{ display: "flex", alignItems: "center" }}>
                                <CardMedia
                                    component="img"
                                    image={produto.image}
                                    alt={produto.nome}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        objectFit: "contain",
                                        backgroundColor: theme.palette.background.default,
                                        p: 1,
                                    }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1" noWrap>
                                        {produto.nome}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        R$ {produto.preco.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6">
                        Total: R$ {total.toFixed(2)}
                    </Typography>
                </Box>

                <Box flex={1} display="flex" flexDirection="column" gap={2}>
                    <Typography variant="h5" gutterBottom>
                        Informações para Entrega
                    </Typography>

                    <TextField
                        label="Nome"
                        fullWidth
                        value={informations.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                    <TextField
                        label="Telefone"
                        fullWidth
                        value={informations.telephone}
                        onChange={(e) => handleChange('telephone', e.target.value)}
                        error={!!errors.telephone}
                        helperText={errors.telephone || "Apenas números"}
                        required
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={informations.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                    />
                    <TextField
                        label="Endereço"
                        fullWidth
                        multiline
                        minRows={2}
                        value={informations.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        error={!!errors.address}
                        helperText={errors.address}
                        required
                    />

                    <Box mt={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleFinalizarCompra}
                            disabled={Object.keys(errors).length > 0}
                        >
                            Finalizar Compra
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Modal
                open={modal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='place-self-center'
            >
                <Box sx={{ width: 400 }} className='bg-gray-300 w-96 h-60 p-8 rounded-2xl'>
                    <div className="flex justify-between">
                        <h2 id="parent-modal-title" className="font-semibold text-2xl">Confirmação</h2>
                        <button onClick={handleCloseModal} className="cursor-pointer">
                            <svg className="h-5 w-5 text-slate-700"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                            </svg>
                        </button>
                    </div>
                    <p id="parent-modal-description" className="text-center font-semibold flex justify-center mt-5 text-xl">
                        Deseja Prosseguir?
                    </p>
                    <div className=" flex justify-around mt-10">
                        <div>
                            <Button onClick={handleConfirmPurchase} variant="contained" color="info">Sim</Button>
                        </div>
                        <div>
                            <Button onClick={handleCloseModal} variant="contained" color="error">Não</Button>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Snackbar open={validationSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    Preencha todos os campos com informações válidas.
                </Alert>
            </Snackbar>
        </>
    );
}