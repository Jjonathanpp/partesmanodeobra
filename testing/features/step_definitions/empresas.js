const { Given, When, Then } = require('cucumber'); // Versión compatible
const assert = require('assert');

let cliente = {};
let respuestaServer = "";

Given(/^que se ingresa el cliente con (.*), (\d+) y (.*)$/, function (nombre, cuit, observaciones) {

    cliente = {
        nombre: nombre.trim(),
        cuit: String(cuit).trim(),
        observaciones: observaciones ? observaciones.trim() : ""
    };
});

When('presiono el botón de guardar', async function () {
    try {
        const response = await fetch('http://backend:8080/empresas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });
        const data = await response.json();

        respuestaServer = data.message;
    } catch (error) {
        respuestaServer = "Error de conexión";
        console.error("Error al conectar con el backend:", error);
    }
});

Then(/^se espera la siguiente (.*)$/, function (respuestaEsperada) {
    assert.strictEqual(respuestaServer, respuestaEsperada.trim());
});