import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from '@mui/material/Button';
import { useAppbarController } from './Appbar.controller';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Appbar() {
    const {
        produtosCarrinho,
        qtdCarrinho,
        openModal,
        emptyCart,
        openStorageCart,
        handleLimparCarrinho,
        handleCloseModal,
        navigateToHome,
        navigateToCheckout
    } = useAppbarController();

    return (
        <>
            <Box className="w-full" sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <div className='flex space-x-2 cursor-pointer' onClick={navigateToHome}>
                            <svg className="h-6 w-6 text-white place-self-center" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="3" y1="21" x2="21" y2="21" />
                                <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                                <path d="M5 21v-10.15" />
                                <path d="M19 21v-10.15" />
                                <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                            </svg>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                Loja Online
                            </Typography>
                        </div>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>

                        <Box sx={{ flexGrow: 1 }} />

                        <IconButton size="large" aria-label="carrinho" onClick={openStorageCart} color="inherit">
                            <Badge badgeContent={qtdCarrinho} color="error">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='place-self-center'
            >
                <div className="bg-slate-200 w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl lg:min-w-[600px] 2xl:max-w-4xl mx-auto mt-10 rounded-xl p-5">
                    <div className='flex justify-between'>
                        <p className='text-xl font-semibold place-self-center'>Seu Carrinho</p>
                        <div className='p-2 cursor-pointer hover:bg-slate-300 rounded-xl' onClick={handleCloseModal}>
                            <CloseRoundedIcon />
                        </div>
                    </div>

                    {emptyCart && (
                        <div className='p-10 flex items-center place-self-center'>
                            <p className='text-gray-600 text-center text-xl'>Carrinho Vazio</p>
                            <svg className="h-5 w-5 text-gray-600 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    )}

                    {!emptyCart && (
                        <>
                            <div className="my-4 max-h-96 overflow-y-auto space-y-4">
                                {produtosCarrinho.map(produto => (
                                    <div key={produto.id} className="flex items-center m-2 place-self=-center space-x-4 bg-white p-3 rounded shadow">
                                        <img src={produto.image} alt={produto.nome} className="w-16 h-16 object-cover rounded" />
                                        <div className="flex flex-col">
                                            <p className="font-medium">{produto.nome}</p>
                                            <p className="text-sm text-gray-600">R$ {produto.preco.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex justify-between'>
                                <Button variant="outlined" onClick={handleLimparCarrinho}>Limpar Carrinho</Button>
                                <Button variant="contained" color="success" onClick={navigateToCheckout}>Confirmar Compra</Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
}