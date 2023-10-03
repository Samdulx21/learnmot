

function getListUser()
{
    axios.get('/list/users').then(function(response) {
        // alert(response.data[1].name);
        var jsonData = response.data;

        console.log(jsonData);

        // for (var i = 0; i < jsonData.length; i++) {
        //     console.log("name: " + jsonData[i].name);
        //     console.log("email: " + jsonData[i].email);
        // }
        // document.getElementById("list").innerHTML = jsonData.data[i].name;
    }).catch(function (error) {
        console.log(error);
    });

}
 