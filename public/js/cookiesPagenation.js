const cookieData = document.getElementById('cookieData');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const paginationField = document.getElementById('paginationField');

const tableData = JSON.parse(cookieData.value);
const buttons = paginationField.children.length - 2

let currentPage = 1;

function pageSetting(){
  for(let i=0; i < tableData.length; i++){
    const trIdx = document.getElementById(`${i+1}`)
    if(i+1 > 15){
      trIdx.style.display = "none"
    }
  }
  for(let j=0; j < buttons; j++){
    const buttonIdx = document.getElementById(`page${j+1}`);
    if(j+1 > 5){
      buttonIdx.style.display = "none"
    }
  }
  const firstPage = document.getElementById('page1');
  firstPage.style.backgroundColor = "#ffecd3";
  firstPage.style.border = "1px solid #ffecd3";
  firstPage.style.color = "#a02e01";
}

function pagination(value) {
  currentPage = parseInt(value)
  for(let i=0; i < tableData.length; i++){
    const trIdx = document.getElementById(`${i+1}`)
    const target = ((i+1) / 15)
    if(Math.ceil(target) === parseInt(value)){
      trIdx.style.display = "table-row"
    }else{
      trIdx.style.display = "none"
    }
  }
}

function nextBtn(){
  if(currentPage === Math.ceil(tableData.length/15)){
    alert("마지막 페이지입니다.")
  }else{
    currentPage +=  1
    for(let i=0; i < tableData.length; i++){
      const trIdx = document.getElementById(`${i+1}`)
      const target = ((i+1) / 15)
      if(Math.ceil(target) === currentPage){
        trIdx.style.display = "table-row"
      }else{
        trIdx.style.display = "none"
      }
    }
  }
}

function prevBtn(){
  if(currentPage === 1){
    alert("첫번째 페이지입니다.")
  }else{
    currentPage -=  1
    for(let i=0; i < tableData.length; i++){
      const trIdx = document.getElementById(`${i+1}`)
      const target = ((i+1) / 15)
      if(Math.ceil(target) === currentPage){
        trIdx.style.display = "table-row"
      }else{
        trIdx.style.display = "none"
      }
    }
  }
}

function buttonVisible(){
  for(let i=0; i < buttons; i++){
    const buttonIdx = document.getElementById(`page${i+1}`);
    if(currentPage > 2 && currentPage < buttons - 1){
      if(currentPage-2 <= buttonIdx.value && currentPage+2 >= buttonIdx.value){
        buttonIdx.style.display = "block"
      }else{
        buttonIdx.style.display = "none"
      }
    }
    if(i+1 === currentPage){
      buttonIdx.style.backgroundColor = "#ffecd3";
      buttonIdx.style.border = "1px solid #ffecd3";
      buttonIdx.style.color = "#a02e01";
    }else{
      buttonIdx.style.backgroundColor = "#fea71a";
      buttonIdx.style.border = "1px solid #fea71a";
      buttonIdx.style.color = "#fff";
    }
  }
}

pageSetting();