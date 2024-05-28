import { Space } from "../type/Space";

export const SPACE_LIST = {
    HAMSONG: {
        no: 1248,
        name: '(체육진흥과)함송 풋살장',
        thumb: "https://share.siheung.go.kr/space/image.do?store_file=7c6a7973b61b4b1bbb179de4d572583b.jpeg&file_nm=함송 족구장.jpeg",
        institution: '체육진흥과',
        tel: '031-310-3159',
    } as Space,
    JOONGANG: {
        no: 335,
        name: '(체육진흥과)중앙공원 풋살장',
        thumb: "https://share.siheung.go.kr/space/image.do?store_file=eae4ab4c609f4966a7707995d2e71766.jpg&file_nm=중앙공원풋살장...jpg",
        institution: '체육진흥과',
        tel: '031-310-3159', 
    } as Space,
} as const;
export type SpaceList = typeof SPACE_LIST[keyof typeof SPACE_LIST];