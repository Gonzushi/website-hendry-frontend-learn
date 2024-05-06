"use client";

import Select, { components } from "react-select";
import { Controller } from "react-hook-form";
import { API } from "@/src/Setting";
import { useState, useEffect } from "react";
import { createFilter } from "react-select";

let render = 0;
function SingleSelectFilingComplaintMultiFieldFetch(
  className: string,
  label: string,
  apiField: string,
  control: any,
  storeLocation: any
) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const requestLink = API + "/multi_fields/" + apiField;
    fetch(requestLink, { method: "GET" })
      .then((response) => response.json())
      .then((records) => {
        let dataTransform: any[] = [];
        for (let i = 0; i < 25000; i++) {
          const data = records[i].Name + " : " + records[i].Part_Description__c;
          dataTransform.push({ value: records[i].Id, label: data });
        }
        // records.map((record: any) => {
        //     const data = record.Name + ' : ' + record.Part_Description__c
        //     dataTransform.push({ value: records.Id, label: data })
        // })
        return dataTransform;
      })
      .then((data: any) => {
        setOptions(data);
        setIsLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MenuList = (props: any) => {
    render += 1;
    console.log(props.children.length);
    return (
      <components.MenuList {...props}>
        <div>Custom Menu List {render}</div>
        {props.children.length != undefined && props.children.slice(0, 10)}
      </components.MenuList>
    );
  };

  return (
    <div className={className}>
      <label className="form-label">{label}</label>
      <Controller
        control={control}
        name={String(storeLocation)}
        render={({ field }) => (
          <Select
            components={{ MenuList }}
            filterOption={createFilter({ ignoreAccents: false })}
            className="basic-single"
            isLoading={isLoading}
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            options={options}
            onChange={(e: any) => {
              if (e == null) {
                field.onChange("");
              } else {
                field.onChange(e.value);
              }
            }}
          />
        )}
      />
    </div>
  );
}

export default SingleSelectFilingComplaintMultiFieldFetch;
