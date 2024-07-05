import { create } from "zustand";
import { Book } from "../../common/type/Book";

interface BookState {
    books: Book[];
    setBooks: (books: Book[]) => void;
}

const useBookStore = create<BookState>((set) => ({
    books: [],
    setBooks: (books) => set({ books: books }),
}));
export default useBookStore;