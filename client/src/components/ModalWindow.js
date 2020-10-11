import React from 'react';
import {connect} from 'react-redux';
import {Modal} from 'antd'
import EditForm from "./EditForm";
import {setIsOpen} from "../store/actions/actions";

const ModalWindow = ({isOpen, setIsOpen}) => {

    return (
        <Modal
            onCancel={() => setIsOpen(false)}
            title="Basic Modal"
            visible={isOpen}
            footer={null}
        >
            <EditForm/>
        </Modal>
    );
};
const mapStateToProps = state => {
    return {
        isOpen: state.isOpen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setIsOpen: (value) => dispatch(setIsOpen(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);