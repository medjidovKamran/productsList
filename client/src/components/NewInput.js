import React from 'react';
import {Input, InputNumber} from "antd";
import {Form, Typography} from "antd";

const {Text} = Typography;

const NewInput = ({
                      label,
                      labelCol,
                      wrapperCol,
                      help,
                      extra,
                      validateStatus,
                      hasFeedback = true,
                      colon,
                      rules,
                      initialValue,
                      type,
                      name,
                      meta: {touched, error},
                      required,
                      ...rest
                  }) => {
    return (
        <Form.Item
            label={label}
            wrapperCol={wrapperCol}
            labelCol={labelCol}
            required={required}
            help={help}
            hasFeedback={hasFeedback}
            extra={extra}
            validateStatus={validateStatus}
            colon={colon}
            rules={rules}
            initialValue={initialValue}
        >
            {type === 'number'
                ? <InputNumber {...rest.input} />
                : <Input {...rest.input} />}
            {touched && error && <Text type="danger">{error}</Text>}
        </Form.Item>);
};

export default NewInput;