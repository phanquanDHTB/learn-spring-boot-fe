import { Layout, Row, Col, Button, Modal } from "antd";
import { useRef, useEffect, useState } from "react";
import { Footer, Header, Content } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import "./styles.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import LoginForm from "./LoginForm";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import { FieldValues, useForm } from "react-hook-form";
import isVietnamesePhoneNumber from "../utils/isVNPhonenumber";
import FormPassword from "./FormPass";
import { call } from "../api/baseRequest";
import { useUserStore } from "../store/userStore";

const MainLayout = () => {
    const navigate = useNavigate();
    const [isOpenRegister, setIsOpenRegister] = useState(false);
    const { control, handleSubmit } = useForm();
    const submitForm = async (form: FieldValues) => {
        form.role = 1;
        try {
            await call("user", "POST", form);
            toast.success("Đăng ký thành công, vui lòng đăng nhập lại");
            setIsOpenRegister(false);
        } catch {
            toast.error("Đăng ký thất bại");
        }
    };

    const loginRef = useRef<{ handleOpenModalLogin: () => void }>();
    const { userInfor, setUserInfor } = useUserStore();
    const token = localStorage.getItem("key");
    const getUserInfor = async () => {
        try {
            const res = (await call("user/getuser", "GET", {}, true)) as any;
            setUserInfor(res.body.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (token) {
            getUserInfor();
        }
    }, []);

    return (
        <>
            <Layout>
                <Header className="header-wrap">
                    <Row>
                        <Col
                            className="font-semibold text-secondary-color  cursor-pointer mr-5"
                            onClick={() => navigate("/")}
                        >
                            Trang chủ
                        </Col>
                        <Col
                            className="font-semibold text-secondary-color  cursor-pointer mr-5"
                            onClick={() => navigate("/bill")}
                        >
                            Đơn hàng
                        </Col>
                    </Row>
                    {userInfor === null ? (
                        <Row>
                            <Button
                                icon={<UserOutlined />}
                                className=" bg-secondary-color text-white"
                                onClick={() => loginRef.current?.handleOpenModalLogin()}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                className=" bg-secondary-color text-white"
                                onClick={() => {
                                    setIsOpenRegister(true);
                                }}
                            >
                                Đăng ký
                            </Button>
                        </Row>
                    ) : (
                        <Button
                            icon={<UserOutlined />}
                            className=" bg-secondary-color text-white"
                            onClick={() => {
                                localStorage.removeItem("key");
                                toast.success("Đã đăng xuất");
                                setUserInfor(null);
                            }}
                        >
                            Đăng xuất
                        </Button>
                    )}
                </Header>
                <Content className="content-wrap">
                    <Outlet />
                </Content>
                <Footer></Footer>
            </Layout>
            <LoginForm ref={loginRef} />
            <Modal
                bodyStyle={{ padding: "30px" }}
                onCancel={() => setIsOpenRegister(false)}
                onOk={() => setIsOpenRegister(false)}
                open={isOpenRegister}
                footer={() => <></>}
            >
                <div className="text-center font-medium text-2xl mb-5">Đăng ký</div>
                <FormInput
                    label={
                        <>
                            <span className="text-red-500">*</span> Số điện thoại
                        </>
                    }
                    inputProps={{ size: "large", placeholder: "Số điện thoại" }}
                    controllerProps={{
                        name: "phoneNumber",
                        control,
                        rules: { validate: (v: string) => isVietnamesePhoneNumber(v) || "Số điện thoại không hợp lệ" },
                    }}
                />
                <FormPassword
                    label={
                        <>
                            <span className="text-red-500">*</span> Mật khẩu
                        </>
                    }
                    controllerProps={{ name: "password", control, rules: { required: "Vui lòng nhập mật khẩu" } }}
                    inputProps={{ size: "large", prefix: <LockOutlined />, placeholder: "Mật khẩu" }}
                />

                {/* <FormInput
                    label={<>Họ tên</>}
                    inputProps={{ size: "large", placeholder: "Họ tên" }}
                    controllerProps={{
                        name: "fullName",
                        control,
                    }}
                /> */}
                <Button className="w-full h-[35px] mt-3" onClick={handleSubmit(submitForm)}>
                    Đăng ký
                </Button>
            </Modal>
        </>
    );
};

export default MainLayout;
