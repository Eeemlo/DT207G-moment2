let url = "http://127.0.0.1:3000/api/work_experience";

async function getData() {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    iterateData(data);
}

getData();

async function iterateData(data) {
    const joblistContainer = document.querySelector(".joblist");
    const jobExperience = data.rows;

    jobExperience.forEach((job) => {
        // Kontrollera om startdate är mer än 10 tecknen
        const shortenedStartdate =
            job.startdate.length > 10
                ? job.startdate.substring(0, 10)
                : job.startdate;
        // Kontrollera att enddate är av typen string och innehåller mer än 10 tecknen
        const shortenedEnddate =
            typeof job.enddate === "string" && job.enddate.length > 10
                ? job.enddate.substring(0, 10)
                : job.enddate;

        if (job.enddate != null) {
            joblistContainer.innerHTML += `<div class="job"><div><h3>${job.job_title} @ </h3>
        <h3>${job.company_name}</h3>
        <h4>${shortenedStartdate} - ${shortenedEnddate}</h4>
        <p>${job.description}</p>
        <button class="editBtn">Redigera</button><button class="deleteBtn">Radera</button>
        </div></div>
        `;
        } else {
            joblistContainer.innerHTML += `<div class="job"><div><h3>${job.job_title} @ </h3>
            <h3>${job.company_name}</h3>
            <h4>${shortenedStartdate} - Pågående</h4>
            <p>${job.description}</p>
            <button class="editBtn">Redigera</button><button class="deleteBtn">Radera</button></div></div>`;
        }
    });
}

async function createJob(
    companyName,
    jobtitle,
    location,
    startdate,
    enddate,
    description
) {
    let workExperience = {
        companyName: companyName,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json",
        },
        body: JSON.stringify(workExperience),
    });

    const data = await response.json();
    console.log(data);
}

async function updateJob(
    id,
    companyName,
    jobtitle,
    location,
    startdate,
    enddate,
    description
) {
    let workExperience = {
        companyName: companyName,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description,
    };

    const response = await fetch(url + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(workExperience),
    });

    const data = await response.json();
    console.log(data);
}

async function deleteJob(id) {
    const response = await fetch(url + "/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    console.log(data);
}

//Ladda in DOM innan JS körs
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.querySelector("#myModal"); //Container för popup
    var btn = document.querySelector("#myBtn"); //Knapp för att öppna popup
    var closeBtn = document.querySelector(".close"); //Kryss för att stänga popup
    /*
    var form = document.querySelector(".courseform");
    var courseListContainer = document.querySelector(".courselist-container");
    var coursecodeInput = document.querySelector("#coursecode");
    var coursenameInput = document.querySelector("#coursename");
    var progressionInput = document.querySelector("#progression");
    var syllabusInput = document.querySelector("#syllabus");
    var deleteBtn = document.querySelector("#deleteBtn"); //Knapp för att öppna popup
    //Ladda in sparade kurser vid sidladdning
    displayCourses();*/
    // Kontrollera att modal, btn och span har validerats innan de används
    if (modal && btn && closeBtn) {
        // WÖppna popup när användare trycker på knappen för "lägg till kurs"
        btn.onclick = function () {
            modal.style.display = "block";
        };
        // Stäng popup när användaren trycker på kryss
        closeBtn.onclick = function () {
            modal.style.display = "none";
        };
        // Stäng popup när användaren trycker utanför popupfönstret
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }
});
