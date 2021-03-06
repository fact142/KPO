const Pool = require('pg').Pool;
const { connection } = require('../configs/config')

const pool = new Pool(connection);
const queryString ={
    selectAll: `SELECT *
                FROM "song"
                INNER JOIN "album"
                ON song.id_album = album.id_album`, 
    select: `SELECT "id_song", "id_album", "song_title", "duration", "rating"
            FROM "song"
            WHERE "id_song" = $1`,
    insert: `INSERT INTO "song"("id_album", "song_title", "duration", "rating")
            VALUES($1, $2, $3, 0)
            RETURNING "id_song", "id_album", "song_title", "duration", "rating"`,
    update: `UPDATE "song"
            SET "song_title" = $1, "duration" = $2
            WHERE "id_song" = $3
            RETURNING "id_song", "id_album", "song_title", "duration", "rating"`,
    delete: `DELETE FROM "song"
            WHERE "id_song" = $1
            RETURNING "id_song", "id_album", "song_title", "duration", "rating"`
}

const getAll = async () => {
    const query = await pool.query(queryString.selectAll);
    return query.rows;
}

const get = async (id_song) => {
    const query = await pool.query(
        queryString.select, 
        [id_song]);
    if (query.rows.length < 1){
        return null
    }
    return query.rows[0];
}

const post = async (song) => {
    const query = await pool.query(
        queryString.insert,
        [song.id_album, song.song_title, song.duration]); 
    if (query.rows.length < 1){
        return null;
    }
    return query.rows[0] ;
}

const put = async (id_song, song) => {
    const query = await pool.query(
        queryString.update,
        [song.song_title, song.duration, id_song]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

const remove = async (id_song) => {
    const query = await pool.query(
        queryString.delete,
        [id_song]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

module.exports = { getAll, get, post, put, remove }