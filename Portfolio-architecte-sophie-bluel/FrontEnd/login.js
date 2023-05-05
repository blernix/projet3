

    const loginForm = document.createElement("form");  

    const usernameLabel = document.createElement("label");
    const usernameLabelText = document.createTextNode("E-mail ");
          usernameLabel.appendChild(usernameLabelText);
          usernameLabel.appendChild(document.createElement("br"));

    const usernameInput = document.createElement("input");
          usernameInput.type = "text";
          usernameInput.id = "username";
          usernameInput.name = "username";
          usernameInput.required = true; 
          usernameLabel.appendChild(usernameInput);
          loginForm.appendChild(usernameLabel);
          loginForm.appendChild(document.createElement("br"));


    const passwordLabel = document.createElement("label"); 
    const passwordLabelText = document.createTextNode("Mot de passe ");
          passwordLabel.appendChild(passwordLabelText);
          passwordLabel.appendChild(document.createElement("br"));

    const passwordInput = document.createElement("input");
          passwordInput.type = "password";
          passwordInput.id = "password";
          passwordInput.name = "passord";
          passwordInput.required = true; 
          passwordLabel.appendChild(passwordInput);
          loginForm.appendChild(passwordLabel);
          loginForm.appendChild(document.createElement("br"));

    const submitButton = document.createElement("button")
    const submitButtonText = document.createTextNode("Se connecter");
          submitButton.appendChild(submitButtonText);
          submitButton.onclick = async function () {
                const username = document.getElementById("username").value; 
                const password = document.getElementById("password").value;

                if ( username == "" || password == "") {
                    alert ("Merci de renseigner les deux champs");
                    return false;
                }

                try {
                    const data = {
                        email: username,
                        password: password
                    };

                    const response = await fetch("http://localhost:5678/api/users/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    const { token } = await response.json();

                    if (response.ok) {
                        localStorage.setItem('token', token);
                        alert('Connexion réussie');
                        
                    } else {
                        alert('Nom d\'utilisateur ou mot de passe incorrect');
                    }
                } catch (error) {
                    console.error(error);
                }

                return false;
            };

    loginForm.appendChild(submitButton); 
    document.body.appendChild(loginForm);
