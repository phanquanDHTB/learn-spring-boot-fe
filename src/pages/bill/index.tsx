import { useState, useEffect, useRef } from "react";
import { ICommonResponse, call } from "../../api/baseRequest";
import { IUserLogin, useUserStore } from "../../store/userStore";
import MockImg from "../../asset/384562729_701459795367176_4846294321348764437_n.jpg";
import { formatDate } from "../../utils/formatDate";
import { Spin } from "antd";
import ModalOrderDetail from "./ModalOrderDetail";

const Bill = () => {
    const [listBill, setListBill] = useState<any>();
    const { userInfor } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const getListBillByUser = async () => {
        try {
            setIsLoading(true);
            const res = (await call(
                "order/findByUser/" + userInfor?.userId,
                "GET",
                {},
                true
            )) as ICommonResponse<IUserLogin>;
            setListBill(res.body.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getListBillByUser();
    }, [userInfor]);

    const detailOrderRef = useRef<{ handleOpenOrder: () => void }>();
    const [detailOrder, setDetailOrder] = useState<any>();
    console.log(detailOrder);
    return (
        <div className="px-[50px] min-h-[calc(100vh-125px)]">
            <strong className="text-[17px] block my-3">Danh sách đơn hàng đã đặt</strong>
            {listBill?.map((item: any) => (
                <div
                    className="flex items-center my-3 cursor-pointer hover:bg-white rounded-[5px] py-3"
                    onClick={() => {
                        detailOrderRef.current?.handleOpenOrder();
                        setDetailOrder(item);
                    }}
                >
                    <img alt="" src={MockImg} className=" h-[40px] object-contain" />
                    <p className="mx-3">{item.orderDetails.map((item: any) => item.product.name).join(" + ")}</p>
                    <p>Trạng thái : {item.status === "pending" && "chờ xác nhận"}</p>
                    <p className="mx-3">Ngày giao dự kiến : {formatDate(item.shippingDate)}</p>
                </div>
            ))}
            <ModalOrderDetail ref={detailOrderRef} detailOrder={detailOrder} />
            {isLoading && <Spin size="large" />}
        </div>
    );
};

export default Bill;
