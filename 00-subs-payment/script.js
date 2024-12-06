/************** DECLARACION DE VARIABLES */
const d = document;
const $form = d.querySelector("form");
const $btnSubscribe = d.querySelector(".btn-primary"),
  $btnCancel = d.querySelector(".btn-secondary");
const $boxRadio = d.querySelectorAll(".box-radio"),
  $planBoxRadio = d.querySelectorAll(".plan-box-radio");
const $totalPrice = d.querySelector(".total-price data");
const $fields = d.querySelectorAll(
  '[type="text"],[type="email"], [type="number"], select'
);

/************** FUNCIONES */
function validateRadios(radios, name) {
  console.log("Holaaa");
  const checked = Array.from(radios).filter(
    (radio) => radio.getAttribute("data-checked") === "true"
  );
  if (checked.length === 0) {
    console.log("no checked");
    d.getElementById(`${name}-error`).innerText = "Please select one option";
    return false;
  } else {
    d.getElementById(`${name}-error`).innerText = "";
  }
}
function showErrorMessage(field) {
  field.classList.add("error");
  field.messageNode.innerText = field.validationMessage;
}
function hideErrorMessage(field) {
  field.classList.remove("error");
  field.messageNode.innerText = "";
}
function validateFields() {
  let isValid = true;
  $fields.forEach((field) => {
    if (!field.checkValidity()) {
      isValid &&= false;
      showErrorMessage(field);
    } else {
      hideErrorMessage(field);
    }
  });
  isValid = validateRadios($planBoxRadio, "plan") ? isValid : false;
  isValid = validateRadios($boxRadio, "payment") ? isValid : false;
  return isValid;
}

/************** EVENTOS */
// DOMContentLoaded
d.addEventListener("DOMContentLoaded", (e) => {
  $fields.forEach((field) => {
    field.messageNode = d.getElementById(
      field.getAttribute("aria-describedby")
    );
  });
});
// Eventos relacionados al los 'CTAS' y el formulario
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = validateFields();
  if (isValid) {
    $btnSubscribe.innerText = "Subscribing...";
    setTimeout(() => {
      $btnSubscribe.innerText = "Subscribe";
      $form.reset();
    }, 2000);
  }
});
$btnCancel.addEventListener("click", (e) => {
  $form.reset();
  window.location.reload();
});
// Eventos relacionados a los radios
$boxRadio.forEach((box, indexStarter) => {
  box.addEventListener("click", (e) => {
    const checked = e.target.getAttribute("data-checked");
    if (checked === "true") {
      box.setAttribute("data-checked", false);
    } else {
      d.querySelector(".box-radio[data-checked='true']")?.setAttribute(
        "data-checked",
        false
      );
      box.setAttribute("data-checked", true);
    }
  });
});
$planBoxRadio.forEach((box) => {
  box.addEventListener("click", (e) => {
    const checked = e.target.getAttribute("data-checked");
    if (checked === "true") {
      box.setAttribute("data-checked", false);
    } else {
      d.querySelector(".plan-box-radio[data-checked='true']")?.setAttribute(
        "data-checked",
        false
      );
      box.setAttribute("data-checked", true);
    }
    box.querySelector("input[type='radio']").checked = checked === "false";
  });
});
$planBoxRadio.forEach((box) => {
  box.addEventListener("click", (e) => {
    const checked = box.getAttribute("data-checked") === "true";
    if (checked) {
      let total = box.querySelector("data").value;
      $totalPrice.value = total;
      $totalPrice.innerText = "$" + Math.round(Number(total));
    }
  });
});
