export const Rss = {

  get (url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          resolve(data)
        })
        .catch(() => {
          reject(error)
        })
    })
  }
}
