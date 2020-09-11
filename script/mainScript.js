const saveButton=document.getElementById("saveIcon");
const canelButton=document.getElementById("cacelIcon");
const cancelContext=canelButton.getContext("2d");
const saveContext=saveButton.getContext("2d");

/* draw the right tick */
saveContext.strokeStyle="white";
saveContext.lineWidth=5;
saveContext.moveTo(75,75);
saveContext.lineTo(100, 100); 
saveContext.stroke();
saveContext.moveTo(100,100);
saveContext.lineTo(240, 40); 
saveContext.stroke();

/* draw the cancel tick */
cancelContext.strokeStyle="white";
cancelContext.lineWidth=5;
cancelContext.moveTo(220, 30);
cancelContext.lineTo(80,120);
cancelContext.stroke();
cancelContext.moveTo(80,30);
cancelContext.lineTo(220,120);
cancelContext.stroke();

/*Etch a sketch */

let pen=false;
let colorChoice;
const sketch=document.querySelector(".sketch");

colorChoiceButton=document.getElementById("choseColor");

colorChoiceButton.onclick=()=>{colorChoice=prompt("color choice pleas ");}
let squares=prompt(`how much grid (Width x Height) do you like to make. between 20 - 60 is suggested`);
while(!Number(squares)){
    squares=prompt(`you can only supply numbers`);
}
let divWidth=sketch.clientWidth/squares;
let divHeight=sketch.clientHeight/squares;

/* create a grid area*/
sketch.setAttribute(
    `style`,`
    grid-template-columns: repeat(${squares},${divWidth});
    grid-template-rows: repeat(${squares},${divHeight});`
);
let counter=1;
for(let i=0;i<squares;i++){
    for(let j=0;j<squares;j++){
        let singleDiv=document.createElement("div");
        singleDiv.setAttribute(`style`,`border: none; mergine: 0px;grid-area: ${counter}; padding: 0px; 
        display: inline-block;width: ${divWidth}px;height: ${divHeight}px`);
        sketch.appendChild(singleDiv);
    }
    counter++;
}
sketch.addEventListener(`click`,penDraw);
function penDraw(){
    if(!pen){
        sketch.querySelectorAll('div').forEach(Element=>{
            Element.onmouseover=()=>{
                const colorArray=['red','green','yellow','blue','orange','cyan'];
        Element.style.backgroundColor=colorChoice ?? colorArray[Math.floor(Math.random()*6)];
            };
        });
        pen=true;
    }
    else {
        sketch.querySelectorAll('div').forEach(Element=>{
            Element.onmouseover=()=>{
                
            };
        });
    
        pen=false;
    }
}
/* key pressed */
window.onkeydown=function(e){ 
    if(!(101===Number(e.keyCode) || 69===Number(e.keyCode)))
    return;
sketch.querySelectorAll('div').forEach(Element=>{
Element.onmouseover=()=>{
Element.style.backgroundColor="white";
};
});};

/* key released */
window.onkeyup=()=>{
    pen=true;
    penDraw(); 
}

/* cancel button*/
canelButton.onclick=()=>{
    sketch.innerHTML='';
    window.location.reload();
}
/*save button*/
saveButton.onclick=()=>{
    alert('not emplimented yet');
}
window.onresize=()=>{
    sketch.setAttribute('style','overflow: hidden');
}