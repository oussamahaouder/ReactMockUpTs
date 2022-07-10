import React, { FunctionComponent, useState ,useEffect } from 'react';
import axios from 'axios';
import { List, ListHeader } from 'semantic-ui-react'
import {getAlbumPictures, getAlbums} from '../Services/app.service'
import Header from '../Components/header';
//Didn't have much time to do thsi test so i made it without redux i have an other project on my github using redux you can check
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
    
    <div className='nameUser' >
        <Header/>
         
         
    <div>
        <br/>
        {!itemClicked && usersDate !== undefined && usersDate.map(elem=>{

           return (
            <div  key={elem.id}>
                <List>
                    <List.Item className='borederd' onClick={e=>getId(elem.id , elem.name)} >
                        <ListHeader  ><b> {elem.name}</b>  </ListHeader>
                            {elem.email}
                    </List.Item>
                </List>
                <br/>

            </div>)
        })}
        {!albumclicked && itemClicked && <div> Voici les album de {userName} : {albums !== undefined && Object.values(albums).map(album => {
               return (
               <div key={album.id}>
                <br/>
                <List>
                    <List.Item  onClick={
                        e=>{
                            getSelectedAlbum(album.id , album.title)
                            }}>

                        <ListHeader> <b>{album.title}</b></ListHeader>
                    </List.Item> 
                </List>
                <br/>

                </div>)
        })} </div>}

    </div>
    {
            albumclicked &&PhotoAlbum !== undefined && <> Voici les images de l’album <b>{albumName}</b> de
            l’utilisateur <b>{userName}</b> :<br/>{ Object.values(PhotoAlbum).map((album)=>{
               return (
                <>
                    <p>
                        <b>{album.title}</b>
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
