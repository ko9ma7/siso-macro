import { create } from "zustand";
import { Space } from "../../common/type/Space";
import { SPACE_LIST } from "../../common/constants/SpaceList";

interface SpaceState {
    spaces: Space[];
    space: Space;
    setSpace: (space: Space) => void;
    setSpaces: (spaces: Space[]) => void;
}

const useSpaceStore = create<SpaceState>((set) => ({
    spaces: [SPACE_LIST.HAMSONG, SPACE_LIST.JOONGANG],
    space: undefined,
    setSpace: (space) => set({ space: space }),
    setSpaces: (spaces) => set({ spaces: spaces }),
}));
export default useSpaceStore;