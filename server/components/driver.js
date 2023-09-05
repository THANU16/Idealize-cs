const express = require("express");
const bcrypt = require("bcrypt");
const decodedUserId = require("../Authentication/decodedToken");
const database = require("../utils/databaseUtils");

const databaseObj = new database();
const router = express.Router();

databaseObj.connectDatabase("Driver");

const connection = databaseObj.connection;

router.post("/add", (req, res) => {
  body = req.body;
  const password = body.password;
  const sessionToken = req.headers.authorization.replace("key ", "");
  const hospitalID = decodedUserId(sessionToken);

  // check the employee already exist or not
  const checkQuery =
    "select id as id, typeID as TypeID, email as email from lifeserver.all_user where email = ? union all select driverID as id, typeID as TypeID, email as email from lifeserver.driver where NIC = ?  limit 2;";

  // type id is the forigen key so we set the forigen key correctly
  const insertQuery =
    "insert into lifeserver.driver (hospitalID, firstName, lastName, phoneNumber, email, password, NIC, address, typeID) values(?,?,?,?,?,?,?,?,?);";

  connection.query(checkQuery, [body.email, body.nic], (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        sucess: false,
        isExist: false,
        error: err,
        result: null,
      });
    } else {
      if (result.length > 0) {
        res.send({
          sucess: false,
          isExist: true,
          error: null,
          result: result,
        });
      } else {
        // encrpt the user pasword
        bcrypt.hash(password, 10, function (err, hash) {
          // store hash in the database
          connection.query(
            insertQuery,
            [
              hospitalID,
              body.firstName,
              body.lastName,
              body.phoneNo,
              body.email,
              hash,
              body.nic,
              body.address,
              "dr",
            ],
            (err, result) => {
              if (err) {
                res.send({
                  sucess: false,
                  isExist: false,
                  error: err,
                  result: null,
                });
              } else {
                res.send({
                  sucess: true,
                  isExist: false,
                  error: null,
                  result: result,
                });
              }
            }
          );
        });
      }
    }
  });
});

router.post("/showDetail", (req, res) => {
  const body = req.body;
  const sessionToken = req.headers.authorization.replace("key ");

  const driverID = decodedUserId(sessionToken);

  const getQuery = "select * from lifeserver.driver where driverID = ?;";

  connection.query(getQuery, driverID, (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        isExist: false,
        error: err,
        result: null,
      });
    } else {
      if (result.length > 0) {
        res.send({
          sucess: true,
          isExist: true,
          error: null,
          result: result,
        });
      } else {
        res.send({
          sucess: false,
          isExist: false,
          error: null,
          result: result,
        });
      }
    }
  });
});

router.post("/setAmbulance", (req, res) => {
  const body = req.body;
  const sessionToken = req.headers.authorization.replace("key ");

  const driverID = decodedUserId(sessionToken);

  const setQuery =
    "insert into lifeserver.ambulanceDriverConnection (ambulance_ID, driverID);"; //=================================================

  connection.query(setQuery, [body.ambulance_ID, driverID], (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        isExist: false,
        error: err,
        result: null,
      });
    } else {
      if (result.length > 0) {
        res.send({
          sucess: true,
          isExist: true,
          error: null,
          result: result,
        });
      } else {
        res.send({
          sucess: false,
          isExist: false,
          error: null,
          result: result,
        });
      }
    }
  });
});

router.post("/setLocation", (req, res) => {
  const body = req.body;
  const sessionToken = req.headers.authorization.replace("key ");

  const ambulanceID = decodedUserId(sessionToken);

  const setQuery =
    "insert into ambulanceLocation (ambulanceID, lat, lng) values (?, ?, ?);";

  connection.query(
    setQuery,
    [ambulanceID, body.lat, body.lng],
    (err, result) => {
      if (err) {
        res.send({
          sucess: false,
          isExist: false,
          error: err,
          result: null,
        });
      } else {
        if (result.length > 0) {
          res.send({
            sucess: true,
            isExist: true,
            error: null,
            result: result,
          });
        } else {
          res.send({
            sucess: false,
            isExist: false,
            error: null,
            result: result,
          });
        }
      }
    }
  );
});

module.exports = router;
