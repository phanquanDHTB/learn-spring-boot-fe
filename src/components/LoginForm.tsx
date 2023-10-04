import { Modal, Button } from "antd";
import { useImperativeHandle, useState, forwardRef } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import FormInput from "./FormInput";
import { useForm, FieldValues } from "react-hook-form";
import FormPassword from "./FormPass";
import isVietnamesePhoneNumber from "../utils/isVNPhonenumber";
import { ICommonResponse, call } from "../api/baseRequest";
import { toast } from "react-toastify";
import { IUserLogin, useUserStore } from "../store/userStore";

const LoginForm = forwardRef((props: any, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const { control, handleSubmit } = useForm();
    const { setUserInfor } = useUserStore();
    const submitForm = async (form: FieldValues) => {
        try {
            const res = (await call("user/login", "POST", form)) as ICommonResponse<IUserLogin>;
            if (res.body.data.token) localStorage.setItem("key", res.body.data?.token);
            setUserInfor(res.body.data);
            toast.success("Đăng nhập thành công!");
            setIsOpen(false);
        } catch {
            toast.error("Đăng nhập thất bại");
        }
    };
    useImperativeHandle(ref, () => ({
        handleOpenModalLogin: () => setIsOpen(true),
    }));

    return (
        <Modal
            bodyStyle={{ padding: "30px" }}
            onCancel={() => setIsOpen(false)}
            onOk={() => setIsOpen(false)}
            open={isOpen}
            footer={() => <></>}
        >
            <div className="text-center font-medium text-2xl mb-5">Đăng nhập</div>
            <FormInput
                inputProps={{ size: "large", prefix: <UserOutlined />, placeholder: "Tên tài khoản" }}
                controllerProps={{
                    name: "username",
                    control,
                    rules: { validate: (v: string) => isVietnamesePhoneNumber(v) || "Số điện thoại không hợp lệ" },
                }}
            />
            <FormPassword
                controllerProps={{ name: "password", control, rules: { required: "Vui lòng nhập mật khẩu" } }}
                inputProps={{ size: "large", prefix: <LockOutlined />, placeholder: "Mật khẩu" }}
            />
            <Button className="w-full h-[35px]" onClick={handleSubmit(submitForm)}>
                Đăng nhập
            </Button>
        </Modal>
    );
});

export default LoginForm;
