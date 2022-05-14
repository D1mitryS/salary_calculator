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


const answerHourSalaryTaxed = document.querySelector("#answer-hour-salary-taxed");
const answerHourSalaryUntaxed = document.querySelector("#answer-hour-salary-untaxed");

const answerDaySalary = document.querySelector("#answer-day-salary");
const answerWeekSalary = document.querySelector("#answer-week-salary");
const answerMonthSalary = document.querySelector("#answer-month-salary");

const answerDayFullSalary = document.querySelector("#answer-day-full-salary");
const answerWeekFullSalary = document.querySelector("#answer-week-full-salary");
const answerMonthFullSalary = document.querySelector("#answer-month-full-salary");

const answerDaySalaryUntaxed = document.querySelector("#answer-day-salary-untaxed");
const answerWeekSalaryUntaxed = document.querySelector("#answer-week-salary-untaxed");
const answerMonthSalaryUntaxed = document.querySelector("#answer-month-salary-untaxed");

const answerDayFullSalaryUntaxed = document.querySelector("#answer-day-full-salary-untaxed");
const answerWeekFullSalaryUntaxed = document.querySelector("#answer-week-full-salary-untaxed");
const answerMonthFullSalaryUntaxed = document.querySelector("#answer-month-full-salary-untaxed");

const answerDayWorkHours = document.querySelector("#answer-day-work-hours");
const answerWeekWorkHours = document.querySelector("#answer-week-work-hours");
const answerMonthWorkHours = document.querySelector("#answer-month-work-hours");

const answerWeekWorkDays = document.querySelector("#answer-week-work-days");
const answerMonthkWorkDays = document.querySelector("#answer-month-work-days");

const answerWeekFreeDays = document.querySelector("#answer-week-free-days");
const answerMonthFreeDays = document.querySelector("#answer-month-free-days");

const answerDayNonPaidHours = document.querySelector("#answer-day-non-paid-hours");
const answerWeekNonPaidHours = document.querySelector("#answer-week-non-paid-hours");
const answerMonthNonPaidHours = document.querySelector("#answer-month-non-paid-hours");

const answerWorkDayFreeHours = document.querySelector("#answer-workday-free-hours");
const answerWeekFreeHours = document.querySelector("#answer-week-free-hours");
const answerMonthFreeHours = document.querySelector("#answer-month-free-hours");

const answerHoursActive = document.querySelector("#answer-hours-active");
const answerHoursSleep = document.querySelector("#answer-hours-sleep");


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

const month = 31;
const day = 24;
const week = 7;
const weeksAtMont = month / week;
const nolog = 13;


presetSelect.addEventListener("change", () => {
    const selectVal = presetSelect.value;

    if (selectVal !== 'standard') {
        salaryInput.value = presets[selectVal].salary;
        salaryOutput.value = presets[selectVal].salary;

        hoursInput.value = presets[selectVal].workHours;
        daysInput.value = presets[selectVal].workDays;
        nonPaidHoursInput.value = presets[selectVal].nonPaid;
        bonusInput.value = presets[selectVal].bonus;
        fineInput.value = presets[selectVal].fine;
        sleepHoursInput.value = presets[selectVal].sleepHours;
    }
})


salaryInput.addEventListener("input", () => {
    salaryOutput.textContent = salaryInput.value;
})


const valToNum = val => {
    return (val) ? Number.parseInt(val, 10) : 0;
}


const getUntaxed = num => {
    return num + (num / 100) * nolog;
}

const getTaxed = num => {
    return num - (num / 100) * nolog;
}


const getActiveHours = (day, sleepHours) => {
    return day - sleepHours;
}

const getTotalBonus = (bonus, fine) => {
    return bonus - fine;
}


calculatorForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const salary = valToNum(salaryInput.value)
    const workHours = valToNum(hoursInput.value);
    const workDays = valToNum(daysInput.value);
    const nonPaidHours = valToNum(nonPaidHoursInput.value);
    const bonus = valToNum(bonusInput.value);
    const fine = valToNum(fineInput.value);
    const sleepHours = valToNum(sleepHoursInput.value);

    const activeHours = getActiveHours(day, sleepHours);
    const totalBonus = getTotalBonus(bonus, fine);


    let salaryTransformed = 0;

    if (taxCheckbox.checked) {
        answerHourSalaryTaxed.textContent = salary
        answerHourSalaryUntaxed.textContent = getUntaxed(salary)

        salaryTransformed = salary;
    } else {
        answerHourSalaryTaxed.textContent = getTaxed(salary);
        answerHourSalaryUntaxed.textContent = salary;

        salaryTransformed = getTaxed(salary);
    };


    answerDaySalary.textContent = getDaySalary(salaryTransformed, workHours);
    answerWeekSalary.textContent = getWeekSalary(salaryTransformed, workHours, workDays);
    answerMonthSalary.textContent = getMonthSalary(salaryTransformed, workHours, workDays);

    answerDayFullSalary.textContent = getFullSalary(getDaySalary(salaryTransformed, workHours), getDayBonus(totalBonus, workDays));
    answerWeekFullSalary.textContent = getFullSalary(getWeekSalary(salaryTransformed, workHours, workDays), getWeekBonus(totalBonus, workDays));
    answerMonthFullSalary.textContent = getFullSalary(getMonthSalary(salaryTransformed, workHours, workDays), totalBonus);

    answerDaySalaryUntaxed.textContent = getSalaryUntaxed(getDaySalary(salaryTransformed, workHours));
    answerWeekSalaryUntaxed.textContent = getSalaryUntaxed(getWeekSalary(salaryTransformed, workHours, workDays));
    answerMonthSalaryUntaxed.textContent = getSalaryUntaxed(getMonthSalary(salaryTransformed, workHours, workDays));

    answerDayFullSalaryUntaxed.textContent = getFullSalaryUntaxed(getDaySalary(salaryTransformed, workHours), getDayBonus(totalBonus, workDays));
    answerWeekFullSalaryUntaxed.textContent = getFullSalaryUntaxed(getWeekSalary(salaryTransformed, workHours, workDays), getWeekBonus(totalBonus, workDays));
    answerMonthFullSalaryUntaxed.textContent = getFullSalaryUntaxed(getMonthSalary(salaryTransformed, workHours, workDays), totalBonus);

    answerDayWorkHours.textContent = workHours;
    answerWeekWorkHours.textContent = getWeekWorkHours(workHours, workDays);
    answerMonthWorkHours.textContent = getMonthWorkHours(workHours, workDays);

    answerWeekWorkDays.textContent = workDays;
    answerMonthkWorkDays.textContent = getMonthWorkDays(workDays);

    answerWeekFreeDays.textContent = getWeekFreeDays(workDays);
    answerMonthFreeDays.textContent = getMonthFreeDays(workDays);

    answerDayNonPaidHours.textContent = nonPaidHours;
    answerWeekNonPaidHours.textContent = getWeekNonPaidHours(nonPaidHours, workDays);
    answerMonthNonPaidHours.textContent = getMonthNonPaidHours(nonPaidHours, workDays);

    answerWorkDayFreeHours.textContent = getWorkdayFreeHours(activeHours, workHours, nonPaidHours);
    answerWeekFreeHours.textContent = getWeekFreeHours(activeHours, workHours, nonPaidHours, workDays);
    answerMonthFreeHours.textContent = getMonthFreeHours(activeHours, workHours, nonPaidHours, workDays);

    answerHoursActive.textContent = activeHours;
    answerHoursSleep.textContent = sleepHours;
});


const getDaySalary = (salaryInHour, workHours) => {
    return salaryInHour * workHours;
};

const getWeekSalary = (salaryInHour, workHours, workDays) => {
    return getDaySalary(salaryInHour, workHours) * workDays;
};

const getMonthSalary = (salaryInHour, workHours, workDays) => {
    return Math.round(getWeekSalary(salaryInHour, workHours, workDays) * weeksAtMont);
};


const getDayBonus = (totalBonus, workDays) => {
    return (totalBonus > 0) ? totalBonus / getMonthWorkDays(workDays) : 0;
};

const getWeekBonus = (totalBonus, workDays) => {
    return getDayBonus(totalBonus, workDays) * workDays;
};


const getFullSalary = (salaryInPeriod, bonusInPeriod) => {
    return Math.round(salaryInPeriod + bonusInPeriod);
};


const getSalaryUntaxed = salaryInPeriod => {
    return Math.round(getUntaxed(salaryInPeriod))
};


const getFullSalaryUntaxed = (salaryInPeriod, bonusInPerion) => {
    return Math.round(getSalaryUntaxed(salaryInPeriod) + bonusInPerion);
};


const getWeekWorkHours = (workHours, workDays) => {
    return workHours * workDays;
};

const getMonthWorkHours = (workHours, workDays) => {
    return Math.round(getWeekWorkHours(workHours, workDays) * weeksAtMont);
};


const getMonthWorkDays = workDays => {
    return Math.round(workDays * weeksAtMont);
};


const getWeekFreeDays = workDays => {
    return week - workDays;
};

const getMonthFreeDays = workDays => {
    return month - getMonthWorkDays(workDays);
};


const getWeekNonPaidHours = (nonPaidHours, workDays) => {
    return nonPaidHours * workDays;
};

const getMonthNonPaidHours = (nonPaidHours, workDays) => {
    return Math.round(getWeekNonPaidHours(nonPaidHours, workDays) * weeksAtMont);
};


const getWorkdayFreeHours = (activeHours, workHours, nonPaidHours) => {
    if (workHours === 0) {
        return activeHours
    }
    return activeHours - workHours - nonPaidHours
};

const getWeekFreeHours = (activeHours, workHours, nonPaidHours, workDays) => {
    return getWorkdayFreeHours(activeHours, workHours, nonPaidHours) * workDays + activeHours * (week - workDays);
};

const getMonthFreeHours = (activeHours, workHours, nonPaidHours, workDays) => {
    return Math.round(getWeekFreeHours(activeHours, workHours, nonPaidHours, workDays) * weeksAtMont);
};