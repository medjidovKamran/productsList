import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {setEditable, setIsLoading, setIsOpen, setProducts} from "./store/actions/actions";
import API from "./utils/API";

import Header from "./components/Header";
import CardItem from "./components/CardItem";
import ModalWindow from "./components/ModalWindow";
import AddButton from "./components/AddButton";

import {openNotificationWithIcon} from "./utils/openNotification";
import {Layout, Empty, Row, Spin} from "antd";
import './App.css'

const {Content} = Layout;

function App({
                 products,
                 isLoading,
                 setProducts,
                 setIsLoading,
                 setIsOpen,
                 setEditableItem
             }) {

    const removeHandler = async (card) => {
        try {
            await API.delete('/good/', {
                params: {id: card.id},
            })
            openNotificationWithIcon('success')

            const fetched = await API.get('/goods');

            setProducts(fetched.data)
        } catch (e) {
            console.log(e)
            openNotificationWithIcon('error')
        }

    }

    const editHandler = (card) => {
        setEditableItem(card)
        setIsOpen(true)
    }

    const getProducts = async () => {
        await setIsLoading(true)
        try {
            const fetched = await API.get('/goods');
            setProducts(fetched.data)
        } catch (e) {
            console.log(e)
            openNotificationWithIcon('error')
        }

        await setIsLoading(false)
    }

    useEffect(() => {

        getProducts()
        return () => {

        }
    }, [])

    return (
        <>
            <Header/>
            <Layout className="layout">
                <Content style={{padding: '0 50px'}}>
                    <div className="site-layout-content">
                        {isLoading && <Spin size="large"/>}
                        {(!isLoading && !products.length) && <Empty/>}
                        <Row gutter={[16, 16]}>
                            {products.reverse().map(item =>
                                <CardItem
                                    key={item.id}
                                    editHandler={editHandler}
                                    removeHandler={removeHandler}
                                    card={item}
                                />
                            )}
                        </Row>
                        {!isLoading && <AddButton setIsOpen={setIsOpen}/>}
                    </div>
                </Content>
                <ModalWindow/>
            </Layout>
        </>
    );
}

const mapStateToProps = state => ({
    products: state.storage.products,
    isLoading: state.storage.isLoading
})

const mapDispatchToProps = dispatch => ({
    setProducts: (products) => dispatch(setProducts(products)),
    setIsLoading: (value) => dispatch(setIsLoading(value)),
    setEditableItem: (item) => dispatch(setEditable(item)),
    setIsOpen: (value) => dispatch(setIsOpen(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
