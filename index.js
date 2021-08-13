// api.get(
//   "http://localhost/zerobstacle/api/members",
//   (success) => {
//     console.log(success);
//   },
//   (e) => {
//     console.error(e);
//   }
// );

const showLoader = (flag) => {
  document.getElementById("content").innerHTML = `
        <div class="loader-container">
          <div class="loader-hourglass"></div>
        </div>`;
};

const showNoInternet = (flag) => {
  if (flag) {
    document.getElementById(
      "content"
    ).innerHTML += `<div class="no-internet"><div class="status"></div><div class="message">No Internet Connection!</div></div>`;
  } else {
    document.querySelector(".no-internet").remove();
  }
};

const init = () => {
  const a = document.querySelectorAll("a.spa");
  renderRoute();
  for (let i = 0; i < a.length; i++) {
    a[i].addEventListener("click", (event) => {
      let href = a[i].href;
      event.preventDefault();
      navigateTo(href);
    });
  }
};

window.onload = () => {
  init();
};

window.addEventListener("online", () => {
  showNoInternet(false);
  // init();
});
window.addEventListener("offline", () => {
  showNoInternet(true);
});

const navigateTo = (path) => {
  window.history.pushState({}, null, path);
  renderRoute();
};
