# 시흥시 대여공간 서비스 자동예약

## 설명

시흥시 대여공간 서비스(시소) 풋살장 자동예약 애플리케이션입니다.
puppeteer 기반 웹 브라우저 컨트롤을 통해 동작합니다.
기능으로 예약 서비스 이용을 위한 로그인, 공간예약, 예약내역 조회가 있습니다.

## 실행 방법

npm 필요합니다.
터미널에서 아래의 과정을 진행합니다.

1. npm 패키지 설치

    ```shell
    npm install
    ```

2. 개발모드로 실행

    ```shell
    npm run dev
    ```

## 동작 방식

- 데이터는 로컬 스토리지를 통해 관리됩니다.

## 사용된 기술

- node: v18.18.2
- electron: v27.1.2
- react: v8.2.37
- vite: v5.0.0
- puppeteer: v21.5.2


<!-- 기존 README.md -->
<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list -->
