// Get all necessary DOM nodes
const displayGrids = document.querySelector('.display-grids');
const inputRange = document.querySelector('input[type="range"]');
const inputColor = document.querySelector('input[type="color"]');
const allBtn = document.querySelectorAll('button');

// Declare necessary variables
const defaultSize = 16;
const defaultColor = 'rgb(247, 255, 251)';
let currentMode = 'color';
let mouseDown = false

// Add mouse event, prevent "no-drop" cursor from showing up on some clicks
displayGrids.onmousedown = (e) => {
    e.preventDefault();
    mouseDown = true;
}
displayGrids.onmouseup = () => (mouseDown = false);

/*
inputRange with change event listener, 
*/
inputRange.addEventListener('change', (e) => {
    const label = document.querySelector('label[for="input-range"]');
    label.innerText = `${e.target.value} x ${e.target.value}`;
    createDivs(e.target.value);
});

/*
This function creates n div elements
*/
function createDivs(n){
    displayGrids.innerHTML = '';
    displayGrids.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    displayGrids.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    for(let i = 0; i < n * n; i++){
        const newDiv = document.createElement('div');
        newDiv.className = 'user-div';
        newDiv.style.backgroundColor = defaultColor;
        displayGrids.append(newDiv);

        if(i==0) newDiv.style.borderTopLeftRadius = "0.5rem";
        else if(i == n - 1) newDiv.style.borderTopRightRadius = "0.5rem";
        else if(i == n * n - n) newDiv.style.borderBottomLeftRadius = "0.5rem";
        else if(i == n * n - 1) newDiv.style.borderBottomRightRadius = "0.5rem";        
    }
    if(n == 1) document.querySelector('.user-div').style.borderRadius = '0.5rem';
    hoverEffect('.user-div');
}
createDivs(defaultSize);

/*
This function returns random numbers between 0 and 255 for RGB colors
*/
const randomRGB = () => Math.floor(1 + Math.random() * 255);

/*
This function checks currentMode, and colors the background color of the target
*/
function myColorPen(e){
    if(e.type === 'mouseover' && !mouseDown) return;
    switch(currentMode){
        case 'color':
            e.target.style.backgroundColor = `${inputColor.value}`;
            break;
        case 'rainbow':
            e.target.style.backgroundColor = `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`;
            break;
        case 'darker':
            darkenBgColor(e);
            break;
        default:
            e.target.style.backgroundColor = defaultColor;
            break;
    }
}

/*
This function darkens the targets background color by 20%
*/
function darkenBgColor(e){
    const rgbString = e.target.style.backgroundColor;
    const rgbArr = rgbString.slice(rgbString.indexOf('(') + 1, - 1).split(',');
    let r = rgbArr[0];
    let g = rgbArr[1];
    let b = rgbArr[2];
    r *= 0.8;
    g *= 0.8;
    b *= 0.8;
    e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
}

/*
This function gets index of the n:th div, adds mouse event to them
*/
function hoverEffect(selectDivs){
    const myDivs = document.querySelectorAll(selectDivs);
    for(let i = 0; i < myDivs.length; i++){
        myDivs[i].addEventListener('mouseover', myColorPen);
        myDivs[i].addEventListener('mousedown', myColorPen);
    }
}


/*
Add click event to allBtn
*/
allBtn.forEach((btn) => {
    btn.addEventListener('click', handleBtn)
    if(currentMode == 'color') btn.className == 'btn-color' ? btn.classList.add('active') : null;
});

/*
This function handles the click event on allBtn
*/
function handleBtn(e){
    if(e.target.className == 'btn-clear') createDivs(inputRange.value);
    else{
        allBtn.forEach((btn) => btn.classList.remove('active'));
        currentMode = e.target.className.split('-')[1];
        e.target.classList.add('active')
    }
}