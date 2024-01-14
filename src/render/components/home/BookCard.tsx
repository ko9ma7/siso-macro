import { Book } from "../../../common/dto/Book";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import Dropdown from "../Dropdown/Dropdown";
import { DropdownValue } from "../../../common/type/DropdownValue";

const BookCard = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const times: DropdownValue[] = [
        { text: "08:00", value: "08" },
        { text: "10:00", value: "10" },
        { text: "12:00", value: "12" },
        { text: "14:00", value: "14" },
        { text: "16:00", value: "16" },
        { text: "18:00", value: "18" },
        { text: "20:00", value: "20" },
    ];
    const [time, setTime] = useState<string>(times[0].value);
    const dateRef = useRef<string>(props.book.date);
    const statusColor = props.book.doRun ? "text-green-700" : "text-red-700";

    useEffect(() => { }, []);

    const deleteBook = async () => {
        await window.electron.siso.deleteBook({ book: props.book });
    }

    const runBook = async () => {
        if (props.book.doRun) {
            window.electron.window.dialog({ title: 'Error', text: '이미 실행 중입니다' });
            return;
        }

        if (!dayjs(dateRef.current.trim()).isValid()) {
            window.electron.window.dialog({ title: 'Error', text: '예약일을 확인해주세요' });
            return;
        }

        props.book.date = dateRef.current;
        props.book.time = time;
        await window.electron.siso.runBook({ book: props.book });
    }

    const stopBook = async () => {
        if (!props.book.doRun) {
            window.electron.window.dialog({ title: 'Error', text: '중단한 예약입니다' });
            return;
        }

        await window.electron.siso.stopBook({ book: props.book });
    }

    const onDateChange = (newValue: Dayjs) => {
        dateRef.current = newValue.format('YYYY-MM-DD');
    }

    const modalStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(70, 70, 70, 0.75)'
        },
        content: {
            position: 'fixed',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #494949',
            background: '#14011C',
            // overflow: 'none',
            // WebkitOverflowScrolling: 'touch',
            borderRadius: '8px',
            outline: 'none',
            padding: '20px'
        }
    };

    return (
        <div className="max-w-sm rounded-[10px] overflow-hidden shadow-lg col-span-1 bg-gray-100 bg-opacity-90 p-4">
            <div className="px-6 py-4">
                <div className="font-bold text-gray-700 text-xl mb-2">{props.book.space.name}</div>
                <p className={"text-gray-700 text-base"}>상태: <span className={statusColor}>{props.book.doRun ? '실행' : '중단'}</span></p>
                <p className={"text-gray-700 text-base"}>시도횟수: {props.book.tryCnt}</p>
                <p className={"text-gray-700 text-base"}>
                    <button className="inline-block bg-blue-600 hover:bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                        onClick={() => setIsModalOpen(true)}>
                        로그 보기
                    </button>
                </p>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="예약일"
                        defaultValue={dayjs(dateRef.current)}
                        className="w-full"
                        onChange={onDateChange}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <Dropdown values={times} value={time} setValue={setTime} />

            <div className="px-6 pt-4 pb-2">
                <button className="inline-block bg-green-600 hover:bg-green-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                    onClick={() => runBook()}>
                    실행
                </button>
                <button className="inline-block bg-red-500 hover:bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                    onClick={() => stopBook()}>
                    중단
                </button>
                <button className="inline-block bg-gray-500 hover:bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                    onClick={() => deleteBook()}>
                    제거
                </button>
            </div>

            <Modal isOpen={isModalOpen} style={modalStyle}>
                <button className="relative" onClick={() => setIsModalOpen(false)}>Close</button>
                <div className="relative h-[700px] overflow-auto" dangerouslySetInnerHTML={{ __html: props.book.msg }} />
            </Modal>
        </div>
    );
};
export default BookCard;

interface Props {
    book: Book;
}