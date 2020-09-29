import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { connect } from '../../../db'
import CustomUser from '../../../models/CustomUser'

const crypto = require('crypto')
connect()

const options = {
  providers: [
    // Rest in peace
    // Providers.Auth0({
    //   clientId: process.env.AUTH0_CLIENT_ID,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //   domain: process.env.AUTH0_DOMAIN,
    // }),
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'bakasa' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({ username, password: plainPassword }) => {
        const password = crypto
          .createHash('sha256')
          .update(plainPassword)
          .digest('base64')

        const user = await CustomUser.findOne({
          username,
          password,
        })

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve({
            name: username,
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
