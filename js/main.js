const start = document.getElementById("start");
const stop = document.getElementById("stop");
const show = document.getElementById("show");
const fullCount = 5; //徒弟的最高数量
let t;
let count; // 师傅下标
let masterName;
let master;

if (localStorage.masterName) {
  masterName = JSON.parse(localStorage.masterName);
  master = JSON.parse(localStorage.master);
} else {
  masterName = [
    "刘超",
    "景汉伟",
    "马云龙",
    "房杰祥",
    "高尚臣",
    "萧德璋",
    "张兆娜",
    "李威"
  ];
  master = [];
}

/**
 * 如果徒弟数量已满，则将师傅从数组中删除
 * @param int 下标
 */
function changeList(key) {
  masterName.splice(key, 1);
  master.splice(key, 1);
}

for (let i = 0; i < masterName.length; i++) {
  master[i] = {
    name: masterName[i],
    counter: 0 //徒弟数量
  };
}

start.addEventListener("click", function() {
  if (!master.length) {
    alert(`所有师傅的徒弟数量均到达${fullCount}人！`);
  } else {
    clearInterval(t);
    t = setInterval(function() {
      count = parseInt(Math.random() * master.length);
      show.innerText = master[count].name;
    }, 10);
  }
});

stop.addEventListener("click", function() {
  if (!t) {
    alert("请先点击开始按钮！");
  } else {
    clearInterval(t);
    t = null;

    master[count].counter++;
    if (master[count].counter === fullCount) {
      alert(`${master[count].name} 徒弟数量已满！`);
      changeList(count);
    }

    // 测试用
    for (let i = 0; i < master.length; i++) {
      const element = master[i];
      console.log(element.name, element.counter);
    }
  }

  localStorage.masterName = JSON.stringify(masterName);
  localStorage.master = JSON.stringify(master);
});
