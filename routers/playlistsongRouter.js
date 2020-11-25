const Router = require('express').Router
const playlistsongRepository = require('../repositories/playlistsongRepository')
const singerRepository = require('../repositories/singerRepository')


const playlistsongRouter = Router();
playlistsongRouter.route('/')
    .get(async (req, res) => {
        try {
            res.send(await playlistsongRepository.getAll()) 
            // console.log(await playlistsongRepository.selectByQuery('id_song', 20))
        }
        catch (err){
            console.log(err)    
            res.status(500).send()
        }
    })
    .post(async (req, res) => {
        try{
            const playlistsong = {
                id_playlist: req.body.id_playlist,
                id_user: req.body.id_user, 
                id_song : req.body.id_song
            }
            res.send(await playlistsongRepository.post(playlistsong))
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
playlistsongRouter.route('/:id')
    .get(async (req, res) => {
        try{
            const id = parseInt(req.params.id);
            let playlist = await playlistsongRepository.get(id)
            res.send(playlist)
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
    .put(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            const playlist = {
                id_user: req.body.id_user,
                id_song: req.body.id_song, 
                id_playlist: req.body.id_playlist
            }
            res.send(await playlistsongRepository.put(id, playlist))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })
    .delete(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            res.send(await playlistsongRepository.remove(id))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })

module.exports = playlistsongRouter