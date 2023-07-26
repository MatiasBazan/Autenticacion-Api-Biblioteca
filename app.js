const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

// Configuración Middleware con el Servidor de Autorización
const jwtCheck = auth({
  audience: 'http://127.0.0.1:3000/libros',
  issuerBaseURL: 'https://dev-tp0dez351mue7xwq.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// Importamos el Router de Libros
const librosRouter = require("./routes/libros");

// Configuramos el middleware de autenticacion con la URL del proveedor de identidad
app.use("/libros", jwtCheck, librosRouter);

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});


