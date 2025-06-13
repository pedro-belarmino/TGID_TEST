import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    Button,
    useTheme,
    Snackbar,
    Alert
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useItemVisualizationController } from "./ItemVisualization.controller";

export default function ItemVisualization() {
    const theme = useTheme();
    const {
        produto,
        loading,
        successSnackbar,
        toStorageCart,
        handleCloseSnackbar,
        handleGoBack
    } = useItemVisualizationController();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!produto) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography variant="h6" color="text.secondary">
                    Produto não encontrado.
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Box
                sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "calc(100vh - 64px)",
                    width: "100%",
                    boxSizing: "border-box",
                    gap: 2,
                }}
            >
                {/* Botão de voltar */}
                <Box width="100%" maxWidth={1000} display="flex" justifyContent="flex-start">
                    <Button
                        onClick={handleGoBack}
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        sx={{ mb: 1 }}
                    >
                        Voltar
                    </Button>
                </Box>

                {/* Cartão principal */}
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 1000,
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: 3,
                        borderRadius: 3,
                        overflow: "hidden",
                    }}
                >
                    {/* Imagem */}
                    <CardMedia
                        component="img"
                        image={produto.image || "https://via.placeholder.com/600x400.png?text=Imagem+do+Produto"}
                        alt={produto.nome}
                        sx={{
                            width: { xs: "100%", md: "50%" },
                            height: { xs: 250, md: "auto" },
                            objectFit: "contain",
                            backgroundColor: theme.palette.background.default,
                            p: 2,
                        }}
                    />

                    {/* Conteúdo */}
                    <CardContent
                        sx={{
                            width: { xs: "100%", md: "50%" },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                {produto.nome}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                {produto.descricao}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                R$ {produto.preco.toFixed(2)}
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ShoppingCartIcon />}
                            sx={{ alignSelf: "flex-start", mt: { xs: 1, md: 0 } }}
                            onClick={toStorageCart}
                        >
                            Adicionar ao carrinho
                        </Button>
                    </CardContent>
                </Card>
            </Box>
            <Snackbar open={successSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Item Adicionado ao Carrinho!
                </Alert>
            </Snackbar>
        </>
    );
}