const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const ogp = require('ogp-parser')

module.exports = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      try {
        if (req.query.url) {
          const result = await ogp(req.query.url)
          const title = result.title
          const description = result.ogp['og:description']
          const imageUrl = result.ogp['og:image']
          res.set('Cache-Control', 'public, max-age=3600').json({
            success: 1,
            meta: {
              title,
              description,
              image: {
                url: imageUrl[0],
              },
            },
          })
        } else {
          res.status(500).send('Something broke!')
        }
      } catch (err) {
        res.status(500).send('Something broke!')
      }
    })
  })
