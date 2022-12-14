import React, { useId, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MultiSelectDropDown = ({
  defaultValue,
  limit,
  menual,
  handleValue,
  disabled,
  isArray,
  options: SelectOptions,
}) => {
  const id = useId();
  const subjects = useSelector((state) => state.subjects);
  const [defaultValues, setValues] = useState();
  const [pillEditor, setPillEditor] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValues([...defaultValue]); // Already Selected Values

    const generateOptions = subjects.map((item) => item.name); // Extract Suggession Options from Subjects
    setOptions(isArray ? SelectOptions : generateOptions);
  }, [defaultValue, subjects, SelectOptions, isArray]);

  const handleSkillIntarest = (index, value) => {
    const optionItem = [...defaultValues];
    optionItem[index] = {
      ...optionItem[index],
      progress: value,
    };
    setValues(optionItem);
    if (handleValue) {
      handleValue(optionItem);
    }
  };

  const handleInterestValueChange = (e) => {
    let value = e.target.value;
    const selectedValues = [...defaultValues];
    if (!isArray) {
      selectedValues.push({
        subject: value,
        progress: 0,
      });
    } else {
      selectedValues.push(value);
    }
    setValues(selectedValues);
    if (handleValue) {
      handleValue(selectedValues);
    }
    e.target.value = "";
  };

  const handleValueRemove = (index) => {
    const values = [...defaultValues];
    values.splice(index, 1);
    setValues(values);
    if (handleValue) {
      handleValue([...values]);
    }
  };

  const handleInterestValueKeyDown = (event) => {
    if (!menual) {
      event.preventDefault();
      return;
    }
    let value = event.target.value;
    if (event.key === "Enter") {
      const selectedValues = [...defaultValues];
      if (!isArray) {
        selectedValues.push({
          subject: value,
          progress: 0,
        });
      } else {
        selectedValues.push(value);
      }
      setValues(selectedValues);
      if (handleValue) {
        handleValue(selectedValues);
      }
      event.target.value = "";
    }
  };

  return (
    <div>
      {/* Interest Display Section */}
      <div className="interest_pill_wrapper d-flex">
        {defaultValues !== undefined &&
          defaultValues.length !== 0 &&
          (defaultValues.length <= 15
            ? defaultValues
            : [
                ...[...defaultValues].splice(0, 7),
                `//${defaultValues.length - 14} More...//`,
                ...[...defaultValues].splice(defaultValues.length - 7, 7),
              ]
          ).map((item, index) => {
            if (!isArray) {
              return (
                <div key={index + "interest_item"}>
                  <div className="interest_item">
                    <span onDoubleClick={() => setPillEditor(index)}>
                      {item.subject}
                    </span>
                    <span
                      onClick={() => handleValueRemove(index)}
                      className="cross_intarest"
                    >
                      X
                    </span>
                    {pillEditor === index && (
                      <div className="intarest_editor">
                        <span
                          onClick={() => setPillEditor(null)}
                          className="intarest_editor_cross"
                        >
                          X
                        </span>
                        <h6 className="text-dark text-center">
                          {item.progress * 100 > 99
                            ? "100"
                            : (item.progress * 100).toFixed(0)}
                          %
                        </h6>
                        <input
                          onChange={(e) => {
                            if (Math.ceil(e.target.value) % 5 === 0) {
                              handleSkillIntarest(
                                index,
                                Math.ceil(e.target.value) / 100
                              );
                            }
                          }}
                          value={item.progress * 100}
                          type="range"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index + "interest_item"}>
                  <div className="interest_item">
                    <span>{item}</span>
                    <span
                      onClick={() => {
                        let valIndex = defaultValues.findIndex(
                          (element) => element === item
                        );
                        handleValueRemove(valIndex);
                      }}
                      className="cross_intarest"
                    >
                      X
                    </span>
                  </div>
                </div>
              );
            }
          })}
        <div className="interestInputBox" style={{ flexGrow: 1 }}>
          {defaultValues?.length >= (limit || 20) || pillEditor !== null ? (
            ""
          ) : (
            <>
              <input
                className="form-control form-control-sm w-100"
                onKeyDown={(e) => handleInterestValueKeyDown(e)}
                onChange={(e) => !menual && handleInterestValueChange(e)}
                style={{ opacity: 1 }}
                type="text"
                list={id}
              />
              <datalist id={id}>
                {options
                  .filter((opt) => {
                    if (isArray) {
                      return (
                        defaultValues.findIndex((val) => val === opt) === -1
                      );
                    }
                    return (
                      defaultValues.findIndex((val) => val.subject === opt) ===
                      -1
                    );
                  })
                  .map((item, index) => (
                    <option key={"optionVal" + index} value={item} />
                  ))}
              </datalist>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectDropDown;
