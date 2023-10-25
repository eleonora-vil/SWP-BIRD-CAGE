const config = require("../config/db.config")
const sql = require("mssql");

const getAllOrder = async () => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `SELECT *
             FROM [dbo].[Orders]`
        );
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
};

const getOrderById = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            `select *
             from Orders
             where Orders.id = ${id}`
        );
        return result.recordset[0];
    } catch (error) {
        console.log("error: ", error);
    }
};

const addOrderToDB = async (UserID, OrderDate, PaymentDate, ShippingAddress, PhoneNumber, Note, TotalAmount, PaymentId, Status) => {
    try {
        // const paymentDate = new Date(PaymentDate);
        // if (isNaN(paymentDate)) {
        //     console.error('Invalid PaymentDate:', PaymentDate);
        //     return;
        // }

        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request()
            .input('UserID', sql.Int, UserID)
            .input('OrderDate', sql.DateTime, OrderDate)
            .input('PaymentDate', sql.DateTime, PaymentDate)
            .input('ShippingAddress', sql.NVarChar, ShippingAddress)
            .input('PhoneNumber', sql.NVarChar, PhoneNumber)
            .input('Note', sql.NVarChar, Note)
            .input('TotalAmount', sql.Int, TotalAmount)
            .input('PaymentId', sql.NVarChar, PaymentId)
            .input('Status', sql.NVarChar, Status)
            .query(`
                INSERT INTO dbo.Orders
                (
                    [UserID],
                    [OrderDate],
                    [PaymentDate],
                    [ShippingAddress],
                    [PhoneNumber],
                    [Note],
                    [TotalAmount],
                    [PaymentMethod],
                    [IsDeleted],
                    [CreateAt],
                    [UpdateAt],
                    [Status],
                    [View_Status],
                    [Status_Shipping],
                    [Status_Paid]
                    
                )
                VALUES
                    (
                        @UserID,
                        @OrderDate,
                        @PaymentDate,
                        @ShippingAddress,
                        @PhoneNumber,
                        @Note,
                        @TotalAmount,
                        @PaymentId,
                        0,
                        GETDATE(),
                        GETDATE(),
                        @Status,
                        0,
                        'Pending',
                        'UnPaid'
                    );
            `);
        return result.recordset;
    } catch (error) {
        console.log("error: ", error);
    }
}

const changeStatus_Paid = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(
            ` UPDATE dbo.Orders
              SET Status_Paid = 'Paid'
              WHERE id = ${id}
              `
        )
    }catch (e) {
        console.log("error: ", e);
    }
}


const getAllOrderItemByUserID = async (id) => {
    try {
        let poolConnection = await sql.connect(config);
        const result = await poolConnection.request().query(`
           SELECT p.Id,p.Name, oi.CreatedAt, oi.Price, oi.Quantity, i.Url, o.Status
            FROM OrderItem oi, Orders o, Products p, Image i
            WHERE oi.OrdersId = o.Id AND o.UserID = ${id} AND oi.ProductId = p.id AND i.ProductId = p.Id

        `)
        return result.recordset;
    }catch (error) {
        console.log("error: ", error)
    }
}


module.exports = {
    getAllOrder,
    getOrderById,
    addOrderToDB,
    changeStatus_Paid,
    getAllOrderItemByUserID
}