const generate = document.getElementById('generate')
const canvas = document.getElementById('canvas')
const mainBar = document.getElementsByClassName('middle-settings')[0]
const regenerate= document.getElementById('recreate')
const savebtn = document.getElementById('save')
const settings = document.getElementById('settings')
const sliderVal = document.getElementsByClassName('num-shapes-display')[0]
const numSlider = document.getElementById('num-shape-select')
const bgFill = document.getElementById('bg-fill')
const shapeSize = document.getElementById('size-selector')
const animation = document.getElementsByClassName('lottie-bg')[0]
var imageSave
var shape
var num
var colorselect
var iter=0;

// canvas.style.display = "none"
settings.style.display = "none"
regenerate.style.display = "none"
savebtn.style.display = "none"

animation.style.display = 'block'

generate.addEventListener('click', () => {
  canvas.style.display = "block"
  mainBar.style.display = "none"
  regenerate.style.display = "block"
  savebtn.style.display = "block"
  settings.style.display = "block"
  shape = document.getElementById('shape-select').value
  num = document.getElementById('num-shape-select').value
  colorselect = document.getElementsByName('colorSelect')
  colorselect = colorselect[0].checked ? 'color' : 'monochromatic'
  animation.style.display = 'none'
  clear();
  background(bgFill.value);
  iter = 0;
  loop()
})
regenerate.addEventListener('click', () => {
  clear();
  background(bgFill.value);
  iter = 0;
})
numSlider.addEventListener('change', () => {
  sliderVal.innerText = numSlider.value
})
settings.addEventListener('click', () => {
  settings.style.display = "none"
  mainBar.style.display = "block"
  regenerate.style.display = "none"
  savebtn.style.display = "none"
  animation.style.display = 'block'
  background(255);
  noLoop()
  clear()

})

savebtn.addEventListener('click' , ()=> {
  saveCanvas(imageSave, 'my-wallpaper', 'jpg');
})

//p5 stuff
var xMax = window.innerWidth - 100;
var yMax = window.innerHeight - 100;

function rand(lower, upper){
  return random(lower, upper)
}


function setup() {
    imageSave = createCanvas(xMax, yMax);
    noLoop()
    background(bgFill.value);
  }
  
  function draw() {
    const x1 = rand(0, xMax)
    const y1 = rand(0, yMax)
    const rectWidth = shapeSize.value == 'small' ? rand(1,50) : (shapeSize.value == "medium" ? rand(50,200) : rand(200,500))
    const rectHeight = shapeSize.value == 'small' ? rand(1,50) : (shapeSize.value == "medium" ? rand(50,200) : rand(200,500))
    const startAngle = rand(0, 6.283)
    const stopAngle = rand(0, 6.283)

    if(iter < num){
      const pointSize = shapeSize.value == 'small' ? rand(1,10) : (shapeSize.value == "medium" ? rand(10,20) : rand(20,50))
      const sizeOfVariation = shapeSize.value == 'small' ? rand(1,50) : (shapeSize.value == "medium" ? rand(50,200) : rand(200,500))
      if(colorselect == 'monochromatic'){ stroke(rand(0,255)) ; fill(rand(0,255))}
      else{stroke(rand(0,255), rand(0,255), rand(0,255)); fill(rand(0,255), rand(0,255), rand(0,255))}
    switch (shape) {
      case 'triangle':
          triangle(
            x1, 
            y1,
            x1 + rand(-sizeOfVariation, sizeOfVariation), 
            y1 + rand(-sizeOfVariation, sizeOfVariation),
            x1 + rand(-sizeOfVariation, sizeOfVariation), 
            y1 + rand(-sizeOfVariation, sizeOfVariation),
          )
        break;
      case 'rectangle':
        rect(x1, y1, rectWidth, rectHeight);
        break;
      case 'arc':
        arc(x1, y1, rectWidth, rectHeight, startAngle, stopAngle, CHORD)
        break;

      case 'ellipse':
        ellipse(x1, y1, rectWidth, rectHeight)
        break;
      case 'circle':
        circle(x1, y1, sizeOfVariation)
        break;
      
      case 'line':
        line(x1, y1, x1+ rand(-sizeOfVariation, sizeOfVariation), y1+rand(-sizeOfVariation, sizeOfVariation))
        break;
      
      case 'point':
        strokeWeight(pointSize)
        point(x1,y1)
        break;

      case 'quad':
        quad(
            x1, 
            y1,
            x1 + rand(-sizeOfVariation, sizeOfVariation), 
            y1 + rand(-sizeOfVariation, sizeOfVariation),
            x1 + rand(-sizeOfVariation, sizeOfVariation), 
            y1 + rand(-sizeOfVariation, sizeOfVariation),
            x1 + rand(-sizeOfVariation, sizeOfVariation), 
            y1 + rand(-sizeOfVariation, sizeOfVariation)
          )

      case 'square':
            square(x1, y1, sizeOfVariation);
            break;
      default:
        break;
    }
    iter++;
    }
  }

