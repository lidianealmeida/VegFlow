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