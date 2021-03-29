const searchOption = document.getElementById('searchOption');
const searchBar = document.getElementById('searchBar');
const dataList = document.getElementById('dataList');
const suggestions = document.querySelector('.suggestions');

const data = JSON.parse(dataList.value)

let option = "domains"

const removeDuplicates = (arr, prop_1) => arr.reduce((acc, cur) => {
  if(!acc.find(obj => obj[prop_1] === cur[prop_1])){
    acc.push(cur);
  } 
  return acc;
}, []);

const domainList = removeDuplicates(data[0].cookieData, 'domain')
const pubList = removeDuplicates(data[0].publisherData, 'publisher');

function removeNull(arr){
  const nullIdx = arr.findIndex((item) => {
    return item.publisher === null
  })
  delete arr[nullIdx]
}

removeNull(pubList)

function setPlaceHolder(){
  option = searchOption.options[searchOption.selectedIndex].value
  if(option === "domains"){
    searchBar.setAttribute('placeholder', 'ex) 11st, ppomppu, naver')
  }else{
    searchBar.setAttribute('placeholder', 'ex) doubleclick.net, skplanet.com, mathtag.com')
  }
}

function findMatches(wordToMatch, optionData){
  if(option === "domains"){
    return optionData.filter(data => {
      const regex = new RegExp(wordToMatch, 'gi');
      return data.domain.match(regex)
    })
  }else{
    return optionData.filter(data => {
      const regex = new RegExp(wordToMatch, 'gi');
      return data.publisher.match(regex)
    })
  }
}

function displayMatches() {
  let matchArray
  let html
  if(option === "domains"){
    matchArray = findMatches(this.value, domainList)
    html = matchArray
    .slice(0,10)
    .map(data => {
      let value = this.value
      const regex = new RegExp(this.value, "gi");
      const domain = data.domain.replace(
        regex,
        `<span class="hl">${value}</span>`
      );
      return `
        <li class="domainLi">
          <span class="domain">${domain}(${data.domainTitle})</span>
          <span class="url">${data.url.slice(0, -1)}</span>
        </li>
      `;
    })
    .join("");
  }else if(option === "publishers"){
    matchArray = findMatches(this.value, pubList)
    // matchArray.slice(20);
    console.log(matchArray)
    html = matchArray
    .slice(0, 10)
    .map(data => {
      let value = this.value
      const regex = new RegExp(this.value, "gi");
      const publisher = data.publisher.replace(
        regex,
        `<span class="hl">${value}</span>`
      );
      return `
        <li class="publisherLi">
          <span class="publisher">${publisher}</span>
          <span class="type">${data.type}</span>
        </li>
      `;
    })
    .join("");
  }
  console.log(typeof html)
  suggestions.innerHTML = html;
};

searchBar.addEventListener("change", displayMatches);
searchBar.addEventListener("keyup", displayMatches);
searchBar.addEventListener("focus", displayMatches);