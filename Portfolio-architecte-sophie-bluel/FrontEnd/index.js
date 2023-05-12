


        
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
                        travMod.addEventListener("click", openModal);
                        } else {
                        return false;
                        }
                        }
                        function openModal() {
                                const modal = document.createElement("div");
                                modal.classList.add("modal");
                                
                                const modalContent = document.createElement("div");
                                modalContent.classList.add("modal-content");
                                
                                const modalHeader = document.createElement("div");
                                modalHeader.classList.add("modal-header");
                                
                                const modalTitle = document.createElement("h2");
                                modalTitle.innerText = "Galeries photos";
                                modalHeader.appendChild(modalTitle);
                                
                                const modalClose = document.createElement("span");
                                modalClose.classList.add("modal-close");
                                modalClose.innerHTML = "&times;";
                                modalHeader.appendChild(modalClose);
                                
                                modalContent.appendChild(modalHeader);
                                
                                const modalBody = document.createElement("div");
                                modalBody.classList.add("modal-body"); 

                                
                                const modalFooter = document.createElement("div");
                                modalFooter.classList.add("modal-footer");
                              
                                const addPhotoButton = document.createElement("button");
                                addPhotoButton.innerText = "Ajouter une photo";
                                modalFooter.appendChild(addPhotoButton);
                                
                                const deleteGalleryLink = document.createElement("a");
                                deleteGalleryLink.href = "#";
                                deleteGalleryLink.innerText = "Supprimer la galerie";
                                modalFooter.appendChild(deleteGalleryLink);
                              
                                modalContent.appendChild(modalBody);
                                modalContent.appendChild(modalFooter);
                                
                                modal.appendChild(modalContent);
                                
                                document.body.appendChild(modal);
                                
                                
                                // Fonction pour afficher la modal
                                function displayModal() {
                                  modal.style.display = "block";
                                }
                                
                                // Fonction pour cacher la modal
                                function closeModal() {
                                  modal.style.display = "none";
                                }
                                
                                // Ajout d'un événement pour fermer la modal en cliquant sur le bouton de fermeture
                                modalClose.addEventListener("click", closeModal);
                                
                                // Ajout d'un événement pour fermer la modal en cliquant en dehors de la modal
                                window.addEventListener("click", (event) => {
                                  if (event.target == modal) {
                                    closeModal();
                                  }
                                });
                                
                                // Utilisation de la fonction displayModal pour afficher la modal
                                displayModal();
                              }

                              async function fetchWorkModal() {
                                try {
                                        const response = await fetch(api + "works");
                                        const works = await response.json();
                                        loadWorksModal(works);
                                } catch (error) {
                                        console.log(`Il y a eu une erreur lors du chargement des projets réalisés par Sophie: ${error}`);
                                }
                                }

                                function loadWorksModal(works) {
                                        const sectionCardsModal = document.querySelector("modal-body");
                                       // sectionCardsModal.innerHTML = "";
                                
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
                                
                                                sectionCardsModal.appendChild(workFigure);
                                                }
                                        }
                                        console.log(works);
                                        }
                         
                              
                              

              // localStorage.clear();
                 

            function run() {
            fetchWork();
            fetchCategories();
            displayHandband();
            displayButtonMod();
            fetchWorkModal();
            }

            run();
 