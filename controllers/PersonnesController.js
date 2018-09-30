const mysql = require('mysql'),
  config = require('../config/DB'),
  connection = mysql.createConnection(config.DB.dbconfig);


// Fetch all data
exports.getList = function (request, response) {
  connection.query("SELECT * FROM personnes", null, function (error, recordset) {
    if (error) {
      console.log(error);
      response.json(error);
    } else {
      response.json(recordset);
    }
  });
};

// Fetch data by id
exports.get = function (request, response, id) {
  connection.query("SELECT * FROM personnes WHERE id = " + request.params.id, null, function (error, recordset) {
    if (error) {
      console.log(error);
      response.json(error);
    } else {
      response.json(recordset);
    }
  });
};

// Add data
exports.add = function (request, response) {
  try {
    if (!request.body) throw new Error("Input not valid");
    let data = request.body;

    if (data) {
      let sql = 'INSERT INTO personnes SET ?';
      let personne = {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        password: data.password,
        age: data.age,
        adresse: data.adresse
      };
      connection.query(sql, personne, function (error, recordset) {
        if (error) {
          console.log(error);
          response.json(error);
        } else {
          response.status(200).json({
            id: recordset.insertId,
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            password: data.password,
            age: data.age,
            adresse: data.adresse
          });
          console.log(response);

        }
      });
    } else {
      throw new Error("Input not valid");
    }
  } catch (exception) {
    throw new Error("Exception " + exception);
  }
};

// Update data
exports.update = function (request, response) {
  try {
    if (!request.body) throw new Error("Input not valid");
    let data = request.body;
    if (data) {
      if (!request.params.id) throw new Error("ID not provided !");
      let sql = "UPDATE personnes SET nom = '" + data.nom + "',  prenom = '" + data.prenom + "',  email = '" + data.email + "',  password = '" + data.password + "',  age = '" + data.age + "',  adresse = '" + data.adresse + "' WHERE id = " + request.params.id;
      connection.query(sql, null, function (error, recordset) {
        if (error) {
          console.log(error);
          response.json(error);
        } else {
          response.status(200).json({
            id: request.params.id,
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            password: data.password,
            age: data.age,
            adresse: data.adresse
          });
        }
      });
    } else {
      throw new Error("Input not valid");
    }
  } catch (exception) {
    throw new Error("Exception " + exception);
  }
};

// Delete data
exports.delete = function (request, response) {
  try {
    if (!request.params) throw new Error("Input not valid");
    let data = request.params;
    if (data) {
      if (!data.id) throw new Error("ID not provided !");
      let sql = "DELETE FROM personnes WHERE id = " + data.id;
      connection.query(sql, null, function (error, recordset) {
        if (error) {
          console.log(error);
          response.json(error);
        } else {
          response.status(200).json({
            'Supression': 'Personne supprimée avec succès !'
          });
        }
      });
    } else {
      throw new Error("Input not valid");
    }
  } catch (exception) {
    throw new Error("Exception " + exception);
  }
};
