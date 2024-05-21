import { create } from "zustand";

interface LoaderState {
    isLoad: boolean
    setIsLoad: (isLoad: boolean) => void,
}

const useLoaderStore = create<LoaderState>((set) => ({
    isLoad: false,
    setIsLoad: (isLoad) => set(() => ({ isLoad: isLoad })),
}));
export default useLoaderStore;