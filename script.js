/* Table cells */
const answerSaslaryPerHourTaxed = document.querySelector("#answer-hour-salary-taxed");
const answerSalaryPerHourUntaxed = document.querySelector("#answer-hour-salary-untaxed");

const answerSalaryPerDay = document.querySelector("#answer-day-salary");
const answerSalaryPerWeek = document.querySelector("#answer-week-salary");
const answerSalaryPerMonth = document.querySelector("#answer-month-salary");

const answerTotalSalaryPerDay = document.querySelector("#answer-day-full-salary");
const answerTotalSalaryPerWeek = document.querySelector("#answer-week-full-salary");
const answerTotalSalaryPerMonth = document.querySelector("#answer-month-full-salary");

const answerSalaryPerDayUntaxed = document.querySelector("#answer-day-salary-untaxed");
const answerSalaryPerWeekUntaxed = document.querySelector("#answer-week-salary-untaxed");
const answerSalaryPerMonthUntaxed = document.querySelector("#answer-month-salary-untaxed");

const answerTotalSalaryPerDayUntaxed = document.querySelector("#answer-day-full-salary-untaxed");
const answerTotalSalaryPerWeekUntaxed = document.querySelector("#answer-week-full-salary-untaxed");
const answerTotalSalaryPerMonthUntaxed = document.querySelector("#answer-month-full-salary-untaxed");

const answerWorkHoursPerDay = document.querySelector("#answer-day-work-hours");
const answerWorkHoursPerWeek = document.querySelector("#answer-week-work-hours");
const answerWorkHoursPerMonth = document.querySelector("#answer-month-work-hours");

const answerWorkDaysPerWeek = document.querySelector("#answer-week-work-days");
const answerWorkDaysPerMonth = document.querySelector("#answer-month-work-days");

const answerFreeDaysPerWeek = document.querySelector("#answer-week-free-days");
const answerFreeDaysPerMonth = document.querySelector("#answer-month-free-days");

const answerNonPaidHoursPerDay = document.querySelector("#answer-day-non-paid-hours");
const answerNonPaidHoursPerWeek = document.querySelector("#answer-week-non-paid-hours");
const answerNonPaidHoursPerMonth = document.querySelector("#answer-month-non-paid-hours");

const answerFreeHoursOnWorkDay = document.querySelector("#answer-workday-free-hours");
const answerFreeHoursPerWeek = document.querySelector("#answer-week-free-hours");
const answerFreeHoursPerMonth = document.querySelector("#answer-month-free-hours");

const answerWakeHoursPerDay = document.querySelector("#answer-hours-active");
const answerSleepHoursPerDay = document.querySelector("#answer-hours-sleep");

/* Base parameters */
const daysInMonth = 31;
const hoursInDay = 24;
const daysInWeek = 7;
const weeksAtMont = daysInMonth / daysInWeek;
const nolog = 13;

/* Input fields */
const calculatorForm = document.querySelector('#calculator-form');
const salaryIntegerInput = document.querySelector("#salary-integer");
const salaryNonIntegerInput = document.querySelector("#salary-non-integer")
const hoursInput = document.querySelector("#hours");
const daysInput = document.querySelector("#days");
const nonPaidHoursInput = document.querySelector("#non-paid-hours");
const bonusInput = document.querySelector("#bonus");
const fineInput = document.querySelector("#fine");
const sleepHoursInput = document.querySelector("#sleep-hours");

/* Controls if salary value has to be passed to getUntaxed function */
const taxCheckbox = document.querySelector("#tax");

