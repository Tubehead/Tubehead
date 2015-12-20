const param = {
  part: 'snippet',
  order: 'relevance',
  type: 'video',
  videoDefinition: 'high',
  maxResults: 30,
  categoryId: 10,// Ref: http://webstackoflove.com/youtube-data-api-v3-get-a-list-of-video-category-ids/
  syndicated: true,
  embeddable: true,
  license: 'any'
}
const apiURL = 'https://www.googleapis.com/youtube/v3/search'
const apiKey = 'AIzaSyAkh76HFpCEsXiAwi1BtnVZL5hTEFoPkdA'


export const Api = {

  get (query) {
    const url = `${ apiURL }?part=${ param.part }&order=${ param.order }&q=${ query }&type=${ param.type }+&videoDefinition=${ param.videoDefinition }&key=${ apiKey }&maxResults=${ param.maxResults }&videoCategoryId=${ param.categoryId }&videoSyndicated=${ param.syndicated }&videoEmbeddable=${ param.embeddable }&videoLicense=${ param.license }`

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
