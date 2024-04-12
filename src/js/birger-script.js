document.querySelector(".open").addEventListener("click", (e) => {
  e.target.classList.add("hide");
  document.querySelector(".close").classList.remove("hide");
  document.querySelector(".header__content--nav_list").classList.add("on");
});

document.querySelector(".close").addEventListener("click", (e) => {
  e.target.classList.add("hide");
  document.querySelector(".open").classList.remove("hide");
  document.querySelector(".header__content--nav_list").classList.remove("on");
});

const burger = document.querySelector(".header__content--nav_list");
document.addEventListener("click", (e) => {
  if (
    !e.composedPath().includes(burger) &&
    burger.classList.contains("on") &&
    !e.target.classList.contains("header__content--burger")
  ) {
    document.querySelector(".header__content--nav_list").classList.remove("on");
    document.querySelector(".open").classList.remove("hide");
    document.querySelector(".close").classList.add("hide");
  }
});

window.addEventListener("resize", () => {
  document.querySelector(".header__content--nav_list").classList.remove("on");
  document.querySelector(".close").classList.add("hide");
  document.querySelector(".open").classList.remove("hide");
});

