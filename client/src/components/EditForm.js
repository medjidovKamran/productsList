import React from 'react';
import {connect} from 'react-redux';
import API from "../utils/API";
import {Form, Input, InputNumber, Button} from 'antd';
import {setEditable, setIsOpen, setProducts} from "../store/actions/actions";
import {openNotificationWithIcon} from "../utils/openNotification";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const validateMessages = {
    required: '${label} is required!',
    description: {
        range: '${label} length should not be more ${max}',
    },
    image: {
        range: '${label} length should not be more ${max}',
    },
};

const EditForm = ({editableItem, setEditableItem, setProducts}) => {


    const onFinish = async (values) => {
        const {id} = editableItem;
        if (!!id) {
            const body = {id, ...values}
            await API.patch('/good', body);
        } else {
            await API.post('/good', values)
        }
        const fetched = await API.get('/goods');
        setProducts(fetched.data)
        setEditableItem({})
        openNotificationWithIcon('success')
    };

    return (
        <div>
            <Form
                initialValues={editableItem}
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{required: true}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true}, {max: 300}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image link"
                    initialValue={
                        "https://avatarko.ru/img/kartinka/16/zhivotnye_kot_ochki_15785.jpg" || editableItem.image
                    }
                    help=""
                    rules={[{required: true}, {max: 300}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="cost"
                    label="Cost"
                    rules={[{required: true}]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item wrapperCol={{...layout.wrapperCol}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        editableItem: state.editableItem,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setEditableItem: (item) => dispatch(setEditable(item)),
        setProducts: (products) => dispatch(setProducts(products)),
        setIsOpen: (value) => dispatch(setIsOpen(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);