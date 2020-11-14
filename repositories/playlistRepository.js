const Pool = require('pg').Pool;
const { connection } = require('../configs/config')

const pool = new Pool(connection);  
const queryString ={
    selectAll: `SELECT "id_playlist", "id_user", "title"
                FROM "playlist"
                ORDER BY "id_playlist"`, 
    select: `SELECT "id_playlist", "id_user", "title"
            FROM "playlist"
            WHERE "id_playlist" = $1`,
    insert: `INSERT INTO "playlist"("id_user", "title")
            VALUES($1, $2)
            RETURNING "id_playlist", "id_user", "title"`,
    update: `UPDATE "playlist"
            SET "title" = $1
            WHERE "id_playlist" = $2
            RETURNING "id_playlist", "id_user", "title"`,
    delete: `DELETE FROM "playlist"
            WHERE "id_playlist" = $1
            RETURNING "id_playlist", "id_user", "title"`
}

const getAll = async () => {
    const query = await pool.query(queryString.selectAll);
    return query.rows;
}

const get = async (id_playlist) => {
    const query = await pool.query(
        queryString.select, 
        [id_playlist]);
    if (query.rows.length < 1){
        return null
    }
    return query.rows[0];
}

const post = async (playlist) => {
    const query = await pool.query(
        queryString.insert,
        [playlist.id_user, playlist.title]); 
    if (query.rows.length < 1){
        return null;
    }
    return query.rows[0] ;
}

const put = async (id_playlist, playlist) => {
    const query = await pool.query(
        queryString.update,
        [playlist.title, id_playlist]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

const remove = async (id_playlist) => {
    const query = await pool.query(
        queryString.delete,
        [id_playlist]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

module.exports = { getAll, get, post, put, remove }