const Pool = require('pg').Pool;
const { connection } = require('../configs/config')

const pool = new Pool(connection);  
const queryString ={
    selectAll: `SELECT "id_album", "id_singer", "title", "description" 
                FROM "album"
                ORDER BY "id_album"`, 
    select: `SELECT "id_album", "id_singer", "title", "description" 
            FROM "album"
            WHERE "id_album" = $1`,
    insert: `INSERT INTO "album"("id_singer", "title", "description")
            VALUES($1, $2, $3)
            RETURNING "id_album", "id_singer", "title", "description"`,
    update: `UPDATE "album"
            SET "title" = $1, "description" = $2
            WHERE "id_album" = $3
            RETURNING "id_album", "id_singer", "title", "description"`,
    delete: `DELETE FROM "album"
            WHERE "id_album" = $1
            RETURNING "id_album", "id_singer", "title", "description"`
}

const getAll = async () => {
    const query = await pool.query(queryString.selectAll);
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
        [album.id_singer, album.title, album.description]); 
    if (query.rows.length < 1){
        return null;
    }
    return query.rows[0] ;
}

const put = async (id_album, album) => {
    const query = await pool.query(
        queryString.update,
        [album.title, album.description, id_album]);
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