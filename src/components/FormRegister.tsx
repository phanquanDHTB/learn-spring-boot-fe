import { Modal } from "antd";
import { useState } from "react";

const FormRegister = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Modal
            bodyStyle={{ padding: "30px" }}
            onCancel={() => setIsOpen(false)}
            onOk={() => setIsOpen(false)}
            open={isOpen}
            footer={() => <></>}
        ></Modal>
    );
};

export default FormRegister;
