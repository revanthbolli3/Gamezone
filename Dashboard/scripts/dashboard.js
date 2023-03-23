const obj=[
    {
        game:"game-1",
        score:"50",
        highscore:"100",
    },
    {
        game:"game-2",
        score:"60",
        highscore:"100",
    },
    {
        game:"game-3",
        score:"70",
        highscore:"100",
    },
    {
        game:"game-4",
        score:"50",
        highscore:"100",
    },
    {
        game:"game-5",
        score:"60",
        highscore:"100",
    },
    {
        game:"game-6",
        score:"70",
        highscore:"100",
    }

]

const table = document.getElementsByTagName("tbody")[0];
const fiverecords = [];
for(let rec=obj.length-1;rec>obj.length-6;rec--){
    fiverecords.push(obj[rec]);
}

for(let rec=0;rec<fiverecords.length;rec++){
    const tr =  document.createElement("tr");
    const td1= document.createElement("td");
    td1.innerText=fiverecords[rec].game;
    td1.style.color="red";
    td1.style.fontWeight="700";
    const td2= document.createElement("td");
    td2.innerText=fiverecords[rec].score;
    const td3= document.createElement("td");
    td3.classList.add("highscore");
    td3.innerText=fiverecords[rec].highscore;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
}
