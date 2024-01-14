import { DropdownValue } from "../../../common/type/DropdownValue";

const Dropdown = (props: Props) => {
    return (
        <select className="w-full bg-transparent rounded-[4px] border-[1px] border-[black] px-2 py-4 text-black" onSelect={() => props.setValue}>
            {
                props.values.map((value: DropdownValue) => {
                    const isSelected = value.value === props.value;
                    return (<option key={value.value} value={value.value} selected={isSelected}>{value.text}</option>
                    );
                })
            }
        </select>
    )
};

export default Dropdown;

interface Props {
    values: DropdownValue[];
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}