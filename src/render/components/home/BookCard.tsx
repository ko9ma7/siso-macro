import { Book } from "../../../common/dto/Book";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';

const BookCard = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dateRef = useRef<string>(props.book.date);
    const timeRef = useRef<string>(props.book.time);
    const statusColor = props.book.doRun ? "text-green-700" : "text-red-700";

    useEffect(() => { }, []);

    const deleteBook = async () => {
        await window.electron.siso.deleteBook({ book: props.book });
    }

    const runBook = async () => {
        if (!dayjs(dateRef.current.trim()).isValid()) {
            window.electron.window.dialog({ title: 'Error', text: '예약일을 확인해주세요' });
            return;
        }

        if (!dayjs(timeRef.current.trim()).isValid()) {
            window.electron.window.dialog({ title: 'Error', text: '예약시간을 확인해주세요' });
            return;
        }

        props.book.date = dateRef.current;
        props.book.time = timeRef.current;
        await window.electron.siso.runBook({ book: props.book });
    }

    const stopBook = async () => {
        await window.electron.siso.stopBook({ book: props.book });
    }

    const onDateChange = (newValue: Dayjs) => {
        dateRef.current = newValue.format('YYYY-MM-DD');
    }

    const onTimeChange = (newValue: Dayjs) => {
        timeRef.current = newValue.format('HH');
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
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #494949',
            background: '#14011C',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
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
                <div dangerouslySetInnerHTML={{ __html: props.book.msg }} />
                <button className="absolute top-[5px] right-[5px]" onClick={() => setIsModalOpen(false)}>Close</button>
            </Modal>
        </div>
    );
};
export default BookCard;

interface Props {
    book: Book;
}