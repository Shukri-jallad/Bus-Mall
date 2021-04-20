'use strict';

let firstImageElement = document.getElementById('first-image');
let secondImageElement = document.getElementById('second-image');
let thirdImageElement = document.getElementById('third-image');

let button = document.getElementById('button');


let counts = 0;
let maxAttempts = 10;
let firstIndex; 
let secondIndex;
let thirdIndex;

function BusMall(name,source){
  this.name= name;
  this.source = source;
  this.votes = 0;
  this.dispCh=0;
  BusMall.allImages.push(this);
}


BusMall.allImages =[];

console.log(BusMall.allImages);


new BusMall('bag','../images/bag.jpg');
new BusMall('banana','../images/banana.jpg');
new BusMall('bathroom','../images/bathroom.jpg');
new BusMall('boots','../images/boots.jpg');
new BusMall('breakfast','../images/breakfast.jpg');
new BusMall('bubblegum','../images/bubblegum.jpg');
new BusMall('chair','../images/chair.jpg');
new BusMall('cthulhu','../images/cthulhu.jpg')
new BusMall('dog-duck','../images/dog-duck.jpg');
new BusMall('dragon','../images/dragon.jpg');
new BusMall('pen','../images/pen.jpg');
new BusMall('pet-sweep','../images/pet-sweep.jpg');
new BusMall('scissors','../images/scissors.jpg');
new BusMall('shark','../images/shark.jpg');
new BusMall('sweep','../images/sweep.png');
new BusMall('tauntaun','../images/tauntaun.jpg')
new BusMall('unicorn','../images/unicorn.jpg');
new BusMall('usb','../images/usb.gif');
new BusMall('water-can','../images/water-can.jpg');
new BusMall('wine-glass','../images/wine-glass.jpg');

console.log(BusMall.allImages);

function renderThreeImages(){
  firstIndex = genrateRandomIndex(); 
  secondIndex = genrateRandomIndex();
  thirdIndex = genrateRandomIndex();  
 
  while(firstIndex === secondIndex || firstIndex === thirdIndex || secondIndex === thirdIndex){
    firstIndex = genrateRandomIndex();
    secondIndex = genrateRandomIndex();
    thirdIndex = genrateRandomIndex();
  }
 
  firstImageElement.src =  BusMall.allImages[firstIndex].source;
  secondImageElement.src = BusMall.allImages[secondIndex].source;
  thirdImageElement.src = BusMall.allImages[thirdIndex].source;

  BusMall.allImages[firstIndex].dispCh++;
  BusMall.allImages[secondIndex].dispCh++;
  BusMall.allImages[thirdIndex].dispCh++;

}

renderThreeImages();

firstImageElement.addEventListener('click', handleClicking);
secondImageElement.addEventListener('click',handleClicking);
thirdImageElement.addEventListener('click' ,handleClicking);

function handleClicking(event){
 
    counts++; 
    if(maxAttempts >= counts){
      if(event.target.id ==='first-image'){
         BusMall.allImages[firstIndex].votes++;
       }else if(event.target.id ==='second-image'){
            BusMall.allImages[secondIndex].votes++;
    }else if(event.target.id === 'third-image'){
        BusMall.allImages[thirdIndex].votes++
    }
    renderThreeImages();
    console.log(BusMall.allImages);
  }else {
    
    firstImageElement.removeEventListener('click', handleClicking);
    secondImageElement.removeEventListener('click',handleClicking);
    thirdImageElement.removeEventListener('click', handleClicking);
  }
}

button.addEventListener('click',function(){
    let ul = document.getElementById('unList');
    for(let i = 0 ; i < BusMall.allImages.length;i++){
      let li = document.createElement('li');
      ul.appendChild(li);
      li.textContent = `${BusMall.allImages[i].name} it has ${BusMall.allImages[i].votes} Votes, was displayed ${BusMall.allImages[i].dispCh} times`;
    }

});

function genrateRandomIndex(){
   return Math.floor(Math.random() * BusMall.allImages.length); 
                  
}