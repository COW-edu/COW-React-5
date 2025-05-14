// tailwind.config.js
module.exports = {
  content: [
    // 이부분 네 프로젝트 파일 경로에 맞게 설정해야 함
    "./src/**/*.{js,jsx,ts,tsx}",

    // ... 네 프로젝트에서 Tailwind 클래스를 사용하는 다른 파일 경로들
    //이거 없어서 tailwind css가 적용이 안됨
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};
