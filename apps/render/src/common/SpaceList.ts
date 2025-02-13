import { Space } from "@repo/type";

export const SpaceList: Map<string, Space> = new Map<string, Space>(
    [
        [
            "JOONGANG",
            {
                no: 335,
                name: "중앙공원 풋살장",
                thumb: "https://share.siheung.go.kr/space/image.do?store_file=eae4ab4c609f4966a7707995d2e71766.jpg&file_nm=중앙공원풋살장...jpg",
                institution: '체육진흥과',
                tel: '031-310-3159',
            } as Space,
        ],
        [
            "DALWOL",
            {
                no: 1227,
                name: "달월 풋살장",
                thumb: "https://share.siheung.go.kr/space/image.do?store_file=831dc304fed84164acf120d0529f3f0b.jpg&file_nm=%EB%8B%AC%EC%9B%94.jpg",
                institution: '체육진흥과',
                tel: '031-310-3159',
            } as Space,
        ],
        [
            "HAMSONG",
            {
                no: 1248,
                name: "함송 풋살장",
                thumb: "https://share.siheung.go.kr/space/image.do?store_file=7c6a7973b61b4b1bbb179de4d572583b.jpeg&file_nm=함송 족구장.jpeg",
                institution: '체육진흥과',
                tel: '031-310-3159',
            } as Space,
        ],
        [
            "WOLGOT",
            {
                no: 1399,
                name: "월곶역 풋살장",
                thumb: "https://share.siheung.go.kr/space/image.do?store_file=48481582804e4956ba1d48a4d7ce8f36.jpg&file_nm=%EA%B3%B5%EA%B0%84%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg",
                institution: '체육진흥과',
                tel: '031-310-3159',
            } as Space,
        ],
    ]
); 1