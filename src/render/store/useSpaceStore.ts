import { create } from "zustand";
import { Space } from "../../common/type/Space";

interface SpaceState {
    space: Space;
    setSpace: (space: Space) => void;
}

const useSpaceStore = create<SpaceState>((set) => ({
    space: undefined,
    setSpace: (space) => set((state) => ({ space: state.space === space ? undefined : space })),
}));
export default useSpaceStore;