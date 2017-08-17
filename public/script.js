function onLoad() {
    console.log ("loaded");
    if (CookieName(document.cookie) == 'loginCookie') {
        //hide login
        document.getElementById('login').style = "display: none";
        //show  menu screen
        document.getElementById('content').style = "display: block";
        // showing updated tv list
        getTVShowsList();
    }

    $.ajaxSetup({
        // if receiving status 500, tell user to register first
        error: function(x, e) {
            if (x.status == 500) {
                alert('Make sure to register first.');
            }
        }
    });
}

function CookieName(cookie){
    return cookie.substring(0, cookie.indexOf('='));
}

// login username/password
function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    $.ajax({
        url:'/login/'+username+'/'+password,
        type: "POST",
        data: {"user": username, "pass": password},
        success: function(data){
            if(data.message === "success"){
                //hide login
                document.getElementById('login').style = "display: none";
                //show  menu screen
                document.getElementById('content').style = "display: block";
                // show logout button
                $(".logout-button")[0].style = "visibility: visible"
                // showing updated tv list
                getTVShowsList();
            } else {
                alert(data.message);
            }
        }
    });
}

// register username/password
function register(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    $.post('/register/'+username+'/'+password, {user: username, pass: password}, function(data){
        if(data.message === "success"){
            alert("you did it!")
        }
        else{
            alert(data.message);
        }
    });
};

function logout() {
    console.log("logged out");
    //hide login
    document.getElementById('content').style = "display: none";
    //show  menu screen
    document.getElementById('login').style = "display: block";
    // hide logout button
    $(".logout-button")[0].style = "visibility: hidden"


}

// add tv show
function addTVShow(){
    var tvShow = document.getElementById("add-tv-show").value;
    //create a post request
    $.post('/item', {tvShow: {"name": tvShow}}, function(data){
        if(data.message === "success"){
            // showing updated tv list
            getTVShowsList();
        }
        else{
            alert(data.message);
        }
    });
};

// get tv shows list
function getTVShowsList(){
    $.get('/items', function(data){
        if(data.message === "success"){
            // Erasing all entries in list to prevent appending twice rendered entries
            $(".tv-show-entry").remove();
            var tvShows = document.getElementById("items")
            // iterating over all items and adding to list
            data.list.forEach(function (item) {
                var entry = jQuery('<tr id="' + item.id + '"class="tv-show-entry">' + '<td>'+item.name+'</td><td>' + item.id+ '</td></tr>');
                tvShows.append(entry[0]);
            });
        } else {
            alert(data.message);
        }
    });
}

// delete tv shows list
function deleteTVShow(){
    var id = document.getElementById("delete-tv-show-by-id").value;

    //create a delete request
    $.ajax({
        url:'/item/'+id,
        type: "DELETE",
        success: function(data){
            if(data.message === "success"){
                // showing updated tv list
                getTVShowsList();
            }
            else{
                alert(data.message);
            }
        }
    });
};


// find tv shows by id
function findTVShow(){
    var id = document.getElementById("find-tv-show-by-id").value;
    //create a post request
    $.get('/item/'+id, function(data){
        if(data.message === "success"){
            // showing updated tv list
            getTVShowsList();
            alert("TV show: " + data.name);
        }
        else{
            alert(data.message);
        }
    });
}

// edit tv shows by id
function editTVShow(){
    var name = document.getElementById("edit-tv-show-name").value;
    var id = document.getElementById("edit-tv-show-id").value;
    $.ajax({
        url:'/item',
        type: "PUT",
        data: {"name": name, "id":id},
        success: function(data){
            if(data.message === "success"){
                getTVShowsList();
            } else {
                alert(data.message);
            }
        }
    });
}
