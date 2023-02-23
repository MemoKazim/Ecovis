function hideAll() {
  elements = document.querySelectorAll(".s2-item");
  elements.forEach((element) => {
    element.classList.add("hidden");
  });
}
function deactiveAll() {
  var loop_counter = 0;
  selected_topic = document.querySelectorAll(`.sub-section-item`);
  selected_topic.forEach((element) => {
    loop_counter += 1;
    element.classList.remove("active");
    child_elements = element.childNodes[1].childNodes;
    child_elements[1].classList.remove("active");
    child_elements[3].classList.remove("active");
    white_logo = document.querySelectorAll(".item-logo")[loop_counter - 1];
    white_logo.src = "images/ecovis_logo.svg";
  });
  elements = document.querySelectorAll(".sub-section-item");
  child_elements = elements[0].childNodes;
  elements.forEach((element) => {
    element.classList.remove("active");
  });
}

function showItem(item_number) {
  hideAll();
  deactiveAll();
  selected_item = document.querySelectorAll(`#section-2-item-${item_number}`);
  selected_item[0].classList.remove("hidden");
  selected_topic = document.querySelectorAll(`#section-1-item-${item_number}`);
  selected_topic[0].classList.add("active");
  child_elements = selected_topic[0].childNodes[1].childNodes;
  console.log(child_elements);
  child_elements[1].classList.add("active");
  child_elements[3].classList.add("active");
  white_logo = document.querySelectorAll(".item-logo")[item_number - 1];
  white_logo.src = "../images/ecovis_logo_white.svg";
}

// function deactiveDots() {
//   all_dots = document.querySelectorAll(".s3-dots");
//   all_dots.forEach((dot) => {
//     dot.classList.remove("active-dot");
//   });
// }

// function activateDot(dot_number) {
//   deactiveDots();
//   current_dot = document.querySelectorAll(`#section-3-dot-${dot_number}`)[0];
//   console.log(current_dot);
//   current_dot.classList.add("active-dot");
// }

let section1_height = document.querySelector(".section-1").clientHeight;

console.log(document.getElementsByClassName("section-2")[0]);
console.log(section1_height);

document.getElementById("section-2").style.top = section1_height + "px";

$(document).ready(function () {
  $(".customer-logos").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });
});
