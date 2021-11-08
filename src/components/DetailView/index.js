import React from 'react';
import './detailview.css'

const DetailView = (props) =>{
    const {showModal,setShowModal,detailPhoto} = props
    const {title,description,owner,server,id,secret} = detailPhoto
    return(
        <div className="modal" tabIndex= "-1" hidden={!showModal}>
            <div className="close-dialog" onClick={()=>setShowModal(false)}>X</div>
            <div className="modal-dialog">
                <h2>Detail View </h2>
                <div className="modal-header">
                    <a>{title}</a>
                </div>
                <hr/>
                <div className="modal-body">
                    <img className="detail-img" src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`} />
                    <div>
                        <a><span className="title">Owner:</span> <span className="body">{owner}</span></a>
                        <a><span className="title">Description:</span> <span className="body">{description}</span></a>

                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default DetailView