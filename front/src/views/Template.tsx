import { Outlet } from "react-router-dom";
import Appbar from "../components/shared/Appbar/Appbar";


export default function Template() {
    return (
        <>
            <Appbar />
            <Outlet />
        </>
    )
}