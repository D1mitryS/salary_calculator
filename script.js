const calculatorForm = document.querySelector('#calculator-form');
const presetSelect = document.querySelector("#preset-select");
const salaryOutput = document.querySelector("#salary-output");
const salaryInput = document.querySelector("#salary");
const taxCheckbox = document.querySelector("#tax");
const hoursInput = document.querySelector("#hours");
const daysInput = document.querySelector("#days");
const nonPaidHoursInput = document.querySelector("#non-paid-hours");
const bonusInput = document.querySelector("#bonus");
const fineInput = document.querySelector("#fine");
const sleepHoursInput = document.querySelector("#sleep-hours");
const submitButton = document.querySelector("#submit");


const month = 31;
const day = 24;
const week = 7;
const weeksAtMont = month / week;
const nolog = 13;


const answerSalaryTaxed = document.querySelector("#answer-salary-taxed");
const answerSalaryUntaxed = document.querySelector("#answer-salary-untaxed");

const answerSalaryInDay = document.querySelector("#answer-salary-at-day");
const answerSalaryInWeek = document.querySelector("#answer-salary-at-week");
const answerSalaryInMonth = document.querySelector("#answer-salary-at-month");

const answerFullSalaryInDay = document.querySelector("#answer-full-salary-at-day");
const answerFullSalaryInWeek = document.querySelector("#answer-full-salary-at-week");
const answerFullSalaryInMonth = document.querySelector("#answer-full-salary-at-month");

const answerSalaryInDayUntaxed = document.querySelector("#answer-untaxed-salary-at-day");
const answerSalaryInWeekUntaxed = document.querySelector("#answer-untaxed-salary-at-week");
const answerSalaryInMonthUntaxed = document.querySelector("#answer-untaxed-salary-at-month");

const answerFullSalaryInDayUntaxed = document.querySelector("#answer-untaxed-full-salary-at-day");
const answerFullSalaryInWeekUntaxed = document.querySelector("#answer-untaxed-full-salary-at-week");
const answerFullSalaryInMonthUntaxed = document.querySelector("#answer-untaxed-full-salary-at-month");

const answerWorkHoursInDay = document.querySelector("#answer-work-hours-at-day");
const answerWorkHoursInWeek = document.querySelector("#answer-work-hours-at-week");
const answerWorkHoursInMonth = document.querySelector("#answer-work-hours-at-month");

const answerWorkDaysOnWeek = document.querySelector("#answer-work-days-at-week");
const answerWorkDaysOnMonth = document.querySelector("#answer-work-days-at-month");

const answerFreeDaysInWeek = document.querySelector("#answer-freedays-in-week");
const answerFreeDaysInMonth = document.querySelector("#answer-freedays-in-month");

const answerNonPaidHours = document.querySelector("#answer-non-paid-hours");

const answerFreeHoursOnWorkDay = document.querySelector("#answer-freehours-on-workday");
const answerFreeHoursOnWeek = document.querySelector("#answer-freehours-on-week");
const answerFreeHoursOnMonth = document.querySelector("#answer-freehours-on-month");

const answerActiveHours = document.querySelector("#answer-active-hours");
const answerSleepHours = document.querySelector("#answer-sleep-time");


const presets = [{
        name: 'планктон',
        salary: 5,
        workHours: 8,
        workDays: 5,
        nonPaid: 2,
        bonus: 300,
        fine: 0,
        sleepHours: 8
    },
    {
        name: 'общепит',
        salary: 2.5,
        workHours: 12,
        workDays: 4,
        nonPaid: 2,
        bonus: 600,
        fine: 100,
        sleepHours: 8
    },
    {
        name: 'студент',
        salary: 3.5,
        workHours: 6,
        workDays: 4,
        nonPaid: 1,
        bonus: 0,
        fine: 0,
        sleepHours: 8
    },
    {
        name: 'живу с мамой',
        salary: 3.5,
        workHours: 4,
        workDays: 5,
        nonPaid: 1,
        bonus: 0,
        fine: 0,
        sleepHours: 8
    },
    {
        name: 'тунеядец',
        salary: 0,
        workHours: 0,
        workDays: 0,
        nonPaid: 24,
        bonus: 0,
        fine: 65,
        sleepHours: 8
    }
]


