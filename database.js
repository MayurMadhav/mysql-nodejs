import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getDetails(){
    const [rows] = await pool.query("SELECT * from customer")
    return rows;
}

export async function getDetail(C_ID){
    const [rows] = await pool.query(`
    SELECT * 
    from customer
    where C_ID = ?
    `, [C_ID])
    return rows [0];
}

export async function createCustomer(C_ID, First_Name, Last_Name, PhoneNo) {
    const [result] = await pool.query(`
    INSERT INTO customer (C_ID, First_Name, Last_Name, PhoneNo)
    VALUES (?, ?, ?, ?)
    `, [C_ID, First_Name, Last_Name, PhoneNo])
    const id = result.insertId
    return getDetail(C_ID)
}
export async function deleteCustomer(C_ID){
    const [rows] = await pool.query(`
    DELETE FROM 
    customer
    where C_ID = ?
    `, [C_ID])
    return getDetails();
}

export async function updateCustomer(C_ID, First_Name){
    const [result] = await pool.query(`
    UPDATE customer
    SET First_Name= ? WHERE C_ID = ?
    `, [First_Name, C_ID])
    const id = result.insertId
    return getDetail(C_ID)
}
// const result  = await createCustomer('13','henrich', 'classen', '9821281218')
// console.log(result)

// const details = await getDetail(1)
// console.log(details)