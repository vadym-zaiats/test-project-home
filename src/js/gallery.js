"use strict";
let offset = 0;
let parent = document.querySelector(".home");
let sliderLine = document.querySelector(".home__galery--img");
let first = document.querySelector(".home__info--list_1");
let second = document.querySelector(".home__info--list_2");

parent.addEventListener("click", (e) => {
  if (e.target.classList.contains("home__info--arrows_right")) {
    offset += 777;
    if (offset > 777) {
      offset = 0;
    }
    sliderLine.style.left = -offset + "px";
    first.classList.toggle("active");
    second.classList.toggle("active");
  }
  if (e.target.classList.contains("home__info--arrows_left")) {
    offset -= 777;
    if (offset < 0) {
      offset = 777;
    }
    sliderLine.style.left = -offset + "px";
    first.classList.toggle("active");
    second.classList.toggle("active");
  }
});

