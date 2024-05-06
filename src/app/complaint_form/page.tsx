"use client";

// import { MantineReactTable } from 'mantine-react-table';
// import { API, abbottLink } from "../Setting.tsx";
// import MultiSelectManual from '../Components/MultiSelectManual.tsx';
// import { getCookie } from "../Components/Cookie.tsx";
// import { objectToTable } from './Utility.tsx';
// import MultiSelect from '../Components/MultiSelect.tsx';
import { useEffect } from "react";
import MainLayout from "@/src/app/Layout/MainLayout";
import SingleSelectFilingComplaint from "@/src/Components/SingleSelectFilingComplaint2";
// import SingleSelectFilingComplaintMultiFieldFetch from '../Components/SingleSelectFilingComplaint2MultiFields.tsx'
import { useForm, useFieldArray } from "react-hook-form";
// import { DevTool } from '@hookform/devtools';

type FormValues = {
  eventDetails: {
    fullEvaluation: string;
    customerLetter: string;
    specialRequests: string;
    clinicalTrial: string;
    trialName: string;
    eventDescription: string;
  };

  reportingInformation: {
    reportingAbbottEmployee: string;
    awareDate: string;
    reportingMethod: string;
    reportingMethodOther: string;
    isFailureToAdvance: string;
  };

  accountInformation: {
    accountNumber: string;
    hospitalName: string;
    country: string;
    sapReplacementTransaction: string;
    physicianName: string;
    accountContact1: string;
    accountContactOther: string;
    initialNonAbbottReporterName: string;
    initialNonAbbottReporterTitle: string;
  };

  patientInformation: {
    patientInvolved: string;
    isPatientInformationProvided: string;
    patientDOB: string;
    patientAge: string;
    ageUnit: string;
    weight: string;
    weightUnit: string;
    gender: string;
    ethnicity: string;
    race: string;
    relevantMedicalHistory: string;
  };

  procedureInformation: {
    procedureDate: string;
    abbottEmployeePresent: string;
    relevanTestLabData: string;
    medicationToTreatDeviceIssue: string;
  };

  productInformations: {
    partNumber: string;
    lot: string;
    productName: string;
    size: string;
    serial: string;
    implantDate: string;
    explantDate: string;
    wasRequestedForReturn: string;
    deviceReturning: string;
    returnStatus: string;
  }[];

  accessories: {
    productType: string;
    productNameSize: string;
    implantDate: string;
    partNumber: string;
    lot: string;
  }[];

  lesionInformations: {
    vesselTreated: string;
    vesselCalcification: string;
    vesselTortuosity: string;
    stenosisPrePercent: string;
    stenosisPostPercent: string;
    lesionHistory: string;
    cto: string;
  }[];

  finalOutcome: {
    clinicallySignigicantDelay: string;
    replacementDeviceUsed: string;
    deathDate: string;
  };
};

const emptyProductInformation = {
  partNumber: "",
  lot: "",
  productName: "",
  size: "",
  serial: "",
  implantDate: "",
  explantDate: "",
  wasRequestedForReturn: "",
  deviceReturning: "",
  returnStatus: "",
};
const emptyAccessory = {
  productType: "",
  productNameSize: "",
  implantDate: "",
  partNumber: "",
  lot: "",
};
const emptyLesionInformations = {
  vesselTreated: "",
  vesselCalcification: "",
  vesselTortuosity: "",
  stenosisPrePercent: "",
  stenosisPostPercent: "",
  lesionHistory: "",
  cto: "",
};

