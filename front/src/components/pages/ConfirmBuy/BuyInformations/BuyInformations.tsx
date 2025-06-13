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
} from "@mui/material";
import { useBuyInformationController } from "./BuyInformation.controller";
import ConfirmationModal from "../../../shared/ConfirmationModal/ConfirmationModal";

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

            <ConfirmationModal open={modal} onClose={handleCloseModal} onConfirm={handleConfirmPurchase} />

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