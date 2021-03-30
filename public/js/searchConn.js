const connCookies = document.getElementById('connCookies');
const connList = document.getElementById('connList');
const connCookieVal =document.getElementById('connCookieVal');
const connInform = document.getElementById('connInform');
const cookieInform = document.getElementById('cookieInform');
const checkedInform = document.getElementById('checkedInform');

const data = JSON.parse(connCookies.value);
const arr = data[0].cookie;

const removeConnDuplicate = (arr,prop_1) =>
    arr.reduce((acc,cur)=>{
        if(!acc.find(obj=>obj[prop_1] === cur[prop_1])){
            acc.push(cur);
        }
        return acc;
        console.log(acc);
    },[]);
// console.log(arr);
// removeConnDuplicate(ar,tor);
console.log(removeConnDuplicate(arr, "conn"));
const connCookie = removeConnDuplicate(arr,"conn"); //중복제거한 connCookie
let cnDiv


function connCookieData(){
    for (let i=0; i<connCookie.length; i++){
        const red = Math.random() * (255 - 0) + 0;
        const green = Math.random() * (255 - 0) + 0;
        const blue = Math.random() * (255 - 0) + 0;
        const randomColor = `rgb(${red},${green},${blue})`
        let conn = connCookie[i].conn;
        let conncookieCount = arr.filter((item) => {
            return item.conn === conn
        })
        cnDiv = document.createElement('div')
        const cnlabel = document.createElement('label');
        const cninput = document.createElement('input');
        const cnTooltip = document.createElement('span');

        cnlabel.innerText = conn.slice(7,45) + ` (${conncookieCount.length})`;
        cnlabel.setAttribute("for", `conn${i+1}`)
        cnlabel.setAttribute("class", 'tooltip')
        cnlabel.style.display = "inline"

        cnTooltip.setAttribute('class', 'tooltiptext');
        cnTooltip.innerText = conn

        cninput.setAttribute("type", "checkbox");
        cninput.style.color="relative";
        cninput.value = conn;
        cninput.setAttribute("onclick","connCookies_value()");
        console.log(cnlabel);
        cninput.id=`conn${i+1}`;

        cnDiv.style.display="block";
        cnDiv.style.backgroundColor = randomColor
        cnDiv.setAttribute("divBackgroundColor", randomColor);
        if(red > 215 || green > 215 || blue > 215 ){
            cnDiv.style.color = "#000"
            cnDiv.setAttribute("divColor", "#000")
        }else{
            cnDiv.style.color = "#fff"
            cnDiv.setAttribute("divColor", "#fff")
        }
        cnDiv.id=`${i+1}`

        cnlabel.appendChild(cnTooltip)
        cnDiv.appendChild(cninput);
        cnDiv.appendChild(cnlabel);

        connList.appendChild(cnDiv);
    }
    connInform.innerText = `Conn(Total: ${connCookie.length})`
}
connCookieData()

function connCookies_value() {
    const connCookieList = document.getElementById('connCookieList');
    const connTable =document.getElementById('connTable');
    const cntb = document.createElement('tbody');
    cntb.setAttribute("id", "connCookieList");

    let checkedCount = 0
    for(let i=0; i<connCookie.length; i++){
        const connName = document.getElementById(`conn${i+1}`);
        const connDiv = document.getElementById(`${i+1}`);
        const targetbackgroundColor = connDiv.getAttribute("divBackgroundColor")
        const targetColor = connDiv.getAttribute("divColor");
        if(connName.checked == true){
            checkedCount += 1
            for(let j=0; j<arr.length; j++){
                if(connCookie[i].conn === arr[j].conn){
                    const cntr = document.createElement('tr');
                    const cntd1 =document.createElement('td');
                    cntd1.innerText=arr[j].name.slice(0, 10);
                    const cntd2 =document.createElement('td');
                    cntd2.innerText=arr[j].conn.slice(7,35);
                    const cntd3 =document.createElement('td');
                    cntd3.innerText=arr[j].connTLD;
                    const cntd4 =document.createElement('td');
                    cntd4.innerText=arr[j].publisher;
                    const cntd5 =document.createElement('td');
                    cntd5.innerText=arr[j].type;

                    cntr.appendChild(cntd1);
                    cntr.appendChild(cntd2);
                    cntr.appendChild(cntd3);
                    cntr.appendChild(cntd4);
                    cntr.appendChild(cntd5);

                    cntd1.style.color = targetColor
                    cntd2.style.color = targetColor
                    cntd3.style.color = targetColor
                    cntd4.style.color = targetColor
                    cntd5.style.color = targetColor

                    cntd1.style.backgroundColor = targetbackgroundColor
                    cntd2.style.backgroundColor = targetbackgroundColor
                    cntd3.style.backgroundColor = targetbackgroundColor
                    cntd4.style.backgroundColor = targetbackgroundColor
                    cntd5.style.backgroundColor = targetbackgroundColor

                    cntb.appendChild(cntr);
                    console.log(cntb)
                }
            }
        }
    }
    console.log(cntb.children.length)
    cookieInform.innerText = `Cookies(Total: ${cntb.children.length})`
    checkedInform.innerText = `${checkedCount} conn selected`
    connTable.replaceChild(cntb,connCookieList);
}
