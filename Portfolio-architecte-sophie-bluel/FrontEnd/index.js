const api = "http://localhost:5678/api/";


const reponse = await fetch ( api + 'works');
const works = await reponse.json(); 

function loadWorks(works) {
    for (let i=0; i < works.length; i++) {
const work = works[i];
const workImg = document.createElement("img");
imageElement.src = workImg.image;
const workTitle = document.createElement("h2");
nomElement.innerText = workTitle.title;

const sectionCards = document.querySelector(".gallery");
sectionCards.appendChild(workImg);
sectionCards.appendChild(workTitle);}

}

const CatReponse = await fetch ( api + 'categories');
const  categories = await CatReponse.json(); 

function createFilter(categories) {
    const btn = document.createElement("button"); 
}