/* Transform values from input fields to number and perform calculations  */
calculatorForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const salaryInteger = valToNum(salaryIntegerInput.value);
    const salaryNonInteger = getNonIntegerNum(salaryNonIntegerInput.value);
    const salarySummarized = salaryInteger + salaryNonInteger;

    const workHours = valToNum(hoursInput.value);
    const workDays = valToNum(daysInput.value);
    const nonPaidHours = valToNum(nonPaidHoursInput.value);
    const bonus = valToNum(bonusInput.value);
    const fine = valToNum(fineInput.value);
    const sleepHours = valToNum(sleepHoursInput.value);

    const wakeHours = getWakeHours(hoursInDay, sleepHours);
    const totalBonus = getTotalBonus(bonus, fine);

    /* All calculations are based on this const which depends on taxCheckbox value  */
    const salaryTaxed = (taxCheckbox.checked) ? salarySummarized : getTaxed(salarySummarized);

    /* First two cells gets it's text content directly from salary input field based on taxCheckbox value */
    if (taxCheckbox.checked) {
        answerSaslaryPerHourTaxed.textContent = salarySummarized;
        answerSalaryPerHourUntaxed.textContent = getUntaxed(salarySummarized)
    } else {
        answerSaslaryPerHourTaxed.textContent = getTaxed(salarySummarized);
        answerSalaryPerHourUntaxed.textContent = salarySummarized;
    };

    /* Table cell gets text content from calling the functions with arguments stated above */
    answerSalaryPerDay.textContent = getSalaryPerDay(salaryTaxed, workHours);
    answerSalaryPerWeek.textContent = getSalaryPerWeek(salaryTaxed, workHours, workDays);
    answerSalaryPerMonth.textContent = getSalaryPerMonth(salaryTaxed, workHours, workDays);

    answerTotalSalaryPerDay.textContent = getSalaryTotal(getSalaryPerDay(salaryTaxed, workHours), getBonusPerDay(totalBonus, workDays));
    answerTotalSalaryPerWeek.textContent = getSalaryTotal(getSalaryPerWeek(salaryTaxed, workHours, workDays), getBonusPerWeek(totalBonus, workDays));
    answerTotalSalaryPerMonth.textContent = getSalaryTotal(getSalaryPerMonth(salaryTaxed, workHours, workDays), totalBonus);

    answerSalaryPerDayUntaxed.textContent = getSalaryUntaxed(getSalaryPerDay(salaryTaxed, workHours));
    answerSalaryPerWeekUntaxed.textContent = getSalaryUntaxed(getSalaryPerWeek(salaryTaxed, workHours, workDays));
    answerSalaryPerMonthUntaxed.textContent = getSalaryUntaxed(getSalaryPerMonth(salaryTaxed, workHours, workDays));

    answerTotalSalaryPerDayUntaxed.textContent = getSalaryTotalUntaxed(getSalaryPerDay(salaryTaxed, workHours), getBonusPerDay(totalBonus, workDays));
    answerTotalSalaryPerWeekUntaxed.textContent = getSalaryTotalUntaxed(getSalaryPerWeek(salaryTaxed, workHours, workDays), getBonusPerWeek(totalBonus, workDays));
    answerTotalSalaryPerMonthUntaxed.textContent = getSalaryTotalUntaxed(getSalaryPerMonth(salaryTaxed, workHours, workDays), totalBonus);

    answerWorkHoursPerDay.textContent = workHours;
    answerWorkHoursPerWeek.textContent = getWorkHoursPerWeek(workHours, workDays);
    answerWorkHoursPerMonth.textContent = getWorkHoursPerMonth(workHours, workDays);

    answerWorkDaysPerWeek.textContent = workDays;
    answerWorkDaysPerMonth.textContent = getWorkDaysPerMonth(workDays);

    answerFreeDaysPerWeek.textContent = getFreeDaysPerWeek(workDays);
    answerFreeDaysPerMonth.textContent = getFreeDaysPerMonth(workDays);

    answerNonPaidHoursPerDay.textContent = nonPaidHours;
    answerNonPaidHoursPerWeek.textContent = getNonPaidHoursPerWeek(nonPaidHours, workDays);
    answerNonPaidHoursPerMonth.textContent = getNonPaidHoursPerMonth(nonPaidHours, workDays);

    answerFreeHoursOnWorkDay.textContent = getFreeHoursOnWorkDay(wakeHours, workHours, nonPaidHours);
    answerFreeHoursPerWeek.textContent = getFreeHoursPerWeek(wakeHours, workHours, nonPaidHours, workDays);
    answerFreeHoursPerMonth.textContent = getFreeHoursPerMonth(wakeHours, workHours, nonPaidHours, workDays);

    answerWakeHoursPerDay.textContent = wakeHours;
    answerSleepHoursPerDay.textContent = sleepHours;
});

/* Optimizes units display for table cells */
let unitsHidden = true;

calculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (unitsHidden) {
        const units = document.querySelectorAll(".units");
        units.forEach(unit => {
            unit.hidden = false;
        });

        unitsHidden = false;
    };
});

/* Gives input fields values from presets object array based on select value */
const presetSelect = document.querySelector("#preset-select");
const presets = [{
    name: 'планктон',
    salaryInteger: 3,
    salaryNonInteger: 5,
    workHours: 8,
    workDays: 5,
    nonPaid: 2,
    bonus: 300,
    fine: 0,
    sleepHours: 8
},
{
    name: 'общепит',
    salaryInteger: 2,
    salaryNonInteger: 5,
    workHours: 12,
    workDays: 4,
    nonPaid: 2,
    bonus: 600,
    fine: 100,
    sleepHours: 6
},
{
    name: 'студент',
    salaryInteger: 2,
    salaryNonInteger: 5,
    workHours: 6,
    workDays: 4,
    nonPaid: 1,
    bonus: 0,
    fine: 0,
    sleepHours: 6
},
{
    name: 'живу с мамой',
    salaryInteger: 2,
    salaryNonInteger: 5,
    workHours: 4,
    workDays: 5,
    nonPaid: 1,
    bonus: 0,
    fine: 0,
    sleepHours: 8
},
{
    name: 'тунеядец',
    salaryInteger: 0,
    salaryNonInteger: 0,
    workHours: 0,
    workDays: 0,
    nonPaid: 24,
    bonus: 0,
    fine: 65,
    sleepHours: 8
}
];

