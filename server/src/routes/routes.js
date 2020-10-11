const {Router} = require('express');
const router = Router();
const Goods = require('../models/Goods');

router.get('/goods', async (req, res) => {
    try {
        const allGoods = await Goods.findAll()
        res.status(200).send(allGoods)

    } catch (e) {
        console.log(e)
        res.status(501).send(e.message)
    }
});

router.post('/good', async (req, res) => {
    const {name, description, cost, image} = await req.body;
    console.log(req.body)

    try {
        const good = await Goods.create({
            name,
            description,
            cost,
            image
        })
        res.status(201).send({created: true, text: 'Successfully created!'})
    } catch (e) {
        console.log(e)
        res.status(501).send(e.message)
    }

});

router.patch('/good', async (req, res) => {
    const {id, name, description, cost, image} = await req.body;
    try {
        const good = await Goods.findOne({where: {id}});
        if (!good) {
            throw Error(`Not found with id: ${id}`);
        }

        good.name = name;
        good.description = description;
        good.cost = cost;
        good.image = image;
        await good.save();
        await res.status(200).send(good)
    } catch (e) {
        console.log(e)
        await res.status(501).send(e.message)
    }

});

router.delete('/good', async (req, res) => {
    const {id} = await req.query;
    console.log(req)
    try {
        const found = await Goods.destroy({
            where: {
                id
            },
        })
        res.status(200).send({created: true, text: 'Successfully deleted!'})

    } catch (e) {
        console.log(e)
        res.status(501).send(e.message)
    }
});

module.exports = router;