const Router = require('express').Router
const playlistRepository = require('../repositories/playlistRepository')
const userRepository = require('../repositories/userRepository')

const playlistRouter = Router();
playlistRouter.route('/')
    .get(async (req, res) => {
        try {
            let playlists = await playlistRepository.getAll()
            let newPlaylist = []
            for(let i = 0; i < playlists.length; i++) {
                let playlist = playlists[i]
                const user = await userRepository.get(playlist.id_user)
                playlist.id_user = user
                newPlaylist.push(playlist)
            }
            res.send(newPlaylist)
        }
        catch (err){
            console.log(err)    
            res.status(500).send()
        }
    })
    .post(async (req, res) => {
        try{
            const playlist = {
                id_user: req.body.id_user,
                playlist_title: req.body.playlist_title, 
            }
            res.send(await playlistRepository.post(playlist))
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
playlistRouter.route('/:id')
    .get(async (req, res) => {
        try{
            const id = parseInt(req.params.id);
            let playlist = await playlistRepository.get(id)
            const user = await userRepository.get(parseInt(playlist.id_user))
            playlist.id_user = user;
            res.send(playlist);
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
                playlist_title: req.body.playlist_title
            }
            res.send(await playlistRepository.put(id, playlist))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })
    .delete(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            res.send(await playlistRepository.remove(id))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })

module.exports = playlistRouter