{
  const daysList = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const monthsList = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  let NO_OF_ALARMS = 0;

  // STOP-WATCH FUNCTIONALITY
  class stopWatch {
    constructor(hourMinSec, miliSec) {
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.miliseconds = 0;
      this.intervalId = null;
      this.hourMinSecDisplay = hourMinSec;
      this.miliSecDisplay = miliSec;
    }

    start() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(this.displayTime, 17);
    }

    pause() {
      clearInterval(this.intervalId);
    }

    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;

      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.miliseconds = 0;
      this.hourMinSecDisplay.innerText = `${addZero(this.hours)}:${addZero(
        this.minutes
      )}:${addZero(this.seconds)}`;
      this.miliSecDisplay.innerText = `${addZero(this.miliseconds)}`;
    }

    displayTime = () => {
      this.miliseconds = this.miliseconds + 1;

      if (this.miliseconds >= 60) {
        this.miliseconds = 0;
        this.seconds = this.seconds + 1;

        if (this.seconds >= 60) {
          this.seconds = 0;
          this.minutes = this.minutes + 1;

          if (this.minutes >= 60) {
            this.minutes = 0;
            this.hours = this.hours + 1;
          }
        }
      }

      this.hourMinSecDisplay.innerText = `${addZero(this.hours)}:${addZero(
        this.minutes
      )}:${addZero(this.seconds)}`;
      this.miliSecDisplay.innerText = `${addZero(this.miliseconds)}`;
    };
  }

  // IIFE
  (function () {
    // LISTENER FOR FULL-SCREEN
    const fullScreenBtn = document.querySelector(".full-screen > a");
    fullScreenBtn.addEventListener("click", (e) => openFullscreen(e));

    // SET THEME OF PROJECT -- [DARK, LIGHT]
    const themeBtn = document.querySelector(".form-check-input");
    themeBtn.addEventListener("change", (e) => setTheme(e));

    // SET AND DISPLAY CURRENT DATE-TIME
    setInterval(setCurrentDateTime, 1000);

    // SET AND DISPLAY STOP-WATCH TIME
    const startBtn = document.querySelector(".stop-watch-controls > .start");
    const pauseBtn = document.querySelector(".stop-watch-controls > .pause");
    const stopBtn = document.querySelector(".stop-watch-controls > .stop");

    const hourMinSec = document.querySelector(
      "#stop-watch-timer > #hour-min-sec"
    );
    const miliSec = document.querySelector("#stop-watch-timer > #milisec");

    const newStopWatch = new stopWatch(hourMinSec, miliSec);

    // LISTENERS FOR STOP-WATCH
    startBtn.addEventListener("click", function () {
      newStopWatch.start();
      pauseBtn.addEventListener("click", function () {
        newStopWatch.pause();
      });
      stopBtn.addEventListener("click", function () {
        newStopWatch.stop();
      });
    });

    // PRESET ALARM FORM WITH CURRENT DATE AND TIME
    const setAlarmBtn = document.querySelector(".set-alarm");
    setAlarmBtn.addEventListener("click", presetAlarmFields);

    // LISTENER TO LISTEN FORM SUBMIT EVENT TO CREATE NEW ALARM
    const alarmForm = document.querySelector("#alarm-form");
    alarmForm.addEventListener("submit", (e) => setNewAlarm(e));
  })();

  // GET CURRENT TIME AND FORMAT IT
  function getCurrentTime(currentTime) {
    return `${addZero(currentTime.getHours() % 12)}:${addZero(
      currentTime.getMinutes()
    )}:${addZero(currentTime.getSeconds())} ${
      currentTime.getHours() >= 12 ? "PM" : "AM"
    }`;
  }

  // GET CURRENT DATE AND FORMAT IT
  function getCurrentDate(currentDate) {
    const day = daysList[currentDate.getDay()];
    const month = monthsList[currentDate.getMonth()];
    const date = addZero(currentDate.getDate());
    const year = currentDate.getFullYear();

    return `${day} ${month} ${date} ${year}`;
  }

  // CONVERT SINGLE DIGIT NUBMER TO TWO DIGIT STRING
  function addZero(num) {
    return `0${num}`.slice(-2);
  }

  // ENTER/EXIT FULL SCREEN
  function openFullscreen(e) {
    e.preventDefault();
    const elem = document.querySelector(".current-datetime ");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  // SET PROJECT THEME
  function setTheme(e) {
    const html = document.querySelector("html");
    const themeText = document.querySelector(".form-check-label");
    const themeValue = e.target.checked ? "dark" : "light";
    html.setAttribute("data-theme", themeValue);
    themeText.innerText = themeValue;
  }

  // SET CURRENT DATE-TIME
  function setCurrentDateTime() {
    const time = document.querySelector(".time > h1");
    const date = document.querySelector(".date > h1");
    let datetime = new Date();
    time.innerHTML = getCurrentTime(datetime);
    date.innerHTML = getCurrentDate(datetime);
  }

  // PRESET ALARM FIELDS
  function presetAlarmFields() {
    const hourField = document.getElementById("hour");
    const minuteField = document.getElementById("minute");
    const secondField = document.getElementById("second");
    const dateField = document.getElementById("select-date");
    const meridiemField = document.getElementById("meridiem");

    let datetime = new Date();

    hourField.value = addZero(datetime.getHours() % 12);
    minuteField.value = addZero(datetime.getMinutes());
    secondField.value = addZero(datetime.getSeconds());
    meridiemField.value = datetime.getHours() >= 12 ? "PM" : "AM";

    dateField.valueAsDate = datetime;
  }

  function setNewAlarm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title");
    const hour = formData.get("hour");
    const minute = formData.get("minute");
    const second = formData.get("second");
    const meridiem = formData.get("meridiem");

    const dateString = formData.get("select-date");
    const year = dateString.substring(0, 4);
    const month = dateString.substring(5, 7);
    const date = dateString.substring(8);

    const li = document.createElement("li");

    const alarmTime = `${monthsList[month - 1]} ${date} ${year} ${addZero(
      hour
    )}:${addZero(minute)}:${addZero(second)} ${meridiem}`;

    li.innerHTML = `<span>${title} - (${alarmTime})</span><a href="#" class="delete-alarm">
    <span><i class="fa-solid fa-trash"></i></span>
  </a>`;

    const alarmsList = document.querySelector(".active-alarms > ul");

    alarmsList.prepend(li);
    NO_OF_ALARMS += 1;

    const newAlarmId = setInterval(() => {
      const datetime = new Date();
      let currentTime =
        getCurrentDate(datetime) + " " + getCurrentTime(datetime);
      currentTime = currentTime.substring(4);
      if (alarmTime == currentTime) {
        alert(title);
        clearInterval(newAlarmId);
        NO_OF_ALARMS -= 1;
        alarmsList.removeChild(li);
      }
      // console.log(alarmTime);
      // console.log(currentTime);
    }, 1000);

    // DELETE ALARM LISTENER
    deleteAlarm(li, alarmsList, newAlarmId);
  }

  // DELETE ALARM FROM DOM AND CLEAR INTERAL FOR RUNNING ALARM INSTANCE
  function deleteAlarm(li, alarmsList, alarmId) {
    const deleteLink = li.querySelector(".delete-alarm");
    deleteLink.addEventListener("click", function (e) {
      e.preventDefault();
      alarmsList.removeChild(li);
      clearInterval(alarmId);
    });
  }
}
