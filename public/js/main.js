let url = "http://127.0.0.1:3000/api/work_experience";

async function getData() {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data); 
}

getData();

async function createJob(companyName, jobtitle, location, startdate, enddate, description) {
    let workExperience = {
        companyName: companyName,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(workExperience)
    });

    const data = await response.json();
    console.log(data);
};

async function updateJob(id, companyName, jobtitle, location, startdate, enddate, description) {
    let workExperience = {
        companyName: companyName,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    };

    const response = await fetch(url + '/' + id, { // Lägg till id i URL:en för att ange vilket jobb som ska uppdateras
        method: "PUT", // Använd PUT-metoden för att uppdatera
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workExperience)
    });

    const data = await response.json();
    console.log(data);
};

async function deleteJob(id) {
    const response = await fetch(url + '/' + id, { // Lägg till id i URL:en för att ange vilket jobb som ska raderas
        method: "DELETE", // Använd DELETE-metoden för att radera
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log(data);
}