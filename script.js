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
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
  })

  // Botão cadastrar
  $("#exampleLogin").click(function (event) {
    event.preventDefault();
    let email = $("#exampleInputEmail1").val();
    let password = $("#exampleInputPassword1").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function () {
        window.location = "page.html";
      })

      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage)
      });

  });

})