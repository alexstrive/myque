import mongoose, { Schema } from 'mongoose'
import crypto from 'crypto'

function hashPassword(value) {
  return crypto.createHash('sha256').update(value).digest('base64')
}

const CustomUserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    get: hashPassword,
    set: hashPassword,
  },
  email: {
    type: String,
    required: true,
  },
})

CustomUserSchema.statics.findByCredentials = function (username, password) {
  return this.findOne({ username, password })
}

export default mongoose.models.CustomUser ||
  mongoose.model('CustomUser', CustomUserSchema)
