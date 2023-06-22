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
let pwdcheck = document.querySelector("#password2");

btnSubmit.addEventListener("click", (e) => {
    // 인증함수들을 거쳐서 true나 false를 가지고
    // 인증(validation)을 한다
    if (!isText("userid", 5)) e.preventDefault(); // 인수
    if (!isText("comments", 20)) e.preventDefault();

    if (!isEmail("email")) e.preventDefault();

    if (!isCheck("gender")) e.preventDefault();
    if (!isCheck("hobby")) e.preventDefault();

    if (!isSelect("edu")) e.preventDefault();

    if (!isPwd("password1", "password2", 8)) e.preventDefault();
})

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
        if (isErrMsg.length > 0) input[0].closest("td").querySelector("p").remove();
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

// 4. select 인증함수
function isSelect(el) {
    let sel = form.querySelector(`[name=${el}]`);
    let sel_index = sel.options.selectedIndex;
    // select 요소에 접근해서 자식요소인 option들 중에
    // 선택이 된 index를 찾아서 해당 index 값을 변수로 담아준다
    let val = sel[sel_index].value;

    if (val !== "") {
        const isErrMsg = sel.closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) sel.closest("td").querySelector("p").remove();
        return true;
    } else {
        const isErrMsg = sel.closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append("항목을 선택해 주세요");
        sel.closest("td").append(errMsg);
        return false;
    }
}

/* 정규표현식
- 특정한 문자열; 즉, 개발자가 원하는 문자를 집합으로 표현하기 위해서
사용하는 형식언어
*/


// 5. password 인증함수 (1)
/*
function isPwd(el1, el2, len) {
    let pwd1 = form.querySelector(`[name=${el1}]`);
    let pwd2 = form.querySelector(`[name=${el2}]`);
    let pwd1_val = pwd1.value;
    let pwd2_val = pwd2.value;

    // 정규표현식으로 숫자, 영문자, 특수문자 변수 저장
    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+?><]/;

    const errMsgWrap = pwd1.closest("td");

    // 1. 두 개의 비밀번호가 같아야 한다
    // 2. 비밀번호의 글자수는 len 이상
    // 3. 비밀번호에 num, eng, spc가 모두 포함
    if (pwd1_val === pwd2_val && pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)) {
        const isErrMsg = pwd1.closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) pwd1.closest("td").querySelector("p").remove();
        return true;
    } else {
        const isErrMsg = pwd1.closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append(`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요`);
        pwd1.closest("td").append(errMsg);
        return false;
    }
}
*/
// 5. password 인증함수 (2)
function isPwd(el1, el2, len) {
    let pwd1 = form.querySelector(`[name=${el1}]`);
    let pwd2 = form.querySelector(`[name=${el2}]`);
    let pwd1_val = pwd1.value;
    let pwd2_val = pwd2.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+?><]/;

    const errMsgWrap = pwd1.closest("td");

    // 오류메시지 제거 함수
    function removeErrMsg() {
        const errMsg = errMsgWrap.querySelector("p");
        if (errMsg) {
            errMsg.remove();
        }
    }

    // 오류메시지 추가 함수
    function addErrMsg(msg) {
        const errMsg = document.createElement("p");
        errMsg.textContent = msg;
        /*
        textContent가 내부에 콘텐츠를 넣는 가장 좋은 방법이다
        (단, 최신 브라우저만 가능)
        append
        innerText
        innerHTML: 보안이 좋지 않다 (XCC: 크로스 사이트 스크립팅)
        (보안이 필요한 validation에서는 지양)
        */
        errMsgWrap.append(errMsg);
    }

    if (
        pwd1_val === pwd2_val &&
        pwd1_val.length >= len &&
        num.test(pwd1_val) &&
        eng.test(pwd1_val) &&
        spc.test(pwd1_val)) {
        removeErrMsg();
        return true;
    } else {
        removeErrMsg();

        let err = "비밀번호는 ";
        if (pwd1_val.length < len) {
            err += `${len}글자 이상, `;
        }
        if (!num.test(pwd1_val)) {
            err += `숫자를 포함, `;
        }
        if (!eng.test(pwd1_val)) {
            err += `영문자를 포함, `;
        }
        if (!spc.test(pwd1_val)) {
            err += `특수문자를 포함, `;
        }
        err += `동일하게 입력하세요`;
        addErrMsg(err);
        return false;
    }
}