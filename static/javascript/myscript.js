let ajaxreq = null;
let user_x = 0,
  user_y = 0;
let dest_x, dest_y, max_chances;
function process() {
  console.log("in process");
  ajaxreq = new XMLHttpRequest();
  ajaxreq.onreadystatechange = result;
  ajaxreq.open("GET", "/getsecretdestination", true);
  ajaxreq.send(null);
}
function result() {
  if (ajaxreq.readyState == 4) {
    let obj = JSON.parse(ajaxreq.responseText);
    dest_x = obj.dest_x;
    dest_y = obj.dest_y;
    console.log(dest_x + "," + dest_y);
    let secret = document.getElementById("secret");
    secret.innerHTML = "<center><h1>SECRET DESTINATION GENERATED<h1><center>";
  }
}
function move() {
  let direction = 0,
    length = 0;
  if (document.getElementById("up").checked) {
    direction = 1;
  } else if (document.getElementById("right").checked) {
    direction = 2;
  } else if (document.getElementById("down").checked) {
    direction = 3;
  } else if (document.getElementById("left").checked) {
    direction = 4;
  }
  length = Number(document.getElementById("length").value);
  let ajaxreq2 = new XMLHttpRequest();
  ajaxreq2.onreadystatechange = () => {
    if (ajaxreq2.readyState == 4) {
      let obj = JSON.parse(ajaxreq2.responseText);
      user_x = obj["updated_userx"];
      user_y = obj["updated_usery"];
      user = document.getElementById("user");
      user.innerHTML = `<center><h1>YOUR CURRENT LOCATION IS (${user_x},${user_y})<h1></center>`;
      let x_reached = obj["x_reached"];
      let y_reached = obj["y_reached"];
      console.log(
        `x reached=${obj["x_reached"]},y reached=${obj["y_reached"]},userx=${obj["updated_userx"]},usery=${obj["updated_usery"]},in js file userx=${user_x},usery=${user_y}`
      );
      let ansx = document.getElementById("ansx");
      let ansy = document.getElementById("ansy");
      let finalresult = document.getElementById("finalresult");
      if (x_reached == 1 && y_reached == 1) {
        finalresult.innerHTML =
          "<center><h1>CONGRATULATIONS! YOU HAVE REACHED THE DESTINATION<h1></center>";
        ansx.innerHTML = "";
        ansy.innerHTML = "";
      } else if (x_reached == 1) {
        ansx.innerHTML = "<center><h1>GREAT X CO-ORDINATE LOCATED<h1></center>";
        ansx.innerHTML = "";
      } else if (y_reached == 1) {
        ansy.innerHTML = "<center><h1>GREAT Y CO-ORDINATE LOCATED<h1></center>";
        ansx.innerHTML = "";
      }
      if (x_reached == 0) {
        ansx.innerHTML =
          "<center><h1>YOUR X CO-ORDINATE IS LESS THAN THE DESTINATION X CO-ORDINATE<h1></center>";
      }
      if (y_reached == 0) {
        ansy.innerHTML =
          "<center><h1>YOUR Y CO-ORDINATE IS LESS THAN THE DESTINATION Y CO-ORDINATE<h1></center>";
        ansx.innerHTML = "";
      }
      if (x_reached == 2) {
        ansx.innerHTML =
          "<center><h1>OOPS YOU NEED TO GO BACK YOU HAVE CROSSED THE DESTINATION X CO-ORDINATE<h1></center>";
        ansx.innerHTML = "";
      }
      if (y_reached == 2) {
        ansy.innerHTML =
          "<center><h1>OOPS YOU NEED TO GO BACK YOU HAVE CROSSED THE DESTINATION Y CO-ORDINATE<h1></center>";
        ansx.innerHTML = "";
      }
    }
  };
  ajaxreq2.open(
    "GET",
    "/getuserlocation?direction=" +
      direction +
      "&length=" +
      length +
      "&destx=" +
      dest_x +
      "&desty=" +
      dest_y +
      "&userx=" +
      user_x +
      "&usery=" +
      user_y,
    true
  );
  // ajaxreq2.setRequestHeader(
  //   "content-type",
  //   "application/x-www-form-urlencoded",
  //   "X-CSRFToken",
  //   { csrf_token }
  // );
  ajaxreq2.send(null);
}
