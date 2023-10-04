import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./pages/product-detail";
import Bill from "./pages/bill";

function App() {
    return (
        <>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/bill" element={<Bill />} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
