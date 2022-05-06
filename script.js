const salary = document.querySelector("#salary")
const salaryOutput = document.querySelector("#salary-output")
const hours = document.querySelector("#hours");
const days = document.querySelector("#days");
const activeHours = document.querySelector("#active-hours");
const wayToWork = document.querySelector("#way-to-work");
const submit = document.querySelector("#submit");
const mount = 31;
const week = 7;
const weeksAtMount = 31 / 7;

const answerActiveHours = document.querySelector("#answer0");
const answerSalary = document.querySelector("#answer1");
const answerWorkHours = document.querySelector("#answer2");
const answerWorkDaysOnWeek = document.querySelector("#answer3");
const answerWayToWork = document.querySelector("#answer4")
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


salary.addEventListener("input", () => {
    salaryOutput.textContent = salary.value;
})

const trunToNumber = num => {
    return (num !== "") ? Number.parseInt(num, 10) : 0;
}

submit.addEventListener("click", (evt) => {
    evt.preventDefault();
    const activeHoursNum = trunToNumber(activeHours.value);
    const hoursNum = trunToNumber(hours.value);
    const daysNum = trunToNumber(days.value);
    const wayToWorkNum = trunToNumber(wayToWork.value)
    const salaryNum = salary.value

    answerActiveHours.textContent = activeHoursNum + " ч.";
    answerSalary.textContent = salaryNum + " руб.";
    answerWorkHours.textContent = hoursNum + " ч.";
    answerWorkDaysOnWeek.textContent = daysNum + " ч.";
    answerWayToWork.textContent = wayToWorkNum + " ч.";

    answerWorkHoursInWeek.textContent = workHoursInWeek(hoursNum, daysNum) + " ч.";
    answerWorkHoursInMounth.textContent =  Math.floor(workHoursInMount(hoursNum, daysNum)) + " ч.";
    answerSalaryInDay.textContent = salaryInDay(salaryNum, hoursNum) + " руб.";
    answerSalaryInWeek.textContent = salaryInWeek(salaryNum, hoursNum, daysNum) + " руб.";
    answerSalaryInMounth.textContent = Math.floor(salaryInMount(salaryNum, hoursNum, daysNum)) + " руб.";
    answerFreeDaysInWeek.textContent = freeDaysInWeek(daysNum) + " дн.";
    answerFreeDaysInMounth.textContent = Math.floor(freeDaysInMount(daysNum)) + " дн.";
    answerFreeHoursOnWorkDay.textContent = freeHoursOnWorkDay(activeHoursNum, hoursNum, wayToWorkNum )  + " ч.";
    answerFreeHoursOnWeek.textContent = FreeHoursOnWeek(activeHoursNum, hoursNum, wayToWorkNum, daysNum)  + " ч.";
    answerFreeHoursOnMounth.textContent = Math.floor(FreeHoursOnMount(activeHoursNum, hoursNum, wayToWorkNum, daysNum))  + " ч.";
})


const workHoursInWeek = (hours, days) => {
    return hours * days;
}

const workHoursInMount = (hours, days) => {
    return (hours * days) * weeksAtMount;
}

const salaryInDay = (salaryInHour, hours) => {
    return salaryInHour * hours;
}

const salaryInWeek = (salaryInHour, hours, days) => {
    return (salaryInHour * hours) * days;
}

const salaryInMount = (salaryInHour, hours, days) => {
    return ((salaryInHour * hours) * days) * weeksAtMount;
}

const freeDaysInWeek = days => {
    return week - days;
}

const freeDaysInMount = days => {
    return mount - (days * weeksAtMount)
}

const freeHoursOnWorkDay = (activeHours, hours, wayToWorkHours) => {
    return activeHours - hours - wayToWorkHours
}

const FreeHoursOnWeek = (activeHours, hours, wayToWork , days) => {
    return (activeHours * week) - ((hours + wayToWork) * days)
}

const FreeHoursOnMount = (activeHours, hours, wayToWork , days) => {
    return ((activeHours * week) * weeksAtMount) - (((hours + wayToWork) * days) * weeksAtMount);
}
