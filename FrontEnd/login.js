// Je génère un formulaire de connexion fonctionnel

const loginForm=document.querySelector(".login-form");

        // Je crée un eventListener pour écouter l'événement 'submit'
loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    let user={
        email:document.querySelector("[name=email]").value,
        password: document.querySelector("[name=password]").value}
    console.log(user,'user');

        // J'envoie les données à l'API
    fetch('http://localhost:5678/api/users/login',{
            "method":'POST',
            "headers":{"Content-Type" : "application/json"},
            "body": JSON.stringify(user),
        })
        // Je traite la réponse, en fonction de son statut
        // Je préviens l'utilisateur en cas de combinaison fausse
        .then ((response)=>{
            if(response.status === 401){
                alert("Erreur dans l\’identifiant ou le mot de passe")}
            if(response.status === 404){
                alert("Erreur dans l\’identifiant ou le mot de passe")}
            if(response.status === 200){
            return response.json()
            }})
        // Je redirige l'utilisateur vers la page d'accueil en m'assurant que la configuration est maintenue

        .then((user) => {
            localStorage.setItem('token', user.token);
            const userToken=localStorage.getItem('token');
            if (userToken){
                console.log('user connected'),
                window.location.replace("./index.html")
            }
        })
        .catch(function(error) {
            console.log(error, 'error')})

})