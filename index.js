//各idを取得し変数にする
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

//６、ローカルストレージが存在する場合取得する
const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
  todos.forEach(function (todo) {
    add(todo);
  });
}

//１、変数formがsubmitされたときに実行
form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(input.value);
  //関数addを実行
  add();
});

//２、liの追加
function add(todo) {
  let todoText = input.value;

  //リロードをしてもtodoがあった場合todoTextに入れる
  if (todo) {
    todoText = todo.text;
  }

  //３、liを作成する条件分岐の追加
  if (todoText) {
    //真偽値として返されるので(todoText.lenfth > 0)と同じ
    //liを作成
    const li = document.createElement("li");
    //入力された値を入れる
    li.innerText = todoText;
    //class名を追加
    li.classList.add("list-group-item");

    //リロードをしてもtrueだった場合クラスを追加
    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    //ulの子要素をとして変数liを追加
    ul.appendChild(li);
    //input.valueを空にする
    input.value = "";

    //関数saveDataを実行
    saveData();


    //６、右クリックで項目を消す
    li.addEventListener("contextmenu", function (event) {
      //デフォルトの動きを出さない
      event.preventDefault();
      //項目を消す
      li, this.remove();
      //関数saveDataを実行
      saveData();
    });
    //７、クリックで打ち消し線を付ける
    li.addEventListener("click", function () {
      //toggleでスタイルオンオフを管理
      li.classList.toggle("text-decoration-line-through");
      //関数saveDataを実行
      saveData();
    });
  }
}

//４、ローカルストレージにセーブする
function saveData() {
  //liタグをすべて取得する
  const lists = document.querySelectorAll("li");

  //５、ループ処理 forEach
  let todos = [];
  lists.forEach(function (list) {
    
    //８、データを残す為オブジェクトを作成する
    let todo = {
      //入力されたテキスト
      text: list.innerText,
      //containsでクラスがあるか確認＞completedはfalse/trueとなる
      completed: list.classList.contains("text-decoration-line-through"),
    };

    //変数todoの配列に追加
    todos.push(todo);
  });
  console.log(todos);

  //todosを保存、todosの配列をJSON形式に変換する
  localStorage.setItem("todos", JSON.stringify(todos));
  //localStorageは文字列で保存される
}
