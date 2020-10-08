import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { connect } from '../../../db'
import CustomUser from '../../../models/CustomUser'

connect()

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'bakasa' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({ username, password }) => {
        const user = await CustomUser.findByCredentials(username, password)

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve({
            name: user.username,
            email: user.email,
          })
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null)
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
  ],

  database: process.env.DB_CONNECTION_URL,
  session: {
    jwt: true,
  },
}

export default (req, res) => NextAuth(req, res, options)
