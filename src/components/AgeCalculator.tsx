import { useState } from "react";

export function CalculateAge() {
  const [name, setName] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [birthYear, setBirthYear] = useState<number | "">("");
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const [age, setAge] = useState<number>(0);

  const handleSubmit = () => {
    if (name.trim() !== "" && birthYear !== "" && birthYear > 1111) {
      setAge(currentYear - birthYear);
      setDisplayName(name);
      setName("");
      setBirthYear("");
    }
  };

  return (
    <div className="age-calculator">
      <h2 className="title">Age Calculator</h2>
      <div>
        <p>Name: {displayName}</p>
        <p>Age: {age}</p>
      </div>
      <div className="age-calc-form">
        <div className="form-row">
          <label htmlFor="current-year" className="form-label">
            Current Year:
          </label>
          <input
            id="current-year"
            type="number"
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
            className="form-control"
          />
        </div>
        <div className="form-row">
          <label htmlFor="birth-year" className="form-label">
            Birth Year:
          </label>
          <input
            id="birth-year"
            type="number"
            value={birthYear}
            onChange={(e) => {
              const value = e.target.value;
              setBirthYear(value === "" ? "" : Number(value));
            }}
            placeholder="YYYY"
            className="form-control"
          />
        </div>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder="Name"
            className="form-control"
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-secondary">
          Calculate
        </button>
      </div>
    </div>
  );
}
