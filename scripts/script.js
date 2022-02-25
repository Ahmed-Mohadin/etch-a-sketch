// Get all necessary DOM nodes
const displayGrids = document.querySelector('.display-grids');
const inputRange = document.querySelector('input[type="range"]');
const inputColor = document.querySelector('input[type="color"]');

const btnColor = document.querySelector('.btn-color');
const btnRainbow = document.querySelector('.btn-rainbow');
const btnDarker = document.querySelector('.btn-darker');

const btnErase = document.querySelector('.btn-erase');
const btnClear = document.querySelector('.btn-clear');

// Declare necessary variables
let selectedColor = '';
let selectedMode = '';
let isActive = false;
const defaultSize = 16;

/*
inputRange with change event listener, 
changes label text and creates divs on change 
*/
inputRange.addEventListener('change', (e) => {
    const label = document.querySelector('label[for="input-range"]');
    label.innerText = `${e.target.value} x ${e.target.value}`;
    createDivs(e.target.value);
});


/*
This function resets the divs and isActive
*/
function resetDivs(){
    isActive = false;
    displayGrids.innerHTML = '';
}

/*
This function creates n div elements
*/
function createDivs(n){
    resetDivs();
    displayGrids.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    displayGrids.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    for(let i = 0; i < n * n; i++){
        const newDiv = document.createElement('div');
        newDiv.className = 'user-div';
        displayGrids.append(newDiv);

        if(i==0) newDiv.style.borderTopLeftRadius = "0.5rem";
        else if(i == n - 1) newDiv.style.borderTopRightRadius = "0.5rem";
        else if(i == n * n - n) newDiv.style.borderBottomLeftRadius = "0.5rem";
        else if(i == n * n - 1) newDiv.style.borderBottomRightRadius = "0.5rem";
        
        const userDiv = document.querySelectorAll('.user-div');
        userDiv[i].style.backgroundColor = 'rgb(247, 255, 251)';
        userDiv[i].onclick = function(){
            isActive = true;
            hoverEffect('.user-div');
        }
        userDiv[i].ondblclick = () => isActive = false;
        userDiv[i].addEventListener('mouseleave', darkenBgColor);
    }
    if(n == 1) document.querySelector('.user-div').style.borderRadius = '0.5rem';
}
createDivs(defaultSize);

/*
This function returns random numbers between 0 and 255 for RGB colors
*/
const randomRGB = () => Math.floor(1 + Math.random() * 255);

/*
This function checks which mode is selected to return selectedColor
*/
function myColorPen(mode){
    if(isActive){
        if(mode == 'color') selectedColor = `${inputColor.value}`;
        else if(mode == 'rainbow') selectedColor = `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`;
        else if(mode == 'darker') selectedColor = 'rgba';
        else if(mode == 'erase') selectedColor = 'rgb(247, 255, 251)';
    }     
    else{
        selectedColor = 'not active';
    }
    return selectedColor;
}

/*
This function darkens the targets background color by 20%
*/
function darkenBgColor(e){
    if(selectedMode == 'darker' && isActive){
        const rgbString = e.target.style.backgroundColor.slice(
            e.target.style.backgroundColor.indexOf('(') + 1, - 1
        );
        const rgbArr = rgbString.split(','); 
        let r = rgbArr[0];
        let g = rgbArr[1];
        let b = rgbArr[2];
        r *= 0.8;
        g *= 0.8;
        b *= 0.8;
        e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
    }
}

/*
This function gets index of the n:th div, colors them with the selectedColor
*/
function hoverEffect(selectDivs){
    const myDivs = document.querySelectorAll(selectDivs);
    for(let i = 0; i < myDivs.length; i++){
        myDivs[i].addEventListener('mouseout', () => {
            myColorPen(selectedMode);
            myDivs[i].style.backgroundColor = selectedColor;
        });
    }
}

/*
This function adds the class 'active' to the button
*/
const btnAddClass = (btn) => btn.classList.add('active');

/*
This function removes the class 'active' from all buttons
*/
const btnRemoveClass = () => {
    document.querySelectorAll('button').forEach((oldBtn) => {
        oldBtn.classList.remove('active');
    })
}

/*
Add onclick function to all buttons
*/
btnErase.onclick = () => {
    btnRemoveClass();
    btnAddClass(btnErase);
    selectedMode = 'erase';
}
btnClear.onclick = () => createDivs(inputRange.value);
btnColor.onclick = () => {
    btnRemoveClass();
    btnAddClass(btnColor);
    selectedMode = 'color';
}
btnRainbow.onclick = () => {
    btnRemoveClass();
    btnAddClass(btnRainbow);
    selectedMode = 'rainbow';
}
btnDarker.onclick = () => {
    btnRemoveClass();
    btnAddClass(btnDarker);
    selectedMode = 'darker';
}