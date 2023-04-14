const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();

const pool = new pg.Pool({
  user: 'houssam',
  host: 'localhost',
  database: 'formulaire',
  password: 'houssam',
  port: 5432
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/" method="post">
            <label>Name:</label>
            <input type="text" name="name" /><br />
            <label>Email:</label>
            <input name="email" /><br />
            <input type="submit" value="Submit" />
        </form>
    `);
});

app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const query = `SELECT * FROM personne WHERE nom = '${name}' AND email = '${email}'`;

    console.log(query);

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.send({
                "code": 400,
                "failed": "error ocurred",
                "message": err
            })
        } else {
            res.send(result.rows);
        }
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
