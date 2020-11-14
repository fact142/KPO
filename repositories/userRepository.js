const Pool = require('pg').Pool;
const { connection } = require('../configs/config')

const pool = new Pool(connection);
const queryString ={
    selectAll: `SELECT "id_user", "name"
                FROM "user"
                ORDER BY "id_user"`, 
    select: `SELECT "id_user", "name"
            FROM "user"
            WHERE "id_user" = $1`,
    selectByName: `SELECT "id_user", "name"
                  FROM "user"
                  WHERE "name" = $1`,
    insert: `INSERT INTO "user"("name")
            VALUES($1)
            RETURNING "id_user", "name"`,
    update: `UPDATE "user"
            SET "name" = $1
            WHERE "id_user" = $2
            RETURNING "id_user", "name"`,
    delete: `DELETE FROM "user"
            WHERE "id_user" = $1
            RETURNING "id_user", "name"`
}

const getAll = async () => {
    const query = await pool.query(queryString.selectAll);
    return query.rows;
}

const get = async (id_user) => {
    const query = await pool.query(
        queryString.select, 
        [id_user]);
    if (query.rows.length < 1){
        return null
    }
    return query.rows[0];
}

const post = async (user) => {
    const query = await pool.query(
        queryString.insert,
        [user.name]); 
    if (query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

const put = async (id_user, user) => {
    const query = await pool.query(
        queryString.update,
        [user.name, id_user]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

const remove = async (id_user) => {
    const query = await pool.query(
        queryString.delete,
        [id_user]);
    if(query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}

const getByName = async (userName) => {
    const query = await pool.query(
        queryString.selectByName,
        [userName]);

    if (query.rows.length < 1){
        return null;
    }
    return query.rows[0];
}



module.exports = { getAll, get, post, put, remove, getByName }