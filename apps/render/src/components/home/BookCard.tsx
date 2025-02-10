import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { BookStatus } from '@repo/common/const';
import { Book, DropdownValue } from '@repo/common/type';
import Dropdown from '../Dropdown/Dropdown';

const BookCard = (props: Props) => {
    const times: DropdownValue[] = [
        { text: "08:00", value: "08" },
        { text: "10:00", value: "10" },
        { text: "12:00", value: "12" },
        { text: "14:00", value: "14" },
        { text: "16:00", value: "16" },
        { text: "18:00", value: "18" },
        { text: "20:00", value: "20" },
    ];
    const statusColor = props.book.status == BookStatus.run ? "text-green-700" : "text-red-700";

    const deleteBook = async () => {
        await window.electron.siso.deleteBook({ book: props.book });
    }

    const runBook = async () => {
        try {
            if (props.book.status == BookStatus.run) {
                stopBook();
            } else {
                book();
            }
        } catch (e) { }
    }

    const book = async () => {
        if (props.book.status == BookStatus.run) {
            window.electron.window.dialog({ title: 'Error', text: '이미 실행 중입니다' });
            return;
        }

        if (!(props.book.date)) {
            window.electron.window.dialog({ title: 'Error', text: '예약일을 확인해주세요' });
            return;
        }

        await window.electron.siso.runBook({ book: props.book });
    }

    const stopBook = async () => {
        if (props.book.status == BookStatus.stop) {
            window.electron.window.dialog({ title: 'Error', text: '중단한 예약입니다' });
            return;
        }

        await window.electron.siso.stopBook({ book: props.book });
    }

    const onDateChange = async (newValue: Dayjs) => {

        props.book.date = newValue.format('YYYY-MM-DD');
        await window.electron.siso.updateBook({ book: props.book });
    }

    const onTimeChange = async (value: string) => {
        props.book.time = value;
        await window.electron.siso.updateBook({ book: props.book });
    }

    const bookStatus: string = (props.book.status == BookStatus.run) ? "실행" : "중단";
    return (
        <div className={`relative w-full rounded-[10px] overflow-hidden shadow bg-gray-100 bg-opacity-90 p-4 transition-all
            border-2 ${props.book.status == BookStatus.run ? "border-blue-500" : "border-transparent"}
            `}>
            <div className="flex gap-2 justify-between items-center mb-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="예약일" defaultValue={dayjs(props.book.date)} onChange={onDateChange} />
                    </DemoContainer>
                </LocalizationProvider>
                <Dropdown values={times} value={props.book.time} onSelect={onTimeChange} disabled={props.book.status == BookStatus.run} />
            </div>

            <div className="flex gap-2 justify-between items-center">
                <p className={"text-gray-700 text-base"}>상태: <span className={statusColor}>{bookStatus}</span></p>
                <div className="flex gap-2">
                    <button className="rounded-[6px] px-10 py-2 border border-[#2D2D2D]" onClick={() => runBook()}>
                        {props.book.status == BookStatus.run ? "중단" : "예약"}
                    </button>
                    <button className="rounded-[6px] px-10 py-2 border border-red-600 text-red-600" onClick={() => deleteBook()}>
                        삭제
                    </button>
                </div>
            </div>

        </div>
    );
};
export default BookCard;

interface Props {
    book?: Book;
}