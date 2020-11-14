const Router = require('express').Router
const albumRepository = require('../repositories/albumRepository')
const singerRepository = require('../repositories/singerRepository')

const albumRouter = Router();
albumRouter.route('/')
    .get(async (req, res) => {
        try {
            let albums = await albumRepository.getAll()
            for(let i = 0; i < albums.length; i++) {
                let album = albums[i]
                const singer = await singerRepository.get(album.id_singer)
                album.singer = singer
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
                title: req.body.title, 
                description : req.body.description
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
            const singer = await singerRepository.get(parseInt(album.id_singer))
            album.id_singer = singer;
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
                title: req.body.title,
                description: req.body.description
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