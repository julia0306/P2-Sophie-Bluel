
// Je génère un formulaire de connexion fonctionnel


const loginForm=document.querySelector(".login-form");
loginForm.addEventListener("submit",function(e){
    e.preventDefault();
    let user={
        email:document.querySelector("[name=email]").value,
        password: document.querySelector("[name=password]").value,} 
    console.log(user,'user');
    fetch('http://localhost:5678/api/users/login',{
        "method":'POST',
        "headers":{"Content-Type" : "application/json"},
        "body": JSON.stringify(user),
    });}
.then(response=>response.json()))
.then(json=>console.log(json))
.catch(error=>console.log(error))

