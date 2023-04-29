    const api = "http://localhost:5678/api/";

    async function fetchWork() {
        try { 
            const reponse = await fetch ( api + 'works');
            const works = await reponse.json();
            loadWorks(works)}
        catch (error) { 
            console.log( ` Il y a eu une erreur lors du chargement des projets réalisé par Sophie: ${error} `
            );    
        }
    }

    function loadWorks(works) {
        for (let i=0; i < works.length; i++) {
            const work = works[i];

            const workImg = document.createElement("img");
            workImg.src = work.imageUrl;
            workImg.alt = work.title;

            const workTitle = document.createElement("figcaption");
            workTitle.innerText = work.title;

            const workFigure = document.createElement("figure");
            workFigure.appendChild(workImg);
            workFigure.appendChild(workTitle);
            
            
            const sectionCards = document.querySelector(".gallery");
            sectionCards.appendChild(workFigure);
            
        }

    }

 

    async function fetchCat() {
        try {
            const catResponse = await fetch(api + 'categories');
            const categories = await catResponse.json(); 
            loadFilter(categories);
               
        } catch (error) {
            console.log(`Il y a eu une erreur lors du chargement des filtres: ${error}`);
                
        }
    }
                
    function loadFilter(categories) {
        const buttonSection = document.querySelector(".btn.filter");
        buttonSection.innerHTML = "";
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i]; 
            const btn = document.createElement("button"); 
            btn.innerText = category.name;  
            btn.className = "btn filter";
            btn.addEventListener('click', () => {
                filterWorks(category.id);
            });
            buttonSection.appendChild(btn);
        }
    } 

    function filterWorks(categoryId) {
        fetch(api + 'works?categoryId=' + categoryId)
            .then(response => response.json())
            .then(works => loadWorks(works))
            .catch(error => console.log(`Il y a eu une erreur lors du chargement des projets filtrés: ${error}`));
            
    }


function run() {
    fetchWork();
    fetchCat();
    
}    
run(); 



