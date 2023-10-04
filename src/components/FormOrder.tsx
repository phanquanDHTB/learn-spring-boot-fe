import { Button, Modal } from "antd";
import { useState, forwardRef, useImperativeHandle } from "react";
import FormInput from "./FormInput";
import { FieldValues, useForm } from "react-hook-form";
import isVietnamesePhoneNumber from "../utils/isVNPhonenumber";
import { IProduct } from "../pages/type";
import { useUserStore } from "../store/userStore";
import FormInputNum from "./FormInputNum";
import formatNum from "../utils/formatNum";
import FormTextArea from "./FormTextArea";
import { call } from "../api/baseRequest";
import { toast } from "react-toastify";

const FormOrder = forwardRef((props: { productInfor: IProduct | undefined }, ref) => {
    const { productInfor } = props;
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { control, handleSubmit, watch, reset } = useForm();
    const { userInfor } = useUserStore();
    const submitForm = async (form: FieldValues) => {
        console.log(form);
        try {
            setLoadingOrder(true);
            await call(
                "order",
                "POST",
                Object.assign(form, {
                    userId: userInfor?.userId,
                    totalMoney: watch("number") * (productInfor?.price || 0),
                    listItem: [{ productId: productInfor?.id, numberOfProduct: watch("number") }],
                }),
                true
            );
            toast.success("Đặt hàng thành công");
            reset({});
            setIsOpen(false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingOrder(false);
        }
    };
    useImperativeHandle(ref, () => ({
        handleOpenModelOrder: () => setIsOpen(true),
    }));
    return (
        <Modal
            bodyStyle={{ padding: "30px" }}
            onCancel={() => setIsOpen(false)}
            onOk={() => setIsOpen(false)}
            open={isOpen}
            footer={() => <></>}
            width={"50vw"}
        >
            <div className="text-center font-medium text-2xl mb-5">Đặt hàng</div>
            <div className="flex justify-between">
                <div className="w-[45%]">
                    <FormInput
                        label={
                            <>
                                <span className="text-red-500">*</span>Số điện thoại
                            </>
                        }
                        inputProps={{ size: "large", placeholder: "Số điện thoại" }}
                        controllerProps={{
                            name: "phoneNumber",
                            control,
                            rules: {
                                validate: (v: string) => isVietnamesePhoneNumber(v) || "Số điện thoại không hợp lệ",
                            },
                        }}
                    />
                    <FormInput
                        label={
                            <>
                                <span className="text-red-500">*</span>Địa chỉ nhận hàng
                            </>
                        }
                        inputProps={{ size: "large", placeholder: "Địa chỉ nhận hàng" }}
                        controllerProps={{
                            name: "address",
                            control,
                            rules: { required: "Vui lòng nhập địa chỉ" },
                        }}
                    />
                    <FormInputNum
                        label={"Số lượng"}
                        controllerProps={{
                            control,
                            name: "number",
                            rules: { validate: (v: number) => v > 0 || "Số lượng sản phẩm phải lớn hơn 0" },
                        }}
                        inputProps={{
                            min: 0,
                        }}
                    />
                    <p>Tổng tiền : {formatNum(watch("number") * (productInfor?.price || 0))} đ</p>
                </div>
                <div className="w-[45%]">
                    <FormInput
                        label={<>Tên người nhận</>}
                        inputProps={{ size: "large", placeholder: "Tên người nhận" }}
                        controllerProps={{
                            name: "fullName",
                            control,
                        }}
                    />
                    <FormInput
                        label={<>Email</>}
                        inputProps={{ size: "large", placeholder: "Email" }}
                        controllerProps={{
                            name: "email",
                            control,
                        }}
                    />
                    <FormTextArea label={"Ghi chú"} controllerProps={{ control, name: "note" }} />
                </div>
            </div>
            <Button className="w-full h-[35px] mt-5" onClick={handleSubmit(submitForm)} loading={loadingOrder}>
                Đặt hàng
            </Button>
        </Modal>
    );
});

export default FormOrder;
