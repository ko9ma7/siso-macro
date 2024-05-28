import { useEffect, useState } from "react";
import { Book } from "../../common/type/Book";
import SpaceCard from "../components/home/SpaceCard";
import useSpaceStore from "../store/useSpaceStore";

const HomePage = () => {
    const { spaces } = useSpaceStore();
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks();
        window.electron.siso.onUpdateBooks(onUpdateBooks);
    }, []);

    const creaetBook = async () => {
        if (books.length >= 20) {
            window.electron.window.dialog({ title: 'Error', text: '예약은 최대 20개 생성가능' });
            return;
        }

        const book = new Book();
        book.id = crypto.randomUUID();

        await window.electron.siso.createBook({ book: book });
    }

    const getBooks = async () => {
        const list = await window.electron.siso.getBooks();
        setBooks(list);
    }

    const onUpdateBooks = (books: Book[]) => {
        setBooks(books);
    };

    return (
        <div className="scrollbar-hide p-4">
            <div className="bg-[#FFFFFF] rounded-[8px] shadow-md p-4">
                <ul className="w-full grid grid-cols-4 gap-2 transition-all">
                    {spaces.map((space) => <SpaceCard space={space} />)}
                    {/* {books.map((book) => (<BookCard book={book} setBooks={setBooks} />))} */}
                </ul>
            </div>
        </div >
    );
};

export default HomePage;