import { Book } from '@repo/type';
import { create } from "zustand";

interface BookState {
    books: Book[];
    setBooks: (books: Book[]) => void;
}

const useBookStore = create<BookState>((set) => ({
    books: [],
    setBooks: (books) => set({ books: books }),
}));
export default useBookStore;