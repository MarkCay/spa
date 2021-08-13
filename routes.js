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
    path: "attendance",
    page: "attendance/index.html",
    title: "Attendance",
    template: "main.html",
  },
  {
    path: "team",
    page: "team/index.html",
    title: "Team",
    template: "main.html",
  },
  {
    path: "standards/api",
    page: "standards/api/index.html",
    title: "API Standards",
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
  showLoader(true);
  let paths = window.location.pathname.split("/");
  paths.shift();
  paths.shift();
  let routePath = paths.toString().replace(/,/g, "/");
  let filtered = routes.filter((route) => route.path === routePath);

  let spaLinks = document.querySelectorAll("a.spa");

  for (let i = 0; i < spaLinks.length; i++) {
    const href = spaLinks[i].href;
    if (window.location.href === href) {
      spaLinks[i].classList.add("active");
    } else {
      spaLinks[i].classList.remove("active");
    }
  }

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
