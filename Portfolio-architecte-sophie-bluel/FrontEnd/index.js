


        
        const api = "http://localhost:5678/api/";
        let currentCategoryId = null;
        let token = localStorage.getItem('token');
        let fileInput ;
        let titleInput; 
        let categorySelect; 
        

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
                const buttonSection = document.querySelector(".btn-filters");
                buttonSection.innerHTML = "";

                const allBtn = document.createElement("button");
                allBtn.innerText = "Tous";
                allBtn.className = "btn-filter";
                allBtn.addEventListener("click", () => {
                    currentCategoryId = null;
                    fetchWork();
        });
                buttonSection.appendChild(allBtn);

        for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const btn = document.createElement("button");
                btn.innerText = category.name;
                btn.className = "btn-filter";
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
              
                if (token != null) {
                  const bandeau = document.createElement('div');
                  bandeau.classList.add('bandeau-gestion');
              
                  const lienEdition = document.createElement('a');
                  lienEdition.href = '#';
                  lienEdition.innerText = 'Mode édition';

                 
              
                  const iconeModifier = document.createElement('i');
                  iconeModifier.classList.add('fas', 'fa-pencil-alt'); // Remplacez 'fa-pencil-alt' par la classe de l'icône souhaitée
              
                  lienEdition.appendChild(iconeModifier);
                  bandeau.appendChild(lienEdition);
              
                  const boutonPublier = document.createElement('button');
                  boutonPublier.innerText = 'Publier les changements';
                  boutonPublier.classList.add('btn-gestion');
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
              
                  const travMod = document.createElement("a");
                  travMod.href = "#";
                  travMod.innerText = "Modifier";
              
                  const iconModifier = document.createElement("i");
                  iconModifier.classList.add("fa-thin", "fa-pen-to-square"); // Remplacez 'fa-pencil' par la classe de l'icône souhaitée
              
                  travMod.appendChild(iconModifier);
                  titleWrapper.appendChild(travMod);
              
                  travMod.addEventListener("click", () => {
                    openModal();
                    fetchWorkModal(); // Appel de la fonction fetchWorkModal lors du clic sur le lien "Modifier"
                  });
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
                                addPhotoButton.classList.add("btn-modal");
                                modalFooter.appendChild(addPhotoButton);
                                addPhotoButton.addEventListener("click", openAddPhotoModal);

                                
                                const deleteGalleryLink = document.createElement("a");
                                deleteGalleryLink.href = "#";
                                deleteGalleryLink.innerText = "Supprimer la galerie";
                                modalFooter.appendChild(deleteGalleryLink);
                              
                                modalContent.appendChild(modalBody);
                                modalContent.appendChild(modalFooter);
                                
                                modal.appendChild(modalContent);
                                
                                document.body.appendChild(modal);
                                
                                
                                
                                function displayModal() {
                                  modal.style.display = "block";
                                }
                                
                               
                                function closeModal() {
                                        const modal = document.querySelector(".modal");
                                        modal.parentNode.removeChild(modal);
                                      }
                                
                                modalClose.addEventListener("click", closeModal);
                                
                               
                                window.addEventListener("click", (event) => {
                                  if (event.target == modal) {
                                    closeModal();
                                  }
                                });
                                
                               
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
                                // function loadWorksModal(works) {
                                //         const sectionCardsModal = document.querySelector(".modal-body");
                                //         sectionCardsModal.innerHTML = "";
                                    
                                //         for (let i = 0; i < works.length; i++) {
                                //             const work = works[i];
                                    
                                //             if (currentCategoryId == null || work.categoryId == currentCategoryId) {
                                //                 const workFigure = document.createElement("figure");
                                    
                                //                 const workImg = document.createElement("img");
                                //                 workImg.src = work.imageUrl;
                                //                 workImg.alt = work.title;
                                    
                                //                 const workTitle = document.createElement("figcaption");
                                //                 workTitle.innerText = "éditer";
                                    
                                //                 const deleteIcon = document.createElement("i");
                                //                 deleteIcon.classList.add("fa-solid", "fa-trash-can");
                                //                 deleteIcon.addEventListener("click", () => {
                                //                     deleteWork(work.id); // Appel de la fonction pour supprimer le travail
                                //                 });
                                    
                                //                 workFigure.appendChild(workImg);  
                                //                 workFigure.appendChild(workTitle);
                                //                 workFigure.appendChild(deleteIcon);
                                    
                                //                 sectionCardsModal.appendChild(workFigure);
                                //             }
                                //         }
                                //         console.log(works);
                                //     }

                                function loadWorksModal(works) {
                                        const sectionCardsModal = document.querySelector(".modal-body");
                                        sectionCardsModal.innerHTML = "";
                                      
                                        for (let i = 0; i < works.length; i++) {
                                          const work = works[i];
                                      
                                          if (currentCategoryId == null || work.categoryId == currentCategoryId) {
                                            const workFigure = document.createElement("figure");
                                      
                                            const deleteIcon = document.createElement("i");
                                            deleteIcon.classList.add("fa-solid", "fa-trash-can");
                                            deleteIcon.addEventListener("click", () => {
                                              deleteWork(work.id); // Appel de la fonction pour supprimer le travail
                                            });
                                            workFigure.appendChild(deleteIcon);
                                      
                                            const workImg = document.createElement("img");
                                            workImg.src = work.imageUrl;
                                            workImg.alt = work.title;
                                      
                                            const workTitle = document.createElement("figcaption");
                                            workTitle.innerText = "éditer";
                                      
                                            workFigure.appendChild(workImg);
                                            workFigure.appendChild(workTitle);
                                      
                                            sectionCardsModal.appendChild(workFigure);
                                          }
                                        }
                                        console.log(works);
                                      }
                                      
                                    

                                        async function fetchCategoriesModal() {
                                                try {
                                                    const response = await fetch(api + "categories");
                                                    const categories = await response.json();
                                                    return categories;
                                                } catch (error) {
                                                    console.log(`Il y a eu une erreur lors du chargement des catégories: ${error}`);
                                                }
                                            }
                                            function openAddPhotoModal() {
                                                const addPhotoModal = document.createElement("div");
                                                addPhotoModal.classList.add("modal-add");
                                              
                                                const addPhotoModalContent = document.createElement("div");
                                                addPhotoModalContent.classList.add("modal-content-add");
                                              
                                                const addPhotoModalHeader = document.createElement("div");
                                                addPhotoModalHeader.classList.add("modal-header");
                                              
                                                const addPhotoModalTitle = document.createElement("h2");
                                                addPhotoModalTitle.innerText = "Ajout photo";
                                                addPhotoModalHeader.appendChild(addPhotoModalTitle);
                                              
                                                const addPhotoModalClose = document.createElement("span");
                                                addPhotoModalClose.classList.add("modal-close");
                                                addPhotoModalClose.innerHTML = "&times;";
                                                addPhotoModalHeader.appendChild(addPhotoModalClose);
                                              
                                                addPhotoModalContent.appendChild(addPhotoModalHeader);
                                              
                                                const addPhotoModalBody = document.createElement("div");
                                                addPhotoModalBody.classList.add("modal-body-add");
                                              
                                                fileInput = document.createElement("input");
                                                fileInput.type = "file";
                                                fileInput.accept = "image/jpeg, image/png";
                                                fileInput.maxSize = 1 * 1024 * 1024; // 4MB max
                                                fileInput.style.display = "none";
                                              
                                                const addPhotoButtonWrapper = document.createElement("div");
                                                addPhotoButtonWrapper.classList.add("add-photo-button-wrapper");
                                              
                                                const addPhotoIcon = document.createElement("i");
                                                addPhotoIcon.classList.add("fa-regular", "fa-image");
                                                addPhotoButtonWrapper.appendChild(addPhotoIcon);
                                              
                                                const customFileButton = document.createElement("button");
                                                customFileButton.innerText = "+ Ajouter une photo";
                                                customFileButton.classList.add("btn-add");
                                                customFileButton.addEventListener("click", () => {
                                                  fileInput.click(); 
                                                });
                                              
                                                const fileFormatText = document.createElement("div");
                                                fileFormatText.innerText = "jpg, png : 4mo max";
                                                fileFormatText.classList.add("file-format-text");
                                              
                                                addPhotoButtonWrapper.appendChild(addPhotoIcon);
                                                addPhotoButtonWrapper.appendChild(customFileButton);
                                                addPhotoButtonWrapper.appendChild(fileFormatText);
                                              
                                                addPhotoModalBody.appendChild(addPhotoButtonWrapper);
                                                addPhotoModalBody.appendChild(fileInput);
                                              
                                                const previewImage = document.createElement("img");
                                                previewImage.classList.add("preview-image");
                                                addPhotoModalBody.appendChild(previewImage);
                                              
                                                const titleInputLabel = document.createElement("label");
                                                titleInputLabel.innerText = "Titre";
                                              
                                                 titleInput = document.createElement("input");
                                                titleInput.type = "text";
                                                titleInput.placeholder = "Titre de la photo";
                                                addPhotoModalBody.appendChild(titleInputLabel);
                                                addPhotoModalBody.appendChild(titleInput);
                                              
                                                const categoryInputLabel = document.createElement("label");
                                                categoryInputLabel.innerText = "Catégorie";
                                              
                                                categorySelect = document.createElement("select");
                                                categorySelect.name = "category";
                                                categorySelect.id = "category";
                                                // Remplir les options du select avec les catégories disponibles
                                                fetchCategoriesModal().then(categories => {
                                                  categories.forEach(category => {
                                                    const option = document.createElement("option");
                                                    option.value = category.id;
                                                    option.text = category.name;
                                                    categorySelect.appendChild(option);
                                                  });
                                                });
                                                addPhotoModalBody.appendChild(categoryInputLabel);
                                                addPhotoModalBody.appendChild(categorySelect);
                                              
                                                const hr = document.createElement("hr");
                                                addPhotoModalBody.appendChild(hr);
                                              
                                                addPhotoModalContent.appendChild(addPhotoModalBody);
                                              
                                                const addPhotoModalFooter = document.createElement("div");
                                                addPhotoModalFooter.classList.add("modal-footer");
                                              
                                                const savePhotoButton = document.createElement("button");
                                                savePhotoButton.innerText = "Valider";
                                                savePhotoButton.classList.add("btn-add");
                                                savePhotoButton.addEventListener("click", savePhoto);
                                                addPhotoModalFooter.appendChild(savePhotoButton);
                                              
                                                addPhotoModalContent.appendChild(addPhotoModalFooter);
                                              
                                                addPhotoModal.appendChild(addPhotoModalContent);
                                              
                                                document.body.appendChild(addPhotoModal);
                                              
                                                addPhotoModalClose.addEventListener("click", () => {
                                                  addPhotoModal.parentNode.removeChild(addPhotoModal);
                                                });
                                              
                                                fileInput.addEventListener("change", handleFileSelection);
                                              
                                             
                                                function handleFileSelection(event) {
                                                        const file = event.target.files[0];
                                                        const reader = new FileReader();
                                                      
                                                        reader.onload = function (event) {
                                                          const base64Image = event.target.result;
                                                          previewImage.src = base64Image;
                                                        };
                                                      
                                                        reader.readAsDataURL(file);
                                                      
                                                        // Mettre à jour l'aperçu de la photo dans add-photo-button-wrapper
                                                        const addPhotoButtonWrapper = document.querySelector(".add-photo-button-wrapper");
                                                        addPhotoButtonWrapper.innerHTML = ""; // Effacer le contenu existant
                                                        addPhotoButtonWrapper.appendChild(previewImage);
                                                      }
                                                      
                                              }
                                              
                                              
                                            
                                                
                                            
                                                function savePhoto() {
                                                    const file = fileInput.files[0];
                                                    const title = titleInput.value;
                                                    const categoryId = categorySelect.value;
                                            
                                                   
                                                        const formData = new FormData();
                                                        formData.append("title", title);
                                                        formData.append("image", file, title);                                             
                                                        formData.append("category", categoryId);
                                            
                                                        if (token != null) {
                                                                async function uploadPhoto() {
                                                                        try {
                                                                          const response = await fetch(api + "works", {
                                                                            method: "POST",
                                                                            body: formData,
                                                                            headers: {
                                                                                Accept: "application/json",
                                                                                Authorization: "Bearer " + token,
                                                                              },
                                                                          });
                                                                          
                                                                          if (!response.ok) {
                                                                            throw new Error("Erreur lors de l'envoi de la photo : " + response.status);
                                                                          }
                                                                      
                                                                          const data = await response.json();
                                                                          console.log("Photo envoyée avec succès :", data);
                                                                        } catch (error) {
                                                                          console.error("Erreur lors de l'envoi de la photo :", error);
                                                                        }
                                                                      }
                                                                      console.log(file);
                                                                      
                                                                      
                                                                      uploadPhoto();
                                                                        
                                                                      
                                                        }
                                                    };
                                                    
                                                    
                                                
                                            
                                            
                                            
                                            function deleteWork(workId) {
                                                if (token != null) {
                                                    fetch(api + "works/" + workId, {
                                                        method: "DELETE",
                                                        headers: {
                                                            "Authorization": "Bearer " + token
                                                        }
                                                    })
                                                    .then(response => {
                                                        if (response.ok) {
                                                            console.log("Travail supprimé avec succès.");
                                                           
                                                            fetchWorkModal();
                                                        } else {
                                                            console.error("Erreur lors de la suppression du travail.");
                                                        }
                                                    })
                                                    .catch(error => {
                                                        console.error("Erreur lors de la suppression du travail :", error);
                                                    });
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
 