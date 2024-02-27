import { Book } from "../../../common/dto/Book";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import Modal from 'react-modal';
import Dropdown from "../Dropdown/Dropdown";
import { DropdownValue } from "../../../common/type/DropdownValue";
import { SPACE_LIST } from "../../../common/constants/SpaceList";
import playImg from "@assets/images/play.png";
import pauseImg from "@assets/images/pause.png";
import removeImg from "@assets/images/remove.png";

const BookCard = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const spaces: DropdownValue[] = [
        { text: SPACE_LIST.JOONGANG.name, value: `${SPACE_LIST.JOONGANG.no}` },
        { text: SPACE_LIST.HAMSONG.name, value: `${SPACE_LIST.HAMSONG.no}` },
    ];
    const times: DropdownValue[] = [
        { text: "08:00", value: "08" },
        { text: "10:00", value: "10" },
        { text: "12:00", value: "12" },
        { text: "14:00", value: "14" },
        { text: "16:00", value: "16" },
        { text: "18:00", value: "18" },
        { text: "20:00", value: "20" },
    ];
    const statusColor = props.book.doRun ? "text-green-700" : "text-red-700";

    const deleteBook = async () => {
        await window.electron.siso.deleteBook({ book: props.book });
    }

    const runBook = async () => {
        if (props.book.doRun) {
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
        if (!props.book.doRun) {
            window.electron.window.dialog({ title: 'Error', text: '중단한 예약입니다' });
            return;
        }

        await window.electron.siso.stopBook({ book: props.book });
    }

    const onSpaceChange = async (value: string) => {
        props.book.spaceNo = parseInt(value);
        await window.electron.siso.updateBook({ book: props.book });
    }

    const onDateChange = async (newValue: Dayjs) => {
        props.book.date = newValue.format('YYYY-MM-DD');
        await window.electron.siso.updateBook({ book: props.book });
    }

    const onTimeChange = async (value: string) => {
        props.book.time = value;
        await window.electron.siso.updateBook({ book: props.book });
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
        <div className="max-w-sm rounded-[10px] overflow-hidden shadow-lg col-span-1 bg-gray-100 bg-opacity-90 p-4 transition-all">
            <div className="px-6 py-4">
                <Dropdown values={spaces} value={`${props.book.spaceNo}`} onSelect={onSpaceChange} disabled={props.book.doRun} />
                <div className="py-2"></div>
                <p className={"text-gray-700 text-base"}>상태: <span className={statusColor}>{props.book.doRun ? '실행' : '중단'}</span></p>
                <p className={"text-gray-700 text-base"}>시도횟수: {props.book.tryCnt}</p>
                <p className={"text-gray-700 text-base"}>
                    <button className="inline-block bg-blue-600 hover:bg-blue-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 transition-all"
                        onClick={() => setIsModalOpen(true)}>
                        로그 보기
                    </button>
                </p>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="예약일"
                        defaultValue={dayjs(props.book.date)}
                        className="w-full"
                        onChange={onDateChange}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <div className="p-2"></div>
            <Dropdown values={times} value={props.book.time} onSelect={onTimeChange} disabled={props.book.doRun} />

            <div className="px-6 pt-4 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"
                    className="bi bi-play-btn"
                    onClick={() => runBook()}>
                        <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                    </svg>
                <span className="inline-block bg-green-600 hover:bg-green-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 transition-all">
                    <img src={playImg} />
                </span>
                <button className="inline-block bg-red-500 hover:bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 transition-all"
                    onClick={() => stopBook()}>
                    <img src={pauseImg} />
                </button>
                <button className="inline-block bg-gray-500 hover:bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 transition-all"
                    onClick={() => deleteBook()}>
                    <img src={removeImg} />
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
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}