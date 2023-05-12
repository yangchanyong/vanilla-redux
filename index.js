const { createStore } = require("redux");

console.log("hello parcel");
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = difference => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = {
  toggle: false,
  counter: 0,
};

// 리듀서 함수 정의
function reducer(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
      default:
        return state;
  }
}
// 스토어 만들기
const store = createStore(reducer);

//render 함수 만들기
const render = () => {
  const state = store.getState();
  if(state.toggle) {
    divToggle.classList.add("active");
  }
  else {
    divToggle.classList.remove("active");
  }
  counter.innerHTML = state.counter;
};
render();
store.subscribe(render);

// 구독하기
const listener = () => {
  console.log("상태가 업데이트 됨");
};
const unsubscribe = store.subscribe(listener);
unsubscribe();

// 액션 발생시키기 (DOM 이벤트 부여)
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};