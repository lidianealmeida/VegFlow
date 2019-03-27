// Link cadastar
$(document).ready(function () {

  $("#exampleRegister").click(function (event) {
    event.preventDefault();
    let email = $("#exampleInputEmail1").val();
    let password = $("#exampleInputPassword1").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        window.location = "page.html";
        console.log(response)
      })

      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
  })

  // Botão cadastrar
  $("#btn btn-primary").click(function (event) {
    event.preventDefault();
    let email = $("#exampleInputEmail1").val();
    let password = $("#exampleInputPassword1").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function () {
        window.location = "page.html";
      })

      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });

  });

})

//Botão Google 
$("social-media-google").click(function () {
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

};