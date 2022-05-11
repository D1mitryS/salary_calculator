const calculatorForm = document.querySelector('#calculator-form');
const salaryInput = document.querySelector("#salary");
const salaryOutput = document.querySelector("#salary-output");
const hoursInput = document.querySelector("#hours");
const daysInput = document.querySelector("#days");
const sleepHoursInput = document.querySelector("#sleep-hours")
const nonPaidHoursInput = document.querySelector("#non-paid-hours");
const submitButton = document.querySelector("#submit");

const month = 31;
const week = 7;
const weeksAtMount = month / week;
const day = 24;


const answerSleepHours = document.querySelector("#answer-1");
const answerActiveHours = document.querySelector("#answer0");
const answerSalary = document.querySelector("#answer1");
const answerWorkHours = document.querySelector("#answer2");
const answerWorkDaysOnWeek = document.querySelector("#answer3");
const answerNonPaidHours = document.querySelector("#answer4")

const answerWorkHoursInWeek = document.querySelector("#answer5");
const answerWorkHoursInMounth = document.querySelector("#answer6");
const answerSalaryInDay = document.querySelector("#answer7");
const answerSalaryInWeek = document.querySelector("#answer8");
const answerSalaryInMounth = document.querySelector("#answer9");
const answerFreeDaysInWeek = document.querySelector("#answer10");
const answerFreeDaysInMounth = document.querySelector("#answer11");
const answerFreeHoursOnWorkDay = document.querySelector("#answer12");
const answerFreeHoursOnWeek = document.querySelector("#answer13");
const answerFreeHoursOnMounth = document.querySelector("#answer14");


salaryInput.addEventListener("input", () => {
    salaryOutput.textContent = salaryInput.value;
})

const turnToNumber = val => {
    return (val !== "") ? Number.parseInt(val, 10) : 0;
}

calculatorForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const sleepHoursNum = turnToNumber(sleepHoursInput.value);
    const workHoursNum = turnToNumber(hoursInput.value);
    const workDaysNum = turnToNumber(daysInput.value);
    const nonPaidHoursNum = turnToNumber(nonPaidHoursInput.value)

    const salaryNum = salaryInput.value
    const activeHoursNum = day - sleepHoursNum;

    answerSleepHours.textContent = sleepHoursNum + " ч."
    answerActiveHours.textContent = activeHoursNum + " ч.";
    answerSalary.textContent = salaryNum + " руб.";
    answerWorkHours.textContent = workHoursNum + " ч.";
    answerWorkDaysOnWeek.textContent = workDaysNum + " дн.";
    answerNonPaidHours.textContent = nonPaidHoursNum + " ч.";

    answerWorkHoursInWeek.textContent = workHoursInWeek(workHoursNum, workDaysNum) + " ч.";
    answerWorkHoursInMounth.textContent =  Math.round(workHoursInMonth(workHoursNum, workDaysNum)) + " ч.";
    answerSalaryInDay.textContent = Math.round(salaryInDay(salaryNum, workHoursNum)) + " руб.";
    answerSalaryInWeek.textContent = Math.round(salaryInWeek(salaryNum, workHoursNum, workDaysNum)) + " руб.";
    answerSalaryInMounth.textContent = Math.round(salaryInMount(salaryNum, workHoursNum, workDaysNum)) + " руб.";
    answerFreeDaysInWeek.textContent = freeDaysInWeek(workDaysNum) + " дн.";
    answerFreeDaysInMounth.textContent = Math.floor(freeDaysInMount(workDaysNum)) + " дн.";
    answerFreeHoursOnWorkDay.textContent = freeHoursOnWorkDay(activeHoursNum, workHoursNum, nonPaidHoursNum )  + " ч.";
    answerFreeHoursOnWeek.textContent = FreeHoursOnWeek(activeHoursNum, workHoursNum, nonPaidHoursNum, workDaysNum)  + " ч.";
    answerFreeHoursOnMounth.textContent = Math.round(FreeHoursOnMount(activeHoursNum, workHoursNum, nonPaidHoursNum, workDaysNum))  + " ч.";
})


const workHoursInWeek = (workHours, workDays) => {
    return workHours * workDays;
}

const workHoursInMonth = (workHours, workDays) => {
    return (workHours * workDays) * weeksAtMount;
}

const salaryInDay = (salaryInHour, workHours) => {
    return salaryInHour * workHours;
}

const salaryInWeek = (salaryInHour, workHours, workDays) => {
    return (salaryInHour * workHours) * workDays;
}

const salaryInMount = (salaryInHour, workHours, workDays) => {
    return ((salaryInHour * workHours) * workDays) * weeksAtMount;
}

const freeDaysInWeek = workDays => {
    return week - workDays;
}

const freeDaysInMount = workDays => {
    return month - (workDays * weeksAtMount)
}

const freeHoursOnWorkDay = (activeHours, workHours, nonPaidHours) => {
    return activeHours - workHours - nonPaidHours
}

const FreeHoursOnWeek = (activeHours, workHours, nonPaidHours , workDays) => {
    return (activeHours * week) - ((workHours + nonPaidHours) * workDays)
}

const FreeHoursOnMount = (activeHours, workHours, nonPaidHours , workDays) => {
    return ((activeHours * week) * weeksAtMount) - (((workHours + nonPaidHours) * workDays) * weeksAtMount);
}
