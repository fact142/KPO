const Pool = require('pg').Pool;
const { connection } = require('../configs/config')

const pool = new Pool(connection);
const queryString ={
    selectAll: `SELECT playlistsong.*, "user_name", "song_title", "duration", "rating", "playlist_title"
	            FROM playlistsong
	            INNER JOIN song ON playlistsong.id_song = song.id_song
		        INNER JOIN playlist ON playlistsong.id_playlist = playlist.id_playlist
		        INNER JOIN "user" ON playlistsong.id_user = "user".id_user
                ORDER BY id_playlistsong`, 
    select: `SELECT playlistsong.*, "user_name", "song_title", "duration", "rating", "playlist_title"
            FROM playlistsong
            INNER JOIN song ON playlistsong.id_song = song.id_song
            INNER JOIN playlist ON playlistsong.id_playlist = playlist.id_playlist
            INNER JOIN "user" ON playlistsong.id_user = "user".id_user
            WHERE "id_playlistsong" = $1`,
    insert: `INSERT INTO "playlistsong"("id_playlist", "id_user", "id_song")
            VALUES($1, $2, $3)
            RETURNING "id_playlistsong", "id_playlist", "id_user", "id_song"`,
    update: `UPDATE "playlistsong"
            SET "id_playlist" = $1, "id_user" = $2, "id_song" = $3
            WHERE "id_playlistsong" = $4
            RETURNING "id_playlistsong", "id_playlist", "id_user", "id_song"`,
    delete: `DELETE FROM "playlistsong"
            WHERE "id_playlistsong" = $1
            RETURNING "id_playlistsong", "id_playlist", "id_user", "id_song"`
}

const getAll = async () => {
    const query = await pool.query(queryString.selectAll);
    return query.rows;
}

const get = async (id_playlistsong) => {
    const query = await pool.query(
        queryString.select, 
        [id_playlistsong]);
    if (query.rows.length < 1){
        return null
    }
    return query.rows[0];
}

const post = async (playlistsong) => {
    const query = await pool.query(
        queryString.insert,
        [playlistsong.id_playlist, playlistsong.id_user, playlistsong.id_song]); 
    if (query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

const put = async (id_playlistsong, playlistsong) => {
    const query = await pool.query(
        queryString.update,
        [playlistsong.id_playlist, playlistsong.id_user, playlistsong.id_song, id_playlistsong]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

const remove = async (id_playlistsong) => {
    const query = await pool.query(
        queryString.delete,
        [id_playlistsong]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}



module.exports = { getAll, get, post, put, remove }