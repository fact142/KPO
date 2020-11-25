const Router = require('express').Router
const userRepository = require('../repositories/userRepository')

const userRouter = Router();
userRouter.route('/')
    .get(async (req, res) => {
        try {
            res.send(await userRepository.getAll())
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
    .post(async (req, res) => {
        try{
            const user = {
                user_name: req.body.user_name, 
            }
            res.send(await userRepository.post(user))
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
userRouter.route('/:id')
    .get(async (req, res) => {
        try{
            const id = parseInt(req.params.id);
            res.send(await userRepository.get(id))
        }
        catch (err){
            console.log(err)
            res.status(500).send()
        }
    })
    .put(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            const user = {
                user_name: req.body.user_name,
            }
            res.send(await userRepository.put(id, user))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })
    .delete(async (req, res) => {
        try{
            const id = parseInt(req.params.id)
            res.send(await userRepository.remove(id))
        }
        catch(err){
            console.log(err)
            res.status(500).send()
        }
    })

module.exports = userRouter