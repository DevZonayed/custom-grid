import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import "./styles/progressStyle.css";
const ProgressRanderer = (props) => {
  const parcent = `${(props.value * 100).toFixed(3)}%`;
  return (
    <div className="progressbar-wrapper">
      <div className="progressText">{parcent}</div>
      <div
        style={{ width: parcent }}
        className={
          props.value <= 0.25
            ? "progress-fill red"
            : props.value > 0.25 && props.value <= 0.5
            ? "progress-fill yellow"
            : props.value > 0.5 && props.value <= 0.85
            ? "progress-fill blue"
            : "progress-fill green"
        }
      ></div>
    </div>
  );
};

// Editor Randerer

const ProgressEditorRanderer = forwardRef((props, ref) => {
  const refContainer = useRef(null);
  useEffect(() => {
    ReactDOM.findDOMNode(refContainer.current).focus();
  }, []);
  const containerStyle = {
    height: "100%",
    width: "100%",
    cursor: "pointer",
  };
  const [parcent, setParcent] = useState(props.value);
  const handleProgressRange = (e) => {
    if (+e.target.value <= 99) {
      setParcent(+e.target.value / 100);
    } else {
      setParcent(1);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return parcent;
      },
    };
  });

  return (
    <div
      ref={refContainer}
      style={containerStyle}
      tabIndex={1} // important - without this the key presses wont be caught
    >
      <div className="progressbar-wrapper">
        <div className="progressText">{`${(parcent * 100).toFixed(3)}%`}</div>
        <input
          style={{ cursor: "pointer" }}
          type="range"
          className="editorRange"
          onChange={handleProgressRange}
          value={parcent * 100}
        />
        <div
          style={{ width: `${parcent * 100}%` }}
          className={
            parcent <= 0.25
              ? "progress-fill red"
              : parcent > 0.25 && parcent <= 0.5
              ? "progress-fill yellow"
              : parcent > 0.5 && parcent <= 0.85
              ? "progress-fill blue"
              : "progress-fill green"
          }
        ></div>
      </div>
    </div>
  );
});

export { ProgressRanderer, ProgressEditorRanderer };
