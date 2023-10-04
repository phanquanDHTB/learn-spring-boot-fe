import { ColProps, Form, Input } from "antd";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { TextAreaProps } from "antd/es/input";

type FormInputProps = {
    controllerProps: UseControllerProps<FieldValues, any>;
    label?: string | React.ReactElement;
    labelCol?: ColProps | undefined;
    inputProps?: TextAreaProps;
    isRequireForm?: boolean;
};

const FormTextArea = ({
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
            <Input.TextArea onChange={onChange} onBlur={onBlur} value={value} {...inputProps} autoComplete="off" />
        </Form.Item>
    );
};

export default FormTextArea;
