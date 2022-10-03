var people_num = 6;
var meeting = [1,1,1,1,1,1]

function one_person(){
  document.getElementsByClassName('boxl')[0].style.width = "1470px";
  document.getElementsByClassName('row5')[0].style.width = "1460px";
  document.getElementsByClassName('row6')[0].style.width = "1460px";
  document.getElementsByClassName('row7')[0].style.width = "1460px";
  document.getElementsByClassName('boxl')[0].style.display = "flex";
}

function click_cancle(num) {
  const ID = document.getElementById('person' + num);
  ID.style.display = "none";
  meeting[(num-1)] = 0;
  people_num--;
  if(people_num === 1){
    const boxr = document.getElementById('boxright');
    boxr.style.display = "none";
    one_person();
  }
}

var who_anchored = 0;

function change(a , b){
  let BF_name = document.getElementsByClassName('name')[a].innerHTML;
  document.getElementsByClassName('name')[a].innerHTML = document.getElementsByClassName('name')[b].innerHTML;
  document.getElementsByClassName('name')[b].innerHTML = BF_name;
  BF_name = document.getElementsByClassName('nameid')[a].innerHTML;
  document.getElementsByClassName('nameid')[a].innerHTML = document.getElementsByClassName('nameid')[b].innerHTML;
  document.getElementsByClassName('nameid')[b].innerHTML = BF_name;
}

function anchored(num){
  if(people_num === 1){
    who_anchored = 0;
  }else if(num === 0){
    /*取消訂選*/
    type1();
    change(6,0);
    who_anchored = 7;
  }else if(who_anchored === 7){
    /*從取消訂選到訂選*/
    type2();
    who_anchored = num;
    change(0,who_anchored);
    change(6,who_anchored);
  }else{
    change(0,num);
    who_anchored = num;
  }
  for(i = 1;i < 7;i++){
    if(document.getElementsByClassName('nameid')[i].innerHTML==="你"){
      document.getElementById('cancle' + i).style.visibility = "hidden";
    }else{
      document.getElementById('cancle' + i).style.visibility = "visible";
    }
  }
}

function type1(){
  document.getElementsByClassName('boxl')[0].style.display = "none";
    document.getElementById('person6').style.display = "flex";
    document.getElementsByClassName('boxr')[0].style.width = "1470px";
    document.getElementsByClassName('boxr')[0].style.height = "670px";
    for(i = 0;i < 6;i++){
      document.getElementsByClassName('boxr2')[i].style.width = "480px";
      document.getElementsByClassName('boxr2')[i].style.height = "330px";
      document.getElementsByClassName('row1')[2*i].style.width = "470px";
      document.getElementsByClassName('row1')[2*i+1].style.width = "470px";
      document.getElementsByClassName('row2')[i].style.width = "470px";
      document.getElementsByClassName('row2')[i].style.height = "240px";
      document.getElementsByClassName('circle2')[i].style.width = "170px";
      document.getElementsByClassName('circle2')[i].style.height = "170px";
      document.getElementsByClassName('name')[i+1].style.fontSize = "68px";
      document.getElementsByClassName('tool2')[i].style.width = "140px";
      document.getElementsByClassName('tool2')[i].style.height = "47px";
      document.getElementsByClassName('tool2')[i].style.borderRadius = "25px 25px 25px 25px";
      document.getElementsByClassName('tool2')[i].style.top = "-15%";
      document.getElementsByClassName('tool2')[i].style.left = "9%";
    }
}

function type2(){
  for(i = 0;i < 6;i++){
      document.getElementsByClassName('boxr2')[i].style.width = "190px";
      document.getElementsByClassName('boxr2')[i].style.height = "160px";
      document.getElementsByClassName('row1')[2*i].style.width = "170px";
      document.getElementsByClassName('row1')[2*i+1].style.width = "170px";
      document.getElementsByClassName('row2')[i].style.width = "170px";
      document.getElementsByClassName('row2')[i].style.height = "70px";
      document.getElementsByClassName('circle2')[i].style.width = "60px";
      document.getElementsByClassName('circle2')[i].style.height = "60px";
      document.getElementsByClassName('name')[i+1].style.fontSize = "24px";
      document.getElementsByClassName('tool2')[i].style.width = "100px";
      document.getElementsByClassName('tool2')[i].style.height = "33px";
      document.getElementsByClassName('tool2')[i].style.borderRadius = "18px 18px 18px 18px";
      document.getElementsByClassName('tool2')[i].style.top = "-30%";
      document.getElementsByClassName('tool2')[i].style.left = "-30%";
    }
    document.getElementsByClassName('boxl')[0].style.display = "flex";
    document.getElementById('person6').style.display = "none";
    document.getElementsByClassName('boxr')[0].style.width = "430px";
    document.getElementsByClassName('boxr')[0].style.height = "525px";
}