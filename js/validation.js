/*
validation: 인증함수
조건을 정해서 만족하면 return true;
조건에 만족하지 않으면 return false;

판별하는 시점이 submit을 클릭할 때
인증함수의 결과값 중 하나라도 false가 있다면
action으로 넘어가지 못하게 한다 - e.preventDefault();
모두 true가 될 때 action으로 이동
*/

const form = document.querySelector("#member");
const btnSubmit = document.querySelector("input[type=submit]");
let toggleBtn = document.getElementById("toggleBtn");
let pwd = document.querySelector("#password1");

btnSubmit.addEventListener("click", (e) => {
    // 인증함수들을 거쳐서 true나 false를 가지고
    // 인증(validation)을 한다
    if (!isText("userid", 5)) e.preventDefault(); // 인수
    if (!isText("comments", 20)) e.preventDefault();
    if (!isEmail("email")) e.preventDefault();

    if (!isCheck("gender")) e.preventDefault();
    if (!isCheck("hobby")) e.preventDefault();
})

// 1. type이 text인 form 요소의 인증함수

function isText(el, len) { // 매개변수
    // len이라는 초기값을 설정하지 않았을 경우를 대비해서
    // 오류를 사전에 대비하는 코드
    if (len === undefined) len = 5;

    let input = form.querySelector(`[name=${el}]`);
    // input 태그 중에 name이 userid인 대상을 특정지어
    // 해당 input에 value 값을 추적하고
    // input을 찾아서 해당 input에 사용자가 어떤 값을
    // 작성했는지 value를 가져와야 한다
    // input을 찾는데 어떤 input이냐면
    // 'name = 매개변수로 넣은 값'을 찾기
    let txt = input.value;
    // 찾은 input 안에 사용자가 적은 값을 변수로 저장
    if (txt.length >= len) {
        // 오류메시지를 담은 p 요소가 있는지 판별
        const isErrMsg = input.closest("td").querySelectorAll("p");
        // 이런 p 요소가 있다면 뺀다
        if (isErrMsg.length > 0) input.closest("td").querySelector("p").remove();
        return true;
    } else {
        // 오류메시지를 담은 p 요소가 있는지 판별
        const isErrMsg = input.closest("td").querySelectorAll("p");
        // 이런 p 요소가 있다면 뺀다
        if (isErrMsg.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
        input.closest("td").append(errMsg);
        return false;
    }
}

// 2. type이 text인 email 인증 함수
function isEmail(el) {
    let input = form.querySelector(`[name=${el}]`);
    let txt = input.value;

    // Email 인증 함수 logic - @ 여부
    if (/@/.test(txt)) {
        const isErrMsg = input.closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) input.closest("td").querySelector("p").remove();
        return true;
    } else {
        const isErrMsg = input.closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요");
        input.closest("td").append(errMsg);
        return false;
    }
}

// 3. checkbox 인증함수
function isCheck(el) {
    let input = form.querySelectorAll(`[name=${el}]`);
    let isCheck = false;
    // check가 되어있는지 추적하는 코드
    // 하나라도 체크가 되어 있는지
    for (let el of input) {
        if (el.checked) isCheck = true;
    }

    if (isCheck) {
        const isErrMsg = input[0].closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) input.closest("td").querySelector("p").remove();
        return true;
    } else {
        const isErrMsg = input[0].closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append("필수 입력항목을 체크해주세요");
        input[0].closest("td").append(errMsg); // 첫 번째 index 아래에
        return false;
    }
}


toggleBtn.addEventListener("click", () => {
    // 클릭했을 때 type을 password에서 text로 변경해서
    // password가 보이게 한다
    if (pwd.type === "password") {
        pwd.setAttribute("type", "text");
        toggleBtn.classList.add("hide");
    } else {
        pwd.setAttribute("type", "password");
        toggleBtn.classList.remove("hide");
    }
})