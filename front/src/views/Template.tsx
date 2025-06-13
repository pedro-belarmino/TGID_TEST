import { Outlet } from "react-router-dom";
import Appbar from "../components/shared/Appbar/Appbar";
import Footer from "../components/shared/Footer/Footer";


export default function Template() {
    return (
        <>
            <Appbar />
            <Outlet />
            <Footer />
        </>
    )
}