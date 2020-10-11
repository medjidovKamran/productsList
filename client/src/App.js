import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {setProducts} from "./store/actions/actions";
import {Layout, Empty, Row, Spin} from "antd";

import Header from "./components/Header";
import CardItem from "./components/CardItem";
import ModalWindow from "./components/ModalWindow";
import AddButton from "./components/AddButton";
import API from "./utils/API";
import {openNotificationWithIcon} from "./utils/openNotification";
import './App.css'

const {Content} = Layout;

function App({products, setProducts}) {
    const [isLoading, setIsLoading] = useState(false)

    const removeHandler = async (card) => {
        await API.delete('/good/', {
            params: {id: card.id},
        })
        openNotificationWithIcon('success')

        const fetched = await API.get('/goods');

        setProducts(fetched.data)
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
                            {products.map(item =>
                                <CardItem
                                    key={item.id}
                                    removeHandler={removeHandler}
                                    card={item}
                                />
                            )}
                        </Row>
                        {!isLoading && <AddButton/>}
                    </div>
                </Content>
                <ModalWindow/>
            </Layout>
        </>
    );
}

const mapStateToProps = state => {
    return {
        products: state.products,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProducts: (products) => dispatch(setProducts(products)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