const optionsFullEvaluation = ["Yes", "No"];
const optionsCustomerLetter = ["Yes", "No"];
const optionsClinicalTrial = ["Yes", "No"];
const optionsReportingMethod = [
  "Proctored the Case",
  "Informed In-Person",
  "Phone Call/Voicemail",
  "E-Mail",
  "Fax",
  "Tech Service",
  "Other",
  "Installation/Service",
];
const optionsIsFailureToAdvance = [
  "Yes - Coronary or Endovascular",
  "Yes - OCT/FFR",
  "No",
];
// const optionsCountry = []
const optionsPatientInvolved = ["Yes", "No"];
const optionsIsPatientInformationProvided = ["Yes", "No"];
const optionsAgeUnit = ["Years", "Days", "Weeks", "Months", "NA", "NI", "ASKU"];
const optionsWeightUnit = ["LBS", "KG", "NA", "NI", "ASKU"];
const optionsGender = [
  "Male",
  "Female",
  "Intersex",
  "Transgender",
  "Prefer not to disclose",
  "Unknown",
  "NI",
  "NA",
  "ASKU",
];
const optionsEthnicity = [
  "Hispanic/Latino",
  "Not Hispanic/Latino",
  "NA",
  "NI",
  "ASKU",
];
const optionsRace = [
  "Asian",
  "American Indian or Native",
  "Black or African American",
  "White",
  "Native Hawaiian/Other Pacific Islander",
  "NA",
  "NI",
  "ASKU",
];
const optionsAbbottEmployeeDuringProcedure = ["Yes", "No", "Unknown"];
// const optionsProductName = []
const optionsWasDeviceRequestedForReturned = ["Yes", "No"];
const optionsDeviceReturning = ["Yes", "No", "NA", "NI", "ASKU"];
const optionsReturnStatus = [
  "None",
  "Reportedly Discarded",
  "Implanted",
  "No Device Deficiency, Only Patient effect reported",
  "Retained by Hospital",
  "Unknown",
  "No Cross No Return",
  "Returning to Abbott",
  "In Transit",
  "Received",
];
const optionsProductType = [
  "None",
  "Closure Device",
  "Guideliner",
  "GuideWire",
  "Guiding Catheter",
  "Not Applicable",
  "Other",
  "RHV",
];
const optionsVesselCalcification = [
  "None",
  "Mild",
  "Moderate",
  "Heavy",
  "Unknown",
  "Not Applicable",
];
const optionsVesselTortuosity = [
  "None",
  "Mild",
  "Moderate",
  "Heavy",
  "Unknown",
  "Not Applicable",
];
const optionsLesionHistory = [
  "De Novo",
  "Restenosis",
  "Unknown",
  "Not Applicable",
];
const optionsCTO = ["Yes", "No", "Not Applicable", "Unknown"];
const optionsClinicallySignificantDelay = [
  "No. Injury to the Patient was not Reported",
  "No. Delay was not Reported",
  "Yes. Adverse Patient effects were Reported",
  "Unknown",
];

