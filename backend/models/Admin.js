const config = require("../config/db.config");
const sql = require("mssql");

const getOrderBy5Month = async () => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection
            .request()
            .query(`SELECT name
                    FROM dbo.Category`
            );
        return result.recordset;
    } catch (error) {
        console.log("error", error);
    }
};

const getBestSellingProducts = async () => {
    try{
        let poolConnection = await sql.connect(config);
        const result  = await poolConnection.request()
            .query(`
                SELECT
                    P.Id,
                    P.Name,
                    SUM(OI.quantity) AS total_quantity_sold
                FROM
                    Products P
                JOIN
                    dbo.OrderItem OI ON P.Id = OI.OrdersId
                JOIN
                    Orders O ON OI.OrdersId = O.Id
                GROUP BY
                    P.Id, P.Name
                ORDER BY
                    total_quantity_sold DESC;
            `);
        return result.recordset;
    }catch (error) {
        console.log("error: ", error);
    }
}

const getAllUser = async () => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT * FROM [dbo].[User]`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

const newUser = async (name, email, picture) => {
    try {
        let poolConnection = await sql.connect(config);
        await poolConnection.request().query(
            `INSERT INTO [User] (Name,email,picture,Role,point,Status,CreatedAt) 
            VALUES (N'${name}','${email}','${picture}','User',0,'Active',GETDATE())`
        );
    } catch (error) {
        console.log("error: ", error);
    }
};

const updateUser = async (name, email, phone, dateOfBirth) => {
    try {
        let poolConnection = await sql.connect(config);
        await poolConnection.request().query(
            `UPDATE [User] 
            SET Name=N'${name}',PhoneNumber='${phone}',DateOfBirth='${dateOfBirth}'
            WHERE Email='${email}'`
        );
    } catch (error) {
        console.log("error: ", error);
    }
};


const deleteUser = async (userId, ReasonBlock) => {
    try {
        let poolConnection = await sql.connect(config);
        await poolConnection.request().query(
            `
                UPDATE dbo.[User]
                SET BlockDate = GETDATE(), ReasonBlocked= N'${ReasonBlock}', Status = 'InActive'
                WHERE Id = ${userId}
            `
        );
    }catch (error){
        console.log("error: ", error);
    }
}

const getIdyParams = async (id, name) => {
    try {
        let connectionPool = await sql.connect(config);
        await connectionPool.request().query(`
         
            
        `)
    }catch (e) {
        
    }
}


module.exports = {
    getOrderBy5Month,
    getBestSellingProducts,
    getAllUser,
    updateUser,
    newUser,
    deleteUser
};
