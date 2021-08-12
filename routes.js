const routes = [
  { path: "", page: "home/index.html", title: "Home" },
  { path: "about", page: "about/index.html", title: "About" },
  { path: "members", page: "members/index.html", title: "Members" },
];

const renderRoute = () => {
  let paths = window.location.pathname.split("/");
  paths.shift();
  paths.shift();
  console.log(paths);
  let routePath = paths.toString().replace(/,/g, "/");
  console.log(routePath);
  routes
    .filter((route) => route.path === routePath)
    .forEach((route) => {
      let selectedPage = route.page;
      let spaUrl = `http://localhost/zerobstacle/pages/${selectedPage}`;
      console.log(spaUrl);
      api.get(
        spaUrl,
        (html) => {
          console.log(html);
          document.title = route.title;
          document.getElementById("content").innerHTML = html;
        },
        (onError) => {
          document.title = route.title;
          let spaUrl = `http://localhost/zerobstacle/pages/error/404.html`;
          spaUrl = "http://localhost/zerobstacle/api/members";
          console.log(spaUrl);
          api.get(
            spaUrl,
            (html) => {
              console.log(html);
              document.getElementById("content").innerHTML = html;
            },
            (onError) => {},
            false
          );
        },
        false
      );
    });
};
