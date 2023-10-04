import { ColProps, Form, InputNumber, InputNumberProps } from "antd";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type FormInputProps = {
    controllerProps: UseControllerProps<FieldValues, any>;
    label?: string | React.ReactElement;
    labelCol?: ColProps | undefined;
    inputProps?: InputNumberProps;
    isRequireForm?: boolean;
};

const FormInputNum = ({
    controllerProps,
    label,
    labelCol = { span: 24 },
    inputProps,
    isRequireForm = false,
}: FormInputProps) => {
    const { field, fieldState } = useController(controllerProps);

    const { error } = fieldState;

    const { onBlur, onChange, value } = field;

    return (
        <Form.Item
            labelCol={labelCol}
            label={label}
            validateStatus={error && "error"}
            help={error && error?.message}
            rules={[{ required: isRequireForm }]}
        >
            <InputNumber onChange={onChange} onBlur={onBlur} value={value} {...inputProps} size="large" />
        </Form.Item>
    );
};

export default FormInputNum;
