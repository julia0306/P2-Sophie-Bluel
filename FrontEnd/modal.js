const editorContent=document.querySelectorAll('.editor-content');
console.log(editorContent, 'editor content');
const logoutButton=document.getElementById('logout-btn');
const loginButton=document.getElementById('login-btn');
const userToken=localStorage.getItem('token');
console.log(userToken, 'usertoken')

if (userToken){
    for(let i=0; i<editorContent.length; i++){
    editorContent[i].style.display="inline-flex"};
    loginButton.style.display="none";
    logoutButton.style.display="block";
}


logoutButton.addEventListener('click', function(){
    for(let i=0; i<editorContent.length; i++){
        editorContent[i].style.display="none"};
    console.log('logout clicked');
    localStorage.clear('token');
    loginButton.style.display="block";
    logoutButton.style.display="none";
})


