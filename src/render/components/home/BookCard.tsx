import { Book } from "../../../common/dto/Book";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker, LocalizationProvider, MobileTimePicker, TimePicker } from "@mui/x-date-pickers";
import { useRef } from "react";
import { timer } from "puppeteer-core/lib/esm/third_party/rxjs/rxjs.js";

const BookCard = (props: Props) => {
    const dateRef = useRef<string>(props.book.date);
    const timeRef = useRef<string>(props.book.time);
    const statusColor = props.book.doRun ? "text-green-700" : "text-red-700";

    const runBook = async (book: Book) => {
        if (['Invalid Date', ''].includes(dateRef.current.trim())) {
            window.electron.window.dialog({ title: 'Error', text: '예약일을 선택해주세요' });
            return;
        }

        if (['Invalid Time', ''].includes(timeRef.current.trim())) {
            window.electron.window.dialog({ title: 'Error', text: '예약시간을 선택해주세요' });
            return;
        }

        book.date = dateRef.current;
        book.time = timeRef.current;
        await window.electron.siso.runBook({ book });
    }

    const stopBook = async (book: Book) => {
        await window.electron.siso.stopBook({ book });
    }

    const onDateChange = (newValue: Dayjs) => {
        dateRef.current = newValue.format('YYYY-MM-DD');
    }

    const onTimeChange = (newValue: Dayjs) => {
        timeRef.current = newValue.format('HH');
    }

    return (
        <div className="max-w-sm rounded-[10px] overflow-hidden shadow-lg col-span-1 bg-gray-100 bg-opacity-90 p-4">
            <div className="px-6 py-4">
                <div className="font-bold text-gray-700 text-xl mb-2">{props.book.space.name}</div>
                <p className="text-gray-700 text-base">
                    {props.book.date ?? ''}
                </p>
                <p className={"text-gray-700 text-base"}>상태: <span className={statusColor}>{props.book.doRun ? '실행' : '중단'}</span></p>
                <p className={"text-gray-700 text-base"}>시도횟수: {props.book.tryCnt}</p>
                <p className={"text-gray-700 text-base"}>로그: {props.book.msg}</p>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="예약일"
                        defaultValue={dayjs(dateRef.current)}
                        onChange={onDateChange}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <MobileTimePicker
                        label="시간"
                        views={['hours']}
                        defaultValue={dayjs(timeRef.current)}
                        ampm={false}
                        onChange={onTimeChange}
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