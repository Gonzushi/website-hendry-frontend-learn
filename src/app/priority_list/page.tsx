"use client"

import MainLayout from "@/src/app/Layout/MainLayout"
import { useState, useEffect, useMemo } from 'react';
import { API, abbottLink } from "@/src/Setting";
import { MantineReactTable } from 'mantine-react-table';

function PriorityList() {
    const [data, setData] = useState([])
    const [option, setOption] = useState('queue')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setData([]);
        setIsLoading(true);
        const requestLink = API + '/priority_list/' + option;
        fetch(requestLink, { method: 'GET' })
            .then(response => response.json())
            .then((response) => {
                setData(response);
                setIsLoading(false);
            });
    }, [option])

    const columnDetail = useMemo(
        () => [
            { accessorKey: 'Priority Assignment', header: 'Priority Assignment' },
            { accessorKey: 'Product Category', header: 'Product Category' },
            { accessorKey: 'Age of Complaint', header: 'Age of Complaint' },
            { accessorKey: 'Age at EOM', header: 'Age at EOM' },
            { accessorKey: 'Days in INV Queue', header: 'Days in INV Queue' },
            { accessorKey: 'Product Segment', header: 'Product Segment' },
            {
                accessorKey: 'CN Name',
                header: 'CN Name',
                Cell: ({ row }: { row: any }) => {
                    return (
                        <a href={abbottLink + row.original['CN ID']} target='_blank'>{row.original['CN Name']}</a>
                    )
                },
            },
            {
                accessorKey: 'INV Name',
                header: 'INV Name',
                Cell: ({ row }: { row: any }) => {
                    return (
                        <a href={abbottLink + row.original['INV ID']} target='_blank'>{row.original['INV Name']}</a>
                    )
                },
            },
            {
                accessorKey: 'LR Name',
                header: 'LR Name',
                Cell: ({ row }: { row: any }) => {
                    return (
                        <a href={abbottLink + row.original['LR ID']} target='_blank'>{row.original['LR Name']}</a>
                    )
                },
            },
            { accessorKey: 'Reportable', header: 'Reportable' },
            { accessorKey: 'Country', header: 'Country' },
            { accessorKey: 'Reportable Tree', header: 'Reportable Tree' },
            { accessorKey: 'RDC', header: 'RDC' },
            { accessorKey: 'PC', header: 'PC' },
            { accessorKey: 'Max Severity', header: 'Max Severity' },
            { accessorKey: 'INV Owner Name', header: 'INV Owner Name' },
            { accessorKey: 'INV Status', header: 'INV Status' },
            { accessorKey: 'Alert Date', header: 'Alert Date' },
            { accessorKey: 'RDC Long', header: 'RDC Long' },
            { accessorKey: 'PC Long', header: 'PC Long' },
        ],
        [],
    );

    return (
        <MainLayout>
            <div className="container-fluid">
                <div className="row mt-3">
                    {option == 'queue' && <h1 className="col-md-6 ps-4">Priority List (Queue)</h1>}
                    {option == 'assigned' && <h1 className="col-md-6 ps-4">Priority List (Assigned)</h1>}
                    <div className="col-md-6 text-end pe-4 d-none d-md-block">
                        {!isLoading && option == 'assigned' && <button type="submit" className="btn btn-outline-primary" onClick={() => { setOption('queue'); setIsLoading(true) }}>To Queue</button>}
                        {!isLoading && option == 'queue' && <button type="submit" className="btn btn-outline-primary" onClick={() => { setOption('assigned'); setIsLoading(true) }}>To Assigned</button>}
                        {isLoading && <button type="submit" className="btn btn-outline-primary" disabled>Loading...</button>}
                    </div>
                    <div className="col-md-6 ps-4 d-md-none py-2">
                        {!isLoading && option == 'assigned' && <button type="submit" className="btn btn-outline-primary" onClick={() => { setOption('queue'); setIsLoading(true) }}>To Queue</button>}
                        {!isLoading && option == 'queue' && <button type="submit" className="btn btn-outline-primary" onClick={() => { setOption('assigned'); setIsLoading(true) }}>To Assigned</button>}
                        {isLoading && <button type="submit" className="btn btn-outline-primary" disabled>Loading...</button>}
                    </div>

                    <div className="container-fluid col-md-12 justify-content-center px-4 py-1 pb-3 d-none d-md-block">
                        <MantineReactTable
                            columns={columnDetail}
                            data={data}
                            initialState={
                                {
                                    density: 'xs',
                                    pagination: { pageIndex: 0, pageSize: 8 },
                                    columnPinning: { left: ['CN Name', 'INV Name'] },
                                    showColumnFilters: true,
                                }}
                            isMultiSortEvent={() => true}
                            state={{ isLoading: isLoading }}
                            mantinePaginationProps={{
                                rowsPerPageOptions: ['5', '8', '10', '15', '20', '25', '30', '50', '100'],
                                withEdges: true
                            }}
                        />
                    </div>

                    <div className="container-fluid col-md-12 justify-content-center px-4 py-1 pb-3 d-md-none">
                        <MantineReactTable
                            columns={columnDetail}
                            data={data}
                            initialState={
                                {
                                    density: 'xs',
                                    pagination: { pageIndex: 0, pageSize: 8 },
                                    columnPinning: { left: ['CN Name'] },
                                    showColumnFilters: true,
                                }}
                            isMultiSortEvent={() => true}
                            state={{ isLoading: isLoading }}
                            mantinePaginationProps={{
                                rowsPerPageOptions: ['5', '8', '10', '15', '20', '25', '30', '50', '100'],
                                withEdges: true
                            }}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default PriorityList;