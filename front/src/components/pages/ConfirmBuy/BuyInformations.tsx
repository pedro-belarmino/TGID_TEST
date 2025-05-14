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
} from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface Product {
    id: string
    nome: string
    preco: number
    image: string
}

interface Informations {
    name: string
    telephone: string
    email: string
    address: string
}

export default function BuyInformation() {
    const theme = useTheme()
    const navigate = useNavigate()

    const [products, setProducts] = useState<Product[]>([])
    const [informations, setInformations] = useState<Informations>({
        name: "",
        telephone: "",
        email: "",
        address: ""
    })
    const [errors, setErrors] = useState<Partial<Informations>>({})
    const [validationSnackbar, setValidationSnackbar] = useState(false)

    const [modal, setModal] = useState(false)

    function handleCloseModal() { setModal(false) }

    function handleClose() { setValidationSnackbar(false) }

    const total = products.reduce((sum, p) => sum + p.preco, 0)

    useEffect(() => {
        const sotageCartIds: string[] = JSON.parse(localStorage.getItem("carrinho") || "[]")

        const fetchProducts = async () => {
            const response = await axios.get("http://localhost:3000/produtos")
            const selecionados = response.data.filter((p: Product) => sotageCartIds.includes(p.id))
            setProducts(selecionados)
        }
        fetchProducts()
    }, [])

    const handleChange = (field: keyof Informations, value: string) => {
        let processedValue = value

        switch (field) {
            case 'telephone':
                processedValue = value.replace(/\D/g, '')
                break
            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    setErrors({ ...errors, email: "Email inválido" })
                } else {
                    const newErrors = { ...errors }
                    delete newErrors.email
                    setErrors(newErrors)
                }
                break
            case 'name':
                if (value && value.length < 2) {
                    setErrors({ ...errors, name: "Nome muito curto" })
                } else {
                    const newErrors = { ...errors }
                    delete newErrors.name
                    setErrors(newErrors)
                }
                break
            case 'address':
                if (value && value.length < 5) {
                    setErrors({ ...errors, address: "Endereço muito curto" })
                } else {
                    const newErrors = { ...errors }
                    delete newErrors.address
                    setErrors(newErrors)
                }
                break
        }

        setInformations({
            ...informations,
            [field]: processedValue
        })
    }

    const handleFinalizarCompra = () => {
        const hasErrors = Object.keys(errors).length > 0
        const hasEmptyFields = Object.values(informations).some(v => !v.trim())

        if (hasErrors || hasEmptyFields) {
            setValidationSnackbar(true)
            return
        } else {
            setModal(true)
        }
    }

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
                    <div className="flex justify-center mt-10">
                        <button onClick={() => {
                            navigate('/compra-confirmada');
                            localStorage.removeItem('carrinho')
                        }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Sim
                        </button>

                        <button onClick={handleCloseModal} className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                        >
                            Não
                        </button>
                    </div>
                </Box>
            </Modal>


            <Snackbar open={validationSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    Preencha todos os campos com informações válidas.
                </Alert>
            </Snackbar>
        </>

    )
}