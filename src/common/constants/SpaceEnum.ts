const SPACE = {
    JOONGANG: { no: 335, name: '(체육진흥과)중앙공원 풋살장' },
    HAMSONG: { no: 1248, name: '(체육진흥과)함송 풋살장' },
} as const;
type SPACE = typeof SPACE[keyof typeof SPACE];

export default SPACE;