import { useState, useEffect } from "react";
import { API } from "@/src/Setting";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function MultiSelect(
  className: string,
  label: string,
  id: string,
  state: any,
  setState: any,
  fieldNameAPI: string
) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData]: any[] = useState([]);

  const animatedComponents = makeAnimated();
  const requestLink = API + "/fields/" + fieldNameAPI;

  useEffect(() => {
    const dataListTemp: any[] = [];

    fetch(requestLink, { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        for (const data of response.records) {
          dataListTemp.push({ value: data, label: data });
        }
      })
      .then(() => {
        setData(dataListTemp);
        setIsLoading(false);
      });
  }, []);

  const updateSelectedFilter = (eventList: any, setState: any) => {
    let selected = [];

    for (let i in eventList) {
      selected.push({ value: eventList[i].value, label: eventList[i].value });
    }
    setState(selected);
  };

  return (
    <div className={className}>
      <label className="form-label">{label}</label>
      <Select
        id={id}
        className="basic-multi-select"
        classNamePrefix="select"
        value={state}
        isMulti
        closeMenuOnSelect={true}
        isLoading={isLoading}
        components={animatedComponents}
        options={data}
        onChange={(e) => updateSelectedFilter(e, setState)}
      />
    </div>
  );
}

export default MultiSelect;
