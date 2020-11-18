const aHour = document.querySelector(".a-hour"),
    aMinute = document.querySelector(".a-minute"),
    aSecond = document.querySelector(".a-second"),
    dTime = document.querySelector(".d-time"),
    dBtn = document.querySelector(".d-button"),
    header = document.querySelector(".header");

let hour24 = false;

function fillZero(num) {
    num = num + "";
    if (num.length < 2) {
        return "0" + num;
    } else {
        return num;
    }
}

function changeTime() {
    if (hour24) {
        hour24 = false;
    }
    else {
        hour24 = true;
        dBtn.innerHTML = "24H";
    }
}

function drawClock() {
    const now = new Date();

    let hour = now.getHours();
    const minute = now.getMinutes(),
        second = now.getSeconds(),
        year = now.getFullYear(),
        month = now.getMonth(),
        day = now.getDate();
    
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const hourDegree = (hour + minute / 60) * (360 / 12) + 90,
        minuteDegree = (minute + second / 60) * (360 / 60) + 90,
        secondDegree = second * (360 / 60) + 90;
    
    aHour.style.transform = `rotate(${hourDegree}deg)`;
    aMinute.style.transform = `rotate(${minuteDegree}deg)`;
    aSecond.style.transform = `rotate(${secondDegree}deg)`
    
    if (!hour24) {
        if (hour >= 0 && hour <= 11) {
            if (hour == 0) hour = 12;
            dBtn.innerHTML = "AM";
        } else {
            if (hour >= 13) hour -= 12;
            dBtn.innerHTML = "PM";
        }
    }

    dTime.innerHTML = `${fillZero(hour)} : ${fillZero(minute)} : ${fillZero(second)}`;
    header.innerHTML = `Today is <span>${day} ${monthList[month]}</span>, ${year}`;
}

function init() {
    setInterval(drawClock, 1000);
    dBtn.addEventListener("click", changeTime);
}

init();