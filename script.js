

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
    const cardStats = document.querySelector(".card-stats");
    const usernameInput = document.querySelector(".username-input");
    const userPart = document.querySelector(".user-part");
    const check = document.querySelector(".check");
    const para = document.querySelector(".para");


    function validate(user) {
        try {
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
        } catch (error) {
            console.error("Validation error:", error);
            return false;
        }
    }

    async function fetchUserData(user) {
        const url = `https://leetcode-stats-api.herokuapp.com/${user}`;

        try {
            search.textContent = "Searching...";
            search.disabled = true;
            username.disabled = true;

            statsSection.classList.add("hidden");

            const response = await fetch(url);
            console.log(response);


            if (!response.ok) {
                throw new Error("Unable to fetch the user data");

            }

            const data = await response.json();
            console.log("Logging data:", data);


            if (data.status === "success") {
                updateUserData(data);
                statsSection.classList.remove("hidden");
                userPart.classList.add("hidden")
                para.innerHTML = `<p class="text-3xl text-center  font-bold">Hey ${user} this is your stats</p>`
                check.addEventListener("click", () => {
                    statsSection.classList.add("hidden");
                    userPart.classList.remove("hidden")
                    search.disabled = false;

                })

            } else {
                statsSection.classList.remove("hidden");
                statsSection.innerHTML = `<p class="text-3xl text-red-500">${data.message}  please enter a valid user</p>`;

            }
        } catch (error) {
            console.error("Error fetching user data:", error);

            statsSection.classList.remove("hidden");
            statsSection.innerHTML = `<p class="text-red-500">${error.message}</p>`;
        } finally {
            search.textContent = "Search";
            username.placeholder = "Enter your username again";
            search.disabled = false;
            username.disabled = false;



        }
    }

    function updateProgress(solved, total, level, circle) {
        try {
            const progressDegree = (solved / total) * 100;
            circle.style.setProperty("--progress-degree", `${progressDegree}%`);
            level.textContent = `${solved}/${total}`;
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    }

    function updateUserData(data) {
        try {
            const {
                totalEasy,
                totalMedium,
                totalHard,
                easySolved,
                mediumSolved,
                hardSolved,
                submissionCalendar,
                acceptanceRate,
                contributionPoints,
                ranking,
            } = data;

            updateProgress(easySolved, totalEasy, easyLevel, progressEasy);
            updateProgress(mediumSolved, totalMedium, mediumLevel, progressMedium);
            updateProgress(hardSolved, totalHard, hardLevel, progressHard);

            const totalSubmissions = Object.values(submissionCalendar).reduce(
                (sum, count) => sum + count,
                0
            );

            const cardData = [
                { label: "Total Submissions", value: totalSubmissions },
                { label: "Acceptance Rate", value: acceptanceRate },
                { label: "Earned Points", value: contributionPoints },
                { label: "Ranking", value: ranking },
            ];

            cardStats.innerHTML = cardData
                .map((dataItem) => {
                    return `<div class="card bg-slate-700 shadow-md rounded-2xl p-4 border-none border-gray-200">
                        <h3 class="text-lg font-semibold text-white">${dataItem.label}</h3>
                        <p class="text-xl font-bold text-black mt-2">${dataItem.value}</p>
                    </div>`;
                })
                .join(" ");
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    search.addEventListener("click", function () {
        const user = username.value;
        if (validate(user)) {
            fetchUserData(user);
        }
    });
});
