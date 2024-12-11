import mysql from 'mysql2';

const conn = mysql.createPool({
    connectionLimit: 10,
    host:"localhost",
    user:"root",
    password: "Sen@iDev77!.",
    database:"recuperacao",
    port:3306,
    multipleStatements: true
});

conn.query('SELECT 1 + 1 AS solution', (err, result, fields) => {
    if(err){
        return console.error(err);
    }

    console.log("The solution is: ", result[0].solution)
})

try {
    console.log("Mysql conectado")
} catch (error) {
    console.error(error)
}

export default conn;