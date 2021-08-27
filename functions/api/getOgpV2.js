const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const fetch = require('node-fetch')
const cheerio = require('cheerio')

module.exports = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      try {
        if (req.query.url) {
          const info = await getPageInfo(req.query.url)
          res.set('Cache-Control', 'public, max-age=3600').json({
            success: 1,
            meta: {
              title: info.title,
              description: info.description,
              image: {
                url: info.image,
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

async function getPageInfo(url) {
  const metaProps = await getMetaProps(url)

  const siteName = resolveSiteName(metaProps)
  const title = resolveTitle(metaProps)
  const description = resolveDesc(metaProps)
  const image = resolveImageUrl(metaProps)

  return { siteName, title, description, image }
}

function resolveSiteName(metaProps) {
  const ogSiteName = getMetaPropContent(metaProps, 'og:site_name')
  if (ogSiteName) return ogSiteName
  return '(No SiteName)'
}

function resolveTitle(metaProps) {
  const ogTitle = getMetaPropContent(metaProps, 'og:title')
  if (ogTitle) return ogTitle
  return '(No Title)'
}

function resolveDesc(metaProps) {
  const ogDesc = getMetaPropContent(metaProps, 'og:description')
  if (ogDesc) return ogDesc
  return ''
}

function resolveImageUrl(metaProps) {
  const ogImage = getMetaPropContent(metaProps, 'og:image')
  if (ogImage) return ogImage
  return ''
}

function getMetaPropContent(metaProps, propKey) {
  const mpObj = metaProps.find((d, i, arr) => {
    return d[propKey]
  })
  if (mpObj) return mpObj[propKey]
  return ''
}

async function getMetaProps(url) {
  const result = await fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.text()
      }
    })
    .then((html) => {
      const metaProps = extractMetaProps(html)
      return metaProps
    })
    .catch((e) => {
      throw e
    })
  return result
}

function extractMetaProps(html) {
  const $ = cheerio.load(html)
  const results = []
  $('head meta').each((i, el) => {
    const property = $(el).attr('property')
    const content = $(el).attr('content')
    if (property && content) {
      results.push({ [property]: content })
    }
  })
  results.sort((a, b) => {
    if (Object.keys(a)[0] < Object.keys(b)[0]) return -1
    if (Object.keys(a)[0] > Object.keys(b)[0]) return 1
    return 0
  })
  return results
}
