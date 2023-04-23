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
      this.hourMinSecDisplay.innerText = `${convertToTwoDigits(
        this.hours
      )}:${convertToTwoDigits(this.minutes)}:${convertToTwoDigits(
        this.seconds
      )}`;
      this.miliSecDisplay.innerText = `${convertToTwoDigits(this.miliseconds)}`;
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

      this.hourMinSecDisplay.innerText = `${convertToTwoDigits(
        this.hours
      )}:${convertToTwoDigits(this.minutes)}:${convertToTwoDigits(
        this.seconds
      )}`;
      this.miliSecDisplay.innerText = `${convertToTwoDigits(this.miliseconds)}`;
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

    startBtn.addEventListener("click", function () {
      newStopWatch.start();
      pauseBtn.addEventListener("click", function () {
        newStopWatch.pause();
      });
      stopBtn.addEventListener("click", function () {
        newStopWatch.stop();
      });
    });
  })();

  // GET CURRENT TIME AND FORMAT IT
  function getCurrentTime(currentTime) {
    return `${convertToTwoDigits(
      currentTime.getHours() % 12
    )}:${convertToTwoDigits(currentTime.getMinutes())}:${convertToTwoDigits(
      currentTime.getSeconds()
    )} ${currentTime.getHours() >= 12 ? "PM" : "AM"}`;
  }

  // GET CURRENT DATE AND FORMAT IT
  function getCurrentDate(currentDate) {
    const day = daysList[currentDate.getDay()];
    const month = monthsList[currentDate.getMonth()];
    const date = convertToTwoDigits(currentDate.getDate());
    const year = currentDate.getFullYear();

    return `${day} ${month} ${date} ${year}`;
  }

  // CONVERT SINGLE DIGIT NUBMER TO TWO DIGIT STRING
  function convertToTwoDigits(num) {
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
}
