const { Router } = require('express')
const router = Router();

router.get('/', (req, res) => {
    res.render('account', {
        title: 'Мой профиль', 
        isAccount: true
    })
})

module.exports = router