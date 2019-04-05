var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/);

$(document).ready(function () {
  database.ref("/post/" + USER_ID).once('value')
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        var childStatus = childData.status; 
        firebaseBank(childKey,childData, childStatus ); 
      });

    /* $(".filter-post-public").click(function(){
           database.ref("/post/" + USER_ID).once('value')
          .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              var childKey = childSnapshot.key;
               var childData = childSnapshot.val();
             var childStatus = childData.status; 
             var filterTrue = childData.filter(post => post.status == true);
        firebaseBank(filterTrue ); 
      });
      })*/
      
    function firebaseBank(childKey,childData, childStatus ){
        $(".post-list").prepend(`
          <p>
            <span> ${childData.text} </span><br>
            <span> ${childStatus} </span><br>
            <input type="button" value="Excluir Post" data-post-id=${childKey} />
          <p> `);

        $(`input[data-post-id="${childKey}"]`).click(function () {
          database.ref("/post/" + USER_ID + "/" + childKey).remove();
          $(this).parent().remove();
        });
      }



      $(".btn-post").click(function (event) {
        event.preventDefault();
        let newPost = $(".input-post").val();
        let toggle = $(".togle-post").prop('checked');
        let postfromDB = database.ref("post/" + USER_ID).push({
          text: newPost,
          status: toggle,
        });

        $(".post-list").prepend(`
          <p>
            <span> ${newPost} </span><br>
            <span> ${toggle} </span><br>
            <input type="button" value="Excluir Post"data-post-id=${postfromDB.key} />
          <p>`);
        $(`input[data-post-id="${postfromDB.key}"]`).click(function () {
          database.ref("/post/" + USER_ID + "/" + postfromDB.key).remove();
          $(this).parent().remove();
        });
      });
    })

  document.getElementsByClassName
  function myFunction() {
    var txt;
    var r = confirm("Press a button!");
    if (r == true) {
      txt = "You pressed OK!";
    } else {
      txt = "You pressed Cancel!";
    }
    document.getElementById("demo").innerHTML = txt;
  }
})
