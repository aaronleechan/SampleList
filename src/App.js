import React, {useEffect,useState} from 'react'
import './App.css';
import { fetchApi,getPhotoInfo,fakeDelayLoader } from './components/utils';
import DetailView from './components/DetailView'
import Loader from './components/Loader'
import ListView from './components/ListView';

const methodList = [
  {label: "Search", value: `Search`},
  {label: "Hot List", value:`HotList`},
]

function App() {
  const [search,setSearch] = useState("")
  const [data,setData] = useState([])
  const [selectMethod,setSelectMethod] = useState("Search")
  const [hotTag,setHotTag] = useState([])
  const [selectTag,setSelectTag] = useState("")
  const [showModal,setShowModal] = useState(false)
  const [detailPhoto,setDetailPhoto] = useState(null)
  const [delay,setDelay] = useState(1)
  const [loading,setLoading] = useState(false)
  const [favorite,setFavorite] = useState([])

  const fakeDelayLoading = () =>{
    setLoading(true)
    fakeDelayLoader(delay,loaderResponse)
  }
  
  useEffect(()=>{
    const favoriteCart = window.localStorage.getItem('favorite')
    if(favoriteCart){
      const fav = JSON.parse(favoriteCart)
      console.log({" favoriteCart ": fav}) 
      setFavorite(fav)
    }
  },[])

  useEffect(()=>{
    window.localStorage.setItem('favorite',JSON.stringify(favorite))
  },[favorite])



  useEffect(()=>{
    fetchApi(search,getPhotoData)
    fakeDelayLoading()
  },[search])

  useEffect(()=>{
    if(detailPhoto){setShowModal(true)}
  },[detailPhoto])

  //Callback get Photo 
  const getPhotoData = (obj) =>{
    if(obj && obj.photos){
      setData(obj.photos.photo)
    }
  }

  //CallBack get Tag
  const getTagData = (obj)=>{
    if(obj && obj.hottags){
      let hotTags = obj.hottags.tag.map(v=>{return {label:v._content,value: v._content}}) 
      setHotTag(hotTags)
      setSearch(hotTags[0].label)
    }
  }

  const getPhotoInfoData = (data) =>{
    const {description,title,owner,server,id,secret} = data.photo
    let detailInfo = {
      description : description._content,
      title: title._content,
      owner: owner.realname,
      server: server,
      id: id,
      secret: secret
    }
    setDetailPhoto(detailInfo)
  }

  const getImageUi = (id) =>{
    setDetailPhoto(null)
    getPhotoInfo(id,getPhotoInfoData)
    fakeDelayLoading()
  }

  const onChageSearch = (e) =>{setSearch(e.target.value)}

  const onChangeSelectMethod = (e) =>{
    let methodName = e.target.value
    if(methodName === "Search"){
      setHotTag([])
    }else if(methodName === "HotList"){
      fetchApi('',getTagData)
      fakeDelayLoading()
    }
    setData([])
    setSelectMethod(methodName)
  }

  const seletMethodRendering = (params) =>{
    const {label,inputValue,setUpdateValue,list} = params
    return(
      <div className="field">
        <label>{label}</label>
        <select value={inputValue} onChange={setUpdateValue}>
          {
            list.map((v,i)=>{
              return (<option key={i} value={v.value}>{v.label}</option>)
            })
          }
        </select>
      </div>
    )
  }

  const loaderResponse = () =>{
    setLoading(false)
  }

  const updateHotTag = (e) =>{
    setSelectTag(e.target.value)
    setSearch(e.target.value)
  }

  const MinuteList = [
    {label: 1,value: 1},
    {label: 2, value: 2},
    {label: 3, value: 3},
    {label: 4,value: 4},
    {label: 5, value: 5}
  ]

  const storeFav = (server,id,secret) =>{
    let newData = {server: server,id: id, secret: secret}
    let newArray = [...favorite,newData]
    setFavorite(newArray)
  }

  return (
    <div className="App">
      <h1>Flicker Photo</h1>

      {seletMethodRendering({label: "Delay Mechanism in seconds",inputValue:delay,setUpdateValue: (e)=>setDelay(e.target.value),list: MinuteList})}

      {detailPhoto && <DetailView showModal={showModal} setShowModal={setShowModal} detailPhoto={detailPhoto}/>}

      {seletMethodRendering({label:"Method",inputValue:selectMethod,setUpdateValue:onChangeSelectMethod,list:methodList})}

      {hotTag.length > 0 && seletMethodRendering({label:"Popular Tag",inputValue:selectTag,setUpdateValue:updateHotTag,list:hotTag})}

      {
        selectMethod === 'Search' &&
        <div className="field">
          <label>Search</label>
          <input val={search} onChange={(e)=>onChageSearch(e)}/>
        </div>
      }

      <div className="grid-container">
        <ListView data={data} getImageUi={getImageUi} storeFav={storeFav}/>
        {loading && data.length == 0 ? <Loader/> : ''}
      </div>

      <div className="grid-container">
        <h2>Favorite List </h2>
        <ListView data={favorite} getImageUi={getImageUi}/>
      </div>

    </div>
  );
}

export default App;
