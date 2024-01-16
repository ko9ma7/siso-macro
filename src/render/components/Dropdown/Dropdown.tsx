import { DropdownValue } from "../../../common/type/DropdownValue";

const Dropdown = (props: Props) => {
    const onChange = (e) => {
        const value = e.target.value;
        props.onSelect(value);
    }
    return (
        <select className="w-full bg-transparent rounded-[4px] border-[1px] border-[black] px-2 py-4 text-black"
            defaultValue={props.value} onChange={onChange} disabled={props.disabled}>
            {
                props.values.map((value: DropdownValue) => {
                    return (<option key={value.value} value={value.value}>{value.text}</option>);
                })
            }
        </select>
    )
};

export default Dropdown;

interface Props {
    values: DropdownValue[];
    value: string;
    onSelect: (value) => void;
    disabled: boolean;
}