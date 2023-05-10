


        
        const api = "http://localhost:5678/api/";
        let currentCategoryId = null;
        let token = localStorage.getItem('token');

        async function fetchWork() {
        try {
                const response = await fetch(api + "works");
                const works = await response.json();
                loadWorks(works);
        } catch (error) {
                console.log(`Il y a eu une erreur lors du chargement des projets réalisés par Sophie: ${error}`);
        }
        }

        function loadWorks(works) {
        const sectionCards = document.querySelector(".gallery");
        sectionCards.innerHTML = "";

        for (let i = 0; i < works.length; i++) {
                 work = works[i];

            if (currentCategoryId == null || work.categoryId == currentCategoryId) {
                const workImg = document.createElement("img");
                workImg.src = work.imageUrl;
                workImg.alt = work.title;

                const workTitle = document.createElement("figcaption");
                workTitle.innerText = work.title;

                const workFigure = document.createElement("figure");
                workFigure.appendChild(workImg);
                workFigure.appendChild(workTitle);

                sectionCards.appendChild(workFigure);
                }
        }
        console.log(works);
        }

        async function fetchCategories() {
        try {
                const response = await fetch(api + "categories");
                const categories = await response.json();
                loadFilters(categories);
        } catch (error) {
                console.log(`Il y a eu une erreur lors du chargement des catégories: ${error}`);
        }
        }

        function loadFilters(categories) {
               
                if (token != null) {
                        return false ; 
                }else{
                const buttonSection = document.querySelector(".btn.filter");
                buttonSection.innerHTML = "";

                const allBtn = document.createElement("button");
                allBtn.innerText = "Tous";
                allBtn.className = "btn filter";
                allBtn.addEventListener("click", () => {
                    currentCategoryId = null;
                    fetchWork();
        });
                buttonSection.appendChild(allBtn);

        for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const btn = document.createElement("button");
                btn.innerText = category.name;
                btn.className = "btn filter";
                btn.addEventListener("click", () => {
                currentCategoryId = category.id;
                fetchWorksByCategory(category.id);
                });
                buttonSection.appendChild(btn);
        }
        }
}

        async function fetchWorksByCategory(categoryId) {
        try {
                const response = await fetch(api + "works?categoryId=" + categoryId);
                const works = await response.json();
                loadWorks(works);
        } catch (error) {
                console.log(`Il y a eu une erreur lors du chargement des projets filtrés: ${error}`);
        }
        }

        
        function displayHandband() {
                const header = document.querySelector('header');
               // let token = localStorage.getItem('token');
                if (token != null) {
                  const bandeau = document.createElement('div');
                  bandeau.classList.add('bandeau-gestion');
              
                  
                  const boutonEdition = document.createElement('button');
                  boutonEdition.innerText = 'Mode édition';
                  bandeau.appendChild(boutonEdition);
              
                 
                  const boutonPublier = document.createElement('button');
                  boutonPublier.innerText = 'Publier les changements';
                  bandeau.appendChild(boutonPublier);
              

                  header.prepend(bandeau);
                }
              }
  

                        function displayButtonMod() {
                        const portfolio = document.querySelector("#portfolio");
                        if (token != null) {
                        const title = portfolio.querySelector("h2");
                        const titleWrapper = document.createElement("div");
                        titleWrapper.classList.add("title-wrapper");
                        portfolio.insertBefore(titleWrapper, title);
                        titleWrapper.appendChild(title);

                        const travMod = document.createElement("button");
                        travMod.innerText = "Modifier";
                        titleWrapper.appendChild(travMod);
                        } else {
                        return false;
                        }
                        }

              // localStorage.clear();
                 

            function run() {
            fetchWork();
            fetchCategories();
            displayHandband();
            displayButtonMod();
            }

            run();
 
