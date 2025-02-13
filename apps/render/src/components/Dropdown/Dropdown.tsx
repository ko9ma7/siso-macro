import { DropdownValue } from "@repo/type";

const Dropdown = (props: Props) => {
    const onChange = (e) => {
        const value = e.target.value;
        props.onSelect(value);
    }
    return (
        <select className="w-[80px] h-[56px] bg-transparent rounded-[4px] border-[1px] border-[#D0D5DD] px-2 text-black"
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