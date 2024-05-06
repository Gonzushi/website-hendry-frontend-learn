import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function MultiSelectManual(className: string, label: string, id: string, state: any, setState: any, options: any) {
    const animatedComponents = makeAnimated();

    const updateSelectedFilter = (eventList: any, setState: any) => {
        let selected = [];

        for (let i in eventList) {
            selected.push({ value: eventList[i].value, label: eventList[i].value })
        };
        setState(selected)
    }

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
                components={animatedComponents}
                options={options}
                onChange={(e) => updateSelectedFilter(e, setState)}
            />
        </div>
    )
}

export default MultiSelectManual;