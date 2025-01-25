// document.addEventListener('DOMContentLoaded', function () {
   


//     const search = document.getElementById('search');
//     const username = document.getElementById('username');
//     const statsSection = document.querySelector('.stats-section');
//     const hardlevel = document.querySelector('.hard-level');
//     const easylevel = document.querySelector('.easy-level');
//     const mediumlevel = document.querySelector('.medium-level');
//     const progressEasy = document.querySelector(".easy-progress");
//     const progressMedium = document.querySelector(".medium-progress");
//     const progressHard = document.querySelector(".hard-progress");
    

//     function validate(user) {
//         if (user.trim() === "") {
//             alert("Please enter a username");
//             return false
//         }
//         const regex = /^[a-zA-Z0-9_-]{2,15}$/;
//         if (!regex.test(user)) {
//             alert("Invalid username. Please enter a valid username.");
//             return false;
//         }
//         return true;
//     }
//     async function fetchuserdata(user) {
//         const url = `https://leetcode-stats-api.herokuapp.com/${user}`;

//         try {
//             search.textContent = "Searching....."
//             search.disabled = true;
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error("Unable to fetch the user data")
//             }
//             const data = await response.json();
//             console.log("logging data:", data);
//             userData(data);

//         }
//         catch (error) {
//             console.log(error);
            

//             statsSection.innerHTML = '<p>No data found</p>';

//         }
//         finally {
//             search.textContent = "Search"
//             username.placeholder = "Enter your username again "
//             search.disabled = false;


//         }

//     }
//     function updateprogress(solved, total, level, circle) {
//         const progressDegree = (solved / total) * 100;
//         circle.style.setProperty("--progress-degree", `${progressDegree}%`);
//         level.textContent = `${solved}/${total}`
       
//     }
//     function userData(data) {
       


//         const { totalEasy, totalMedium, totalHard, easySolved, mediumSolved, hardSolved, totalSolved, totalQuestions } = data;

//         updateprogress(easySolved, totalEasy, easylevel, progressEasy);
//         updateprogress(mediumSolved, totalMedium, mediumlevel, progressMedium);
//         updateprogress(hardSolved, totalHard, hardlevel, progressHard);




       

//     }
//     search.addEventListener('click', function () {
//         const user = username.value;
//         // console.log("user",user);
//         if (validate(user)) {
//             fetchuserdata(user);

//         }

//     })


// });



document.addEventListener("DOMContentLoaded", function () {
    const search = document.getElementById("search");
    const username = document.getElementById("username");
    const statsSection = document.querySelector(".stats-section");
    const hardLevel = document.querySelector(".hard-level");
    const easyLevel = document.querySelector(".easy-level");
    const mediumLevel = document.querySelector(".medium-level");
    const progressEasy = document.querySelector(".easy-progress");
    const progressMedium = document.querySelector(".medium-progress");
    const progressHard = document.querySelector(".hard-progress");
    const cardStats=document.querySelector(".card-Stats")

    function validate(user) {
        if (user.trim() === "") {
            alert("Please enter a username");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{2,15}$/;
        if (!regex.test(user)) {
            alert("Invalid username. Please enter a valid username.");
            return false;
        }
        return true;
    }

    async function fetchUserData(user) {
        const url = `https://leetcode-stats-api.herokuapp.com/${user}`;

        try {
            search.textContent = "Searching...";
            search.disabled = true;
            const response = await fetch(url);
            statsSection.classList.add("hidden")

            if (!response.ok) {
                throw new Error("Unable to fetch the user data");
            }

            const data = await response.json();
            console.log("Logging data:", data);
            updateUserData(data);
        } catch (error) {
            console.error(error);
            statsSection.innerHTML = '<p class="text-red-500">No data found</p>';
        } finally {
            search.textContent = "Search";
            username.placeholder = "Enter your username again";
            search.disabled = false;
            statsSection.classList.remove("hidden")

        }
    }

    function updateProgress(solved, total, level, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        level.textContent = `${solved}/${total}`;
    }

    function updateUserData(data) {
        const { totalEasy, totalMedium, totalHard, easySolved, mediumSolved, hardSolved,submissionCalendar,acceptanceRate,contributionPoints,ranking} = data;

        updateProgress(easySolved, totalEasy, easyLevel, progressEasy);
        updateProgress(mediumSolved, totalMedium, mediumLevel, progressMedium);
        updateProgress(hardSolved, totalHard, hardLevel, progressHard);

        const totalSubmissions = Object.values(submissionCalendar).reduce((sum, count) => sum + count, 0);
        const carddata=[
            
            {label:"Total Submissions", value:totalSubmissions},
            {label:"Acceptance Rate", value:acceptanceRate},
            {label:"Earned Points", value:contributionPoints},
            {label:"Ranking", value:ranking}

        ]
       cardStats.innerHTML=carddata.map(
        dataItem=>{
            return `<div class="card bg-slate-700 shadow-md rounded-2xl p-4 border-none  border-gray-200  ">
            <h3 class="text-lg font-semibold text-white">${dataItem.label}</h3>
            <p class="text-xl font-bold text-black mt-2">${dataItem.value}</p>
          </div>`
        }
       ).join(" ");
        
    }

    search.addEventListener("click", function () {
        const user = username.value;
        if (validate(user)) {
            fetchUserData(user);
        }
    });
});
