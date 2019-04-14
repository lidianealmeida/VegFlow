const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(() => {
  getPostFromDB();
  $(".btn-post").click(addPostClick);
  $(".btn-post").click(disableButton); 


  database.ref(`users/${USER_ID}`).once("value")
    .then(snapshot => {
      const userInfo = snapshot.val();
      $(".profile-name").text(userInfo.name);
      $(".profile-user").text(userInfo.email); 
      $(".profile-diet-type").text(userInfo.diet);
    });

  $(".btn-all-posts").click(() => {
    database.ref(`post/${USER_ID}`).once('value')
      .then(snapshot => createPostsList(snapshot));
  });

  $(".btn-filter-private").click(() => { 
    database.ref(`post/${USER_ID}`)
      .orderByChild("type")
      .equalTo("privado")
      .once('value')
      .then(snapshot => createPostsList(snapshot));
  });

  $(".btn-filter-public").click(() => { 
    database.ref(`post/${USER_ID}`)
      .orderByChild("type")
      .equalTo("publico")
      .once('value')
      .then(snapshot => createPostsList(snapshot));
  });
  
  $(".fa-heart").click(() => {
    const like = Number($(this).val()) + 1;
    $(this).val(like);
    $('#likes').html(like);
    $(".fa-heart").removeClass('far').addClass('fas');
  });
  
  const charCounter = $(".character-counter");
  const addNewPost = $(".btn-post");
  const newPost = $(".input-post");
  
  newPost.keydown(startCounting, enableButton);
  newPost.keyup(startCounting);

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
    const charAllowed = 700;
    const typedChar = newPost.val().length;
    let remainingChar = charAllowed - typedChar;
    charCounter.text(remainingChar);
    if (typedChar >= 650 && typedChar <= 700) {
      charCounter.css("color", "orange");
    } else if (typedChar > 700 || typedChar === 0 || !newPost.val().trim()) { 
      disableButton();
      if (typedChar > 700) {
        charCounter.css("color", "red");
      }
    } else {
      charCounter.css("color", "black");  
    }
  }

});

function createPostsList(postsData) {
  $(".post-list").html("");
  postsData.forEach(data => {
    const key = data.key;
    const postData = data.val();
    createPostItem(postData, key);
  });
}
  
function addPostClick (event){
  event.preventDefault();
  const text = $(".input-post").val();
  const optionPrivate = $("#private-options option:selected").val();
  const postFromDB = addPostDB(text, optionPrivate);
  const like = 0;
  createPostItem({text, like}, postFromDB.key)
}

function addPostDB(newPost, optionPrivate){
  return database.ref(`post/${USER_ID}`).push({
   text: newPost,
   like: 0,
   type: optionPrivate
  });  
}

function getPostFromDB (){
  database.ref(`post/${USER_ID}`).once('value')
    .then(snapshot => createPostsList(snapshot));
}

function createPostItem(postData, key){
  $(".input-post").val("");
  $(".post-list").prepend(`
    <div class="post-feed-box-public" data-post-box-public-id=${key}>
    <div data-image-id=${key}>
      <img class="post-feed-image" width="60px" height="60px" src="images/persona.jpg" />
    </div>
    <p>
      <span data-newPost-id="${key}" >${postData.text} </span><br>
      <input type="button" value="Editar" data-edit-id=${key} />
      <input type="button" value="Excluir" data-delete-id=${key} />
      <i data-toggle="modal" class="favorite-modal" data-id=${key} data-target="#favorite-post-modal">
        <i class="fas fa-thumbs-up"></i>
      </i>
      <i data-toggle="modal" class="favorite-count-modal" data-id=${key} data-target="#favorite-count-modal"> ${postData.like}</i>
    <p>
  `);

  $(`input[data-delete-id="${key}"]`).click(() => {
    const confirmDel = confirm("Confirma a exclusão da postagem?")
    if(confirmDel) {
      database.ref(`post/${USER_ID}/${key}`).remove();
      $(this).parent().remove();
      $(`div[data-post-box-public-id="${key}"]`).remove();
    }
  });

  $(`input[data-edit-id="${key}"]`).click(() => {
    const text = prompt(`Altere o seu post: ${text}`);
    $(`span[data-newPost-id=${key}]`).text(text);  
    database.ref(`post/${USER_ID}/${key}`).update({ text });
  });

  $(`.favorite-modal[data-id=${key}]`).click(function fav(){
    const like = parseInt($(`.favorite-count-modal[data-id=${key}]`).html()) + 1;
    $(`.favorite-count-modal[data-id=${key}]` ).html(like);
    database.ref(`post/${USER_ID}/${key}`).update({ like });
  });
}
