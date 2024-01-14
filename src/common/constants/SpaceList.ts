import { Space } from "../dto/Space";

export const SPACE_LIST = {
    JOONGANG: { no: 335, name: '(체육진흥과)중앙공원 풋살장' } as Space,
    HAMSONG: { no: 1248, name: '(체육진흥과)함송 풋살장' } as Space,
} as const;
export type SpaceList = typeof SPACE_LIST[keyof typeof SPACE_LIST];