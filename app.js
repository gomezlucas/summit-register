const baseUrl = "https://stagingapi.thelogisticsworld.com/v1/events/register";

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

// Función para enviar la Data
async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set appropriate content type
      },
      body: JSON.stringify(data), // Convert object to JSON string for body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json(); // Parse response as JSON if needed
    console.log(responseData);
    return responseData; // Return the response data (optional)
  } catch (error) {
    console.error("Error:", error);
    // Handle the error appropriately
  }
}

// Función para obtener los UTMs 
function getUTMParams() {
  const url = window.location.href;

  const queryString = new URL(url).searchParams;

  const utmParams = {};

  for (const [key, value] of queryString.entries()) {
     utmParams[key] = value;
  }

  return utmParams;
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
      console.log("entro");
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
    const stepCreated = document.querySelector(".register_step-created");
    const stepRegistered = document.querySelector(".register_step-registered");
    const languageWrapper = document.querySelector(".language_wrapper_wrapper");
    const emailConfirmationValue = document.getElementById("emailConfirmationInput").value;
    const userEmail = document.getElementById("user_email")
    userEmail.textContent = emailConfirmationValue
    const userAgent = navigator;


     submitButton.classList.add("disabled");
    submitButton.textContent = "Enviando...";
      
    const {utm_source,utm_medium, utm_campaign,utm_term, utm_content} = getUTMParams();
 
    console.log(userAgent, 'the user agent is')

    const data = {
      email: emailConfirmationValue,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      device: "mobile",
      event_type_id: 1,
    };
    console.log(data)


/*
    postData(baseUrl, data)
      .then((responseData) => {
        if (responseData) {
          step1.classList.add("closing");
          step1.addEventListener(
            "animationend",
            () => {
              step1.classList.add("hide");
              languageWrapper.classList.add("hide");
              step1.classList.remove("closing");
              if (responseData.msj == "Usuario creado. Se ha enviado un mail de validación"){
                stepCreated.classList.add("show");
              }else{
                stepRegistered.classList.add("show");
              }
            },
            { once: true }
          );
        } else {
          console.log("Data submitted successfully.");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
*/
 
    const responseData = "Usuario crado. Se ha enviado un mail de validación"
    setTimeout(() => {
      //   submitButton.classList.remove("disabled");
      //  submitButton.textContent = "INICIAR REGISTRO";
      step1.classList.add("closing");
      step1.addEventListener(
        "animationend",
        () => {
          step1.classList.add("hide");
          languageWrapper.classList.add("hide");
          step1.classList.remove("closing");
          if (responseData == "Usuario creado. Se ha enviado un mail de validación"){
            stepCreated.classList.add("show");
          }else{
            stepRegistered.classList.add("show");
          }
        },
        { once: true }
      );

    }, 1000);
  });
});
