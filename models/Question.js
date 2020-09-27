import * as QuestionAnswer from './QuestionAnswer'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

export default mongoose.models.Question ||
  mongoose.model(
    'Question',
    new Schema({
      title: 'String',
      description: 'String',
      category: 'String',
      author: 'String',
      answers: [{ type: Schema.Types.ObjectId, ref: 'QuestionAnswer' }],
    })
  )
