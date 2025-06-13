import { Modal, Box, Button } from "@mui/material";
import type { ConfirmationModalProps } from './ConfirmationModal.type'

export default function ConfirmationModal({
    open,
    onClose,
    onConfirm,
    title = "Confirmação",
    message = "Deseja prosseguir?",
}: ConfirmationModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="confirmation-modal-title"
            aria-describedby="confirmation-modal-description"
            className="place-self-center"
        >
            <Box sx={{ width: 400 }} className="bg-gray-300 w-96 h-60 p-8 rounded-2xl">
                <div className="flex justify-between">
                    <h2 id="confirmation-modal-title" className="font-semibold text-2xl">
                        {title}
                    </h2>
                    <button onClick={onClose} className="cursor-pointer">
                        <svg
                            className="h-5 w-5 text-slate-700"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                        </svg>
                    </button>
                </div>
                <p
                    id="confirmation-modal-description"
                    className="text-center font-semibold flex justify-center mt-5 text-xl"
                >
                    {message}
                </p>
                <div className="flex justify-around mt-10">
                    <Button onClick={onConfirm} variant="contained" color="info">
                        Sim
                    </Button>
                    <Button onClick={onClose} variant="contained" color="error">
                        Não
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}
