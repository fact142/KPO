const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('playlists', {
        title: 'Мои плейлисты',
        isPlaylist: true
    })
})
    
module.exports = router