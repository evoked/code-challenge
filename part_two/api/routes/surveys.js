const express = require('express');
const survey = require('../controllers/surveyController')

const router = express.Router();

router.post('/new', async (req, res) => {
    try {
        await survey.postNew(req, res);
        return
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await survey.get(id, res);
        return
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.post('/:id/delete', async (req, res) => {
    try {
        const { id } = req.params
        await survey.remove(id, res);
        return
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.post('/:id/update', async (req, res) => {
    try {
        const { id } = req.params
        await survey.update(req, res, id)
        return
    } catch (err) {

    }
}) 

module.exports = router;
