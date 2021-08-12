api.get(
  "http://192.168.1.89/zerobstacle/api/members",
  (success) => {
    console.log(success);
  },
  (e) => {
    console.error(e);
  }
);

window.onload = () => {
  const a = document.getElementsByTagName("a");
  renderRoute();
  for (let i = 0; i < a.length; i++) {
    a[i].addEventListener("click", (event) => {
      event.preventDefault();
      const href = a[i].href;
      navigateTo(href);
    });
  }
};

const navigateTo = (path) => {
  window.history.pushState({}, null, path);
  let urlPath = window.location.pathname;
  renderRoute();
};
