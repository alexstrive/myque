module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/questions',
        permanent: true,
      },
    ]
  },
}
