import React from 'react';
import {Affix, Button} from "antd";
import {PlusCircleOutlined} from '@ant-design/icons';

const AddButton = ({setIsOpen}) => {
    return (
        <Affix style={{position: 'fixed', bottom: 50, right: 60}}>
            <Button
                icon={<PlusCircleOutlined/>}
                className="add-button"
                title="Add new product"
                type="danger"
                onClick={() => setIsOpen(true)}
            />
        </Affix>
    );
};

export default AddButton;