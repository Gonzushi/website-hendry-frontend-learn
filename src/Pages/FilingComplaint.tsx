// import { MantineReactTable } from 'mantine-react-table';
// import { useState, useMemo } from "react";
// import { API, abbottLink } from "../Setting.tsx";
// import MultiSelectManual from '../Components/MultiSelectManual.tsx';
// import { getCookie } from "../Components/Cookie.tsx";
// import { objectToTable } from './Utility.tsx';
// import MultiSelect from '../Components/MultiSelect.tsx';
import MainLayout from "./Layout/MainLayout.tsx";
import SingleSelectFilingComplaint from '../Components/SingleSelectFilingComplaint.tsx';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0

type FormValues = {
    nonAbbottReporter: {
        firstName: string;
        lastName: string;
        todayDate: string;
        positionTitle: string;
        email: string;
        phoneNumber: string;
        faxNumber: string;
        fromDistributor: string;
    };

    firstAbbottEmployee: {
        firstName: string;
        lastName: string;
        positionTitle: string;
        awareDateFirst: string;
        methodOfCommunication: string;
        ifOtherPleaseSepcify: string;
    };

    pehContact: {
        firstName: string;
        lastName: string;
        positionTitle: string;
        phoneNumber: string;
    };

    medicalFacility: {
        hospitalName: string;
        hospitalCode: string;
        accountNumber: string;
        address: string;
        city: string;
        postalCode: string;
        province: string;
        hospitalPhoneNumber: string;
        hospitalFaxNumber: string;
        contactName: string;
        contactPositionTitle: string;
        affiliateCountry: string;
        physicianName: string;
        physicianPhoneNumber: string;
        salesRepresentative: string;
        noCrossComplaint: string;
        udiNumber: string;
    };

    productInformations: {
        partNumber: string;
        productName: string;
        size: string;
        lot: string;
        serial: string;
        deviceReturning: string;
        wasOfferedReturn: string;
        returnStatus: string;
        incidentDetected: string;
    }[]
}

