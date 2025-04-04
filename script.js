// Define Variables
const inputElements = document.querySelectorAll(".card__input");
const submitButton = document.querySelector(".card__button");

// Validate Day
const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};

// Validate Month
const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};

// Validate Year
const validateYear = (year) => {
  const currentYear = new Date().getFullYear();

  if (year && year > 0 && year <= currentYear) {
    return true;
  }
};

// Check Validation of Date
const isDateValid = (dayElement, MonthElement, yearElement) => {
  let isValid = [false, false, false];

  if (!validateDay(dayElement.value)) {
    dayElement.classList.add("card__input--error");
  } else {
    isValid[0] = true;
    dayElement.classList.remove("card__input--error");
  }

  if (!validateMonth(MonthElement.value)) {
    MonthElement.classList.add("card__input--error");
  } else {
    isValid[1] = true;
    MonthElement.classList.remove("card__input--error");
  }

  if (!validateYear(yearElement.value)) {
    yearElement.classList.add("card__input--error");
  } else {
    isValid[2] = true;
    yearElement.classList.remove("card__input--error");
  }

  return isValid.every((item) => item === true);
};

// Function for calculte age
const calculateAge = (year, month, day) => {
  const today = new Date();
  const birthdate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
};

// Function for Click Button
const onClickHandler = () => {
  const dayElement = document.querySelector(".card__input[name='day']");
  const MonthElement = document.querySelector(".card__input[name='month']");
  const yearElement = document.querySelector(".card__input[name='year']");
  const resultElement = document.querySelector(".card__resultValue");

  if (!isDateValid(dayElement, MonthElement, yearElement)) {
    resultElement.textContent = "--";
    return;
  }

  const result = calculateAge(
    yearElement.value,
    MonthElement.value,
    dayElement.value
  );

  resultElement.textContent = result;
};

inputElements.forEach((item) => {
  item.addEventListener("keydown", (event) => {
    event.key === "Enter" && onClickHandler();
  });
});

submitButton.addEventListener("click", onClickHandler);
