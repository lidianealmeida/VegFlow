var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/);

$(document).ready(function () {

  getPostFromDB();
  $(".btn-post").click(addPostClick);
  });

// Inicia a função pegando os valores ao click do botão postar
function addPostClick (event){
    event.preventDefault();
    let newPost = $(".input-post").val();
    let postFromDB = addPostDB(newPost);
      
    createListPost(newPost, postFromDB.key)
}

// Adicionar novo post ao database
function addPostDB(newPost){
  return database.ref("post/" + USER_ID).push({
    // name: ???????
    text: newPost
  });  
}

// Adicionar novo user ao database
function getPostFromDB (){
  database.ref("/post/" + USER_ID).once('value')
  .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
       createListPost(childData.text, childKey ) 
       });
      });
}

// Adiciona lista de post e inclui botão editar e excluir
function createListPost(newPost, key){
  $(".input-post").val("");
  $(".post-list").append(`

  <div class="post-feed-box-public" data-post-box-public-id=${key}>
  <div data-image-id=${key}>
    <img class="post-feed-image" width="60px" height="60px" src="images/persona.jpg" />
  </div>

  
  <p>
  <span data-newPost-id="${key}" >${newPost} </span><br>
  <input type="button" value="Editar" data-edit-id=${key} />
  <input type="button" value="Excluir" data-delete-id=${key} />
  <p>`);

    $(`input[data-delete-id="${key}"]`).click(function () {
      database.ref("/post/" + USER_ID + "/" + key).remove();
      $(this).parent().remove();
      $(`div[data-post-box-public-id="${key}"]`).remove();
    });

    $(`input[data-edit-id="${key}"]`).click(function () {
    const newText = prompt(`Altere o seu post: ${newPost}`);
    $(`span[data-newPost-id=${key}]`).text(newText);  
    database.ref("/post/" + USER_ID + "/" + key).update({
      text: newText
    })
   });
  }

    // Confirmação de excluir
  // document.getElementsByClassName
  //   function myFunction() {
  //     var txt;
  //     var r = confirm("Press a button!");
  //     if (r == true) {
  //       txt = "You pressed OK!";
  //     } else {
  //       txt = "You pressed Cancel!";
  //     }
  //     document.getElementById("demo").innerHTML = txt;
  //   }
  

// Configurações da textarea e contador de caracteres 
const charCounter = $(".character-counter");
const addNewPost = $(".btn-post");
const newPost = $(".input-post");

newPost.keydown(startCounting, enableButton);
newPost.keyup(startCounting);

// Habilitar e desabilitar botão publicar
function enableButton() {
  addNewPost.prop("disabled", false);
  addNewPost.css("cursor", "pointer");
  addNewPost.css("opacity", "1");
}

function disableButton() {
  addNewPost.css("cursor", "not-allowed");
  addNewPost.prop("disabled", true);  
}

// Alteração cor contador e ajuste dimensões textarea
function startCounting() {
  const charAllowed = 140;
  const typedChar = newPost.val().length;
  let remainingChar = charAllowed - typedChar;
  charCounter.text(remainingChar);
  if (typedChar >= 130 && typedChar <= 140) {
    charCounter.css("color", "orange");
  } else if (typedChar > 140 || typedChar === 0 || !newPost.val().trim()) { 
    disableButton();
    if (typedChar > 140) {
      charCounter.css("color", "red");
    }
  } else {
    charCounter.css("color", "black");  
  }
  const lines = newPost.val().split("\n");
  const linesSize = lines.map(x => Math.max(1, Math.ceil(x.length / 38)));
  newPost.attr("rows", linesSize.reduce((acum, index) => acum + index));
}


