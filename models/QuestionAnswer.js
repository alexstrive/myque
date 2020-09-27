const mongoose = require('mongoose')
const Schema = mongoose.Schema

export default mongoose.models.QuestionAnswer ||
  mongoose.model(
    'QuestionAnswer',
    new Schema({
      author: 'String',
      content: 'String',
      question: { type: Schema.Types.ObjectId, ref: 'Question' },
    })
  )
