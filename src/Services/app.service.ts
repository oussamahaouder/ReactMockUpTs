import Users from "../Models/Users" 
import axios from 'axios'
import Albums from '../Models/Albums';
import AlbumPhotos from "../Models/AlbumPhotos";

export  function  getAlbums (id : Number){
    return new Promise ((resolve , reject)=>{
        axios.get<Albums>('https://jsonplaceholder.typicode.com/users/'+id+'/albums')
        .then(res=> 
            {
            resolve(res.data) }
            )
        .catch(err=>{ reject(err)})

    })
}

export  function getAlbumPictures (id : Number) {
    return new Promise ((resolve , reject)=>{
        axios.get<AlbumPhotos>('https://jsonplaceholder.typicode.com/albums/'+id+'/photos').then(res=>{
            resolve(res.data)
        })
        .catch(err=>{reject(err)})
    })
}


