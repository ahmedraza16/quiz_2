
$(function () {
    loadRecipe();
    $("#recipes").on("click", ".btn-danger", handleDelete);
    $("#recipes").on("click", ".btn-warning", handleUpdate);
    $("#addBtn").click(addRecipe);

    $("#updateSave").click(function(){

        var id = $("updateId").val();
        var title = $("updateTitle").val();
        var body = $("updateBody").val();
        $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/"+id,
        data:{title,body},
        method: "PUT",
        success: function(response){
            loadRecipe();
            $("#updateModal").modal("hide");
        }
        });
    });



    const popupButtons = document.getElementsByClassName('btn');
    const models = document.getElementsByClassName('popup-container');


    const popup = (model) => () => {
        model.classList.add("open");
    };

    const closeModel = (model) => () => {
        model.classList.remove('open');
    };

    popupButtons[0].addEventListener('click', popup(models[0]));


    const closebtn = models[0].children.namedItem('model').children.namedItem('close');
    const backdrop = models[0].children.namedItem('backdrop');
    closebtn.addEventListener('click', closeModel(models[0]));
    backdrop.addEventListener('click', closeModel(models[0]));
    
});




function addRecipe(title, body) {

    var title = $("#title").val();
    var body = $("#body").val();

    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        data: { title, body },
        success: function (response) {
            console.log(response);
            loadRecipe();
        }
    });
}


function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "DELETE",
        success: function () {
            loadRecipe();
        }
    });

}


function handleUpdate() {

    $("#updateModal").modal("show");

    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id,function(response)
    {
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateBody").val(response.body);
        $("#updateModal").modal("show");

    });
}

function loadRecipe() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        success: function (response) {
            console.log(response);
            var recipes = $("#recipes");
            recipes.empty();

            for (var i = 0; i < response.length; i++) {
                var rec = response[i];
                recipes.append(`<div class="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button> <button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.body}</p></div>`);
            }
        }
    });
}


// function handleUpdate() {
//     $("#updateModal").modal("show");
//     var btn = $(this);
//     var parentDiv = btn.closest(".recipe");
//     let id = parentDiv.attr("data-id");

//         $.get("https://usman-recipes.herokuapp.com/api/recipes/"+ id,function(response)
//         {
//             $("#updateId").val(response._id);
//             $("#updateTitle").val(response.title);
//             $("#updateBody").val(response.body);
//             $("#updateModal").modal("show");

//             });
// }









