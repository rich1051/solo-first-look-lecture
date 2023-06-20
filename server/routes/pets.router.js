const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// This route *should* return the logged in users pets
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("/pet GET route");
    console.log("is authenticated?", req.isAuthenticated());
    console.log("user", req.user);
    let queryText = `SELECT * FROM "pets"`;
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// This route *should* add a pet for the logged in user
router.post("/", (req, res) => {
// if user is logged in AND access level is 0:
  if (req.isAuthenticated() && req.user.access_level === 0) {
    console.log("/pet POST route");
    console.log(req.body);
    console.log("is authenticated?", req.isAuthenticated());
    console.log("user", req.user);
    //   res.sendStatus(200);
    let queryText = `INSERT INTO "pets" ("name", "user_id")
                VALUES ($1, $2);`;
    pool
      .query(queryText, [req.body.name, req.user.id])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log("Error:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
