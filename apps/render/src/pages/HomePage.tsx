import { useEffect } from "react";
import SpaceItem from "../components/home/SpaceItem";
import useSpaceStore from "../store/useSpaceStore";
import BookCard from "../components/home/BookCard";
import useBookStore from "../store/useBookStore";
import addImg from "@/assets/images/add.png";
import { Book } from "@repo/common/type";
import { SPACE } from "@repo/common/const";

const HomePage = () => {
    const { space } = useSpaceStore();
    const { books, setBooks } = useBookStore();

    useEffect(() => {
        getBooks();
        window.electron.siso.onUpdateBooks(onUpdateBooks);
    }, []);

    const creaetBook = async () => {
        if (books.length > 40) {
            window.electron.window.dialog({ title: 'Error', text: '예약은 최대 40개 생성가능' });
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

            <ul className="w-[30%] h-full transition-all overflow-y-scroll p-2 pb-0">
                {[...SPACE.values()].map((space) => <SpaceItem key={space.no} space={space} />)}
            </ul>

            <div className="w-full h-full p-2 pl-0">
                <div className="w-full h-full relative flex flex-col bg-[#FFFFFF] box-border shadow rounded-[8px] p-4">
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
                            <div className="relative h-full overflow-auto">
                                <div className="grid grid-cols-2 gap-4">
                                    {space && books.filter((book) => book.spaceNo === space.no).map((book) => <BookCard key={book.id} book={book} />)}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

export default HomePage;