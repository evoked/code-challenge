const mongoose = require('mongoose');

const { Schema } = mongoose;

const SurveySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, 'must specify a title for survey'],
        maxlength: [50, 'survey title too long']
    },
    description : {
        type: String,
        required: false,
        maxlength: [100, 'survey description too long']
    },
    questions: [{
        type: Object,
        _id: true,
        question: {
            type: String,
            required: true,
            minlength: 3 
        },
        answer: {
            type: [String, 'answer must be parsed as string written as string, number, or boolean'],
            required: true,
        },
    }],
});

SurveySchema.pre('validate', function(next) {
    if (this.questions.length <= 1 && (this.questions[0].answer === undefined && this.questions[0].question === undefined)) {
        throw new Error("survey must have at least 1 answer & question");
    }
    next();
});

module.exports = mongoose.model('Survey', SurveySchema);
