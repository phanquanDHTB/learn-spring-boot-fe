import { IProduct } from "../type";
import DefaulImg from "../../asset/384562729_701459795367176_4846294321348764437_n.jpg";
import formatNum from "../../utils/formatNum";

const CardItem: React.FC<{ product: IProduct }> = ({ product }) => {
    return (
        <div className="product-card">
            <div>
                <img alt={product?.name} src={product?.thumbnail || DefaulImg} />
            </div>
            <div className="p-2 h-auto">
                <h2 className=" font-medium">{product?.name}</h2>
                <p>
                    <span className="text-red-400">Giá : </span>
                    <span>{product?.price ? formatNum(product.price) : 0} đ</span>
                </p>
            </div>
        </div>
    );
};
export default CardItem;
