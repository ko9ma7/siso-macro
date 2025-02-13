import { Space } from "@repo/type";
import { create } from "zustand";

interface SpaceState {
    space: Space;
    setSpace: (space: Space) => void;
}

const useSpaceStore = create<SpaceState>((set) => ({
    space: undefined,
    setSpace: (space) => set((state) => ({ space: state.space === space ? undefined : space })),
}));
export default useSpaceStore;