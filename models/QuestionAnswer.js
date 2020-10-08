import mongoose, { Schema } from 'mongoose'

export default mongoose.models.QuestionAnswer ||
  mongoose.model(
    'QuestionAnswer',
    new Schema({
      author: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      best: {
        type: Boolean,
        default: false,
      },
    })
  )
