var database = firebase.database(); 

$(document).ready(function () {

  $("#btn-cadastrar").click(function (event) {
    event.preventDefault();
    var name = $(".sign-name").val(); 
    var email = $(".sign-email").val();
    var password = $(".sign-password").val(); 
    var diet = $(".sign-diet").val(); 

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response){
    var userId = response.user.uid;
    writeUserData(userId, name, email,diet);
    redirect(userId);
  })
   .catch(function (error) {
    errorMessage(error); 
    });
  })

  $(".btn-login").click(function (event) {
    event.preventDefault();
    var email = $(".sign-email-login").val();
    var password = $(".sign-password-login").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (response) {
        var userId = response.user.uid;
        redirect(userId);
      })

      .catch(function (error) {
        errorMessage(error); 
      });
  })

  $(".sign-google").click(function (event) {
    event.preventDefault();
    console.log("aqui");
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      var userId = result.user;
      redirect(userId);
    })

      .catch(function (error) {

        errorMessage(error); 
      });
  });

  $(".btn-signout").click(function (event) {
    event.preventDefault();
    firebase.auth().signOut()
      .then(function () {
        window.location = "index.html";
      })
      .catch(function (error) {
        errorMessage(error); 

      });
  });
});

  function writeUserData(userId, name, email, diet) {
    database.ref('users/' + userId).set({
      name: name,
      email: email,
      diet: diet
    });
  }

  function redirect(userId){
    window.location = "main.html?id=" + userId;
  }

  function errorMessage(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode,errorMessage);
  }







