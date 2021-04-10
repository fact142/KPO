const Pool = require('pg').Pool;
const { connection } = require('../configs/config')

const pool = new Pool(connection);
const queryString ={
    selectAll: `SELECT "id_user", "user_name", "user_password", "user_email"
                FROM "user"
                ORDER BY "id_user"`, 
    select: `SELECT "id_user", "user_name", "user_password", "user_email"
            FROM "user"
            WHERE "id_user" = $1`,
    selectByEmail: `SELECT "id_user", "user_name", "user_password", "user_email"
                  FROM "user"
                  WHERE "user_email" = $1`,
    insert: `INSERT INTO "user"("user_name", "user_password", "user_email")
            VALUES($1, $2, $3)
            RETURNING "id_user", "user_name", "user_password", "user_email"`,
    update: `UPDATE "user"
            SET "user_name" = $1, "user_password" =  $2, "user_email" = $3
            WHERE "id_user" = $4
            RETURNING "id_user", "user_name", "user_password", "user_email"`,
    delete: `DELETE FROM "user"
            WHERE "id_user" = $1
            RETURNING "id_user", "user_name", "user_password", "user_email"`
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
        [user.user_name, user.user_password, user.user_email]); 
    
    return query.rows;
}

const put = async (id_user, user) => {
    const query = await pool.query(
        queryString.update,
        [user.user_name, id_user]);
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

const getByEmail = async (userEmail) => {
    const query = await pool.query(
        queryString.selectByEmail,
        [userEmail]);

    return query.rows;
}



module.exports = { getAll, get, post, put, remove, getByEmail }