import mongoose, { Schema } from 'mongoose'
import * as QuestionAnswer from './QuestionAnswer' // required

import { categoryKeys } from '../constants'

export default mongoose.models.Question ||
  mongoose.model(
    'Question',
    new Schema({
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
        enum: categoryKeys,
      },
      author: {
        type: String,
        required: true,
      },
      answers: [{ type: Schema.Types.ObjectId, ref: 'QuestionAnswer' }],
    })
  )
