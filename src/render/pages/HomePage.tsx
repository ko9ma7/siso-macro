import { useEffect } from "react";
import { Book } from "../../common/type/Book";
import SpaceItem from "../components/home/SpaceItem";
import useSpaceStore from "../store/useSpaceStore";
import BookCard from "../components/home/BookCard";
import useBookStore from "../store/useBookStore";
import { SPACE } from "../../common/constants/Space";
import addImg from "@assets/images/add.png";

const HomePage = () => {
    const { space } = useSpaceStore();
    const { books, setBooks } = useBookStore();

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
        book.spaceNo = space.no;

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
        <div className="h-full flex">
            <ul className="h-full flex flex-col gap-2 whitespace-nowrap transition-all overflow-y-scroll p-2">
                {[...SPACE.values()].map((space) => <SpaceItem space={space} />)}
            </ul>
            <div className="relative w-full flex flex-col bg-[#FFFFFF] m-2 ml-0 shadow rounded-[8px] p-4">
                {space && (
                    <>
                        <img className="w-[48px] absolute top-2 right-2 cursor-pointer px-2 py-1 rounded-[4px] hover:opacity-80 transition-all"
                            src={addImg}
                            onClick={creaetBook}
                        />
                        <div>
                            <b>({space.institution}) {space.name}</b>
                            <span className="ml-4">TEL: {space.tel}</span>
                        </div>
                        <div className="w-full h-[1px] bg-[#D0D5DD] my-2" />
                        <ul className="h-full gap-2 overflow-y-scroll">
                            {space && books.filter((book) => book.spaceNo === space.no).map((book) => <BookCard book={book} />)}
                        </ul>
                    </>
                )}
            </div>

        </div>
    );
};

export default HomePage;