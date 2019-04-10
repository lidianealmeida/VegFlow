var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function () {
  getPostFromDB();
  $(".btn-post").click(addPostClick);
  $(".btn-post").click(disableButton); 


  database.ref("users/"+ USER_ID).once("value")
  .then(function(snapshot){
    var userInfo = snapshot.val();
    $(".profile-name").text(userInfo.name);
    $(".profile-user").text(userInfo.email); 
    $(".profile-diet-type").text(userInfo.diet);
});

$(".btn-all-posts").click(function(){
  database.ref("/post/" + USER_ID).once('value')
    .then(function (snapshot) {
      $(".post-list").html("");
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
     createListPost(childData.text, childKey, childData.like ) 
    })
  });
});

$(".btn-filter-private").click(function(){ 
  database.ref("/post/" + USER_ID).orderByChild("type").equalTo("privado")
    .once('value', function (snapshot){
      $(".post-list").html("");
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
      createListPost(childData.text, childKey, childData.like )
    });
  });
})

$(".btn-filter-public").click(function(){ 
  database.ref("/post/" + USER_ID).orderByChild("type").equalTo("publico")
    .once('value', function (snapshot){
      $(".post-list").html("");
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
      createListPost(childData.text, childKey, childData.like )
    });
  });
})
})

// Inicia a função pegando os valores ao click do botão postar
function addPostClick (event){
    event.preventDefault();
    var newPost = $(".input-post").val();
    var optionPrivate = $("#private-options option:selected").val();
    var postFromDB = addPostDB(newPost,optionPrivate);
    var likeInitial = 0;

    createListPost(newPost, postFromDB.key,likeInitial)
}

// Adicionar novo post ao database
function addPostDB(newPost,optionPrivate){
  return database.ref("post/" + USER_ID).push({
    text: newPost,
    like: 0,
    type: optionPrivate
  });  
}

// Adicionar novo user ao database
function getPostFromDB (){
  database.ref("/post/" + USER_ID).once('value')
  .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      createListPost(childData.text, childKey, childData.like )
       });
      });
}
// Adiciona lista de post e inclui botão editar e excluir
  function createListPost(newPost, key,likeInitial){

    $(".input-post").val("");
    $(".post-list").append(`
  
    <div class="post-feed-box-public border mt-3" data-post-box-public-id=${key}>
    <div data-image-id=${key}>
      <img class="post-feed-image" width="60px" height="60px" src="images/persona.jpg" />
    </div>
  
    
    <p>
    <span data-newPost-id="${key}" >${newPost} </span><br>
    <input type="button" class="btn-light" value="Editar" data-edit-id=${key} />
    <input type="button" class="btn-light" value="Excluir" data-delete-id=${key} />
   
    <i data-toggle="modal" class="favorite-modal" data-id=${key} data-target="#favorite-post-modal"> 
    <i class="fas fa-thumbs-up"></i>    
    </i>
    <i data-toggle="modal" class="favorite-count-modal" data-id=${key} data-target="#favorite-count-modal"> ${likeInitial}</i>
     
    <p>`);
  
      $(`input[data-delete-id="${key}"]`).click(function () {
        let confirmDel = confirm("Confirma a exclusão da postagem?")
        if(confirmDel){
        database.ref("/post/" + USER_ID + "/" + key).remove();
        $(this).parent().remove();
        $(`div[data-post-box-public-id="${key}"]`).remove();
        }
      });
  
      $(`input[data-edit-id="${key}"]`).click(function () {
      const newText = prompt(`Altere o seu post: ${newPost}`);
      $(`span[data-newPost-id=${key}]`).text(newText);  
      database.ref("/post/" + USER_ID + "/" + key).update({
        text: newText
      })
     });
  
     $(`.favorite-modal[data-id=${key}]`).click(function fav(){
      let favNum = $(`.favorite-count-modal[data-id=${key}]`).html();
      favNum = parseInt(favNum)+1;
      $(`.favorite-count-modal[data-id=${key}]` ).html(favNum);
      database.ref("/post/" + USER_ID + "/" + key ).update({like: favNum });
    });
   
  }

// Botão like
function likePost() {
  let heartIcon = $(".fa-heart");
  heartIcon.click(function () {
    let curtidas = $(this)

    curtidas.val(Number(curtidas.val()) + 1);
    $(".fa-heart").removeClass('far').addClass('fas');
    console.log(curtidas.val())
    $('#likes').html(curtidas.val())
  })

}
likePost()

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
}