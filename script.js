let displayString="";
create_values();
clear_screen();

function create_values(){
    displayString="";
    const chars=document.querySelectorAll('.value');
    chars.forEach((char)=>{
        char.addEventListener("click",()=>{
            //accesing the value of each character button and adding it to a string
            displayString+= char.value;
            display(displayString,"results");
            //if the last character entered is an operator, results will be displayed
            if(isOperator(displayString.charAt(displayString.length-1))){
                calculate(displayString,displayString.length-1);
            }
        });
    });
}

function isOperator(char){
    if(char=="+"||char=="-"||char=="/"||char=="*"){
        return true;
    }
    return false;
}

function calculate(str,length){
    let result;//length is the number of characters to be removed from the beginning while displaying the string
    display(str,"screen");
    str=displayString.substr(0,length);
    if(divisionByZero(str)){
        alert("Error:Division by zero");
        return;
    }
    result=evaluate(str);
    displayString=displayString.replace(str,result);
    display(displayString,"results");
}

function evaluate(str){
    return new Function('"use strict";return ('+str+');')
}

function divisionByZero(str){
    return str.endsWith(`/0`);
}
function display(str,id){
    const div = document.getElementById(id);
    div.innerText= str;
}

function clear_screen(){
    animation();
    displayString="";
    display("","screen");
    display("0","results");
}

function delete_last(){
    displayString= displayString.substring(0,displayString.length-1);
    display(displayString,"results");
    //creates a substring of display string by excluding the last character and displays the new string;
}

function equals(){
    animation();
    calculate(displayString,displayString.length);
    
}

function animation(){
    const equal= document.getElementById('results');
    equal.classList.toggle("animate");
}