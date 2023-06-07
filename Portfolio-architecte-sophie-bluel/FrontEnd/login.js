const loginForm = document.createElement("form");
loginForm.classList.add("login");

const loginTitle = document.createElement("h2");
loginTitle.innerText = "Log in";
loginForm.appendChild(loginTitle);

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

const passwordLabel = document.createElement("label");
const passwordLabelText = document.createTextNode("Mot de passe ");
passwordLabel.appendChild(passwordLabelText);
passwordLabel.appendChild(document.createElement("br"));

const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.id = "password";
passwordInput.name = "password";
passwordInput.required = true;
passwordLabel.appendChild(passwordInput);
loginForm.appendChild(passwordLabel);
loginForm.appendChild(document.createElement("br"));

const submitButton = document.createElement("input");
submitButton.type = "submit";
submitButton.value = "Se connecter";

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username == "" || password == "") {
        alert("Merci de renseigner les deux champs");
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
            // window.location.replace('index.html');
        } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect');
        }

        if (localStorage.getItem('token')) {
            window.location.href = "index.html";
        }

    } catch (error) {
        console.error(error);
    }
});

loginForm.appendChild(submitButton);
document.body.appendChild(loginForm);
