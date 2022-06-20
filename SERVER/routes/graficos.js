const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/grafico/:indice', async (req, res) => {
    const { indice } = req.params;
    var sql = `SELECT PC.id, PC.cripto, PC.fecha, PC.id_precio, PC.forecast, PC.pesimista, PC.optimista, PC.id_grupo, PA.precio AS precio FROM ${process.env.TABLE_CRIPTO_PROY_CP} AS PC LEFT JOIN ${process.env.TABLE_CRIPTO_PRECIO_ACTUAL} AS PA ON PC.id_precio = PA.id WHERE cripto = ? ORDER BY fecha ASC`
    const datos = await pool.query(sql, [indice]);
    const datosExtraidos = JSON.stringify(datos);
    res.send(datosExtraidos);
});

module.exports = router; 