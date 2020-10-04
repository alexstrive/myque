import * as QuestionAnswer from './QuestionAnswer'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

export default mongoose.models.Question ||
  mongoose.model(
    'Question',
    new Schema({
      title: {
        type: String,
        required: [true, 'Укажите заголовок вопроса'],
      },
      description: {
        type: String,
        required: [true, 'Укажите описание вопроса'],
      },
      category: {
        type: String,
        // enum:
      },
      author: {
        type: String,
        required: [true, 'Укажите автора вопроса'],
      },
      answers: [{ type: Schema.Types.ObjectId, ref: 'QuestionAnswer' }],
    })
  )
