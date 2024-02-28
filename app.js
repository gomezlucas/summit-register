function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

// Función para mostrar el resultado de la validación
function showValidationResult(email, isValid) {
  const okIcon = document.querySelector(".icon_ok");
  const errorIcon = document.querySelector(".icon_error");

  if (email.value == "") {
    /* okIcon.classList.remove("active");
    errorIcon.classList.remove("active");
    email.classList.remove("error");*/
    return;
  } else if (isValid) {
    okIcon.classList.add("active");
    errorIcon.classList.remove("active");
    email.classList.remove("error");
  } else {
    okIcon.classList.remove("active");
    errorIcon.classList.add("active");
    email.classList.add("error");
  }
}

// Funcion para comparar ambos Inputs
function validateEmailConfirmation(email, emailConfirmation) {
  const iconOk = document.querySelector(".icon_ok_conf");
  const iconError = document.querySelector(".icon_error_conf");

  if (
    email.value === emailConfirmation.value &&
    emailConfirmation.value !== ""
  ) {
    // Emails coinciden
    emailConfirmationInput.classList.remove("error");
    iconOk.classList.add("active");
    iconError.classList.remove("active");
    return true;
  } else {
    // Emails no coinciden
    emailConfirmationInput.classList.add("error");
    iconOk.classList.remove("active");
    iconError.classList.add("active");
  }
  return false;
}

// Funcion para Activar el botón
function checkButton(isValid, isEqual) {
  const submitButton = document.getElementById("submitButton");
  if (isValid && isEqual) {
    submitButton.classList.remove("disabled");
  } else {
    submitButton.classList.add("disabled");
  }
}

// Handle para el navbar Mobile
/*
function openNavbar(navbarButton) {
  let hiddenElement = document.querySelector(".hero_left_text_wrapper");

  if (navbarButton.classList.contains("open")) {
    navbarButton.classList.remove("open");
    hiddenElement.classList.remove("show");
  } else {
    navbarButton.classList.add("open");
    hiddenElement.classList.add("show");
  }
}
*/

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("emailInput");
  const emailConfirmationInput = document.getElementById(
    "emailConfirmationInput"
  );
  /*const navbarButton = document.getElementById("navbar_button");*/
  const form = document.getElementById("register_form");

  let isValid = false;
  emailInput.addEventListener("keyup", (e) => {
    isValid = validateEmail(emailInput.value);
    showValidationResult(emailInput, isValid);
    if (emailConfirmationInput.value !== "") {
      console.log("entro")
      isEqual = validateEmailConfirmation(emailInput, emailConfirmationInput);
    }
  });

  let isEqual = false;
  emailConfirmationInput.addEventListener("keyup", (e) => {
    isEqual = validateEmailConfirmation(emailInput, emailConfirmationInput);
    checkButton(isValid, isEqual);
  });
  /*
  emailConfirmationInput.onpaste = function(e) {
    e.preventDefault();
   }

   */
/*
  navbarButton.addEventListener("click", (e) => {
    openNavbar(navbarButton);
  });
*/

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = document.getElementById("submitButton");
    const step1 = document.querySelector(".register_step-1");
    const stepOk = document.querySelector(".register_step-ok");
    const languageWrapper = document.querySelector(".language_wrapper_wrapper");

    submitButton.classList.add("disabled");
    submitButton.textContent = "Enviando...";

    setTimeout(() => {
      submitButton.classList.remove("disabled");
      submitButton.textContent = "INICIAR REGISTRO";
      step1.classList.add("closing");

      step1.addEventListener(
        "animationend",
        () => {
          step1.classList.add("hide");
          languageWrapper.classList.add("hide");
          step1.classList.remove("closing");
          stepOk.classList.add("show");
        },
        { once: true }
      );
    }, 1000);
  });
});
