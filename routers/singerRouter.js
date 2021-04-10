const Router = require('express').Router
const singerRepository = require('../repositories/singerRepository')

const singerRouter = Router();
singerRouter.route('/')
    .get(async (req, res) => {
        try {
            res.send(await singerRepository.getAll())
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
    .post(async (req, res) => {
        try{
            const singer = {
                singer_name: req.body.singer_name, 
                singer_description : req.body.singer_description, 
            }
            res.send(await singerRepository.post(singer))
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
singerRouter.route('/:id')
    .get(async (req, res) => {
        try{
            const id = parseInt(req.params.id);
            res.send(await singerRepository.get(id))
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
    .put(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            const singer = {
                singer_name: req.body.singer_name,
                singer_description: req.body.singer_description, 
            }
            res.send(await singerRepository.put(id, singer))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })
    .delete(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            res.send(await singerRepository.remove(id))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })

    module.exports = singerRouter