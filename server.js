const { Client } = require('pg');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); 
const port = process.env.PORT;

//Middlewares
app.use(cors());
app.use(express.json());

//Anslut till databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect((err) => {
    if (err) {
        console.log("fel vid anslutning" + err);
    } else {
        console.log("ansluten till databasen...");
    }
});




//Routing

//Hämta jobberfarenhet
app.get('/api', (req, res) => {
    res.json({message: 'Emmas Work Experience API'})
});

app.get('/api/work_experience', (req, res) => {

    client.query('SELECT * FROM work_experience;', (err, results) => {
        //Om fel...
        if(err) {
            res.status(500).json({error: "Något gick fel: " + err});
            return;
        }
        //Om poster saknas...
        if(results.length === 0) {
            res.status(200).json({message: "Hittade inga poster"});
            //Annars, hämta resultat
        } else {
            res.json(results);
        }
    });
});

//Skapa jobberfarenhet
app.post('/api/work_experience', (req, res) => {
    let companyName = req.body.company_name;
    let jobtitle = req.body.job_title;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

        //Error handling
        let errors = {
            message: "",
            detail: "",
            https_response: {

            }
        }

    if (!companyName || !jobtitle || !location || !startdate) {
        errors.message = "Missing company name and/or jobtitle and/or location and/or startdate";
        errors.detail = "You must include company name, jobtitle, location and startdate";

        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);
        return;
    };

    //Add work experience to database
    client.query('INSERT INTO work_experience(company_name, job_title, location, startdate, enddate, description) VALUES ($1,$2,$3,$4,$5,$6);', [companyName, jobtitle, location, startdate, enddate, description], (err, results) => {
        if(err) {
            res.status(500).json({error: "Något gick fel: " + err});
            return;
        }

        let workExperience = {
            companyName: companyName,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description
        };

        res.json({message: "Jobberfarenhet tillagd", workExperience});
    });
});

//Ändra jobberfarenhet
app.put('/api/work_experience/:id', (req, res) => {
    res.json({message: "Jobberfarenhet uppdaterad: " + req.params.id});
});

//Radera jobberfarenhet
app.delete('/api/work_experience/:id', (req, res) => {
    res.json({message: "Jobberfarenhet raderad: " + req.params.id});
});

//Starta
app.listen(port, () => {
    console.log("Server started on port:" + port);
});