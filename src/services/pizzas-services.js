import {config} from '../../dbconfig.js';
import sql from 'mssql';

export class PizzaService
{
    static getAll = async () =>
    {
        let returnList = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * FROM Pizzas');
            returnList = result.recordsets[0];
        } catch(error){
            console.log(error);
        }
        return returnList;
    }

    static getById = async (id) =>
    {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request().input('pId',sql.Int,id).query('SELECT * FROM Pizzas WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch(error){
            console.log(error);
        }
        return returnEntity;
    }

    static insert = async (pizza) =>
    {
        const {Nombre, LibreGluten, Importe, Descripcion} = pizza;
        let pool = await sql.connect(config);
        const request = new sql.Request(pool);
        request
            .input('pNombre',sql.NVarChar(50),Nombre)
            .input('pLibreGluten',sql.Bit,LibreGluten)
            .input('pImporte',sql.Money,Importe)
            .input('pDescripcion',sql.NVarChar(200),Descripcion)
            .query('INSERT INTO Pizzas (Nombre, LibreGluten, Importe, Descripcion) VALUES (@pNombre, @pLibreGluten, @pImporte, @pDescripcion)');
    }

    static update = async (pizza) =>
    {
        const {Id, Nombre, LibreGluten, Importe, Descripcion} = pizza;
        let pool = await sql.connect(config);
        const request = new sql.Request(pool);
        request
            .input('pId',sql.Int,Id)
            .input('pNombre',sql.NVarChar(50),Nombre)
            .input('pLibreGluten',sql.Bit,LibreGluten)
            .input('pImporte',sql.Money,Importe)
            .input('pDescripcion',sql.NVarChar(200),Descripcion)
            .query('UPDATE Pizzas SET Nombre = @pNombre, LibreGluten = @pLibreGluten, Importe = @pImporte, Descripcion = @pDescripcion WHERE Id = @pId');
    }

    static deleteById = async (id) =>
    {
        let pool = await sql.connect(config);
        const request = new sql.Request(pool);
        request.input('pId',sql.Int,id).query('DELETE FROM Pizzas WHERE Id = @pId');
    }
}