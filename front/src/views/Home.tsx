import ItemsList from "../components/pages/Home/ItemsList/ItemsList";


export default function Home() {
    return (
        <>
            <div className="flex flex-col items-center min-h-screen w-full bg-gray-100 p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow">
                    Bem-vindo à nossa loja!
                </h1>
                <p className="text-lg text-gray-600 text-center max-w-md mb-12">
                    Explore nossos produtos de tecnologia e encontre exatamente o que você precisa.
                </p>

                <ItemsList />
            </div>
        </>
    );
}
