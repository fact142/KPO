const Pool = require('pg').Pool;
const { connection } = require('../configs/config')

const pool = new Pool(connection);  
const queryString = {
    selectAll: `SELECT *
                FROM singer 
                INNER JOIN album 
                ON singer.id_singer = album.id_singer`, 
    select: `SELECT *
             FROM singer 
             INNER JOIN album 
             ON singer.id_singer = album.id_singer
             WHERE "id_album" = $1`,
    insert: `INSERT INTO "album"("id_singer", "album_title", "album_description")
            VALUES($1, $2, $3)
            RETURNING "id_album", "id_singer", "album_title", "album_description"`,
    update: `UPDATE "album"
            SET "album_title" = $1, "album_description" = $2
            WHERE "id_album" = $3
            RETURNING "id_album", "id_singer", "album_title", "album_description"`,
    delete: `DELETE FROM "album"
            WHERE "id_album" = $1
            RETURNING "id_album", "id_singer", "album_title", "album_description"`
}
const getAll = async () => {
    const query = await pool.query(queryString.selectAll)
    return query.rows;
}
const get = async (id_album) => {
    const query = await pool.query(
        queryString.select, 
        [id_album]);
    if (query.rows.length < 1){
        return null
    }
    return query.rows[0];
}

const post = async (album) => {
    const query = await pool.query(
        queryString.insert,
        [album.id_singer, album.album_title, album.album_description]); 
    if (query.rows.length < 1){
        return null;
    }
    return query.rows[0] ;
}

const put = async (id_album, album) => {
    const query = await pool.query(
        queryString.update,
        [album.album_title, album.album_description, id_album]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

const remove = async (id_album) => {
    const query = await pool.query(
        queryString.delete,
        [id_album]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

module.exports = { getAll, get, post, put, remove }