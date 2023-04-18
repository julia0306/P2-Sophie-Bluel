// Je génère un formulaire de connexion fonctionnel
const loginForm=document.querySelector(".login-form");

        // Je crée un eventListener pour écouter l'événement 'submit'
loginForm.addEventListener('submit', async function(e){
    e.preventDefault();
    let user={
        email:document.querySelector("[name=email]").value,
        password: document.querySelector("[name=password]").value}

        // J'envoie les données à l'API
    await fetch('http://localhost:5678/api/users/login',{
            "method":'POST',
            "headers":{"Content-Type" : "application/json"},
            "body": JSON.stringify(user),
        })
        // Je traite la réponse, en fonction de son statut
        // Je préviens l'utilisateur en cas de combinaison fausse
        .then ((response)=>{
            if(response.ok){
            return response.json()
            }
            else{
                showRedWarning()
            }
        })

        // Je redirige l'utilisateur vers la page d'accueil en m'assurant que la configuration est maintenue
        .then((response) => {
            localStorage.setItem('token', response.token);
            const userToken=localStorage.getItem('token');
            if (userToken){
                window.location.replace("./index.html")
            }
        })
})


// LES FONCTIONS UTILISEES : //

                /**showRedWarning permet d'afficher un message d'erreur en cas de formulaire mal renseigné */
                function showRedWarning(){
                const redWarning=document.querySelector(".red-warning")
                redWarning.classList.add("visible-items")
                redWarning.classList.remove("invisble-items")
                }

