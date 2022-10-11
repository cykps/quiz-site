
let Timer = new Simple_Timer(document.querySelector('#timer'), finish, 20, true, 'rgba(0, 128, 128, 0.8)');

const startEle = document.querySelector('#start');
const result = document.querySelector('#result');
const allPoint = document.querySelector('#all-point')
const timeMilOneQue = 25000;
const timeMilOneAns = 8000;
let total = 0;

//QUIZ処理
const QUIZ = {
    quizBook: [],
    quizBookRes: [],
    number: -1,
    choNum: -1,
    main: {
        start(QuizBookIn, queEleId, buttonAreaEleId, torfEleId, ansEleId, com, functionAtClick) {
            Q.main.set(QuizBookIn);
            Q.que.setEleById(queEleId);
            Q.cho.setEleById(buttonAreaEleId);
            Q.torf.setEleById(torfEleId)
            Q.ans.setEleById(ansEleId);
            Q.com.setEleById(com);
            Q.main.setFuncAtClick(functionAtClick);
            Q.main.select();
        },
        set(ary) {
            QUIZ.quizBook = ary;
            QUIZ.quizBookRes = QUIZ.quizBook.map(() => { return [true, null] });
        },
        select(any) { //anyがnum->問題番号,ary->問題,null->ランダムに
            //問題文を選ぶ
            if (typeof any === "number") {
                if (any < QUIZ.quizBookRes.length) {
                    if (QUIZ.quizBookRes[any][0] === true)
                        QUIZ.number = any;
                    this.putInEach(QUIZ.quizBook[QUIZ.number]);
                    this.deleteFromQuizBookRes(QUIZ.number);
                    return true;
                } else return false;
            }
            if (Array.isArray(any)) { //if oneQueOFAry then
                this.putInEach(any)
                return true;
            }
            let indexesOfTrue = [];
            console.log(QUIZ.quizBookRes)
            QUIZ.quizBookRes.forEach((value, index) => {
                console.log(value)
                if (value[0] == true) {
                    indexesOfTrue.push(index);
                }
            });
            console.log(indexesOfTrue)
            if (indexesOfTrue == 0) {
                console.log("finishing")
                finish();
                return "finish";
            }
            QUIZ.number = indexesOfTrue[Math.floor(Math.random() * indexesOfTrue.length)];
            console.log(QUIZ.number);
            this.putInEach(QUIZ.quizBook[QUIZ.number]);
            this.deleteFromQuizBookRes(QUIZ.number);
            console.log(QUIZ.quizBookRes)
        },
        putInEach(oneQueOfAry) {
            QUIZ.que.body = oneQueOfAry[0];
            QUIZ.cho.body = oneQueOfAry[1];
            QUIZ.ans.body = oneQueOfAry[1][oneQueOfAry[2]];
            QUIZ.com.body = oneQueOfAry[3];
        },
        deleteFromQuizBookRes(index) { //出題済みであることを保存
            QUIZ.quizBookRes[index][0] = false
        },
        drowQueAndCho(timeMil) {
            QUIZ.que.drow();
            QUIZ.cho.drow();
            QUIZ.torf.hidden();
            QUIZ.ans.hidden();
            QUIZ.com.hidden();
            Q.choNum = -1;
            Timer.start(timeMil, QUIZ.main.checkAns);
        },
        dorwAnsAndCom(timeMil) {
            QUIZ.torf.drow();
            QUIZ.ans.drow();
            QUIZ.com.drow();
            //=========================
            buttons = document.querySelectorAll("#button-area *");
            buttons.textContent = "";
            newButton.setAttribute('class', "gray-button");
            Timer.start(timeMil, nextQue);
        },
        checkAns() {
            console.log(QUIZ.quizBookRes);
            console.log(QUIZ.quizBook[QUIZ.number][2],Q.choNum);
            if (Q.choNum == QUIZ.quizBook[QUIZ.number][2]) {
                console.log(QUIZ.quizBookRes);
                QUIZ.quizBookRes[QUIZ.number][1] = true;
                console.log(Q.quizBookRes);
                QUIZ.torf.body = "〇";
            } else {
                QUIZ.quizBookRes[QUIZ.number][1] = false;
                QUIZ.torf.body = "✕";
            }
            Q.main.dorwAnsAndCom(timeMilOneAns);
        },
        setFuncAtClick(func) {
            QUIZ.funcAtClick = func;
        }
    },
    que: {
        ele: null,
        body: "sampleQue",
        setEleById(id) {
            this.ele = document.querySelector("#" + id);
        },
        drow() {
            this.ele.innerHTML = this.body;
        },
        hidden() {
            this.ele.innerHTML = "";
        }
    },
    cho: { //choices
        ele: null,
        body: "sampleCho",
        setEleById(id) {
            this.ele = document.querySelector("#" + id);
        },
        drow() {
            let newButton, buttonArea = document.querySelector('#button-area');
            buttonArea.innerHTML = "";
            for (let i = 0; i < this.body.length; i++) {
                newButton = document.createElement("button");
                newButton.innerHTML = this.body[i];
                newButton.setAttribute('onclick', QUIZ.funcAtClick.name + "(" + i + ")")
                console.log(newButton);
                buttonArea.appendChild(newButton);
            }
        },
        hidden() {
            this.ele.innerHTML = "";
        }
    },
    torf: {
        ele: null,
        body: "〇",
        setEleById(id) {
            this.ele = document.querySelector("#" + id);
        },
        drow() {
            this.ele.innerHTML = this.body;
        },
        hidden() {
            this.ele.innerHTML = "";
        }
    },
    ans: {
        ele: null,
        body: "sampleAns",
        setEleById(id) {
            this.ele = document.querySelector("#" + id);
        },
        drow() {
            this.ele.innerHTML = this.body;
        },
        hidden() {
            this.ele.innerHTML = "";
        }
    },
    com: { //comment
        ele: null,
        body: "sampleCom",
        setEleById(id) {
            this.ele = document.querySelector("#" + id);
        },
        drow() {
            this.ele.innerHTML = this.body;
        },
        hidden() {
            this.ele.innerHTML = "";
        }
    },
}


//------処理------//

let Q = QUIZ;


function start() {
    Q.main.start(GenderQuizzes, "que", "button-area", "TorF", "ans", "com", clickCho);
    Q.main.drowQueAndCho(timeMilOneQue);
    console.log("start");
    startEle.style.display = "none";
}

function clickCho(choNo) {
    console.log(Q.quizBookRes);
    Q.choNum = choNo;
    Timer.stop();
    //Q.main.dorwAnsAndCom(timeMilOneAns);
    console.log("click cho");
}

function finish() {
    total = 0;
    Q.quizBookRes.forEach(value => {
        if (value[1] === true) {
            total += 1;
        }
    });
    allPoint.innerHTML = total + "点";
    result.style.display = "block";
    console.log("main Finish");
}

function timeUp() {
    console.log(Q.quizBookRes);
    Q.main.checkAns(-1);
}

function nextQue() {
    console.log(Q.quizBookRes);
    if (Q.main.select() !== "finish") {
        Q.main.drowQueAndCho(timeMilOneQue);
    }
}
