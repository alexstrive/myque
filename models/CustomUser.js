const mongoose = require('mongoose')
const Schema = mongoose.Schema

export default mongoose.models.CustomUser ||
  mongoose.model(
    'CustomUser',
    new Schema({
      username: 'String',
      password: 'String',
      email: 'String',
    })
  )
