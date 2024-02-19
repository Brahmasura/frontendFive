import { useState } from "react";
import style from "./App.module.scss";
import arrow from "./assets/icon-arrow.svg";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [inputDate, setInputDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [resultYears, setResultYears] = useState(0);
  const [resultMonths, setResultMonths] = useState(0);
  const [resultDays, setResultDays] = useState(0);

  // error states
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  const [formError, setFormError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputDate((prev) => ({ ...prev, [name]: value }));

    // Clear existing error messages
    if (name === "day") {
      setDayError("");
    } else if (name === "month") {
      setMonthError("");
    } else if (name === "year") {
      setYearError("");
    }
  };

  const calculateAge = () => {
    const { day, month, year } = inputDate;

    // Get current date
    const currentDate = new Date();

    // Calculate the difference between current year and birth year
    let ageYears = currentDate.getFullYear() - parseInt(year);

    // Calculate the difference between current month and birth month
    let ageMonths = currentDate.getMonth() + 1 - parseInt(month);

    // If current month is less than birth month, subtract 1 year from age
    if (
      ageMonths < 0 ||
      (ageMonths === 0 && currentDate.getDate() < parseInt(day))
    ) {
      ageYears--;
      ageMonths += 12;
    }

    // Calculate the difference between current day and birth day
    let ageDays = currentDate.getDate() - parseInt(day);

    // If current day is less than birth day, adjust the age accordingly
    if (ageDays < 0) {
      const prevMonthLastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      ageDays += prevMonthLastDay;
      ageMonths--;
    }

    // Update state with calculated age
    setResultYears(ageYears);
    setResultMonths(ageMonths);
    setResultDays(ageDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input before calculating age
    const { day, month, year } = inputDate;
    const validDay = validateDay(day);
    const validMonth = validateMonth(month);
    const validYear = validateYear(year);

    if (validDay || validMonth || validYear) {
      setDayError(validDay);
      setMonthError(validMonth);
      setYearError(validYear);
    } else {
      setSubmitted(true);
      calculateAge();
    }
  };

  const validateDay = (day) => {
    if (!day || isNaN(day) || day < 1 || day > 31) {
      setFormError(true);
      return "Must be a valid day";
    }
    return "";
  };

  const validateMonth = (month) => {
    if (!month || isNaN(month) || month < 1 || month > 12) {
      setFormError(true);
      return "Must be a valid month";
    }
    return "";
  };

  const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    if (!year || isNaN(year) || year > currentYear) {
      setFormError(true);
      return "Must be in the past";
    }
    return "";
  };

  return (
    <>
      <main>
        <div className={style.formDiv}>
          <form onSubmit={handleSubmit}>
            <div className={style.inputGroup}>
              <div className={style.inputFields}>
                <label
                  className={
                    formError
                      ? `${style.noError} ${style.withError}`
                      : style.noError
                  }
                >
                  DAY
                </label>
                <input
                  className={formError ? style.withError : ""}
                  type="text"
                  name="day"
                  onChange={handleChange}
                  value={inputDate.day}
                  placeholder="DD"
                  required
                />
                {dayError && <div className={style.error}>{dayError}</div>}
              </div>

              <div className={style.inputFields}>
                <label
                  className={
                    formError
                      ? `${style.noError} ${style.withError}`
                      : style.noError
                  }
                >
                  MONTH
                </label>
                <input
                  className={formError ? style.withError : ""}
                  type="text"
                  name="month"
                  onChange={handleChange}
                  value={inputDate.month}
                  placeholder="MM"
                  required
                />
                {monthError && <div className={style.error}>{monthError}</div>}
              </div>

              <div className={style.inputFields}>
                <label
                  className={
                    formError
                      ? `${style.noError} ${style.withError}`
                      : style.noError
                  }
                >
                  YEAR
                </label>
                <input
                  className={formError ? style.withError : ""}
                  type="text"
                  name="year"
                  onChange={handleChange}
                  value={inputDate.year}
                  placeholder="YYYY"
                  required
                />
                {yearError && <div className={style.error}>{yearError}</div>}
              </div>
            </div>

            <div className={style.hrAndButton}>
              <hr />

              <button type="submit">
                <img src={arrow} alt="submit arrow" />
              </button>
            </div>
          </form>

          <div className={style.resultDiv}>
            <p>
              <span>{submitted ? resultYears : "--"}</span> years
            </p>
            <p>
              <span>{submitted ? resultMonths : "--"}</span> months
            </p>
            <p>
              <span>{submitted ? resultDays : "--"}</span> days
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
