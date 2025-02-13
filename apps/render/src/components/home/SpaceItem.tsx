import { Space } from "@repo/type";
import useSpaceStore from "../../store/useSpaceStore";

interface Props {
    space: Space;
}

const SpaceItem: React.FC<Props> = ({ space }) => {
    const { space: selected, setSpace } = useSpaceStore();

    return (
        <li className={`relative w-full items-center border-2 rounded-[8px] cursor-pointer transition-all hover:shadow overflow-clip mb-2
            ${selected?.no === space.no ? "border-blue-500" : "border-[#E4E7EC]"}`}
            onClick={() => setSpace(space)}
        >
            <div className="bottom-0 w-full bg-black bg-opacity-70 text-center text-white py-2">{space.name}</div>
        </li>
    );
};
export default SpaceItem;
