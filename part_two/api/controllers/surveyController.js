const { ObjectId } = require('mongodb');
const User = require('../models/User')
const Survey = require('../models/Survey');

module.exports.postNew = async (req, res) => {
    try {
        const details = {...req.body}
        User.findOne({_id: details.author}).exec(async (err, user) => {
            if (!user || err) throw new Error(err)

            const survey = createDoc({...req.body})

            // forming responses in function because async is being weird with .exec as far as I am aware
            await survey.save(err => {
                if(err) return res.status(500).send({error: err.message})
            })

            // creating relation in user surveys array
            user.surveys.push(survey)
    
            await user.save(err => {
                if(err) return res.status(500).send({error: err.message})
            })
            return res.status(200).send({success: `survey ${survey._id} created`})
        })
    } catch (error) {
        return res.status(500).send({error: err.message})
    }
}

module.exports.remove = async (_, res) => {
    Survey.findOneAndDelete({_id: _}, (err, survey) => {
        if (err) {
            console.log(err)
            return res.status(400).send({ error: err.message })
        } 
        return res.status(200).send({ success: `survey ${survey._id} has been deleted.` })
    })
}

module.exports.get = async (_, res) => {
    Survey.findById(_, (err, survey) => {
        if(err) return res.status(400).send({ error: err.message })
        return res.status(200).send({success: survey})
    })
}

module.exports.update = async (req, res, id) => {
    Survey.findByIdAndUpdate({_id: id}, {...req.body}, (err, survey) => {
        if(err) return res.status(400).send({ error: err.message })
        return res.status(200).send({success: survey})
    })
}

const createDoc = (details) => {
    return new Survey({
        title: details.title,
        questions: details.questions,
        author: details._id
    })
}