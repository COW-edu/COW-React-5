import { useState, useEffect } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";
//js도 기본개념정도만 알고 react도 처음이기에 생소했던 부분이나 처음 알게된 개념 다 주석으로 달았습니다.

function App() {
  //컴포넌트 하나에 다 때려박는 관점으로 코드를 짰습니다.
  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState(storeTodos); // 기존에는 빈배열로 고정한 대신 localstorage를 사용한 후 엔 아예 storeTodos라는 함수를 부르는것으로 초기값을 변경경

  //inputvalue는 string으로 inputList는 배열로
  //useState 훅 사용시 [a,b]이런식이라면 a는 현재상태의 값, b는 상태를 업데이트하는 함수(이함수를 호출하면 a의 값을 변경가능)
  // 입력값을 setInputValue 으로 set

  //여기부터 local storage 시작
  //react훅은 다른 코드보다 위인 최상단에 쓰여야함
  useEffect(() => {
    localStorage.setItem("inputList", JSON.stringify(inputList)); //localstorage에는 문자열만 저장됨 숫자또한 자동으로 문자열로 저장, 문자열이나 숫자는 굳이 json문자열로 변환할필요없지만 배열 같은 데이터타입은 그냥 setitem하면 이상하게 저장될 수 있음음
  }, [inputList]);

  function storeTodos() {
    const inputList = localStorage.getItem("inputList");
    return inputList ? JSON.parse(inputList) : []; //json.parse는 json.stringify 의 반대격 느낌, 원래의 객체/배열 타입으로 돌려놓음음
  }

  const changeTodoInput = (e) => {
    setInputValue(e.target.value);
  };
  //setInputValue 함수 호출해서 inputValue를 업데이트하는식
  // 할일 추가
  const addTodo = () => {
    if (inputValue.trim() === "") return; // 빈 입력값 방지 //조건에 맞으면 함수작동안되도록
    //trim()메소드는 앞뒤 공백을 제거한 문자열의 복사본 리턴
    setInputList([...inputList, inputValue]); // ...으로 기존값 가져오기, 현재 입력값
    setInputValue(""); // 입력값 초기화
  };
  // 할일 삭제
  const deleteTodo = (index) => {
    const newInputList = inputList.filter((_, i) => i !== index); // 선택된 인덱스를 제외한 새로운 리스트 생성
    setInputList(newInputList); // 새로운 리스트로 업데이트
  };
  //inputList.filter((_, i) => i !== index); inputList배열 순회하면서 새 배열을 생성
  //여기서는 조건이 !==즉 아닐때 이므로 해당 index와 다를때만 해당요소를 새로운 배열에 포함시킴 그래서 선택된 리스트를 제외한 모든 리스트가 새 배열에 포함되고 그 새로운 리스트로 inputList상태를 업데이트한다.
  return (
    <div className="max-w-lg p-6 mt-8 bg-white">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-400">
        할 일 목록
      </h1>

      <div className="mb-6">
        <div className="flex rounded shadow-sm">
          <input
            type="text"
            value={inputValue}
            onChange={changeTodoInput}
            className="flex-1 px-4 py-2  border-gray"
          />
          <button
            onClick={addTodo}
            className="bg-blue-300 text-black px-4 py-2 "
          >
            추가
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {inputList.map(
          (
            todo,
            index //map메서드는 inputList 배열의 각 요소에 대해 함수를 실행, 새 배열을 생성
          ) => (
            <li key={index} className="text-black">
              {todo}
              <button
                onClick={() => deleteTodo(index)}
                className="bg-blue-300 p-2 text-black"
              >
                삭제
              </button>
            </li> // 할일 리스트 렌더링  //앞서서 말했듯이 index를 게속 이용했기에 여기서도 리스트를 렌더링할때 각 항목에 index라는 키를 부여하는것 //자바스크립트 표현식사용, 변수출력
          )
        )}
      </ul>
    </div>
  );
}

export default App;
