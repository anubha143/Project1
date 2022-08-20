import React, { useState } from "react";
const MultiselectCheckbox = ({ options, onChange }) => {
  const [data, setData] = useState(options);

  const toggle = (index) => {
    const newData = [...data];
    newData.splice(index, 1, {
      label: data[index].label,
      checked: !data[index].checked,
    });
    setData(newData);
    console.log("here is the new data", newData);
    console.log("just printing to test");
    console.log("just printing to testingggg");
    console.log("another commit");
    onChange(newData.filter((x) => x.checked));
  };

  return (
    <>
      {data.map((item, index) => (
        <label key={item.label}>
          <input
            readOnly
            type="checkbox"
            checked={item.checked || false}
            onClick={() => toggle(index)}
          />
          {item.label}
        </label>
      ))}
    </>
  );
};
export default MultiselectCheckbox;
