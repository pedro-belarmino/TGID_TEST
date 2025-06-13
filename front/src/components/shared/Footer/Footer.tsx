import { useNavigate } from "react-router-dom"

export default function Footer() {
    const navigate = useNavigate()
    return (
        <div className="w-full bg-gray-400 flex justify-center items-center h-20">
            <button onClick={() => navigate('/adicionar-item')} className="rounded-xl hover:bg-gray-600  hover:shadow-xl hover:text-white cursor-pointer transition-colors bg-gray-500 p-2">
                Criar Produto
            </button>
        </div>
    )
}