presetSelect.addEventListener("change", () => {
    const presetValue = presetSelect.value;

    if (presetValue !== 'standard') {
        salaryInput.value = presets[presetValue].salary;
        salaryOutput.value = presets[presetValue].salary;

        hoursInput.value = presets[presetValue].workHours;
        daysInput.value = presets[presetValue].workDays;
        nonPaidHoursInput.value = presets[presetValue].nonPaid;
        bonusInput.value = presets[presetValue].bonus;
        fineInput.value = presets[presetValue].fine;
        sleepHoursInput.value = presets[presetValue].sleepHours;
    }
})


salaryInput.addEventListener("input", () => {
    salaryOutput.textContent = salaryInput.value;
})


const valToNum = val => {
    return (val) ? Number.parseInt(val, 10) : 0;
}


calculatorForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const workHours = valToNum(hoursInput.value);
    const workDays = valToNum(daysInput.value);
    const nonPaidHours = valToNum(nonPaidHoursInput.value);
    const sleepHours = valToNum(sleepHoursInput.value);
    const activeHours = day - sleepHours;
    

    const bonus = valToNum(bonusInput.value);
    const fine = valToNum(fineInput.value);
    const totalBonus = bonus - fine;


    let salaryInHour = 0;

    if (taxCheckbox.checked) {
        salaryInHour = valToNum(salaryInput.value);
        
        answerSalaryTaxed.textContent = salaryInHour;
        answerSalaryUntaxed.textContent = getUntaxed(salaryInHour);
    }
    else {
        salaryInHour = getTaxed(valToNum(salaryInput.value));
        
        answerSalaryTaxed.textContent = salaryInHour;
        answerSalaryUntaxed.textContent = valToNum(salaryInput.value);
    }


    answerSalaryInDay.textContent = getSalaryInDay(salaryInHour, workHours) + " руб.";
    answerSalaryInWeek.textContent = getSalaryInWeek(salaryInHour, workHours, workDays) + " руб.";
    answerSalaryInMonth.textContent = getSalaryInMount(salaryInHour, workHours, workDays) + " руб.";

    answerFullSalaryInDay.textContent = getFullSalary(getSalaryInDay(salaryInHour, workHours), getBonusInDay(totalBonus, workDays)) + " руб.";
    answerFullSalaryInWeek.textContent = getFullSalary(getSalaryInWeek(salaryInHour, workHours, workDays), getBonusInWeek(totalBonus, workDays)) + " руб.";
    answerFullSalaryInMonth.textContent = getFullSalary(getSalaryInMount(salaryInHour, workHours, workDays), totalBonus) + " руб.";

    answerSalaryInDayUntaxed.textContent = getSalaryWoTax(getSalaryInDay(salaryInHour, workHours)) + " руб.";
    answerSalaryInWeekUntaxed.textContent = getSalaryWoTax(getSalaryInWeek(salaryInHour, workHours, workDays)) + " руб.";
    answerSalaryInMonthUntaxed.textContent = getSalaryWoTax(getSalaryInMount(salaryInHour, workHours, workDays)) + " руб.";

    answerFullSalaryInDayUntaxed.textContent = getFullSalaryWoTax(getSalaryInDay(salaryInHour, workHours), getBonusInDay(totalBonus, workDays)) + " руб.";
    answerFullSalaryInWeekUntaxed.textContent = getFullSalaryWoTax(getSalaryInWeek(salaryInHour, workHours, workDays), getBonusInWeek(totalBonus, workDays)) + " руб.";
    answerFullSalaryInMonthUntaxed.textContent = getFullSalaryWoTax(getSalaryInMount(salaryInHour, workHours, workDays), totalBonus) + " руб.";

    answerWorkHoursInDay.textContent = workHours + " ч.";
    answerWorkHoursInWeek.textContent = getWorkHoursInWeek(workHours, workDays) + " ч.";
    answerWorkHoursInMonth.textContent = getWorkHoursInMonth(workHours, workDays) + " ч.";

    answerWorkDaysOnWeek.textContent = workDays + " дн.";
    answerWorkDaysOnMonth.textContent = getWorkDaysInMonth(workDays) + " дн";

    answerFreeDaysInWeek.textContent = getFreeDaysInWeek(workDays) + " дн.";
    answerFreeDaysInMonth.textContent = getFreeDaysInMount(workDays) + " дн.";

    answerNonPaidHours.textContent = nonPaidHours + " ч.";

    answerFreeHoursOnWorkDay.textContent = getFreeHoursOnWorkDay(activeHours, workHours, nonPaidHours) + " ч.";
    answerFreeHoursOnWeek.textContent = getFreeHoursOnWeek(activeHours, workHours, nonPaidHours, workDays) + " ч.";
    answerFreeHoursOnMonth.textContent = getFreeHoursOnMount(activeHours, workHours, nonPaidHours, workDays) + " ч.";

    answerActiveHours.textContent = activeHours + " ч.";
    answerSleepHours.textContent = sleepHours + " ч."
})


