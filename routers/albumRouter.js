const Router = require('express').Router
const albumRepository = require('../repositories/albumRepository')
const singerRepository = require('../repositories/singerRepository')

const albumRouter = Router();
albumRouter.route('/')
    .get(async (req, res) => {
        try {
            let albums = await albumRepository.getAll()
            for (let album of albums){
                 album.singer = {"id_singer": album.id_singer, 
                                 "singer_name": album.singer_name, 
                                "singer_description": album.singer_description}
                delete album.id_singer
                delete album.singer_name
                delete album.singer_description
            }
            res.send(albums)
        }
        catch (err){
            console.log(err)    
            res.status(500).send()
        }
    })
    .post(async (req, res) => {
        try{
            const album = {
                id_singer: req.body.id_singer,
                album_title: req.body.album_title, 
                album_description : req.body.album_description
            }
            res.send(await albumRepository.post(album))
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
albumRouter.route('/:id')
    .get(async (req, res) => {
        try{
            const id = parseInt(req.params.id);
            let album = await albumRepository.get(id)
            album.singer = {"id_singer": album.id_singer, 
                                 "singer_name": album.singer_name, 
                                "singer_description": album.singer_description}
            delete album.id_singer
            delete album.singer_name
            delete album.singer_description
            res.send(album);
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
    .put(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            const album = {
                album_title: req.body.album_title,
                album_description: req.body.album_description
            }
            res.send(await albumRepository.put(id, album))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })
    .delete(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            res.send(await albumRepository.remove(id))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })

module.exports = albumRouter