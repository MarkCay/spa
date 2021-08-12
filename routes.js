const routes = [
  {
    path: "",
    page: "home/index.html",
    title: "Home",
    template: "main.html",
  },
  {
    path: "about",
    page: "about/index.html",
    title: "About",
    template: "main.html",
  },
  {
    path: "members",
    page: "members/index.html",
    title: "Members",
    template: "main.html",
  },
];

const loadPage = (title, pageUrl, isSuccess = (flag) => {}) => {
  document.title = title;
  api.get(
    pageUrl,
    (html) => {
      document.getElementById("content").innerHTML = html;
      isSuccess(true);
    },
    (onError) => isSuccess(false),
    false
  );
};

const renderRoute = () => {
  let paths = window.location.pathname.split("/");
  paths.shift();
  paths.shift();
  let routePath = paths.toString().replace(/,/g, "/");
  let filtered = routes.filter((route) => route.path === routePath);

  if (filtered.length === 0) {
    loadPage(
      "404 Not Found",
      `http://localhost/zerobstacle/pages/error/404.html`
    );
  }

  filtered.forEach((route) => {
    let selectedPage = route.page;
    loadPage(
      route.title,
      `http://localhost/zerobstacle/pages/${selectedPage}`,
      (isSuccess) => {
        !isSuccess &&
          loadPage(
            route.title,
            `http://localhost/zerobstacle/pages/error/404.html`
          );
      }
    );
  });
};
