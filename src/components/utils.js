//import {configuration} from './config'

const key = process.env.REACT_APP_FLICKER_KEY
const host = process.env.REACT_APP_FLICKER_HOST
const path = process.env.REACT_APP_FLICKER_PATH

const getUrl= (tag) =>{
    let searchKeyWord = tag || ''
    console.log({" key ": key},{" host ": host})
    let rootPath = `${host}${path}`
    if(!tag){
      return `${rootPath}&method=flickr.tags.getHotList&api_key=${key}&count=100&format=json&nojsoncallback=1`
    }else{
      return `${rootPath}&method=flickr.photos.search&api_key=${key}&tags=${searchKeyWord}&format=json&nojsoncallback=1`
    }
  }

const getDetailUrl = (id) =>{
  let rootPath = `${host}${path}`
  return `${rootPath}&method=flickr.photos.getInfo&api_key=${key}&photo_id=${id}&format=json&nojsoncallback=1`
}

const getPhotoInfo = (id,callback) =>{
  let url = getDetailUrl(id)
  fetch(url)
  .then(function(response){
    return response.json()
  })
  .then(function(j){
    if(j.stat == 'fail'){
      callback([])
    }else{
      callback(j)
    }
  })
}

const fetchApi = (tag,callback) =>{
    let url = getUrl(tag)
    fetch(url)
    .then(function(response){
      return response.json()
    })
    .then(function(j){
      console.log(j)
      if(j.stat == 'fail'){
        callback([])
      }else{
        callback(j)
      }
    })
}

const fakeDelayLoader = (time,callback) =>{
    let defaultTime = time || 1
    setTimeout(()=>{
      callback()
    },defaultTime * 1000)
}


export {
    fetchApi,
    getPhotoInfo,
    fakeDelayLoader
}