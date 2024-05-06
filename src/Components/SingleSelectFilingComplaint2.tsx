import Select from 'react-select';
import { Controller } from 'react-hook-form';

function SingleSelectFilingComplaint(className: string, label: string, options: any, control: any, storeLocation: any) {
    const optionsTransform = () => {
        let optionsTemp: any[] = []
        options.map(
            (option: string) => {
                optionsTemp.push({value: option, label: option})
            }
        )
        return optionsTemp
    }

    return (
        <div className={className}>
            <label className="form-label">{label}</label>
            <Controller
                control={control}
                name={String(storeLocation)}
                render={({ field }) => (
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        options={optionsTransform()}
                        onChange={(e: any) => {
                            if (e == null) {
                                field.onChange('');
                            } else {
                                field.onChange(e.value);
                            }
                        }}
                    />
                )}
            />
        </div>
    )
}

export default SingleSelectFilingComplaint;