var buttons = document.querySelectorAll(".main button");
var buttono = document.getElementById("obut")
var buttonx = document.getElementById("xbut")
var buttonbot = document.getElementById("double")
var draws = document.getElementById("draws")
var owins = document.getElementById("owins")
var xwins = document.getElementById("xwins")
var botChat = document.querySelector(".bot-chat p")
var optbutarr = [buttonbot, buttono, buttonx]
var strikeh = [];
var strikev = [];
var strikedl = [];
var strikedr = [];
var xarr = []
var oarr = []
var sign
var trial
var bot = false
var cleared = false
var gameOver = true
var playX
var diag1 = true
var diag2 = true
var validArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
var edgesarray = [buttons[1], buttons[3], buttons[5], buttons[7]]
function marki(self){
  botChat.innerHTML = "Pick your choice above"
  if (playX == true && !gameOver && self.innerHTML == ""){
    self.innerHTML = "X";
    playX = !playX
    if (bot){
      botplay(playX)
    }
  }else if (playX == false && !gameOver && self.innerHTML == ""){
    self.innerHTML = "O";
    playX = !playX
    if (bot){
      botplay(playX)
    }
  }

  if (Array.from(buttons).every(x => {return x.innerHTML != ""})){
    gameOver = true
    draws.innerHTML ++
    botChat.innerHTML = "It's a draw!"
  }
  if (gameOver) {
    restart()
  }
  checkforwin()
}
function botplay(mark){
  checkforwin()
  if (mark == true){
    mark = "X"
  }else{
    mark = "O"
  }
  console.log(mark)
  let stop = false
  for (slist of validArray) {
    trial = [buttons[slist[0]],  buttons[slist[1]],  buttons[slist[2]]]
    // console.log(trial.filter(x => {return x.innerHTML == "X"}).length == 2 && mark == "O" && trial.some(x => {return x.innerHTML == ""}))
    if (trial.filter(x => {return x.innerHTML == "O"}).length == 2 && mark == "O" && trial.some(x => {return x.innerHTML == ""})){
      console.log("o is 2 mark is o")
      buttons[slist[trial.map(v => {return v.innerHTML}).indexOf("")]].innerHTML = mark
      stop = true
    }else if (trial.filter(x => {return x.innerHTML == "X"}).length == 2 && mark == "X" && trial.some(x => {return x.innerHTML == ""})){
      console.log("x is 2 mark is x")
      buttons[slist[trial.map(v => {return v.innerHTML}).indexOf("")]].innerHTML = mark
      stop = true
    }else if (trial.filter(x => {return x.innerHTML == "X"}).length == 2 && mark == "O" && trial.some(x => {return x.innerHTML == ""})){
      botChat.innerHTML = "I gladly block!"
      console.log("x is 2 mark is o")
      buttons[slist[trial.map(v => {return v.innerHTML}).indexOf("")]].innerHTML = mark
      stop = true
    }else if (trial.filter(x => {return x.innerHTML == "O"}).length == 2 && mark == "X" && trial.some(x => {return x.innerHTML == ""})){
      botChat.innerHTML = "I see what you're doing<br>I block happily"
      console.log("o is 2 mark is x")
      buttons[slist[trial.map(v => {return v.innerHTML}).indexOf("")]].innerHTML = mark
      stop = true
    }else if (buttons[4].innerHTML == "") {
      botChat.innerHTML = "I'll take the center gladly"
      console.log("fill middle")
      buttons[4].innerHTML = mark
      stop = true
    }else if (buttons[0].innerHTML === buttons[8].innerHTML && buttons[0].innerHTML != "" && diag1){
      botChat.innerHTML = "I hope this isn't a trick"
      console.log("diagonal 0")
      if (buttons[4].innerHTML == "") {
        buttons[4].innerHTML = mark
      } else {
        let unoccuppied = edgesarray.filter(x => {return x.innerHTML == ""})
        if (unoccuppied.length > 1) {
          for (let i = 0; i < 5; i++) {
            let rand = Math.floor(Math.random() * unoccuppied.length)
            if (unoccuppied[rand].innerHTML == ""){
              unoccuppied[rand].innerHTML = mark
              stop = true
              break
            }
          }
        }
      }
      diag1 = false
      stop = true
    }else if (buttons[2].innerHTML === buttons[6].innerHTML && buttons[2].innerHTML != "" && diag2){
      botChat.innerHTML = "This isn't a trick, right?"
      console.log("diagonal 2")
      let rand = Math.floor(Math.random() * edgesarray.length)
      if (buttons[4].innerHTML == "") {
        buttons[4].innerHTML = mark
      } else {
        let unoccuppied = edgesarray.filter(x => {return x.innerHTML == ""})
        if (unoccuppied.length > 1) {
          for (let i = 0; i < 5; i++) {
            let rand = Math.floor(Math.random() * unoccuppied.length)
            if (unoccuppied[rand].innerHTML == ""){
              unoccuppied[rand].innerHTML = mark
              stop = true
              break
            }
          }
        }
      }
      diag2 = false
      stop = true
    }
    if (stop) {
      break
    }
  }
  if (stop == false){
    let played = false
    botChat.innerHTML = "I'll just play anywhere!"
    console.log("else")
    let unoccupieddiags = [buttons[0], buttons[2], buttons[6], buttons[8]].filter(x => {return x.innerHTML == ""})
    if (unoccupieddiags.length > 1) {
      for (let i = 0; i < 5; i++) {
        let rand = Math.floor(Math.random() * unoccupieddiags.length)
        if (unoccupieddiags[rand].innerHTML == "" && played == false){
          unoccupieddiags[rand].innerHTML = mark
          stop = true
          played = true
          break
        }
      }
    }
    if (!played){
      for (t of buttons) {
        if (t.innerHTML == ""){
          t.innerHTML = mark
          stop = true
          break
        }
      }
    }
  }
  playX = !playX
  if (gameOver) {
    restart()
  }
}

