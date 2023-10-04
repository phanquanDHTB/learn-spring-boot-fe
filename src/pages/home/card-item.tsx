import { IProduct } from "../type";
import DefaulImg from "../../asset/384562729_701459795367176_4846294321348764437_n.jpg";
import formatNum from "../../utils/formatNum";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const CardItem: React.FC<{ product: IProduct }> = ({ product }) => {
    const navigate = useNavigate();
    return (
        <div className="product-card" onClick={() => navigate("/product/" + product.id)}>
            <div>
                <img alt={product?.name} src={product?.thumbnail || DefaulImg} />
            </div>
            <div className="p-2 h-auto">
                <h2 className=" font-medium">{product?.name}</h2>
                <p className="mb-1">
                    <span className="text-red-400">Giá : </span>
                    <span>{product?.price ? formatNum(product.price) : 0} đ</span>
                </p>
                <Button icon={<ShoppingCartOutlined />}>Đặt hàng</Button>
            </div>
        </div>
    );
};
export default CardItem;
