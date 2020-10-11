import React from 'react';
import {connect} from 'react-redux';
import API from "../utils/API";
import {Form, Button, Typography} from 'antd';
import {setEditable, setIsOpen, setProducts} from "../store/actions/actions";
import {openNotificationWithIcon} from "../utils/openNotification";
import {reduxForm, Field} from "redux-form";
import NewInput from "./NewInput";

const {Paragraph} = Typography

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    } else if (!values.cost) {
        errors.cost = 'Required'
    } else if (!values.description) {
        errors.description = 'Required'
    } else if (!values.image) {
        errors.image = 'Required'
    } else if (values.name.length > 50) {
        errors.name = 'No more than 50 characters'
    } else if (values.description.length > 200) {
        errors.description = 'No more than 200 characters'
    } else if (!values.image.length > 200) {
        errors.image = 'No more than 200 characters'
    }

    return errors
}

let EditForm = ({
                    setProducts,
                    setIsOpen,
                    setEditable,
                    products,
                    handleSubmit,
                    error,
                }) => {

    const addNewProduct = async (values) => {
        const cost = parseFloat(values.cost)

        try {
            const isExist = products.find(item => item.name === values.name)
            if (isExist) {
                openNotificationWithIcon('warning', 'This name already exists!')
                return
            }
            await API.post('/good', {cost, ...values});

        } catch (e) {
            console.log(e)
        }
    }

    const editExistProduct = async (values) => {
        const cost = parseFloat(values.cost);
        try {
            await API.patch('/good', {id: values.id, ...values, cost})
        } catch (e) {
            console.log(e)
        }
    }

    const onFinish = async () => {
        const {data} = await API.get('/goods');
        setProducts(data)
        setIsOpen(false)
        setEditable({})
        openNotificationWithIcon('success')
    }

    const submit = async (values) => {

        if (values.id) {
            await editExistProduct({...values})
        } else {
            await addNewProduct({...values})
        }
        await onFinish()
    };

    return (
        <div>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={handleSubmit(submit)}
            >
                <Field
                    component={NewInput}
                    required
                    name="name"
                    label="Name"
                    error={error}
                />
                <Field
                    component={NewInput}
                    required
                    name="description"
                    label="Description"
                    error={error}
                />
                <Field
                    component={NewInput}
                    required
                    name="image"
                    label="Image link"
                    error={error}
                >
                    <Paragraph
                        copyable={{
                            text: "https://avatarko.ru/img/kartinka/16/zhivotnye_kot_ochki_15785.jpg"
                        }}
                    >
                        example url image
                    </Paragraph>
                </Field>
                <Field
                    component={NewInput}
                    required
                    name="cost"
                    label="Cost"
                    type="number"
                    error={error}
                />

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

const mapStateToProps = state => ({
    editableItem: state.storage.editableItem,
    products: state.storage.products,
    initialValues: state.storage.editableItem
});

const mapDispatchToProps = dispatch => ({
    setProducts: (products) => dispatch(setProducts(products)),
    setIsOpen: (value) => dispatch(setIsOpen(value)),
    setEditable: (value) => dispatch(setEditable(value)),
});

EditForm = reduxForm({
    form: 'modal',
    validate
})(EditForm)

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);