const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const { db } = require('../app')

module.exports = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      const { uid, per = 50, page = 1 } = req.query
      try {
        if (uid) {
          const querySnapshot = await db
            .collection('posts')
            .where('uid', '==', uid)
            .orderBy('createdAt', 'desc')
            .limit(page * per)
            .get()

          const inRangePost = querySnapshot.docs.map((doc) => {
            const {
              createdAt,
              description,
              save,
              tags,
              title,
              titleImgPath,
              uid,
              user,
            } = doc.data()
            return {
              createdAt,
              description,
              save,
              tags,
              title,
              titleImgPath,
              uid,
              user,
              id: doc.id,
            }
          })
          res.set('Cache-Control', 'public, max-age=5').json(inRangePost)
        } else {
          res.status(500).send('Something broke!')
        }
      } catch (err) {
        console.error(err)
        res.status(500).send('Something broke!')
      }
    })
  })
