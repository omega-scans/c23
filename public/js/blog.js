let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
    if(doc.exists){
        setupBlog(doc.data());
    } else{
        location.replace("/");
    }
})

const setupBlog = (data) => {
    const banner = document.querySelector('.banner1');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    const authoruser = document.querySelector('.authoruser');

    banner.innerHTML = `<img class="bannerimg" src="${data.bannerImage}">`;


    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;
    authoruser.innerHTML += ` - ${data.author}`;
    
    try{
        if(data.author == auth.currentUser.email.split("@")[0]){
            let editbtn = document.querySelector(".editorbtn");
            editbtn.style.display = "block" ;
            editbtn.href = `${blogID}/editor`;
        }
    } catch{
        // nothing here actually
    }

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '/'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '/'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}