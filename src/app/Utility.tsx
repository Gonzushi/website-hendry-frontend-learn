function objectToTable(data: any) {
    let keys = Object.keys(data[0]).sort().reverse()
    keys.pop()
    keys.unshift('#')

    const dataRow = () => {
        const generateRow = (row: any, index: any) => {

            return (
                <tr key={index}>
                    <th scope="row" key={row[keys[0]]}>{row[keys[0]]}</th>
                    {keys.slice(1).map(key => <td key={row[key]}>{row[key]}</td>)}
                </tr>
            )
        }

        return (
            <>
                {data.map((row: any, index: any) => generateRow(row, index))}
            </>
        )
    }

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover text-center" >
                <thead>
                    <tr>
                        {keys.map(key => <th key={key}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {dataRow()}
                </tbody>
            </table >
        </div>
    )
}

function objectToTableArticle(data: any, countryNameFilter: any) {
    let multiplier: any;
    let index = 0;
    let keys = Object.keys(data[0]).sort().reverse()
    keys.pop()
    keys.unshift('#')

    if (countryNameFilter.length == 0) {
        multiplier = 3
    } else {
        multiplier = 4
    }


    const dataRow = (start: any) => {
        const generateRow = (row: any, index: any) => {
            index += 1
            return (
                <tr key={index}>
                    <th scope="row">{row[keys[0]]}</th>
                    {keys.slice(1).map(key => { index += 1; return <td key={index}>{row[key]}</td> })}
                </tr>
            )
        }

        return (
            <>
                {data.slice(start * multiplier + 1, (start + 1) * multiplier).map((row: any, index: any) => generateRow(row, index))}
            </>
        )
    }

    const generateSubTable = (start: any) => {
        let keys = Object.keys(data[start * multiplier]).sort().reverse()
        keys.pop()
        keys.unshift(data[start * multiplier]['#'])
        index += 1
        return (
            <table key={index} className="table table-bordered table-hover text-center" >
                <thead>
                    <tr>
                        {<th key={index} className="text-primary">{keys[0]}</th>}
                        {keys.slice(1).map(key => { index += 1; return <th key={index}>{key}</th> })}
                    </tr>
                </thead>
                <tbody>
                    {dataRow(start)}
                </tbody>
            </table>
        )
    }

    const generateTable = () => {
        let content = []
        const dataLength = data.length
        const totalSubTable = dataLength / multiplier
        for (let i = 0; i < totalSubTable; i++) {
            content.push(generateSubTable(i))
        }
        return content
    }
    return (
        <div className="table-responsive">
            {/* <table className="table table-bordered table-hover text-center" > */}
            {generateTable()}
            {/* </table > */}
        </div>
    )
}

export { objectToTable, objectToTableArticle }

