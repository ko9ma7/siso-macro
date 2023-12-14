import { useEffect, useState } from "react";
import { Book } from "../../common/dto/Book";
import BookCard from "../components/home/BookCard";
import { Space } from "../../common/dto/Space";
import SPACE from "../../common/constants/SpaceEnum";

const HomePage = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks();

        window.electron.siso.onUpdateBook(onUpdateBook);
    }, []);

    const creaetBook = async () => {
        const args = {
            id: crypto.randomUUID(),
            space: { no: SPACE.JOONGANG.no, name: SPACE.JOONGANG.name } as Space,
        } as Book;

        await window.electron.siso.createBook(args);
        getBooks();
    }

    const getBooks = async () => {
        const list = await window.electron.siso.getBooks();
        setBooks(list);
    }

    const onUpdateBook = (books: Book[]) => {
        setBooks(books);
    };

    return (
        <div className=" overflow-auto scrollbar-hide p-4">
            <div className="mb-5">
                <svg className="bi bi-plus-circle rounded-full p-1 cursor-pointer hover:bg-white hover:text-black" onClick={creaetBook}
                    xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
            </div>

            <div className="w-full grid grid-cols-3 gap-4">
                {books.map((book) => (<BookCard book={book} />))}
            </div>
        </div >

    );
};

export default HomePage;