
// Je génère un formulaire de connexion fonctionnel


const loginForm=document.querySelector(".login-form");
loginForm.addEventListener("submit", async function(e){
    e.preventDefault();
    let user={
        email:document.querySelector("[name=email]").value,
        password: document.querySelector("[name=password]").value,} 
    console.log(user,'user');
    async function fetchUsers (){
        const r =await fetch('http://localhost:5678/api/users/login',{
            "method":'POST',
            "headers":{"Content-Type" : "application/json"},
            "body": JSON.stringify(user),
        });
        if (r.ok ===true){
            return r.json();
        }
        throw new Error('Erreur dans l’identifiant ou le mot de passe');
    }
    fetchUsers().then(users=>console.log(users))
})


