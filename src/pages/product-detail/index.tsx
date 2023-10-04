import { useEffect, useState, useRef } from "react";
import { ICommonResponse, call } from "../../api/baseRequest";
import { useLocation } from "react-router-dom";
import { IProduct } from "../type";
import MockImg from "../../asset/384562729_701459795367176_4846294321348764437_n.jpg";
import "./styles.scss";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import formatNum from "../../utils/formatNum";
import FormOrder from "../../components/FormOrder";
import LoginForm from "../../components/LoginForm";
import { useUserStore } from "../../store/userStore";

const ProductDetail = () => {
    const [productInfor, setProductInfor] = useState<IProduct>();
    const location = useLocation();
    const getProductInfor = async () => {
        try {
            const res = (await call("products/" + location.pathname.slice(9), "GET")) as ICommonResponse<IProduct>;
            setProductInfor(res.body.data);
            // console.log(res.body.data);
        } catch (err) {
            console.log(err);
        }
    };

    const orderRef = useRef<{ handleOpenModelOrder: () => void }>();
    const loginRef = useRef<{ handleOpenModalLogin: () => void }>();
    const { userInfor } = useUserStore();
    useEffect(() => {
        getProductInfor();
    }, []);
    return (
        <>
            <strong className="px-[50px] text-[17px] block my-3">Đặt hàng</strong>
            <div className="product-detail-wrap">
                <img alt={productInfor?.name || ""} src={MockImg} className=" w-[30vw] rounded-2xl" />
                <div className="ml-5">
                    <h2 className="my-2 font-medium">Danh mục : {productInfor?.category?.name || "--"}</h2>
                    <h2 className="my-2 font-medium">Tên sản phẩm : {productInfor?.name || "--"}</h2>
                    <div className="flex items-center">
                        <h2 className="my-2 font-medium mr-1">Mô tả :</h2>
                        <span>{productInfor?.description || "--"}</span>
                    </div>
                    <h2 className="my-2 font-medium">
                        Giá : {productInfor?.price ? formatNum(productInfor.price) + "đ" : "--"}
                    </h2>
                    <Button
                        icon={<ShoppingCartOutlined />}
                        onClick={() => {
                            userInfor
                                ? orderRef.current?.handleOpenModelOrder()
                                : loginRef.current?.handleOpenModalLogin();
                        }}
                    >
                        Đăt hàng
                    </Button>
                    <FormOrder ref={orderRef} productInfor={productInfor} />
                </div>
                <LoginForm ref={loginRef} />
            </div>
        </>
    );
};

export default ProductDetail;