function FilingComplaint() {
    renderCount += 1

    const emptyProductInformation = {
        partNumber: '',
        productName: '',
        size: '',
        lot: '',
        serial: '',
        deviceReturning: '',
        wasOfferedReturn: '',
        returnStatus: '',
        incidentDetected: '',
    }

    const form = useForm<FormValues>({
        defaultValues: {
            productInformations: [emptyProductInformation],
        }
    });
    const { register, control, handleSubmit } = form;

    const fromDistributorNonAbbottReporterOptions = [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }];
    const methodOfCommunicationOptions = [
        { value: "At site (person to person)", label: "At site (person to person)" },
        { value: "Attended Case", label: "Attended Case" },
        { value: "Email/Fax", label: "Email/Fax" },
        { value: "Phone", label: "Phone" },
        { value: "Other", label: "Other" },
    ];

    const { fields, append, remove } = useFieldArray({
        name: 'productInformations',
        control
    })


    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <MainLayout>
            <div className="container-fluid">

                <div className="row mb-4">
                    <div className="col-md-6">
                        <h1>Product Experience Report {renderCount}</h1>
                    </div>
                    <div className="col-md-6 text-end mt-2 pe-4">
                        <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit(onSubmit)}>Submit</button>
                    </div>
                </div>

                <form className="g-3 m-2">
                    <div className="accordion" id="accordionPER">

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="nonAbbottIncidentReportersDetailsHeader">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#nonAbbottIncidentReportersDetailsContent">
                                    Non Abbott Incident Reporters Details (Non Abbott person who reported the event)
                                </button>
                            </h2>
                            <div id="nonAbbottIncidentReportersDetailsContent" className="accordion-collapse collapse show">
                                <div className="accordion-body row">
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="firstNameNonAbbottReporter" {...register('nonAbbottReporter.firstName')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lastNameNonAbbottReporter" {...register('nonAbbottReporter.lastName')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Today's Date</label>
                                        <input type="text" className="form-control" id="todayDateNonAbbottReporter" {...register('nonAbbottReporter.todayDate')} placeholder="yyyy-mm-dd" />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Position Title</label>
                                        <input type="text" className="form-control" id="positionTitleNonAbbottReporter" {...register('nonAbbottReporter.positionTitle')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" id="emailNonAbbottReporter" {...register('nonAbbottReporter.email')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Phone Number</label>
                                        <input type="text" className="form-control" id="phoneNumberNonAbbottReporter" {...register('nonAbbottReporter.phoneNumber')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Fax Number</label>
                                        <input type="text" className="form-control" id="faxNumberNonAbbottReporter" {...register('nonAbbottReporter.faxNumber')} />
                                    </div>
                                    {SingleSelectFilingComplaint('col-md-3', 'Was this received from a distributor?', 'fromDistributorNonAbbottReporter', fromDistributorNonAbbottReporterOptions, control, 'nonAbbottReporter.fromDistributor')}
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="firstAbbottEmployeeHeader">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#firstAbbottEmployeeContent">
                                    1st Abbott Employee to Report Incident (1st Abbott Employee who was made aware of the event)
                                </button>
                            </h2>
                            <div id="firstAbbottEmployeeContent" className="accordion-collapse collapse show">
                                <div className="accordion-body row">
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="firstNameFirstAbbottEmployee" {...register('firstAbbottEmployee.firstName')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lastNameFirstAbbottEmployee" {...register('firstAbbottEmployee.lastName')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Position Title</label>
                                        <input type="text" className="form-control" id="positionTitleFirstAbbottEmployee" {...register('firstAbbottEmployee.positionTitle')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">AV Aware Date</label>
                                        <input type="text" className="form-control" id="awareDateFirstAbbottEmployee" {...register('firstAbbottEmployee.awareDateFirst')} placeholder="yyyy-mm-dd" />
                                    </div>
                                    {SingleSelectFilingComplaint('col-md-3', 'Method of Communication', 'methodOfCommunication', methodOfCommunicationOptions, control, 'firstAbbottEmployee.methodOfCommunication')}
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">If Other, please specify</label>
                                        <input type="text" className="form-control" id="ifOtherPleaseSepcifyFirstAbbottEmployee" {...register('firstAbbottEmployee.ifOtherPleaseSepcify')} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="pehContactHeader">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#pehContactContent">
                                    AV Product Experience Handling (PEH) Contact (N/A this section if not applicable)
                                </button>
                            </h2>
                            <div id="pehContactContent" className="accordion-collapse collapse show">
                                <div className="accordion-body row">
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="firstNamePehContact" {...register('pehContact.firstName')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lastNamePehContact" {...register('pehContact.lastName')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Position Title</label>
                                        <input type="text" className="form-control" id="positionTitlePehContact" {...register('pehContact.positionTitle')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Phone Number</label>
                                        <input type="text" className="form-control" id="phoneNumberPehContact" {...register('pehContact.phoneNumber')} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="medicalFacilityHeader">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#medicalFacilityContent">
                                    Medical Facility/Institution/Hospital
                                </button>
                            </h2>
                            <div id="medicalFacilityContent" className="accordion-collapse collapse show">
                                <div className="accordion-body row">
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Hospital Name</label>
                                        <input type="text" className="form-control" id="hospitalNameMedicalFacility" {...register('medicalFacility.hospitalName')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Hospital Code</label>
                                        <input type="text" className="form-control" id="hospitalCodeMedicalFacility" {...register('medicalFacility.hospitalCode')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Account Number</label>
                                        <input type="text" className="form-control" id="accountNumberMedicalFacility" {...register('medicalFacility.accountNumber')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" id="addressMedicalFacility" {...register('medicalFacility.address')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">City</label>
                                        <input type="text" className="form-control" id="cityMedicalFacility" {...register('medicalFacility.city')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Postal Code</label>
                                        <input type="text" className="form-control" id="postalCodeMedicalFacility" {...register('medicalFacility.postalCode')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Province/State/Country</label>
                                        <input type="text" className="form-control" id="provinceMedicalFacility" {...register('medicalFacility.province')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Hospital Phone Number</label>
                                        <input type="text" className="form-control" id="hospitalPhoneNumberMedicalFacility" {...register('medicalFacility.hospitalPhoneNumber')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Hospital Fax Number</label>
                                        <input type="text" className="form-control" id="hospitalFaxNumberMedicalFacility" {...register('medicalFacility.hospitalFaxNumber')} />
                                    </div>
                                    <div className="col-md-6 my-1">
                                        <label className="form-label">Contact Name at Institution (First & Last)</label>
                                        <input type="text" className="form-control" id="contactNameMedicalFacility" {...register('medicalFacility.contactName')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Contact Position Title</label>
                                        <input type="text" className="form-control" id="contactPositionTitleMedicalFacility" {...register('medicalFacility.contactPositionTitle')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Affiliate Country</label>
                                        <input type="text" className="form-control" id="affiliateCountryMedicalFacility" {...register('medicalFacility.affiliateCountry')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Physician Name</label>
                                        <input type="text" className="form-control" id="physicianNameMedicalFacility" {...register('medicalFacility.physicianName')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Physican Phone Number</label>
                                        <input type="text" className="form-control" id="physicianPhoneNumberMedicalFacility" {...register('medicalFacility.physicianPhoneNumber')} />
                                    </div>
                                    <div className="col-md-3 my-1">
                                        <label className="form-label">Sales Representative</label>
                                        <input type="text" className="form-control" id="salesRepresentativeMedicalFacility" {...register('medicalFacility.salesRepresentative')} />
                                    </div>
                                    <div className="col-md-6 my-1">
                                        <label className="form-label">Is this incident being reported as a no cross/failure to advance incident only?</label>
                                        <input type="text" className="form-control" id="noCrossComplaint" {...register('medicalFacility.noCrossComplaint')} />
                                    </div>
                                    <div className="col-md-6 my-1">
                                        <label className="form-label">UDI Number (Barcode)</label>
                                        <input type="text" className="form-control" id="udiNumberMedicalFacility" {...register('medicalFacility.udiNumber')} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="productInformationHeader">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#productInformationContent">
                                    Product Information and Disposition (Mandatory)
                                </button>
                            </h2>
                            <div id="productInformationContent" className="accordion-collapse collapse show">
                                <div className="accordion-body row">
                                    {
                                        fields.map((field, index) => {
                                            let lastField: boolean = false
                                            if (fields.length == index + 1) {
                                                lastField = true;
                                            }
                                            return (
                                                <div className="border-bottom col-lg-12 row ms-1 me-2 pb-4 mt-4" key={field.id}>
                                                    <div className="col-lg-1 text-left mt-1 border-end mb-3 d-none d-lg-block d-xl-block">
                                                        <b>Product {index + 1}</b>
                                                        {!lastField && <button type="submit" className="btn btn-primary me-1 mt-2" onClick={(e) => { e.preventDefault(); append(emptyProductInformation) }} disabled>+</button>}
                                                        {lastField && <button type="submit" className="btn btn-primary me-1 mt-2" onClick={(e) => { e.preventDefault(); append(emptyProductInformation) }}>+</button>}
                                                        {fields.length == 1 && <button type="submit" className="btn btn-primary mt-2 px-3" onClick={(e) => { e.preventDefault(); remove(index) }} disabled>-</button>}
                                                        {fields.length != 1 && <button type="submit" className="btn btn-primary mt-2 px-3" onClick={(e) => { e.preventDefault(); remove(index) }}>-</button>}
                                                    </div>
                                                    <div className="col-lg-1 text-left mt-1 mb-3 d-lg-none d-xl-none">
                                                        <b className="pe-4">Product {index + 1}</b>
                                                        {!lastField && <button type="submit" className="btn btn-primary me-1 mt-2" onClick={(e) => { e.preventDefault(); append(emptyProductInformation) }} disabled>+</button>}
                                                        {lastField && <button type="submit" className="btn btn-primary me-1 mt-2" onClick={(e) => { e.preventDefault(); append(emptyProductInformation) }}>+</button>}
                                                        {index == 0 && <button type="submit" className="btn btn-primary mt-2 px-3" onClick={(e) => { e.preventDefault(); remove(index) }} disabled>-</button>}
                                                        {index != 0 && <button type="submit" className="btn btn-primary mt-2 px-3" onClick={(e) => { e.preventDefault(); remove(index) }}>-</button>}
                                                    </div>
                                                    <div className="col-md row">
                                                        <div className="col-md-3 my-1">
                                                            <label className="form-label">Part Number</label>
                                                            <input type="text" className="form-control" id={"partNumber" + { index }} {...register(`productInformations.${index}.partNumber` as const)} />
                                                        </div>
                                                        <div className="col-md-3 my-1">
                                                            <label className="form-label">Product Name</label>
                                                            <input type="text" className="form-control" id={"productName" + { index }} {...register(`productInformations.${index}.productName` as const)} />
                                                        </div>
                                                        <div className="col-md-3 my-1">
                                                            <label className="form-label">Size</label>
                                                            <input type="text" className="form-control" id={"size" + { index }} {...register(`productInformations.${index}.size` as const)} />
                                                        </div>
                                                        <div className="col-md-3 my-1">
                                                            <label className="form-label">Lot #</label>
                                                            <input type="text" className="form-control" id={"lot" + { index }} {...register(`productInformations.${index}.lot` as const)} />
                                                        </div>
                                                        <div className="col-md-3 my-1">
                                                            <label className="form-label">Serial #</label>
                                                            <input type="text" className="form-control" id={"serial" + { index }} {...register(`productInformations.${index}.serial` as const)} />
                                                        </div>
                                                        <div className="col-md-3 my-1">
                                                            <label className="form-label">Is the device returning?</label>
                                                            <input type="text" className="form-control" id={"deviceReturning" + { index }} {...register(`productInformations.${index}.deviceReturning` as const)} />
                                                        </div>
                                                        <div className="col-md-3 my-1">
                                                            <label className="form-label">Product/Return Status</label>
                                                            <input type="text" className="form-control" id={"returnStatus" + { index }} {...register(`productInformations.${index}.returnStatus` as const)} />
                                                        </div>
                                                        <div className="col-md-3 my-1">
                                                            <label className="form-label">When was the incident detected?</label>
                                                            <input type="text" className="form-control" id={"incidentDetected" + { index }} {...register(`productInformations.${index}.incidentDetected` as const)} />
                                                        </div>
                                                        <div className="col-md-6 my-1">
                                                            <label className="form-label">Was the product requested/offered for return?</label>
                                                            <input type="text" className="form-control" id={"wasOfferedReturn" + { index }} {...register(`productInformations.${index}.wasOfferedReturn` as const)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }


                                </div>
                            </div>
                        </div>

                    </div>
                </form>
                <DevTool control={control} />
            </div>
        </MainLayout>
    );
};

export default FilingComplaint;