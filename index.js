import express from "express";
import cors from "cors";
import {PizzaService} from "./src/services/pizzas-services.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get('/pizza', async (req, res) =>
{
    const pizza = await PizzaService.getAll();
    res.status(200).send(pizza);
});

app.get('/pizza/:id', async (req, res) =>
{
    const pizza = await PizzaService.getById(req.params.id);
    res.status(200).send(pizza);
});

app.post('/pizza', async (req, res) =>
{
    try {
        await PizzaService.insert(req.body);
        res.status(200).json({message: 'Pizza creada'});
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Falló el insert'});
    }
});

app.put('/pizza/:id', async (req, res) =>
{
    if(req.params.id == req.body.Id)
    {
        try {
            await PizzaService.update(req.body);
            res.status(200).json({message: 'Pizza actualizada'});
        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Falló el update'});
        }
    }
    else
    {
        res.status(400).json({error: 'El id no coincide con la pizza'});
    }
});

app.delete('/pizza/:id', async (req, res) =>
{
    try {
        await PizzaService.deleteById(req.params.id);
        res.status(200).json({message: 'Pizza eliminada'});
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'Falló el delete'});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})