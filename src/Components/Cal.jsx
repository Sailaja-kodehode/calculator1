// Imports
// import Slider from "rc-slider";
import "./cal.css";
import { useState } from "react";
// Calculator component
export default function Calculator() {
  // useStates
  const [resultScreen, setResultScreen] = useState([]);
  const [theme, setTheme] = useState(1);

  const websiteBackgroundColor = {
    backgroundColor: `${
      theme === 1
        ? "hsl(222, 26%, 31%)"
        : theme === 2
        ? "hsl(0, 0%, 90%)"
        : "hsl(268, 75%, 9%)"
    }`,
  };
  // calculator result screen
  const calculatorResults = {
    backgroundColor: `${
      theme === 1
        ? "hsl(224, 36%, 15%)"
        : theme === 2
        ? "hsl(0, 0%, 93%)"
        : "hsl(268, 71%, 12%)"
    }`,
    color: `${
      theme === 1
        ? "hsl(0, 0%, 100%)"
        : theme === 2
        ? "hsl(60, 10%, 19%)"
        : "hsl(52, 100%, 62%)"
    }`,
  };
  // calculator inputs
  const calculatorInputsBackgroundColor = {
    backgroundColor: `${
      theme === 1
        ? "hsl(223, 31%, 20%)"
        : theme === 2
        ? "hsl(0, 5%, 81%)"
        : "hsl(268, 71%, 12%)"
    }`,
  };
  // on top of calculator
  const headerColor = {
    color: `${
      theme === 1
        ? "hsl(0, 0%, 100%)"
        : theme === 2
        ? "hsl(60, 10%, 19%)"
        : "hsl(52, 100%, 62%)"
    }`,
  };
  // adds clicked inputs to array in resultScreen
  // or changes array in resultScreen to house calculated answer
  function addInputToResult(input) {
    // del input (removes last character i result screen)
    if (input === "del") {
      setResultScreen((prevResult) => {
        return prevResult.filter((element, index, array) => {
          return index !== prevResult.length - 1;
        });
      });
      // reset input (removes all characters in result screen)
    } else if (input === "reset") {
      setResultScreen((prevResult) => []);
      // other inputs except = (equal)
    } else if (["+", "-", "/", "*", "."].includes(input)) {
      if (resultScreen.length === 0) return;
      else if (
        resultScreen.find(
          (currentValue, index, arr) =>
            index === resultScreen.length - 1 &&
            ["+", "-", "/", "*", "."].includes(currentValue)
        )
      ) {
        return;
      } else
        setResultScreen((prevResult) => [
          ...prevResult,
          input === "*" ? "x" : input,
        ]);
      // = input (equal)
    } else if (input === "=") {
      if (
        ["+", "-", "/", "*", "."].includes(
          resultScreen[resultScreen.length - 1]
        )
      ) {
        return;
      } else setResultScreen((prevResult) => [evalCalc(prevResult)]);
      // all number inputs
    } else setResultScreen((prevResult) => [...prevResult, input]);
  }
  // calculates received array
  const evalCalc = (input) => {
    // maps array to take into consideration x (multiplication) and changes it to *.
    // eval does not use x for multiplication and instead uses *
    let changedSignArray = input.map((currentIndex) => {
      return currentIndex === "x" ? "*" : [currentIndex];
    });
    return eval?.(changedSignArray.join(""));
  };
  // controls what inputs are input-table trough keyboard on screen
  const inputController = (event) => {
    /* regex to check for numbers and check for symbols that does not come after symbols */
    let conditons = /([0-9]|[x/*+-.](?![x/*+-.]))/g;
    /* checks each character in result screen if it matches the conditions in the regex */
    let conditonMatch = event.target.value.match(conditons);
    // stops user from inputting any symbols before inputting any numbers
    if (["+", "-", "/", "*", ".", "x"].includes(event.nativeEvent.data)) {
      if (
        resultScreen === null ||
        resultScreen.length === 0 ||
        ["+", "-", "/", "*", ".", "x"].includes(
          resultScreen[resultScreen.length - 1]
        )
      ) {
        return;
      } else
        setResultScreen(
          (prevState) => conditonMatch
        ); /* sends the characters to state called resultScreen*/
    } else
      setResultScreen(
        (prevState) => conditonMatch
      ); /* sends the characters to state called resultScreen*/
  };
  console.log(resultScreen);

  // jsx
  return (
    // main background
    <div className="background" style={websiteBackgroundColor}>
      {/* container for calculator */}
      <div className="calculator">
        {/* container for header of calculator */}
        <header className="calculator_header" style={headerColor}>
          {/* title */}
          <p className="calculator_header_title">Calc</p>
          {/* container for theme change */}
          <div className="calculator_header_theme">
            {/* theme change desc */}
            <p className="calculator_header_theme_title">THEME</p>
            {/* slider with number indication*/}
            <div className="calculator_header_theme_decider">
              {/* numbers container */}
              <div className="calculator_header_theme_decider_values">
                {/* number 1 */}
                <input
                  className="calculator_header_theme_decider_values_value"
                  type="button"
                  value={1}
                  style={headerColor}
                  onClick={() => setTheme(1)}
                />
                {/* number 2 */}
                <input
                  className="calculator_header_theme_decider_values_value"
                  type="button"
                  value={2}
                  style={headerColor}
                  onClick={() => setTheme(2)}
                />
                {/* number 3 */}
                <input
                  className="calculator_header_theme_decider_values_value"
                  type="button"
                  value={3}
                  style={headerColor}
                  onClick={() => setTheme(3)}
                />
              </div>
              {/* slider */}
              <div
                className={
                  theme === 1 ? "theme1" : theme === 2 ? "theme2" : "theme3"
                }
                style={{ padding: "10px", borderRadius: "20px" }}
                min={1}
                max={3}
                handleStyle={[{ border: "none", marginTop: "0px" }]}
                railStyle={{ backgroundColor: "transparent" }}
                trackStyle={{ backgroundColor: "transparent" }}
                onChange={(event) => setTheme(event)}
                value={theme}
              />
            </div>
          </div>
        </header>
        {/* calculator inputs and results screen container */}
        <main className="calculator_inputs">
          {/* result screen*/}
          <input
            className="calculator_inputs_results"
            style={calculatorResults}
            type="text"
            value={resultScreen ? resultScreen.join("") : ""}
            onChange={(event) => inputController(event)}
            onKeyUp={(event) => {
              if (event.nativeEvent.key === "Enter") addInputToResult("=");
            }}
          />
          {/* calculator inputs container */}
          <div
            className={`calculator_inputs_rows ${
              "calculator_inputs_rows--theme" + theme
            }`}
            style={calculatorInputsBackgroundColor}
          >
            {/* row 1 container */}
            <div className="calculator_inputs_rows_row">
              {/* 7 input */}
              <input
                className="calculator_inputs_rows_row_input input--number"
                type="button"
                value={7}
                onClick={() => addInputToResult(7)}
              />
              {/* 8 input */}
              <input
                className="calculator_inputs_rows_row_input input--number"
                type="button"
                value={8}
                onClick={() => addInputToResult(8)}
              />
              {/* 9 input */}
              <input
                className="calculator_inputs_rows_row_input input--number"
                type="button"
                value={9}
                onClick={() => addInputToResult(9)}
              />
              {/* del input (delete) */}
              <input
                className="calculator__inputs__rows__row__input calculator__inputs__rows__row__input--del"
                type="button"
                value={"DEL"}
                onClick={() => addInputToResult("del")}
              />
            </div>
            {/* row 2 container */}
            <div className="calculator_inputs_rows_row">
              {/* 4 input */}
              <input
                className="calculator_inputs_rows_row_input input--number"
                type="button"
                value={4}
                onClick={() => addInputToResult(4)}
              />
              {/* 5 input */}
              <input
                className="calculator_inputs_rows_row_input input--number"
                type="button"
                value={5}
                onClick={() => addInputToResult(5)}
              />
              {/* 6 input */}
              <input
                className="calculator_inputs_rows_row_input input--number"
                type="button"
                value={6}
                onClick={() => addInputToResult(6)}
              />
              {/* +  (addition)*/}
              <input
                className="calculator_inputs_rows_row_input input--symbol"
                type="button"
                value={"+"}
                onClick={() => addInputToResult("+")}
              />
            </div>
            {/* row 3 container */}
            <div className="calculator_inputs_rows_row">
              {/* 1 input */}
              <input
                className="calculator_inputs_rows_row_input input--number"
                type="button"
                value={1}
                onClick={() => addInputToResult(1)}
              />
              {/* 2 input */}
              <input
                className="calculator_inputs_rows_row_input input--number"
                type="button"
                value={2}
                onClick={() => addInputToResult(2)}
              />
              {/* 3 input */}
              <input
                className="calculator_inputs_rows_row_input input--number"
                type="button"
                value={3}
                onClick={() => addInputToResult(3)}
              />
              {/* - input (minus) */}
              <input
                className="calculator_inputs_rows_row_input input--symbol"
                type="button"
                value={"-"}
                onClick={() => addInputToResult("-")}
              />
            </div>
            {/* row 4 container */}
            <div className="calculator_inputs_rows_row">
              {/* . input (comma) */}
              <input
                className="calculator_inputs_rows_row_input input--symbol"
                type="button"
                value={"."}
                onClick={() => addInputToResult(".")}
              />
              {/* 0 input */}
              <input
                className="calculator_inputs_rows_row_input input--number"
                type="button"
                value={0}
                onClick={() => addInputToResult(0)}
              />
              {/* / input (division)*/}
              <input
                className="calculator_inputs_rows_row_input input--symbol"
                type="button"
                value={"/"}
                onClick={() => addInputToResult("/")}
              />
              {/* x or * input (multiplication)*/}
              <input
                className="calculator_inputs_rows_row_input input--symbol"
                type="button"
                value={"x"}
                onClick={() => addInputToResult("*")}
              />
            </div>
            {/* row 5 container */}
            <div className="calculator_inputs_rows_row">
              {/* reset input (deletes content in result screen)*/}
              <input
                className="calculator_inputs_rows_row_input calculator_inputs_rows_row_input--reset"
                type="button"
                value={"RESET"}
                onClick={() => addInputToResult("reset")}
              />
              {/* = input (equal)*/}
              <input
                className="calculator_inputs_rows_row_input calculator_inputs_rows_row_input--equal"
                type="button"
                value={"="}
                onClick={() => addInputToResult("=")}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
