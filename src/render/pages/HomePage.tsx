import { useEffect, useState } from "react";
import { Book } from "../../common/dto/Book";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";

const HomePage = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks();
    }, []);

    const creaetBook = async () => {
        const args = {
            place: "(체육진흥과) 중앙공원 풋살장",
        };
        const book = await window.electron.siso.createBook(args);
        getBooks();
    }

    const getBooks = async () => {
        const list = await window.electron.siso.getBooks();
        setBooks(list);
    }

    const runBook = async () => {

    }

    const card = (book: Book) => {
        return (
            <div className="max-w-sm rounded-[10px] overflow-hidden shadow-lg col-span-1 hover:animate-[ease-in-out] bg-gray-700 bg-opacity-90 animate-pulse p-4">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{book.place}</div>
                    <p className="text-gray-300 text-base">
                        {book.dateTime ?? ''}
                    </p>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <MobileDateTimePicker
                            label="예약일 + 시작시간"
                            defaultValue={dayjs()}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <div className="px-6 pt-4 pb-2">
                    <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">실행</button>
                    <button className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">중단</button>
                </div>
            </div>
        );
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
                {books.map((book) => card(book))}
            </div>
        </div >

    );
};

export default HomePage;