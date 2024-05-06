import Select from 'react-select';

function SingleSelect(className: string, label: string, id: string, state: any, setState: any, options: any) {

    const updateSelectedFilter = (event: any) => {
        if (event == null) {
            setState('');
        } else {
            setState(event.value);
        }
    }

    return (
        <div className={className}>
            <label className="form-label">{label}</label>
            <Select
                id={id}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                value={{ value: state, label: state }}
                options={options}
                onChange={(e) => updateSelectedFilter(e)}
            />
        </div>
    )
}

export default SingleSelect;