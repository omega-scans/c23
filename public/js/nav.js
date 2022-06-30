let lggn = document.querySelector(".userlogin");

auth.onAuthStateChanged((user) => {
if(user){
  lggn.innerHTML += `<a class="mnp" href="/admin" class="">Dashboard</a>
                     <a class="mnp" href="#" onclick="logoutUser()" class="">Logout</a>`;

} else {
    lggn.innerHTML += '<a class="mnp" href="/admin" class="">Login</a>';
}
})
