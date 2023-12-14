import { Book } from "../../../common/dto/Book";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";

const BookCard = (props: Props) => {
    const runBook = async (book: Book) => {
        await window.electron.siso.runBook({ book: book });
    }

    const stopBook = async (book: Book) => {
        await window.electron.siso.stopBook({ book: book });
    }

    return (
        <div className="max-w-sm rounded-[10px] overflow-hidden shadow-lg col-span-1 bg-gray-100 bg-opacity-90 p-4">
            <div className="px-6 py-4">
                <div className="font-bold text-gray-700 text-xl mb-2">{props.book.space.name}</div>
                <p className="text-gray-700 text-base">
                    {props.book.dateTime ?? ''}
                </p>
                <p className="text-gray-700 text-base">
                    상태: {props.book.doRun ? '실행' : '대기'}, 시도횟수: {props.book.tryCnt}
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
                <button className="inline-block bg-green-600 hover:bg-green-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                    onClick={() => runBook(props.book)}>
                    실행
                </button>
                <button className="inline-block bg-red-500 hover:bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                    onClick={() => stopBook(props.book)}>
                    중단
                </button>
            </div>
        </div>
    );
};
export default BookCard;

interface Props {
    book: Book;
}