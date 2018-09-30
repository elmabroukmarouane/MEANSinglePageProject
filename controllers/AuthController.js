const mysql = require('mysql'),
  config = require('../config/DB'),
  connection = mysql.createConnection(config.DB.dbconfig);
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.login = function (request, response) {
  try {
    if (!request.body) throw new Error("Input not valid");
    let data = request.body;
    if (data) {
      let sql = "SELECT * FROM personnes WHERE email = '" + data.email + "';";
      connection.query(sql, null, function (error, recordset) {
        if (error) {
          console.log(error);
          response.json(error);
        } else {
          if (!recordset || recordset.length === 0) {
            response.status(403).json({
              message: 'Authentification échouée. Email ou mot de passe erroné !'
            });
          } else {
            bcrypt.compare(data.password, recordset[0].password, function (err, res) {
              if (res) {
                let user = {
                  nom: recordset[0].nom,
                  prenom: recordset[0].prenom,
                  email: recordset[0].email,
                  age: recordset[0].age,
                  adresse: recordset[0].adresse,
                };
                const token = jwt.sign(user, process.env.JWT_SECRET);
                response.status(200).send({
                  user: user,
                  token: token,
                  message: 'OK !'
                });
              } else {
                response.status(403).json({
                  message: 'Authentification échouée. Email ou mot de passe erroné !'
                });
              }
            });
          }
        }
      });
    } else {
      throw new Error("Input not valid");
    }
  } catch (exception) {
    throw new Error("Exception " + exception);
  }
};
