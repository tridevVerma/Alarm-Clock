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

  // UPDATE DATE AND TIME
  (function () {
    const time = document.querySelector(".time > h1");
    const date = document.querySelector(".date > h1");
    const fullScreenBtn = document.querySelector(".full-screen > a");
    const fullScreenElem = document.querySelector(".current-datetime ");

    fullScreenBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openFullscreen(fullScreenElem);
    });
    const id = setInterval(function () {
      let datetime = new Date();
      time.innerHTML = getCurrentTime(datetime);
      date.innerHTML = getCurrentDate(datetime);
    }, 1000);
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
  function openFullscreen(elem) {
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
}
