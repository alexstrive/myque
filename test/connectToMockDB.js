import mongoose from 'mongoose'

export default () =>
  mongoose.connect(
    global.__MONGO_URI__,
    { useNewUrlParser: true, useCreateIndex: true },
    (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    }
  )
