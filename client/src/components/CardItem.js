import React from 'react';
import {connect} from "react-redux";
import {setEditable, setIsOpen} from "../store/actions/actions";
import {Tag, Card, Col} from 'antd';
import {EditOutlined, DeleteOutlined, DollarCircleOutlined} from '@ant-design/icons';

const {Meta} = Card;

const CardItem = ({card, removeHandler, setEditableItem, setIsOpen}) => {

    const layout = {
        lg: 8,
        md: 8,
        xs: 24
    }
    return (
        <Col {...layout}>
            <Card
                hoverable
                cover={
                    <>
                        <img
                            alt={card.name}
                            src={card.image}
                        />
                        <Tag color="success" style={{fontSize: '18px'}}>
                            {card.cost} <DollarCircleOutlined/>
                        </Tag>
                    </>
                }
                actions={[
                    <EditOutlined onClick={() => {
                        setEditableItem(card)
                        setIsOpen(true)
                    }} key="edit"/>,
                    <DeleteOutlined onClick={() => removeHandler(card)} key="delete"/>
                ]}
            >
                <Meta
                    className="meta-info"
                    title={card.name}
                    description={card.description}
                >
                </Meta>
            </Card>
        </Col>

    );
};

const mapDispatchToProps = dispatch => {
    return {
        setEditableItem: (item) => dispatch(setEditable(item)),
        setIsOpen: (value) => dispatch(setIsOpen(value))
    }
}

export default connect(null, mapDispatchToProps)(CardItem);