//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { OAuth2Client } = require('google-auth-library');

//---------------------------INICIALIZACIONES DE VARIABLES---------------------------//

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

//---------------------------ELABORACION DE FUNSIONES FLECHA ASINCRONAS O SINCRONAS---------------------------//

async function googleVerify( token = '' ) {
  
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { name, picture, email } = ticket.getPayload();

  return {
    nameUser: name,
    imageUser: picture,
    emailUser: email
  }

}

module.exports = {
    googleVerify
}