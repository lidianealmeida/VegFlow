var database = firebase.database();
var USER_ID = window.location.search.match(/\?id=(.*)/);

$(document).ready(function () {

  database.ref("/post/" + USER_ID).once('value')
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        $(".post-list").append(`
                <p>
                    <span> ${childData.text} </span><br>
                <input type="button" value="Excluir Post" data-post-id=${childKey} />
                <p> `);

        $(`input[data-post-id="${childKey}"]`).click(function () {
          database.ref("/post/" + USER_ID + "/" + childKey).remove();
          $(this).parent().remove();
        });
      });

      $(".btn-post").click(function (event) {
        event.preventDefault();
        let newPost = $(".input-post").val();
        let postfromDB = database.ref("post/" + USER_ID).push({
          text: newPost,
        });

        $(".post-list").append(`
   <p>
    <span> ${newPost} </span><br>
   <input type="button" value="Excluir Post"data-post-id=${postfromDB.key} />
   <p>`);


// function removepost() {
//   $(`input[data-post-id="${postfromDB.key}"]`).click;
//     database.ref("/post/" + USER_ID + "/" + postfromDB.key).remove();
//     $(this).parent().remove();
 
// }

        $(`input[data-post-id="${postfromDB.key}"]`).click(function () {
          database.ref("/post/" + USER_ID + "/" + postfromDB.key).remove();
          $(this).parent().remove();
        });
      });
    })
  })

//   document.getElementsByClassName
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


// function showTime() {
//   var mydate = new Date();
//   var hours = mydate.getHours(); 
//   var minutes = mydate.getMinutes();
//   var formatMinutes = (minutes < 10 ) ? "0" + minutes : minutes;
//   var tweetTime = (hours >= 12) ? hours + ":" + formatMinutes + " PM" : hours + ":" + formatMinutes + " AM";
//   return tweetTime;
// }
