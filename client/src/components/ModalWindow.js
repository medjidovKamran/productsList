import React from 'react';
import {connect} from 'react-redux';
import {Modal} from 'antd'
import EditForm from "./EditForm";
import {setEditable, setIsOpen} from "../store/actions/actions";

const ModalWindow = ({isOpen, setIsOpen, setIsEditable}) => {

    return (
        <Modal
            onCancel={async() => {
                await setIsOpen(false)
                await setIsEditable({})
            }}
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
        isOpen: state.storage.isOpen,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setIsOpen: (value) => dispatch(setIsOpen(value)),
        setIsEditable: (item) => dispatch(setEditable(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);