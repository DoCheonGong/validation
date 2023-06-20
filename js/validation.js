/*
validation: 인증함수
조건을 정해서 만족하면 return true;
조건에 만족하지 않으면 return false;

판별하는 시점이 submit을 클릭할 때
인증함수의 결과값 중 하나라도 false가 있다면
action으로 넘어가지 못하게 한다 - e.preventDefault();
모두 true가 될 때 action으로 이동
*/

const btnSubmit = document.querySelector("input[type=submit]");
let toggleBtn = document.getElementById("toggleBtn");
let pwd = document.querySelector("#password1");

btnSubmit.addEventListener("click", () => {
    // 인증함수들을 거쳐서 true나 false를 가지고
    // 인증(validation)을 한다
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