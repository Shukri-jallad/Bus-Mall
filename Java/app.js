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
let previouslyShown = [];
let arrOfnames = [];
let arrOfVotes = [];
let arrOfShown = [];

function BusMall(name,source){
  this.name= name;
  this.source = source;
  this.votes = 0;
  this.dispCh=0;
  BusMall.allImages.push(this);
  arrOfnames.push(this.name);
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
 
  while(firstIndex === secondIndex || firstIndex === thirdIndex || secondIndex === thirdIndex || previouslyShown.includes(firstIndex) || previouslyShown.includes(secondIndex) || previouslyShown.includes(thirdIndex)){
    firstIndex = genrateRandomIndex();
    secondIndex = genrateRandomIndex();
    thirdIndex = genrateRandomIndex();
  }

  previouslyShown = [firstIndex,secondIndex,thirdIndex];
 
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
      arrOfVotes.push(BusMall.allImages[i].votes);
      arrOfShown.push(BusMall.allImages[i].dispCh);
      li.textContent = `${BusMall.allImages[i].name} it has ${BusMall.allImages[i].votes} Votes, was displayed ${BusMall.allImages[i].dispCh} times`;
    }
    chart();

});

function genrateRandomIndex(){
   return Math.floor(Math.random() * BusMall.allImages.length); 
                  
}
function chart(){
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: arrOfnames,
        datasets: [{
            label: 'Votes per image',
            data: arrOfVotes,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label:'Times displayed',
            data: arrOfShown,
            backgroundColor:[
              "rgb(172,192,92)"
            ],
            borderWidth: 1
          }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}