function chosen(self){
  gameOver = false
  optbutarr.forEach(x => {
    x.style.borderColor = "gray"
  })
  switch (self) {

    case buttono:
      botsay("Ok then, I play X")
      bot = true
      playX = true
      botplay(playX)
      playX = false
      self.style.borderColor = "blue"
      break;
  
    case buttonx:
      botsay("Great choice!<br>I'm playing O")
      playX = true
      bot = true
      self.style.borderColor = "blue"
      break;

    case buttonbot:
      botsay("Have fun!")
      bot = false
      playX = true
      self.style.borderColor = "blue"
      break;

    default:
      break;
  }
}

function botsay(chat){
  botChat.innerHTML = chat
}

function restart(){
  diag1 = true
  diag2 = true
  cleared = true
  optbutarr.forEach(x => {
    x.style.borderColor = "gray"
  })
  for (const button of buttons) {
    button.innerHTML = "";
    button.style.backgroundImage = "none"
  }
}

function checkforwin() {
  let h = 0
  let v = 0
  for (let i = 0; i <= 2; i++){
    if (buttons[h].innerHTML + buttons[h + 1].innerHTML + buttons[h + 2].innerHTML == "XXX"){
      botChat.innerHTML = "X wins"
      xwins.innerHTML ++
      [h, h + 1, h + 2].forEach(n => {
        buttons[n].style.backgroundImage = "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(50, 50, 50, 0.5), rgba(255, 255, 255, 0)";
      })
      gameOver = true
      break
    }else if (buttons[h].innerHTML + buttons[h + 1].innerHTML + buttons[h + 2].innerHTML == "OOO"){
      botChat.innerHTML = "O wins"
      owins.innerHTML ++
      [h, h + 1, h + 2].forEach(n => {
        buttons[n].style.backgroundImage = "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(50, 50, 50, 0.5), rgba(255, 255, 255, 0)";
      })
      gameOver = true
      break
    }else if (buttons[v].innerHTML + buttons[v + 3].innerHTML + buttons[v + 6].innerHTML == "XXX"){
      botChat.innerHTML = "X wins"
      xwins.innerHTML ++
      [v, v + 3, v + 6].forEach(n => {
        buttons[n].style.backgroundImage = "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(50, 50, 50, 0.5), rgba(255, 255, 255, 0)";
      })
      gameOver = true
      break
    }else if (buttons[v].innerHTML + buttons[v + 3].innerHTML + buttons[v + 6].innerHTML == "OOO"){
      botChat.innerHTML = "O wins"
      owins.innerHTML ++
      [v, v + 3, v + 6].forEach(n => {
        buttons[n].style.backgroundImage = "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(50, 50, 50, 0.5), rgba(255, 255, 255, 0)";
      })
      gameOver = true
      break
    }else if (buttons[0].innerHTML + buttons[4].innerHTML + buttons[8].innerHTML == "XXX"){
      botChat.innerHTML = "X wins"
      xwins.innerHTML ++
      [0, 4, 8].forEach(n => {
        buttons[n].style.backgroundImage = "linear-gradient(45deg, rgba(255, 255, 255, 0), rgba(50, 50, 50, 0.5), rgba(255, 255, 255, 0)";
      })
      gameOver = true
      break
    }else if(buttons[2].innerHTML + buttons[4].innerHTML + buttons[6].innerHTML == "XXX"){
      botChat.innerHTML = "X wins"
      xwins.innerHTML ++
      [2, 4, 6].forEach(n => {
        buttons[n].style.backgroundImage = "linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(50, 50, 50, 0.5), rgba(255, 255, 255, 0)";
      })
      gameOver = true
      break
    }else if (buttons[0].innerHTML + buttons[4].innerHTML + buttons[8].innerHTML == "OOO"){
      botChat.innerHTML = "O wins"
      owins.innerHTML ++
      [0, 4, 8].forEach(n => {
        buttons[n].style.backgroundImage = "linear-gradient(45deg, rgba(255, 255, 255, 0), rgba(50, 50, 50, 0.5), rgba(255, 255, 255, 0)";
      })
      gameOver = true
      break
    }else if(buttons[2].innerHTML + buttons[4].innerHTML + buttons[6].innerHTML == "OOO"){
      botChat.innerHTML = "O wins"
      owins.innerHTML ++
      [2, 4, 6].forEach(n => {
        buttons[n].style.backgroundImage = "linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(50, 50, 50, 0.5), rgba(255, 255, 255, 0)";
      })
      gameOver = true
      break
    }
    h+=3
    v++
  }
}