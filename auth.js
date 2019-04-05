
$(document).ready(function () {

  $(".btn-cadastrar").click(function (event) {
    event.preventDefault();
    let email = $(".sign-email").val();
    let password = $(".sign-password").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log(response.user.uid);
        window.location = "main.html?id=" + response.user.uid;
      })

      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage)
      });
  })

  $(".btn-login").click(function (event) {
    event.preventDefault();
    let email = $(".sign-email").val();
    let password = $(".sign-password").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (response) {
        window.location = "main.html?id=" + response.user.uid;
      })

      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  })

  $(".sign-google").click(function (event) {
    event.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      window.location = "main.html?id=" + user.uid;
    })

      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        alert(errorMessage);
      });
  });

  $(".sign-face").click(function (event) {
    event.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      window.location = "main.html?id=" + user.uid;

    }).catch(function (error) {

      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      alert(errorMessage);
    });
  });

  $(".btn-signout").click(function (event) {
    event.preventDefault();
    firebase.auth().signOut()
      .then(function () {
        window.location = "index.html";
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(error.message);
      });
  });

})





