
let hour = document.querySelector("#hour");
let minute = document.querySelector("#minute");
let second = document.querySelector("#second");
let timeabbr = document.querySelector("#time_abbr");
let greetings = document.querySelector("#greetings");
let userName = document.querySelector("#name");
let userFocus = document.querySelector("#task");


window.onload = function() {
    getCurrentTime();
    displayInfo();
} 

function getCurrentTime() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let timeAbbr = "";

    setBackgroundImg(hour);
    let formatHour = formatHourFunc(hour);
    hour = formatHour.hour;
    timeAbbr = formatHour.timeAbbr;

    displayTime(hour, minute, second, timeAbbr);
}


function addZeroBefore(n) {
    return n < 10 ? "0" + n : n; 
}


function displayTime(h, m, s, abbr) {
    hour.innerHTML = addZeroBefore(h);
    minute.innerHTML = addZeroBefore(m);
    second.innerHTML = addZeroBefore(s);
    timeabbr.innerHTML = abbr;
}


function setBackgroundImg(hour) {
    let body = document.querySelector("body");

    if(hour >= 5 && hour < 12 ) {
        body.style.backgroundImage = "url('./img/morning.jpg')";
        greetings.innerHTML = "Good Morning";
    }
    if(hour >= 12 && hour < 18) {
        body.style.backgroundImage = "url('./img/afternoon.jpg')";
        greetings.innerHTML = "Good Afternoon";
    }
    if(hour >= 18 || hour < 5 ) {
        body.style.backgroundImage = "url('./img/night.jpg')";
        greetings.innerHTML = "Good Evening";
    }
}


function formatHourFunc(hour) {
    let timeAbbr = "";

    if(hour > 12) {
        hour -= 12;
        timeAbbr = "PM";
    }else {
        timeAbbr = "AM";
    }

    return { hour, timeAbbr }
}


setInterval(getCurrentTime, 1000);


[userName, userFocus].forEach(input => {
    input.addEventListener("keypress", function(e) {
        if(e.keyCode == 13) {
            e.preventDefault();
            this.blur();
            // blur() will trigger focusout event
        }
    })
})


function updateUsername() {
    let usernameInput = userName.innerHTML;
    if(usernameInput.trim().length > 0) {
        localStorage.setItem("username", usernameInput);
    } else {
        localStorage.setItem("username", "[Enter Name]");
    }

    displayInfo();
}


function updateUserFocus() {
    let userfocusInput = userFocus.innerHTML;
    if(userfocusInput.trim().length > 0) {
        localStorage.setItem("userfocus", userfocusInput);
    } else {
        localStorage.setItem("userfocus", "[Enter Focus]");
    }

    displayInfo();
}


userName.addEventListener("focusout", updateUsername);
userFocus.addEventListener("focusout", updateUserFocus);


function displayInfo() {
    let getUsernameFromStorage = localStorage.getItem("username");
    let getUserfocusFromStorage = localStorage.getItem("userfocus");

    if(getUsernameFromStorage && getUserfocusFromStorage) {
        getUsernameFromStorage = getUsernameFromStorage[0].toUpperCase() + 
        getUsernameFromStorage.slice(1);
        getUserfocusFromStorage = getUserfocusFromStorage[0].toUpperCase() + 
        getUserfocusFromStorage.slice(1);
    }

    userName.innerHTML =  getUsernameFromStorage || "[Enter Name]";
    userFocus.innerHTML = getUserfocusFromStorage || "[Enter Focus]";
}
