import { Layout, Row, Col, Button } from "antd";
import { Footer, Header, Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import "./styles.scss";
import { UserOutlined } from "@ant-design/icons";
const MainLayout = () => {
    return (
        <>
            <Layout>
                <Header className="header-wrap">
                    <Row>
                        <Col className="font-semibold text-secondary-color text-2xl">ShopApp</Col>
                    </Row>
                    <Row>
                        <Button icon={<UserOutlined />} className=" bg-secondary-color text-white">
                            Đăng nhập
                        </Button>
                    </Row>
                </Header>
                <Content className="content-wrap">
                    <Outlet />
                </Content>
                <Footer></Footer>
            </Layout>
        </>
    );
};

export default MainLayout;
