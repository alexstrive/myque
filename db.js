const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

ObjectId.prototype.valueOf = function () {
  return this.toString()
}

const connection = {}

export const connect = async () => {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  connection.isConnected = db.connections[0].readyState
}
