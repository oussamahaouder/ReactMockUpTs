import React, { FunctionComponent, useState ,useEffect } from 'react';
import axios from 'axios';
import {getAlbumPictures, getAlbums} from '../Services/app.service'

export default function Home() {
    const [usersDate , setUsersData] = useState< any[] | undefined>()
    const [itemClicked , setClicked] =useState(false);
    const [userName , setUser] = useState<String>('')
    const [albumName , setAlbumName] = useState<String>('')
    const [albums , setAlbums] = useState<Object| undefined>();
    const [albumclicked , setAlbumClicked] = useState(false) ; 
    const [PhotoAlbum , setPhotoAlbum] = useState <Object | undefined>() ;
    
    const  getId = (id : Number, name: String) =>{
        setUser(name)
        setClicked(true);
        getAlbums(id).then(res=>{
            setAlbums(res)
        })

    }

    const getSelectedAlbum = (id : Number , title : String)=>{ 
        setAlbumClicked(true);
        setAlbumName(title);
        getAlbumPictures(id).then(res=>{
            setPhotoAlbum(res)
        })

    }

    useEffect(() => {
        axios
        .get<any[]>('https://jsonplaceholder.typicode.com/users')
        .then(res=> {
            setUsersData(res.data)
        }
        )
        .catch(err=>console.error(err));
    },[] )


  return (
    <div >
        Dispostion des Ustilisateurs : 
    <div>
        {!itemClicked && usersDate !== undefined && usersDate.map(elem=>{

           return (
            <div key={elem.id}>
                <a onClick={e=>getId(elem.id , elem.name)} >
                    {elem.name}
                </a>
            </div>)
        })}
        {!albumclicked && itemClicked && <div> Voici les album de {userName} {albums !== undefined && Object.values(albums).map(album => {
               return <div key={album.id}><a onClick={e=>{getSelectedAlbum(album.id , album.title)}}> {album.title}</a> </div>
        })} </div>}

    </div>
    {
            albumclicked &&PhotoAlbum !== undefined && <> Voici les images de l’album {albumName} de
            l’utilisateur {userName} :<br/>{ Object.values(PhotoAlbum).map((album)=>{
               return (
                <>
                    <p>
                        {album.id}
                    </p>
                   <img src={album.url}/>
                </>
               )
            })
        }
                </>}
    </div>
  )
}
