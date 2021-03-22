const connCookies = document.getElementById('connCookies');
const connList = document.getElementById('connList');
const connCookieVal =document.getElementById('connCookieVal')

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

function connCookieData(){
    for (let i=0; i<connCookie.length; i++){
        let conn = connCookie[i].conn;
        const cnDiv = document.createElement('div')
        const cnlabel = document.createElement('label');
        const cninput = document.createElement('input');

        cnlabel.innerText = connCookie[i].conn.slice(7,45);
        cninput.setAttribute("type", "checkbox");
        console.log(cnlabel);
        cninput.id=`conn${i+1}`;
        cnDiv.appendChild(cnlabel)
        cnlabel.style.display = "inline"
        cnDiv.appendChild(cnlabel);
        cnDiv.appendChild(cninput)
        cnDiv.style.display="block";
        cninput.style.color="relative";
        cninput.value=connCookie[i].conn;
        cninput.setAttribute("onclick","connCookies_value()");
        cnDiv.appendChild(cnlabel);

        connList.appendChild(cnDiv);
    }
}
connCookieData()

// function connCookieValue() {
//     for (let i =0; i<connCookie.length; i++){
//         let conn = connCookie[i].conn;
//         const cntb = document.createElement('tbody');
//         const cntd = document.createElement('td');
//         const cntr = document.createElement('tr');
//
//         cntd.innerText = connCookie[i].value.slice(7,45);
//         console.log(cntd);
//         cntb.append(cntd);
//         cntr.appendChild(cntd);
//
//         connCookieVal.appendChild(cntr);
//     }
// }
// // connCookieValue()

function connCookies_value() {
    const connCookieList = document.getElementById('connCookieList');
    const connTable =document.getElementById('connTable');
    const cntb = document.createElement('tbody');
    cntb.setAttribute("id", "connCookieList");
    for(let i=0; i<connCookie.length; i++){
        const connName = document.getElementById(`conn${i+1}`);
        if(connName.checked == true){
            for(let j=0; j<arr.length; j++){
                if(connCookie[i].conn === arr[j].conn){
                    const cntr = document.createElement('tr');
                    const cntd1 =document.createElement('td');
                    cntd1.innerText=arr[j].name;
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

                    cntb.appendChild(cntr);
                    console.log(cntb)
                }
            }
        }
    }
    connTable.replaceChild(cntb,connCookieList);
}
