import Select from 'react-select';
import { Controller } from 'react-hook-form';

function SingleSelectFilingComplaint(className: string, label: string, id: string, options: any, control: any, storeLocation: any) {
    return (
        <div className={className}>
            <label className="form-label">{label}</label>
            <Controller
                control={control}
                name={String(storeLocation)}
                render={({ field }) => (
                    <Select
                        id={id}
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        options={options}
                        onChange={(e: any)=> {
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