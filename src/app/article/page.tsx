"use client";

import { useState, useEffect } from "react";
import { API } from "@/src/Setting";
import MainLayout from "@/src/app/Layout/MainLayout";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { objectToTableArticle } from "@/src/app/Utility";
import MultiSelect from "@/src/Components/MultiSelect";

function Article() {
  const [isPending, setIsPending] = useState(false);
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [complaintFlagFilter, setComplaintFlagFilter] = useState("");
  const [reportableFlagFilter, setReportableFlagFilter] = useState("");
  const [recordTypeFilter, setRecordTypeFilter] = useState("");
  const [complaintExclusion, setComplaintExclusion] = useState("");
  const [productFamilyFilter, setProductFamilyFilter] = useState([]);
  const [productSegmentFilter, setProductSegmentFilter] = useState([]);
  const [countryNameFilter, setCountryNameFilter] = useState([]);
  const [rdcCodeFilter, setRdcCodeFilter] = useState([]);
  const [pcCodeFilter, setPcCodeFilter] = useState([]);
  const [validationError, setValidationError] = useState("");
  const [dataTableSummary, setDataTableSummary] = useState([]);
  const animatedComponents = makeAnimated();
  const dateRegex = "^[0-9]{4}-[0-9]{2}-[0-9]{2}$";
  const exclusionRegex = RegExp("^CN-[0-9]{6}$", "i");
  const recordTypeOptions = [
    { value: "Literature Search", label: "Literature Search" },
    { value: "Trended", label: "Trended" },
  ];
  const complaintFlagOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];
  const reportableFlagOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  useEffect(() => {
    setDataTableSummary([]);
  }, [countryNameFilter]);

  const updateSelection = (eventList: any, setState: any) => {
    let selection = [];

    for (let i in eventList) {
      selection.push({ value: eventList[i].value, label: eventList[i].value });
    }
    setState(selection);
  };

  const isValidated = () => {
    if (
      isNaN(Date.parse(startDateFilter)) == true ||
      RegExp(dateRegex).test(startDateFilter) == false
    ) {
      setValidationError("Invalid start date");
      return false;
    }
    if (
      isNaN(Date.parse(endDateFilter)) == true ||
      RegExp(dateRegex).test(endDateFilter) == false
    ) {
      setValidationError("Invalid end date");
      return false;
    }
    if (Date.parse(endDateFilter) <= Date.parse(startDateFilter)) {
      setValidationError("Start date must be before end date");
      return false;
    }
    if (rdcCodeFilter.length == 0 && pcCodeFilter.length == 0) {
      setValidationError(
        "Please fill one of the following field (RDC Code or PC Code) to continue"
      );
      return false;
    }
    if (
      complaintExclusion != "" &&
      exclusionRegex.test(complaintExclusion) == false
    ) {
      setValidationError("Invalid complaint exclusion");
      return false;
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (isValidated() == false) {
      window.scrollTo(0, 0);
      return;
    }

    setValidationError("");
    setDataTableSummary([]);

    let numberOfFilter = 0;
    let requestLink = API + "/article/?";

    const listFilter = (field: any, list: any) => {
      if (list.length != 0) {
        for (const element of list) {
          if (numberOfFilter > 0) {
            requestLink += "&";
          }
          numberOfFilter += 1;
          requestLink += field + "=" + element.value.replaceAll(" ", "%20");
        }
      }
    };

    const textFilter = (field: any, text: any) => {
      if (text != "") {
        if (numberOfFilter > 0) {
          requestLink += "&";
        }
        numberOfFilter += 1;
        requestLink += field + "=" + text;
      }
    };

    const singleTextFilter = (field: any, singleText: any) => {
      if (singleText) {
        if (numberOfFilter > 0) {
          requestLink += "&";
        }
        numberOfFilter += 1;
        requestLink += field + "=" + singleText.replaceAll(" ", "%20");
      }
    };

    textFilter("start_date_of_event", startDateFilter);
    textFilter("end_date_of_event", endDateFilter);
    singleTextFilter("complaint_flag", complaintFlagFilter);
    singleTextFilter("reportable_flag", reportableFlagFilter);
    singleTextFilter("record_type", recordTypeFilter);
    textFilter("complaint_code", complaintExclusion);
    listFilter("ears_product_family", productFamilyFilter);
    listFilter("product_segment", productSegmentFilter);
    listFilter("country_name", countryNameFilter);
    listFilter("rdc_code", rdcCodeFilter);
    listFilter("pc_code", pcCodeFilter);

    setIsPending(true);

    fetch(requestLink, { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setDataTableSummary(response);
        setIsPending(false);
      });
  };

  const handleClear = (event: any) => {
    event.preventDefault();
    setStartDateFilter("");
    setEndDateFilter("");
    setComplaintFlagFilter("");
    setReportableFlagFilter("");
    setRecordTypeFilter("");
    setComplaintExclusion("");
    setProductFamilyFilter([]);
    setProductSegmentFilter([]);
    setCountryNameFilter([]);
    setRdcCodeFilter([]);
    setPcCodeFilter([]);
    setValidationError("");
    setDataTableSummary([]);
  };

  const arrayToText = (data: any) => {
    let textTemp = data[0].value;
    let i = 1;
    while (i < data.length) {
      textTemp += "; " + data[i].value;
      i++;
    }
    return textTemp;
  };

  return (
    <MainLayout>
      <div className="container-fluid">
        <h1>Article</h1>
        <form className="row g-3 m-2" onSubmit={handleSubmit}>
          {validationError && (
            <label className="text-danger">
              Error message: {validationError}
            </label>
          )}
          <div className="col-md-2">
            <label className="form-label">Start Date (&gt;=) *</label>
            <input
              type="text"
              className="form-control"
              id="startDateFilter"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              placeholder="yyyy-mm-dd"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">End Date (&lt;) *</label>
            <input
              type="text"
              className="form-control"
              id="endDateFilter"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              placeholder="yyyy-mm-dd"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Complaint Flag</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={{ value: complaintFlagFilter, label: complaintFlagFilter }}
              isClearable={true}
              isSearchable={true}
              options={complaintFlagOptions}
              onChange={(e) => {
                if (e == null) {
                  setComplaintFlagFilter("");
                } else {
                  setComplaintFlagFilter(e.value);
                }
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Reportable Flag</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              value={{
                value: reportableFlagFilter,
                label: reportableFlagFilter,
              }}
              options={reportableFlagOptions}
              onChange={(e) => {
                if (e == null) {
                  setReportableFlagFilter("");
                } else {
                  setReportableFlagFilter(e.value);
                }
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Literature Filter</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              value={{ value: recordTypeFilter, label: recordTypeFilter }}
              options={recordTypeOptions}
              onChange={(e) => {
                if (e == null) {
                  setRecordTypeFilter("");
                } else {
                  setRecordTypeFilter(e.value);
                }
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Complaint Exclusion</label>
            <input
              type="text"
              className="form-control"
              id="complaintExclusion"
              value={complaintExclusion}
              onChange={(e) => setComplaintExclusion(e.target.value)}
              placeholder="CN-XXXXXX"
            />
          </div>
          {MultiSelect(
            "col-md-4",
            "EARS Product Family",
            "productFamilyFilter",
            productFamilyFilter,
            setProductFamilyFilter,
            "ears_product_family"
          )}
          {MultiSelect(
            "col-md-4",
            "ECHO Product Segment",
            "productSegmentFilter",
            productSegmentFilter,
            setProductSegmentFilter,
            "product_segment"
          )}
          {MultiSelect(
            "col-md-4",
            "Country",
            "countryNameFilter",
            countryNameFilter,
            setCountryNameFilter,
            "country"
          )}
          {MultiSelect(
            "col-md-6",
            "RDC Code **",
            "rdcCodeFilter",
            rdcCodeFilter,
            setRdcCodeFilter,
            "rdc_code"
          )}
          {MultiSelect(
            "col-md-6",
            "PC Code **",
            "pcCodeFilter",
            pcCodeFilter,
            setPcCodeFilter,
            "pc_code"
          )}

          <div
            className="btn-group mt-4"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleClear}
            >
              Clear
            </button>
            {!isPending && (
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
            {isPending && (
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={handleSubmit}
                disabled
              >
                Query Data
              </button>
            )}
          </div>

          <div className="col-md-9">
            {dataTableSummary.length != 0 &&
              objectToTableArticle(dataTableSummary, countryNameFilter)}
          </div>

          <div className="col-md-3 mt-4">
            <div className="col-md-12">
              <p className="ps-3">
                <b>Query Criteria (Fixed):</b>
              </p>
              <p className="ps-3">
                Query Date = {Date().slice(4, 15)} <br />
                {startDateFilter != "" &&
                  "Start Date of Event >= " + startDateFilter}{" "}
                {startDateFilter != "" && <br />}
                {endDateFilter != "" &&
                  "End Date of Event < " + endDateFilter}{" "}
                {endDateFilter != "" && <br />}
                {complaintFlagFilter &&
                  "Complaint Flag = " + complaintFlagFilter}{" "}
                {complaintFlagFilter && <br />}
                {reportableFlagFilter &&
                  "Reportable Flag = " + reportableFlagFilter}{" "}
                {reportableFlagFilter && <br />}
                {recordTypeFilter &&
                  "Literature Search = " + recordTypeFilter}{" "}
                {recordTypeFilter && <br />}
                {complaintExclusion != "" &&
                  "Complaint Exclusion = " + complaintExclusion}{" "}
                {complaintExclusion != "" && <br />}
                {productFamilyFilter.length != 0 &&
                  "EARS Product Family = " +
                    arrayToText(productFamilyFilter)}{" "}
                {productFamilyFilter.length != 0 && <br />}
                {productSegmentFilter.length != 0 &&
                  "ECHO Product Segment = " +
                    arrayToText(productSegmentFilter)}{" "}
                {productSegmentFilter.length != 0 && <br />}
                {countryNameFilter.length != 0 &&
                  "Country = " + arrayToText(countryNameFilter)}{" "}
                {countryNameFilter.length != 0 && <br />}
              </p>
              <p className="ps-3">
                <b>Query Criteria (Dynamic):</b>
              </p>
              <p className="ps-3">
                {rdcCodeFilter.length != 0 &&
                  "RDC Code = " + arrayToText(rdcCodeFilter)}{" "}
                {rdcCodeFilter.length != 0 && <br />}
                {pcCodeFilter.length != 0 &&
                  "PC Code = " + arrayToText(pcCodeFilter)}{" "}
                {pcCodeFilter.length != 0 && <br />}
              </p>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default Article;
