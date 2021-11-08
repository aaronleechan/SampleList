import React from 'react';
import './listview.css'

const ListView = (props) =>{
    const {data,getImageUi,storeFav} = props
    return(
        <div>
            {
                data.map(v=>{
                    const{secret,id,server} = v;
                    let url = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`
                    return (
                        <div key={id} className="grid-item">
                            <div onClick={()=>getImageUi(id)}>
                                <img src={url}/>
                            </div>
                            {storeFav && <a className="fav-icon" onClick={()=>storeFav(server,id,secret)}>Favorite</a>}
                        </div>
                        )
                })
            }
        </div>
    )
}

export default ListView