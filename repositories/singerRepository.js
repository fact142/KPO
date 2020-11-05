const Pool = require('pg').Pool;
const { connection } = require('../configs/config')

const pool = new Pool(connection);
const queryString ={
    selectAll: `SELECT "id_singer", "name", "description" 
                FROM "singer"
                ORDER BY "id_singer"`, 
    select: `SELECT "id_singer", "name", "description" 
            FROM "singer"
            WHERE "id_singer" = $1`,
    insert: `INSERT INTO "singer"("name", "description")
            VALUES($1, $2)
            RETURNING "id_singer", "name", "description"`,
    update: `UPDATE "singer"
            SET "name" = $1, "description" = $2
            WHERE "id_singer" = $3`,
    delete: `DELETE FROM "singer"
            WHERE "id_singer" = $1
            RETURNING "id_singer", "name", "description"`
}

const getAll = async () => {
    const query = await pool.query(queryString.selectAll);
    return query.rows;
}

const get = async (id_singer) => {
    const query = await pool.query(
        queryString.select, 
        [id_singer]);
    if (query.rows.length < 1){
        return null
    }
    return query.rows[0];
}

const post = async (singer) => {
    const query = await pool.query(
        queryString.insert,
        [singer.name, singer.description]); 
    if (query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

const put = async (id_singer, singer) => {
    const query = await pool.query(
        queryString.update,
        [singer.name, singer.description, id_singer]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

const remove = async (id_singer) => {
    const query = await pool.query(
        queryString.delete,
        [id_singer]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

module.exports = { getAll, get, post, put, remove }