const getUntaxed = num => {
    return num + (num / 100) * nolog ;
}

const getTaxed = num => {
    return num - (num / 100) * nolog;
}


const getSalaryInDay = (salaryInHour, workHours) => {
    return salaryInHour * workHours;
}

const getSalaryInWeek = (salaryInHour, workHours, workDays) => {
    return getSalaryInDay(salaryInHour, workHours) * workDays;
}

const getSalaryInMount = (salaryInHour, workHours, workDays) => {
    return Math.round(getSalaryInWeek(salaryInHour, workHours, workDays) * weeksAtMont);
}


const getBonusInDay = (totalBonus, workDays) => {
    return (totalBonus > 0) ? totalBonus / getWorkDaysInMonth(workDays) : 0;
}

const getBonusInWeek = (totalBonus, workDays) => {
    return getBonusInDay(totalBonus, workDays) * workDays;
}


const getFullSalary = (salaryInPeriod, bonusInPeriod) => {
    return Math.round(salaryInPeriod + bonusInPeriod);
}


const getSalaryWoTax = salaryInPeriod => {
    return Math.round(getUntaxed(salaryInPeriod))
}


const getFullSalaryWoTax = (salaryInPeriod, bonusInPerion) => {
    return Math.round(getSalaryWoTax(salaryInPeriod) + bonusInPerion);
}


const getWorkHoursInWeek = (workHours, workDays) => {
    return workHours * workDays;
}

const getWorkHoursInMonth = (workHours, workDays) => {
    return Math.round(getWorkHoursInWeek(workHours, workDays) * weeksAtMont);
}


const getWorkDaysInMonth = workDays => {
    return Math.round(workDays * weeksAtMont);
}


const getFreeDaysInWeek = workDays => {
    return week - workDays;
}

const getFreeDaysInMount = workDays => {
    return month - getWorkDaysInMonth(workDays);
}


const getFreeHoursOnWorkDay = (activeHours, workHours, nonPaidHours) => {
    if (workHours === 0) {
        return activeHours
    }
    return activeHours - workHours - nonPaidHours
}

const getFreeHoursOnWeek = (activeHours, workHours, nonPaidHours, workDays) => {
    return getFreeHoursOnWorkDay(activeHours, workHours, nonPaidHours) * workDays + activeHours * (week - workDays);
}

const getFreeHoursOnMount = (activeHours, workHours, nonPaidHours, workDays) => {
    return Math.round(getFreeHoursOnWeek(activeHours, workHours, nonPaidHours, workDays) * weeksAtMont);
}