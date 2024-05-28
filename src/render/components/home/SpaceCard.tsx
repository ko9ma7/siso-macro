import { Space } from "../../../common/type/Space";
import useSpaceStore from "../../store/useSpaceStore";

const SpaceCard: React.FC<Props> = ({ space }) => {
    const { space: selected, setSpace } = useSpaceStore();

    return (
        <div className={`flex flex-col gap-2 items-center border rounded-[4px] shadow p-2 ${selected?.no === space.no && "bg-gray-400"}`}>
            <span className="my-3">{space.name}</span>
            <div className="w-full h-[1px] bg-[#D0D0D0] mb-2" />
            <img src={space.thumb} className="w-[227px] h-[148px]" />
            <div>
                <div>기관정보: {space.institution}</div>
                <div>문의전화: {space.tel}</div>
            </div>
            <button className="bg-[#0C111D] text-white py-2.5 px-5 me-2 mb-2 text-sm font-normal hover:border-0 focus:outline-[#D0D0D0] rounded-full hover:font-bold"
                onClick={() => setSpace(space)}>
                선 택
            </button>
        </div>
    );
};
export default SpaceCard;

interface Props {
    space: Space;
}