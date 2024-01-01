const fontFamily = document.getElementById('FontSelect')
const fontSize = document.getElementById('SizeSelect')
const color = document.getElementById('ColorSelect')
const backgroundColor = document.getElementById('backGroundSelect')
const fontWeight = document.getElementById('boldButton')
const fontStyle = document.getElementById('italicButton')
const textDecoration = document.getElementById('underlineButton')
const textArea = document.getElementById('textAreaInput')
const leftAlign = document.getElementById('leftAlign')
const centerAlign = document.getElementById('centerAlign')
const rightAlign = document.getElementById('rightAlign')
const letterSpacing = document.getElementById('letterSpaceSelect')
const lineSpacing = document.getElementById('lineHeightSelect')
const padding = document.getElementById('paddingSelect')
const sideBarIcon = document.getElementById('sideBarIcon')
const sideBar = document.getElementById('sideBar')


const commonProperties = {
    color: ['#000000', color],
    backgroundColor: ['#ffffffff', backgroundColor],
    fontWeight: ['normal', fontWeight],
    fontStyle: ['normal', fontStyle],
    textDecoration: ['none', textDecoration],
    textAlign: ['left', leftAlign],
    fontFamily: ["Arial", fontFamily],
    fontSize: [15, fontSize],
    letterSpacing: [1, letterSpacing],
    lineHeight: [1, lineSpacing],
    padding: [5, padding]
}


Object.keys(commonProperties).forEach(item => {
    let getFromStorage = localStorage.getItem(item)
    let propertyValue = getFromStorage !== null ? getFromStorage : commonProperties[item][0];


    if (getFromStorage !== null && getFromStorage.includes('px')) {
        propertyValue = parseInt(propertyValue.replace('px', ''))
        textArea.style[item] = propertyValue + 'px';

    } else {
        textArea.style[item] = propertyValue;
    }

    if (item === 'padding') {
        textArea.style[item] = propertyValue + 'px';
    }

    commonProperties[item][1].value = propertyValue;
})


textArea.innerText = localStorage.getItem('text') || "Start writting here..."



const commonFonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Times',
    'Courier New',
    'Courier',
    'Verdana',
    'Georgia',
    'Palatino',
    'Garamond',
    'Bookman',
    'Trebuchet MS',
    'Arial Black',
    'Impact',
    'Comic Sans MS',
    'Cursive',
    'Arial Narrow',
    'Century Gothic',
    'Lucida Sans Unicode',
    'Lucida Grande',
    'Geneva',
    'Monaco',
    'Optima',
    'Hoefler Text',
    'Bitstream Vera Serif',
    'Bitstream Vera Sans',
    'Bitstream Vera Sans Mono',
    'Candara',
    'Constantia',
    'Corbel',
    'DejaVu Sans',
    'DejaVu Serif',
    'DejaVu Sans Mono',
    'Lucida Console'
];


function listenEvents(propertyElement, property, value = null, additional = "") {

    propertyElement.addEventListener(value === null ? "change" : 'click', (e) => {

        if (value) {
            textArea.style[property] = textArea.style[property] === "" ? value : "";
            localStorage.setItem(property, textArea.style[property] === "" ? value : "");
        } else {
            textArea.style[property] = e.target.value + additional
            localStorage.setItem(property, e.target.value + additional)
        }

    })
}


commonFonts.forEach(item => {
    let newOption = document.createElement('option')
    newOption.text = item
    newOption.value = item
    if (item === localStorage.getItem('fontFamily')) {
        newOption.selected = true
    }
    fontFamily.appendChild(newOption)
})


listenEvents(fontFamily, 'fontFamily')
listenEvents(fontSize, 'fontSize', null, 'px')
listenEvents(letterSpacing, 'letterSpacing', null, 'px')
listenEvents(padding, 'padding', null, 'px')
listenEvents(lineSpacing, 'lineHeight', null, 'px')
listenEvents(color, 'color')
listenEvents(backgroundColor, 'backgroundColor')
listenEvents(fontWeight, 'fontWeight', 'bold')
listenEvents(fontStyle, 'fontStyle', 'italic')
listenEvents(textDecoration, 'textDecoration', 'underline')
listenEvents(leftAlign, 'textAlign', 'left')
listenEvents(centerAlign, 'textAlign', 'center')
listenEvents(rightAlign, 'textAlign', 'right')

textArea.addEventListener("input",(e)=>{
    if (textArea.innerText !== '') {
    localStorage.setItem('text',textArea.innerText)
    }else{
        localStorage.removeItem('text')
    }
})

let firstTime = true;
textArea.addEventListener('click',(e)=>{
    if (textArea.innerText === 'Start writting here...' && firstTime) {
        textArea.innerText = "";
        firstTime = false;
    }
})

sideBarIcon.addEventListener('click',()=>{
    sideBar.style.display = sideBar.style.display==='none'?'block':'none';
})
