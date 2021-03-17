const cookieData = document.getElementById('cookiesDataList');
const previousMonth = document.getElementById('previousMonth');
const previousTable = document.getElementById('previousTable');
const previousTableField = document.getElementById('previousTableField')
const previousCookieData = document.getElementById('previousCookieData');


const nextMonth = document.getElementById('nextMonth');
const nextTable = document.getElementById('nextTable');
const nextTableField = document.getElementById('nextTableField')
const nextCookieData = document.getElementById('nextCookieData');


const data = JSON.parse(cookieData.value)

let previousCookie
let nextCookie

let ptbody
let ntbody

function changePreviousMonth() {
  const previousTbody = document.getElementById('previousTbody');
  const nextTbody = document.getElementById('nextTbody')

  previousTableField.style.display = "block"
  previousTable.style.textAlign = "center"
  previousTable.style.borderCollapse = "collapse"
  previousTable.style.width = "100%"
  previousTable.style.fontFamily = "'Nunito', sans-serif"
  previousTable.style.fontSize = "18px"
  previousTable.style.padding = "10px"

  const previousTarget = previousMonth.options[previousMonth.selectedIndex].value

  let previousIdx = data.findIndex((item) => {
    return item.updatedDate === previousTarget
  })
  
  previousCookieData.setAttribute('value', JSON.stringify(data[previousIdx].cookie))
  
  ptbody = document.createElement('tbody');
  if(previousCookieData.value !== ""){
    ptbody.setAttribute('id', 'previousTbody');
    for(let i=0; i < data[previousIdx].cookie.length; i++){
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.innerText = data[previousIdx].cookie[i].id;
      const td2 = document.createElement('td');
      td2.innerText = data[previousIdx].cookie[i].name.slice(0,10);
      const td3 = document.createElement('td');
      td3.innerText = data[previousIdx].cookie[i].connTLD;
      const td4 = document.createElement('td');
      td4.innerText = data[previousIdx].cookie[i].publisher;
      const td5 = document.createElement('td')
      td5.innerText = data[previousIdx].cookie[i].type;
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      tr.appendChild(td5)
      ptbody.appendChild(tr)
      tr.style.backgroundColor = "#FFFFFF"
      td1.style.width = "70px"
      td2.style.width = "180px"
      td3.style.width = "210px"
      td4.style.width = "210px"
      td5.style.width = "80px"
    }
  }
  
  previousCookie = data[previousIdx].cookie

  if(previousCookie !== undefined && nextCookie !== undefined){
    for(let i=0; i < previousCookie.length; i++){
      if(nextCookie.find((item) => {
        return item.name === previousCookie[i].name && item.publisher === previousCookie[i].publisher}) === undefined){
        ptbody.children[i].style.backgroundColor = "rgba(230, 0, 0, 0.4)"
        ptbody.children[i].style.color = "#ff0000"
        ptbody.children[i].style.borderTop = "0.2px solid #ff4d4d"
        ptbody.children[i].style.borderBottom = "0.2px solid #ff4d4d"
      }else{
        ptbody.children[i].style.backgroundColor = "#fff"
        ptbody.children[i].style.color = "#000"
      }
    }
    for(let j=0; j < nextCookie.length; j++){
      if(previousCookie.find((item) => {
        return item.name === nextCookie[j].name && item.publisher === nextCookie[j].publisher}) === undefined){
        nextTbody.children[j].style.backgroundColor = "rgba(0, 230, 0, 0.4)"
        nextTbody.children[j].style.color = "#048000"
        nextTbody.children[j].style.borderTop = "0.2px solid #00e600"
        nextTbody.children[j].style.borderBottom = "0.2px solid #00e600"
      }else{
        nextTbody.children[j].style.backgroundColor = "#fff"
        nextTbody.children[j].style.color = "#000"
      }
    }
  }
  previousTable.replaceChild(ptbody, previousTbody)
}

function changeNextMonth() {
  const previousTbody = document.getElementById('previousTbody');
  const nextTbody = document.getElementById('nextTbody');

  nextTableField.style.display = "block";
  nextTable.style.textAlign = "center";
  nextTable.style.borderCollapse = "collapse";
  nextTable.style.width = "100%";
  nextTable.style.fontFamily = "'Nunito', sans-serif";
  nextTable.style.fontSize = "18px";
  nextTable.style.padding = "10px";

  const nextTarget = nextMonth.options[nextMonth.selectedIndex].value;

  let nextIdx = data.findIndex((item) => {
    return item.updatedDate === nextTarget
  })

  nextCookieData.setAttribute('value', JSON.stringify(data[nextIdx].cookie))

  ntbody = document.createElement('tbody');

  if(nextCookieData.value !== ""){
    ntbody.setAttribute('id', 'nextTbody');
    for(let i=0; i < data[nextIdx].cookie.length; i++){
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.innerText = data[nextIdx].cookie[i].id;
      const td2 = document.createElement('td');
      td2.innerText = data[nextIdx].cookie[i].name.slice(0,10);
      const td3 = document.createElement('td');
      td3.innerText = data[nextIdx].cookie[i].connTLD;
      const td4 = document.createElement('td');
      td4.innerText = data[nextIdx].cookie[i].publisher;
      const td5 = document.createElement('td')
      td5.innerText = data[nextIdx].cookie[i].type;
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      tr.appendChild(td5)
      ntbody.appendChild(tr)
      tr.style.backgroundColor = "#FFFFFF"
      td1.style.width = "70px"
      td2.style.width = "180px"
      td3.style.width = "210px"
      td4.style.width = "210px"
      td5.style.width = "80px"
    }
  }

  nextCookie = data[nextIdx].cookie

  if(previousCookie !== undefined && nextCookie !== undefined){
    for(let i=0; i < previousCookie.length; i++){
      if(nextCookie.find((item) => {
        return item.name === previousCookie[i].name && item.publisher === previousCookie[i].publisher}) === undefined){
        previousTbody.children[i].style.backgroundColor = "rgba(230, 0, 0, 0.4)"
        previousTbody.children[i].style.color = "#ff0000"
        previousTbody.children[i].style.borderTop = "0.2px solid #ff4d4d"
        previousTbody.children[i].style.borderBottom = "0.2px solid #ff4d4d"
      }else{
        previousTbody.children[i].style.backgroundColor = "#fff"
        previousTbody.children[i].style.color = "#000"
      }
    }
    for(let j=0; j < nextCookie.length; j++){
      if(previousCookie.find((item) => {
        return item.name === nextCookie[j].name && item.publisher === nextCookie[j].publisher}) === undefined){
        ntbody.children[j].style.backgroundColor = "rgba(0, 230, 0, 0.4)"
        ntbody.children[j].style.color = "#048000"
        ntbody.children[j].style.borderTop = "0.2px solid #00e600"
        ntbody.children[j].style.borderBottom = "0.2px solid #00e600"
      }else{
        ntbody.children[j].style.backgroundColor = "#fff"
        ntbody.children[j].style.color = "#000"
      }
    }
  }
  nextTable.replaceChild(ntbody, nextTbody)
}