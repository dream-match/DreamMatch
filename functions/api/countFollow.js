const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const { db } = require('../app')

module.exports = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 30,
    memory: '128MB',
  })
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      try {
        if (req.query.uid) {
          const userRef = db.collection('users').doc(req.query.uid)
          const resFollowers = await userRef.collection('follower').get()
          const resFollowing = await userRef.collection('following').get()

          res.set('Cache-Control', 'public, max-age=60').json({
            followerCnt: resFollowers.size,
            followingCnt: resFollowing.size,
          })
        } else {
          res.status(500).send('Something broke!')
        }
      } catch (err) {
        res.status(500).send('Something broke!')
      }
    })
  })
