let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector(".login");
const blogSection = document.querySelector(".blog-section");

auth.onAuthStateChanged((user) => {
  if (user) {
    login.style.display = "none";
    getUserWrittenBlogs();
  } else {
    setupLoginButton();
  }
})

const setupLoginButton = () => {
  ui.start("#loginbtn" , {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectURL) {
        login.style.display = "none";
        return false;
      }
    },
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
  })
}
// setupLoginButton();

// to show author's blogs

const getUserWrittenBlogs = () => {
  db.collection("blogs").where("author", "==", auth.currentUser.email.split("@")[0])
  .get()
  .then((blogs) => {
      blogs.forEach((blog) => {
        createBlogs(blog);
      });
    })
    .catch((error) => {
      console.log("error fetching blogs");
    })
}


const createBlogs = (blog) => {
  let data = blog.data();
  blogSection.innerHTML += `
  <div class="blog-card">
      <img src="${data.bannerImage}" class="blog-image" alt="">
      <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
      <p class="blog-overview">${data.article.substring(0, 100) + '...'}</p>
      <a href="/${blog.id}" class="btn dark">read</a>
      <a href="/${blog.id}/editor" class="btn dark">edit</a>
      <!--<a href="/"  class="btn dark delete">delete</a>-->
  </div>
  ` ;
}

// const deleteBlog = (id) => {
//   db.collection("blogs").doc(id).remove().then(()=>{
//     location.reload();
//   })
// }