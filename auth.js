$(document).ready(function () {
  $("#btn-cadastrar").click(event => {
    event.preventDefault();
    const name = $(".sign-name").val(); 
    const email = $(".sign-email").val();
    const password = $(".sign-password").val(); 
    const diet = $(".sign-diet").val(); 

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const userId = response.user.uid;
        writeUserData(userId, name, email,diet);
        redirect(userId);
      })
      .catch((error) => errorMessage(error));
  });

  $(".btn-login").click(event => {
    event.preventDefault();
    const email = $(".sign-email-login").val();
    const password = $(".sign-password-login").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        const userId = response.user.uid;
        redirect(userId);
      })
      .catch(error => errorMessage(error));
  });

  $(".sign-google").click(event => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const userId = result.user;
        redirect(userId);
      })
      .catch(error => errorMessage(error));
  });

  $(".btn-signout").click(event => {
    event.preventDefault();
    firebase.auth().signOut()
      .then(() => window.location = "index.html")
      .catch(error => errorMessage(error));
  });
});

function writeUserData(userId, name, email, diet) {
  firebase.database().ref('users/' + userId).set({
    name: name,
    email: email,
    diet: diet
  });
}

function redirect(userId){
  window.location = "main.html?id=" + userId;
}

function errorMessage(error){
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorCode,errorMessage);
}
