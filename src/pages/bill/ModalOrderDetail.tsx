import { Modal, Row } from "antd";
import { useState, forwardRef, useImperativeHandle } from "react";
import { formatDate } from "../../utils/formatDate";
import formatNum from "../../utils/formatNum";

const ModalOrderDetail = forwardRef((props: { detailOrder: any }, ref) => {
    const { detailOrder } = props;
    const [isOpen, setIsOpen] = useState(false);
    useImperativeHandle(ref, () => ({
        handleOpenOrder: () => setIsOpen(true),
    }));
    console.log(detailOrder, "xxx");
    return (
        <Modal
            footer={""}
            title={<strong className="text-[17px] font-bold">Chi tiết đơn hàng</strong>}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
        >
            <Row className="my-2">
                <strong className="mr-1">Tên đơn hàng :</strong>
                {detailOrder?.orderDetails
                    ?.map((item: any) => item?.product?.name + ` x ` + item?.numberOfProduct)
                    ?.join(" - ")}
            </Row>
            <Row className="my-2">
                <strong className="mr-1">Tên người đặt hàng :</strong>
                {detailOrder?.fullName || "--"}
            </Row>
            <Row className="my-2">
                <strong className="mr-1">Ngày đặt :</strong>
                {detailOrder?.shippingDate ? formatDate(detailOrder.shippingDate) : "--"}
            </Row>
            <Row className="my-2">
                <strong className="mr-1">Trạng thái :</strong>
                {detailOrder?.status}
            </Row>
            <Row className="my-2">
                <strong className="mr-1">Giá tiền :</strong>
                {detailOrder?.totalMoney ? formatNum(detailOrder.totalMoney) + "d" : "--"}
            </Row>
            <Row className="my-2">
                <strong className="mr-1">Ngày giao hàng :</strong>
                {detailOrder?.shippingDate ? formatDate(detailOrder.shippingDate) : "--"}
            </Row>
        </Modal>
    );
});

export default ModalOrderDetail;
