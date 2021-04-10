const Router = require('express').Router
const songRepository = require('../repositories/songRepository')
const albumRepository = require('../repositories/albumRepository')

const songRouter = Router();
songRouter.route('/')
    .get(async (req, res) => {
        try {
            let songs = await songRepository.getAll()
            res.send(songs)
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
    .post(async (req, res) => {
        try{
            const song = {
                id_album: req.body.id_album,
                song_title: req.body.song_title,
                duration : req.body.duration
            }
            res.send(await songRepository.post(song))
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
songRouter.route('/:id')
    .get(async (req, res) => {
        try{
            const id = parseInt(req.params.id);
            let song = await songRepository.get(id)
            const album = await albumRepository.get(parseInt(song.id_album))
            song.id_album = album;
            res.send(song);
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
    .put(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            const song = {
                song_title: req.body.song_title,
                duration: req.body.duration
            }
            res.send(await songRepository.put(id, song))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })
    .delete(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            res.send(await songRepository.remove(id))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })

    module.exports = songRouter