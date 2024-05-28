import { useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Reservation } from '../../common/type/Reservation';

const ListPage = () => {
    const [list, setList] = useState<Reservation[]>([]);
    const props = useOutletContext();
    const btnRef = useRef<SVGSVGElement>();

    useEffect(() => {
        getList();
    }, []);

    const refresh = () => {
        if (!(props as any).doRefresh) {
            (props as any).setDoRefresh(true);

            window.electron.siso.refreshList().then(() => {
                (props as any).setDoRefresh(false);
                getList();
            });
        }
    }

    const getList = async () => {
        const list = await window.electron.siso.list();
        setList(list);
    };

    return (
        <div className="p-4 overflow-auto scrollbar-hide">
            <div className="bg-[#FFFFFF] rounded-[8px] shadow-md">
                <div className="mb-5">
                    <svg ref={btnRef} className={"bi bi-arrow-clockwise rounded-full p-1 cursor-pointer hover:bg-white hover:text-black transition-all " + ((props as any).doRefresh ? "animate-spin" : "")}
                        xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" onClick={refresh}>
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                    </svg>
                </div>


                <table className="w-full text-sm text-left rtl:text-right rounded-[10px] bg-gray-700 bg-opacity-90 text-gray-300 dark:text-gray-400">
                    <thead className="text-sm text-white uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">번호</th>
                            <th scope="col" className="px-6 py-3">공간명</th>
                            <th scope="col" className="px-6 py-3">이용일시</th>
                            <th scope="col" className="px-6 py-3">신청상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ...list.map((item) => {
                                return (
                                    <tr className="dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap dark:text-white">{item.id}</th>
                                        <td className="px-6 py-4">{item.place}</td>
                                        <td className="px-6 py-4">{item.dateTime}</td>
                                        <td className="px-6 py-4">{item.status}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListPage;