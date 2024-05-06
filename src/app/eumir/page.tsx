"use client";

import { MantineReactTable } from "mantine-react-table";
import { useState, useMemo } from "react";
import { API, abbottLink } from "@/src/Setting";
import MainLayout from "@/src/app/Layout/MainLayout";
import { objectToTable } from "@/src/app/Utility";
import MultiSelect from "@/src/Components/MultiSelect";
import SingleSelect from "@/src/Components/SingleSelect";
import MultiSelectManual from "@/src/Components/MultiSelectManual";

function FilingComplaint() {
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const [rdcClarifierFilter, setRdcClarifierFilter] = useState([]);
  const [pcCodeFilter, setPcCodeFilter] = useState([]);
  const [pcSeverityFilter, setPcSeverityFilter] = useState([]);
  const [resultCodeFilter, setResultCodeFilter] = useState([]);
  const [conclusionCodeFilter, setConclusionCodeFilter] = useState([]);
  const [dataTableDetail, setDataTableDetail] = useState([]);
  const [dataTableSummaryPerCountry, setDataTableSummaryPerCountry] = useState(
    []
  );
  const [dataTableSummaryTable, setDataTableSummaryTable] = useState([]);
  const [validationError, setValidationError] = useState("");
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
  const pcSeverityOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

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
    if (productFamilyFilter.length == 0 && productSegmentFilter.length == 0) {
      setValidationError(
        "Please fill one of the following field (EARS Product Family or ECHO Product Segment) to continue"
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
    setDataTableSummaryTable([]);

    let numberOfFilter = 0;
    let requestLink = API + "/eumir/?";

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
    listFilter("rdc_clarifier", rdcClarifierFilter);
    listFilter("pc_code", pcCodeFilter);
    listFilter("pc_severity", pcSeverityFilter);
    listFilter("result_code", resultCodeFilter);
    listFilter("conclusion_code", conclusionCodeFilter);

    setIsPending(true);
    setIsLoading(true);

    fetch(requestLink, { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setDataTableDetail(response.data);
        setDataTableSummaryPerCountry(response.summary_per_country);
        setDataTableSummaryTable(response.summary_table);
        setIsPending(false);
        setIsLoading(false);
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
    setRdcClarifierFilter([]);
    setPcCodeFilter([]);
    setPcSeverityFilter([]);
    setResultCodeFilter([]);
    setConclusionCodeFilter([]);
    setDataTableDetail([]);
    setDataTableSummaryPerCountry([]);
    setDataTableSummaryTable([]);
    setValidationError("");
  };

  const columnDetail = useMemo(
    () => [
      {
        accessorKey: "Name",
        header: "CN Name",
        Cell: ({ row }: { row: any }) => {
          return (
            <a href={abbottLink + row.original.Id} target="_blank">
              {row.original.Name}
            </a>
          );
        },
      },
      {
        accessorFn: (row: any) => Date.parse(row.Date_of_Event__c),
        header: "Date of Event",
        Cell: ({ row }: { row: any }) => row.original.Date_of_Event__c,
      },
      { accessorKey: "Product_Segment__c", header: "Product Segment" },
      { accessorKey: "Reportable_Country__c", header: "Country" },
    ],
    []
  );

  const columnPerCountry = useMemo(
    () => [
      { accessorKey: "Reportable_Country__c", header: "Country" },
      { accessorKey: "count", header: "Count" },
    ],
    []
  );

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
        <h1>EU MIR</h1>
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
          {SingleSelect(
            "col-md-2",
            "Complaint Flag",
            "complaintFlag",
            complaintFlagFilter,
            setComplaintFlagFilter,
            complaintFlagOptions
          )}
          {SingleSelect(
            "col-md-2",
            "Reportable Flag",
            "reportableFlag",
            reportableFlagFilter,
            setReportableFlagFilter,
            reportableFlagOptions
          )}
          {SingleSelect(
            "col-md-2",
            "Literature Filter",
            "literatureFilter",
            recordTypeFilter,
            setRecordTypeFilter,
            recordTypeOptions
          )}
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
            "EARS Product Family **",
            "productFamilyFilter",
            productFamilyFilter,
            setProductFamilyFilter,
            "ears_product_family"
          )}
          {MultiSelect(
            "col-md-4",
            "ECHO Product Segment **",
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
            "col-md-4",
            "RDC Code",
            "rdcCodeFilter",
            rdcCodeFilter,
            setRdcCodeFilter,
            "rdc_code"
          )}
          {MultiSelect(
            "col-md-4",
            "RDC Clarifier",
            "rdcClarifierFilter",
            rdcClarifierFilter,
            setRdcClarifierFilter,
            "rdc_clarifier"
          )}
          {MultiSelect(
            "col-md-4",
            "PC Code",
            "pcCodeFilter",
            pcCodeFilter,
            setPcCodeFilter,
            "pc_code"
          )}
          {MultiSelectManual(
            "col-md-4",
            "PC Severity",
            "pcCodeFilter",
            pcSeverityFilter,
            setPcSeverityFilter,
            pcSeverityOptions
          )}
          {MultiSelect(
            "col-md-4",
            "Result Code",
            "resultCodeFilter",
            resultCodeFilter,
            setResultCodeFilter,
            "result_code"
          )}
          {MultiSelect(
            "col-md-4",
            "Conclusion Code",
            "conclusionCodeFilter",
            conclusionCodeFilter,
            setConclusionCodeFilter,
            "conclusion_code"
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

          <div className="container-fluid col-12 justify-content-center mt-4">
            <MantineReactTable
              columns={columnDetail}
              data={dataTableDetail}
              initialState={{
                density: "xs",
                pagination: { pageIndex: 0, pageSize: 5 },
              }}
              isMultiSortEvent={() => true}
              state={{ isLoading: isLoading }}
            />
          </div>

          <div className="col-md-5 mt-4">
            <MantineReactTable
              columns={columnPerCountry}
              data={dataTableSummaryPerCountry}
              initialState={{
                density: "xs",
                pagination: { pageIndex: 0, pageSize: 10 },
              }}
              isMultiSortEvent={() => true}
              state={{ isLoading: isLoading }}
            />
          </div>

          <div className="col-md-7 mt-4">
            <div className="col-md-12">
              {dataTableSummaryTable.length != 0 &&
                objectToTable(dataTableSummaryTable)}
            </div>
            <div className="col-md-12">
              <p className="ps-3">
                <b>Query Criteria:</b>
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
                {rdcCodeFilter.length != 0 &&
                  "RDC Code = " + arrayToText(rdcCodeFilter)}{" "}
                {rdcCodeFilter.length != 0 && <br />}
                {rdcClarifierFilter.length != 0 &&
                  "RDC Clarifier = " + arrayToText(rdcClarifierFilter)}{" "}
                {rdcClarifierFilter.length != 0 && <br />}
                {pcCodeFilter.length != 0 &&
                  "PC Code = " + arrayToText(pcCodeFilter)}{" "}
                {pcCodeFilter.length != 0 && <br />}
                {pcSeverityFilter.length != 0 &&
                  "PC Severity = " + arrayToText(pcSeverityFilter)}{" "}
                {pcSeverityFilter.length != 0 && <br />}
                {resultCodeFilter.length != 0 &&
                  "Result Code = " + arrayToText(resultCodeFilter)}{" "}
                {resultCodeFilter.length != 0 && <br />}
                {conclusionCodeFilter.length != 0 &&
                  "Conclusion Code = " + arrayToText(conclusionCodeFilter)}{" "}
                {conclusionCodeFilter.length != 0 && <br />}
              </p>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default FilingComplaint;
