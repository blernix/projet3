

const loginForm = document.createElement("form"); 

const usernameLabel = document.createElement("label");
const usernameLabelText = document.createTextNode("Nom d'utilisateur: ");
        usernameLabel.appendChild(usernameLabelText);

const usernameInput = document.createElement("input");
        usernameInput.type = "text";
        usernameInput.id = "username";
        usernameInput.name = "username";
        usernameInput.required = true; 
        usernameLabel.appendChild(usernameInput);
        loginForm.appendChild(usernameLabel);
        loginForm.appendChild(document.createElement("br"));

const passwordLabel = document.createElement("label"); 
const passwordLabelText = document.createTextNode("Mot de passe: ");
        passwordLabel.appendChild(passwordLabelText);

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
        submitButton.onclick = function () {
            const username = document.getElementById("username").value; 
            const password = document.getElementById("password").value;

            if ( username == "" || password == "") {
                alert ("Merci de renseigner les deux champs");
                return false;
            }
            if ( username == "sophie.bluel@test.tld" && password == "S0phie") {
                alert ( " Connexion reussi ") 
                return true; 
            } else { 
                alert ( " Nom d'utilisateur ou mot de passe incorrect");
                return false; 
            }
        
            

        };
        loginForm.appendChild(submitButton); 


document.body.appendChild(loginForm);