presetSelect.addEventListener("change", () => {
    if (presetSelect.value) {
        const presetNum = valToNum(presetSelect.value);

        salaryIntegerInput.value = presets[presetNum].salaryInteger;
        salaryNonIntegerInput.value = presets[presetNum].salaryNonInteger;
        hoursInput.value = presets[presetNum].workHours;
        daysInput.value = presets[presetNum].workDays;
        nonPaidHoursInput.value = presets[presetNum].nonPaid;
        bonusInput.value = presets[presetNum].bonus;
        fineInput.value = presets[presetNum].fine;
        sleepHoursInput.value = presets[presetNum].sleepHours;
    };
});


const valToNum = val => {
    return Number.parseInt(val, 10) || 0;
};


/* Adds and removes 13% tax */
const getUntaxed = num => {
    return num + ((num / 100) * nolog);
};
const getTaxed = num => {
    return num - ((num / 100) * nolog);
};


const getWakeHours = (hoursInDay, sleepHours) => {
    return hoursInDay - sleepHours;
};


const getTotalBonus = (bonus, fine) => {
    return bonus - fine;
};


const getSalaryPerDay = (salaryInHour, workHours) => {
    return salaryInHour * workHours;
};

const getSalaryPerWeek = (salaryInHour, workHours, workDays) => {
    return getSalaryPerDay(salaryInHour, workHours) * workDays;
};

const getSalaryPerMonth = (salaryInHour, workHours, workDays) => {
    return Math.round(getSalaryPerWeek(salaryInHour, workHours, workDays) * weeksAtMont);
};


const getBonusPerDay = (totalBonus, workDays) => {
    return (totalBonus > 0) ? totalBonus / getWorkDaysPerMonth(workDays) : 0;
};

const getBonusPerWeek = (totalBonus, workDays) => {
    return getBonusPerDay(totalBonus, workDays) * workDays;
};


const getSalaryTotal = (salaryInPeriod, bonusInPeriod) => {
    return Math.round(salaryInPeriod + bonusInPeriod);
};

const getSalaryUntaxed = salaryInPeriod => {
    return Math.round(getUntaxed(salaryInPeriod))
};

const getSalaryTotalUntaxed = (salaryInPeriod, bonusInPerion) => {
    return Math.round(getSalaryUntaxed(salaryInPeriod) + bonusInPerion);
};


const getWorkHoursPerWeek = (workHours, workDays) => {
    return workHours * workDays;
};

const getWorkHoursPerMonth = (workHours, workDays) => {
    return Math.round(getWorkHoursPerWeek(workHours, workDays) * weeksAtMont);
};


const getWorkDaysPerMonth = workDays => {
    return Math.round(workDays * weeksAtMont);
};

const getFreeDaysPerWeek = workDays => {
    return daysInWeek - workDays;
};

const getFreeDaysPerMonth = workDays => {
    return daysInMonth - getWorkDaysPerMonth(workDays);
};


const getNonPaidHoursPerWeek = (nonPaidHours, workDays) => {
    return nonPaidHours * workDays;
};

const getNonPaidHoursPerMonth = (nonPaidHours, workDays) => {
    return Math.round(getNonPaidHoursPerWeek(nonPaidHours, workDays) * weeksAtMont);
};


const getFreeHoursOnWorkDay = (wakeHours, workHours, nonPaidHours) => {
    const result = wakeHours - workHours - nonPaidHours;
    return (result >= 0) ? result : wakeHours;
};

const getFreeHoursPerWeek = (wakeHours, workHours, nonPaidHours, workDays) => {
    const freeHoursOnWorkingDays = getFreeHoursOnWorkDay(wakeHours, workHours, nonPaidHours) * workDays;
    const freeHoursOnDayOffs = wakeHours * (getFreeDaysPerWeek(workDays));
    return freeHoursOnWorkingDays + freeHoursOnDayOffs;
};

const getFreeHoursPerMonth = (wakeHours, workHours, nonPaidHours, workDays) => {
    const freeHoursPerWeek = getFreeHoursPerWeek(wakeHours, workHours, nonPaidHours, workDays)
    return Math.round(freeHoursPerWeek * weeksAtMont);
};

const getNonIntegerNum = value => {
    if (value) {
        switch (value.length) {
            case 1:
                return Number(value) / 10;
            case 2:
                return Number(value) / 100;
        };
    };
    return 0;
};