function FilingComplaint2() {
  const form = useForm<FormValues>({
    defaultValues: {
      productInformations: [emptyProductInformation],
      accessories: [emptyAccessory],
      lesionInformations: [emptyLesionInformations],
    },
  });

  const { register, control, handleSubmit, getValues, watch, reset } = form;
  const watchFields = watch([
    "patientInformation.patientInvolved",
    "patientInformation.isPatientInformationProvided",
    "eventDetails.clinicalTrial",
    "reportingInformation.reportingMethod",
  ]);

  useEffect(() => {}, [watchFields]);

  const {
    fields: fieldsProductInformations,
    append: appendProductInformations,
    remove: removeProductInformations,
  } = useFieldArray({
    name: "productInformations",
    control,
  });

  const {
    fields: fieldsAccessories,
    append: appendAccessories,
    remove: removeAccessories,
  } = useFieldArray({
    name: "accessories",
    control,
  });

  const {
    fields: fieldsLesionInformations,
    append: appendLesionInformations,
    remove: removeLesionInformations,
  } = useFieldArray({
    name: "lesionInformations",
    control,
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <MainLayout>
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-md-6">
            <h1>Product Experience Report</h1>
          </div>
          {/* <div className="col-md-6 text-end mt-2 pe-4">
                        <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit(onSubmit)}>Submit</button>
                    </div> */}
        </div>

        <form className="g-3 m-2">
          <div className="accordion" id="accordionPER">
            <div className="accordion-item">
              <h2 className="accordion-header" id="eventDetailsHeader">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#eventDetailsContent"
                  aria-expanded={false}
                >
                  Event Details
                </button>
              </h2>
              <div
                id="eventDetailsContent"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body row">
                  {/* {SingleSelectFilingComplaintMultiFieldFetch('col-md-12 my-1', 'Trial', 'part_number', control, 'eventDetails.fullEvaluation')} */}
                  {SingleSelectFilingComplaint(
                    "col-md-2 my-1",
                    "Full Evaluation",
                    optionsFullEvaluation,
                    control,
                    "eventDetails.fullEvaluation"
                  )}
                  {SingleSelectFilingComplaint(
                    "col-md-2 my-1",
                    "Physician/Customer Letter",
                    optionsCustomerLetter,
                    control,
                    "eventDetails.customerLetter"
                  )}
                  <div className="col-md-3 my-1">
                    <label className="form-label">Special Requests</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("eventDetails.specialRequests")}
                    />
                  </div>
                  {SingleSelectFilingComplaint(
                    "col-md-2 my-1",
                    "Clinical Trial?",
                    optionsClinicalTrial,
                    control,
                    "eventDetails.clinicalTrial"
                  )}
                  {getValues("eventDetails.clinicalTrial") == "Yes" && (
                    <div className="col-md-3 my-1">
                      <label className="form-label">Trial Name</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("eventDetails.trialName")}
                      />
                    </div>
                  )}
                  <div className="col-md-12 my-1">
                    <label className="form-label">Reported Event Details</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      {...register("eventDetails.eventDescription")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="reportingInformationHeader">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#reportingInformationContent"
                >
                  Reporting Information
                </button>
              </h2>
              <div
                id="reportingInformationContent"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body row">
                  <div className="col-md-2 my-1">
                    <label className="form-label">
                      Reporting Abbott Employee
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register(
                        "reportingInformation.reportingAbbottEmployee"
                      )}
                    />
                  </div>
                  <div className="col-md-2 my-1">
                    <label className="form-label">Abbott Aware Date</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("reportingInformation.awareDate")}
                      placeholder="yyyy-mm-dd"
                    />
                  </div>
                  {SingleSelectFilingComplaint(
                    "col-md-2 my-1",
                    "Method Reported to Abbott",
                    optionsReportingMethod,
                    control,
                    "reportingInformation.reportingMethod"
                  )}
                  {getValues("reportingInformation.reportingMethod") ==
                    "Other" && (
                    <div className="col-md-3 my-1">
                      <label className="form-label">
                        Method Reported to Abbott (Other)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        {...register(
                          "reportingInformation.reportingMethodOther"
                        )}
                      />
                    </div>
                  )}
                  {SingleSelectFilingComplaint(
                    "col-md-3 my-1",
                    "Is this to report a Failure to Advance?",
                    optionsIsFailureToAdvance,
                    control,
                    "reportingInformation.isFailureToAdvance"
                  )}
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="accountInformationHeader">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accountInformationContent"
                >
                  Account Information
                </button>
              </h2>
              <div
                id="accountInformationContent"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body row">
                  <div className="col-md-3 my-1">
                    <label className="form-label">Account Number</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("accountInformation.accountNumber")}
                    />
                  </div>
                  <div className="col-md-3 my-1">
                    <label className="form-label">
                      Hospital Name (if different from Account)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("accountInformation.hospitalName")}
                    />
                  </div>
                  <div className="col-md-3 my-1">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("accountInformation.country")}
                    />
                  </div>
                  <div className="col-md-3 my-1">
                    <label className="form-label">
                      SAP Replacement Transactions #
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register(
                        "accountInformation.sapReplacementTransaction"
                      )}
                    />
                  </div>
                  <div className="col-md-3 my-1">
                    <label className="form-label">Physician Name</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("accountInformation.physicianName")}
                    />
                  </div>
                  <div className="col-md-3 my-1">
                    <label className="form-label">Account Contact 1</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("accountInformation.accountContact1")}
                    />
                  </div>
                  <div className="col-md-3 my-1">
                    <label className="form-label">Account Contact Other</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("accountInformation.accountContactOther")}
                    />
                  </div>
                  <div className="col-md-3 my-1">
                    <label className="form-label">
                      Initial Non-Abbott Reporter Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register(
                        "accountInformation.initialNonAbbottReporterName"
                      )}
                    />
                  </div>
                  <div className="col-md-3 my-1">
                    <label className="form-label">
                      Initial Non-Abbott Reporter Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register(
                        "accountInformation.initialNonAbbottReporterTitle"
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="patientInformationHeader">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#patientInformationContent"
                >
                  Patient Information
                </button>
              </h2>
              <div
                id="patientInformationContent"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body row">
                  {SingleSelectFilingComplaint(
                    "col-md-3 my-1",
                    "Patient Involved",
                    optionsPatientInvolved,
                    control,
                    "patientInformation.patientInvolved"
                  )}
                  {SingleSelectFilingComplaint(
                    "col-md-9 my-1",
                    "Patient information cannot be provided due to personal data privacy legislation/policy",
                    optionsIsPatientInformationProvided,
                    control,
                    "patientInformation.isPatientInformationProvided"
                  )}
                  {getValues("patientInformation.patientInvolved") == "Yes" &&
                    getValues(
                      "patientInformation.isPatientInformationProvided"
                    ) == "No" && (
                      <>
                        <div className="col-md-2 my-1">
                          <label className="form-label">Patient DOB</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("patientInformation.patientDOB")}
                            placeholder="yyyy-mm-dd"
                          />
                        </div>
                        <div className="col-md-2 my-1">
                          <label className="form-label">Patient Age</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("patientInformation.patientAge")}
                          />
                        </div>
                        {SingleSelectFilingComplaint(
                          "col-md-2 my-1",
                          "Age, Unit of Measure",
                          optionsAgeUnit,
                          control,
                          "patientInformation.ageUnit"
                        )}
                        <div className="col-md-2 my-1">
                          <label className="form-label">Weight</label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("patientInformation.weight")}
                          />
                        </div>
                        {SingleSelectFilingComplaint(
                          "col-md-2 my-1",
                          "Weight, Unit of Measure",
                          optionsWeightUnit,
                          control,
                          "patientInformation.weightUnit"
                        )}
                        {SingleSelectFilingComplaint(
                          "col-md-2 my-1",
                          "Gender",
                          optionsGender,
                          control,
                          "patientInformation.gender"
                        )}
                        {SingleSelectFilingComplaint(
                          "col-md-2 my-1",
                          "Ethnicity",
                          optionsEthnicity,
                          control,
                          "patientInformation.ethnicity"
                        )}
                        {SingleSelectFilingComplaint(
                          "col-md-2 my-1",
                          "Race",
                          optionsRace,
                          control,
                          "patientInformation.race"
                        )}
                        <div className="col-md-8 my-1">
                          <label className="form-label">
                            Relevant Medical History
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            {...register(
                              "patientInformation.relevantMedicalHistory"
                            )}
                          />
                        </div>
                      </>
                    )}
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="procedureInformationHeader">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#procedureInformationContent"
                >
                  Procedure Information
                </button>
              </h2>
              <div
                id="procedureInformationContent"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body row">
                  <div className="col-md-2 my-1">
                    <label className="form-label">Procedure Date</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("procedureInformation.procedureDate")}
                      placeholder="yyyy-mm-dd"
                    />
                  </div>
                  {SingleSelectFilingComplaint(
                    "col-md-3 my-1",
                    "Abbott Employee Present During Procedure?",
                    optionsAbbottEmployeeDuringProcedure,
                    control,
                    "procedureInformation.abbottEmployeePresent"
                  )}
                  <div className="col-md-3 my-1">
                    <label className="form-label">Relevant Test/Lab Data</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("procedureInformation.relevanTestLabData")}
                    />
                  </div>
                  <div className="col-md-4 my-1">
                    <label className="form-label">
                      Medication to Treat Device Issue
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register(
                        "procedureInformation.medicationToTreatDeviceIssue"
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="productInformationsHeader">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#productInformationsContent"
                >
                  Product Experience Device Information
                </button>
              </h2>
              <div
                id="productInformationsContent"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body row">
                  {fieldsProductInformations.map((field, index) => {
                    let lastField: boolean = false;
                    if (fieldsProductInformations.length == index + 1) {
                      lastField = true;
                    }
                    return (
                      <div
                        className="border-bottom col-lg-12 row ms-1 me-2 pb-4 mt-4"
                        key={field.id}
                      >
                        <div className="col-1 text-center mt-1 border-end mb-3 d-none d-xxl-block">
                          <b>Product {index + 1}</b>
                          <br />
                          {!lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendProductInformations(
                                  emptyProductInformation
                                );
                              }}
                              disabled
                            >
                              +
                            </button>
                          )}
                          {lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendProductInformations(
                                  emptyProductInformation
                                );
                              }}
                            >
                              +
                            </button>
                          )}
                          {fieldsProductInformations.length == 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeProductInformations(index);
                              }}
                              disabled
                            >
                              -
                            </button>
                          )}
                          {fieldsProductInformations.length != 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeProductInformations(index);
                              }}
                            >
                              -
                            </button>
                          )}
                        </div>
                        <div className="col-lg-2 text-center mt-1 mb-3 d-xxl-none d-xxl-none">
                          <b className="">Product {index + 1}</b>
                          <br />
                          {!lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendProductInformations(
                                  emptyProductInformation
                                );
                              }}
                              disabled
                            >
                              +
                            </button>
                          )}
                          {lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendProductInformations(
                                  emptyProductInformation
                                );
                              }}
                            >
                              +
                            </button>
                          )}
                          {fieldsProductInformations.length == 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeProductInformations(index);
                              }}
                              disabled
                            >
                              -
                            </button>
                          )}
                          {fieldsProductInformations.length != 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeProductInformations(index);
                              }}
                            >
                              -
                            </button>
                          )}
                        </div>
                        <div className="col-md row ms-1">
                          <div className="col-md-2 my-1">
                            <label className="form-label">Part Number</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `productInformations.${index}.partNumber` as const
                              )}
                            />
                          </div>
                          <div className="col-md-2 my-1">
                            <label className="form-label">Lot #</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `productInformations.${index}.lot` as const
                              )}
                            />
                          </div>
                          <div className="col-md-2 my-1">
                            <label className="form-label">Product Name</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `productInformations.${index}.productName` as const
                              )}
                            />
                          </div>
                          <div className="col-md-2 my-1">
                            <label className="form-label">Size</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `productInformations.${index}.size` as const
                              )}
                            />
                          </div>
                          <div className="col-md-2 my-1">
                            <label className="form-label">Serial #</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `productInformations.${index}.serial` as const
                              )}
                            />
                          </div>
                          <div className="col-md-2 my-1">
                            <label className="form-label">Implant Date</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `productInformations.${index}.implantDate` as const
                              )}
                              placeholder="yyyy-mm-dd"
                            />
                          </div>
                          <div className="col-md-2 my-1">
                            <label className="form-label">Explant Date</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `productInformations.${index}.explantDate` as const
                              )}
                              placeholder="yyyy-mm-dd"
                            />
                          </div>
                          {SingleSelectFilingComplaint(
                            "col-md-4 my-1",
                            "Was the product requested for return?",
                            optionsWasDeviceRequestedForReturned,
                            control,
                            `productInformations.${index}.wasRequestedForReturn` as const
                          )}
                          {SingleSelectFilingComplaint(
                            "col-md-3 my-1",
                            "Is the device returning?",
                            optionsDeviceReturning,
                            control,
                            `productInformations.${index}.deviceReturning` as const
                          )}
                          {SingleSelectFilingComplaint(
                            "col-md-3 my-1",
                            "Device Return Status",
                            optionsReturnStatus,
                            control,
                            `productInformations.${index}.returnStatus` as const
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="accessoriesHeader">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accessoriesContent"
                >
                  Accessory Device Used During Procedure
                </button>
              </h2>
              <div
                id="accessoriesContent"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body row">
                  {fieldsAccessories.map((field, index) => {
                    let lastField: boolean = false;
                    if (fieldsAccessories.length == index + 1) {
                      lastField = true;
                    }
                    return (
                      <div
                        className="border-bottom col-lg-12 row ms-1 me-2 pb-4 mt-4"
                        key={field.id}
                      >
                        <div className="col-1 text-center mt-1 border-end mb-3 d-none d-xxl-block">
                          <b>Accessory {index + 1}</b>
                          <br />
                          {!lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendAccessories(emptyAccessory);
                              }}
                              disabled
                            >
                              +
                            </button>
                          )}
                          {lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendAccessories(emptyAccessory);
                              }}
                            >
                              +
                            </button>
                          )}
                          {fieldsAccessories.length == 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeAccessories(index);
                              }}
                              disabled
                            >
                              -
                            </button>
                          )}
                          {fieldsAccessories.length != 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeAccessories(index);
                              }}
                            >
                              -
                            </button>
                          )}
                        </div>
                        <div className="col-lg-2 text-center mt-1 mb-3 d-xxl-none">
                          <b className="">Accessory {index + 1}</b>
                          <br />
                          {!lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendAccessories(emptyAccessory);
                              }}
                              disabled
                            >
                              +
                            </button>
                          )}
                          {lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendAccessories(emptyAccessory);
                              }}
                            >
                              +
                            </button>
                          )}
                          {fieldsAccessories.length == 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeAccessories(index);
                              }}
                              disabled
                            >
                              -
                            </button>
                          )}
                          {fieldsAccessories.length != 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeAccessories(index);
                              }}
                            >
                              -
                            </button>
                          )}
                        </div>
                        <div className="col-md row ms-1">
                          {SingleSelectFilingComplaint(
                            "col-md-2 my-1",
                            "Product Type",
                            optionsProductType,
                            control,
                            `accessories.${index}.productType` as const
                          )}
                          <div className="col-md-4 my-1">
                            <label className="form-label">
                              Product Name & Size
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `accessories.${index}.productNameSize` as const
                              )}
                            />
                          </div>
                          <div className="col-md-2 my-1">
                            <label className="form-label">Implant Date</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `accessories.${index}.implantDate` as const
                              )}
                              placeholder="yyyy-mm-dd"
                            />
                          </div>
                          <div className="col-md-2 my-1">
                            <label className="form-label">Part number</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `accessories.${index}.partNumber` as const
                              )}
                            />
                          </div>
                          <div className="col-md-2 my-1">
                            <label className="form-label">Lot #</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(`accessories.${index}.lot` as const)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="lesionInformationHeader">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#lesionInformationContent"
                >
                  Lesion Information
                </button>
              </h2>
              <div
                id="lesionInformationContent"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body row">
                  {fieldsLesionInformations.map((field, index) => {
                    let lastField: boolean = false;
                    if (fieldsLesionInformations.length == index + 1) {
                      lastField = true;
                    }
                    return (
                      <div
                        className="border-bottom col-lg-12 row ms-1 me-2 pb-4 mt-4"
                        key={field.id}
                      >
                        <div className="col-1 text-center mt-1 border-end mb-3 d-none d-xxl-block">
                          <b>Lesion {index + 1}</b>
                          <br />
                          {!lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendLesionInformations(
                                  emptyLesionInformations
                                );
                              }}
                              disabled
                            >
                              +
                            </button>
                          )}
                          {lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendLesionInformations(
                                  emptyLesionInformations
                                );
                              }}
                            >
                              +
                            </button>
                          )}
                          {fieldsLesionInformations.length == 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeLesionInformations(index);
                              }}
                              disabled
                            >
                              -
                            </button>
                          )}
                          {fieldsLesionInformations.length != 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeLesionInformations(index);
                              }}
                            >
                              -
                            </button>
                          )}
                        </div>
                        <div className="col-lg-2 text-center mt-1 mb-3 d-xxl-none">
                          <b className="">Lesion {index + 1}</b>
                          <br />
                          {!lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendLesionInformations(
                                  emptyLesionInformations
                                );
                              }}
                              disabled
                            >
                              +
                            </button>
                          )}
                          {lastField && (
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mt-2"
                              onClick={(e) => {
                                e.preventDefault();
                                appendLesionInformations(
                                  emptyLesionInformations
                                );
                              }}
                            >
                              +
                            </button>
                          )}
                          {fieldsLesionInformations.length == 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeLesionInformations(index);
                              }}
                              disabled
                            >
                              -
                            </button>
                          )}
                          {fieldsLesionInformations.length != 1 && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-2 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeLesionInformations(index);
                              }}
                            >
                              -
                            </button>
                          )}
                        </div>
                        <div className="col-md row ms-1">
                          <div className="col-md-3 my-1">
                            <label className="form-label">Vessel Treated</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `lesionInformations.${index}.vesselTreated` as const
                              )}
                            />
                          </div>
                          {SingleSelectFilingComplaint(
                            "col-md-3 my-1",
                            "Vessel Calcification",
                            optionsVesselCalcification,
                            control,
                            `lesionInformations.${index}.vesselCalcification` as const
                          )}
                          {SingleSelectFilingComplaint(
                            "col-md-3 my-1",
                            "Vessel Tortuosity",
                            optionsVesselTortuosity,
                            control,
                            `lesionInformations.${index}.vesselTortuosity` as const
                          )}
                          <div className="col-md-3 my-1">
                            <label className="form-label">
                              Stenosis Pre (%)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `lesionInformations.${index}.stenosisPrePercent` as const
                              )}
                            />
                          </div>
                          <div className="col-md-3 my-1">
                            <label className="form-label">
                              Stenosis Post (%)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              {...register(
                                `lesionInformations.${index}.stenosisPostPercent` as const
                              )}
                            />
                          </div>
                          {SingleSelectFilingComplaint(
                            "col-md-3 my-1",
                            "Lesion History",
                            optionsLesionHistory,
                            control,
                            `lesionInformations.${index}.lesionHistory` as const
                          )}
                          {SingleSelectFilingComplaint(
                            "col-md-3 my-1",
                            "CTO",
                            optionsCTO,
                            control,
                            `lesionInformations.${index}.cto` as const
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="finalOutcomeHeader">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#finalOutcomeContent"
                >
                  Final Outcome
                </button>
              </h2>
              <div
                id="finalOutcomeContent"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body row">
                  {SingleSelectFilingComplaint(
                    "col-md-4 my-1",
                    "Clinically Significant Delay?",
                    optionsClinicallySignificantDelay,
                    control,
                    `finalOutcome.clinicallySignigicantDelay` as const
                  )}
                  <div className="col-md-4 my-1">
                    <label className="form-label">
                      Replacement Device Used
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("finalOutcome.replacementDeviceUsed")}
                    />
                  </div>
                  <div className="col-md-4 my-1">
                    <label className="form-label">Death Date</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("finalOutcome.deathDate")}
                      placeholder="yyyy-mm-dd"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="btn-group my-5 col-md-12">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => reset()}
            >
              Reset
            </button>
            <button type="button" className="btn btn-outline-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </div>
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </MainLayout>
  );
}

export default FilingComplaint2;
