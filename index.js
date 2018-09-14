import { onAndSyncApis, noPromiseApis, otherApis } from './wxApi'

export default function processApis(ctx) {
  const wxApi = Object.assign({}, onAndSyncApis, noPromiseApis, otherApis)
  Object.keys(wxApi).forEach((key) => {
    if (!onAndSyncApis[key] && !noPromiseApis[key]) {
      ctx[key] = (options) => {
        options = options || {}
        let task = null
        const obj = Object.assign({}, options)
        if (typeof options === 'string') {
          return wx[key](options)
        }
        const p = new Promise((resolve, reject) => {
          ['fail', 'success', 'complete'].forEach((k) => {
            obj[k] = (res) => {
              if (options[k]) {
                options[k](res)
              }
              if (k === 'success') {
                resolve(res)
              } else if (k === 'fail') {
                reject(res)
              }
            }
          })
          task = wx[key](obj)
        })
        if (key === 'uploadFile' || key === 'downloadFile') {
          p.progress = (cb) => {
            task.onProgressUpdate(cb)
            return p
          }
          p.abort = (cb) => {
            if (cb) cb()
            task.abort()
            return p
          }
        }
        return p
      }
    } else {
      ctx[key] = (...args) => wx[key].apply(wx, args) // eslint-disable-line
    }
  })
}
