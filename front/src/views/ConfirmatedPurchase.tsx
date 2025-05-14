import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export default function ConfirmatedPurchase() {

    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center h-full">
            <Paper elevation={8} className="m-20 p-5">
                <div className="p-3">
                    <p className="text-center underline text-3xl font-bold text-green-900">
                        Compra feita com sucesso!
                    </p>
                    <p className="p-3 text-xl">
                        Você receberá um email de confimação e atualização da entrega.
                    </p>
                    <div className="pt-10 place-self-end">
                        <Button variant="contained" onClick={() => navigate('/')} size="small">Voltar à tela inicial</Button>
                    </div>
                </div>
            </Paper>
        </div>
    )
}