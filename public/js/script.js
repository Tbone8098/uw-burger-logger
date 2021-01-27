$(document).ready(function () {
    // get form info
    $('.burgerForm').on("submit", function (e) {
        e.preventDefault()
        let content = $(this[0]).val();
        let newBurger = {
            content: content,
            devoured: false
        }

        console.log(newBurger);

        $.ajax('/api/burgers', {
            type: "POST",
            data: newBurger
        }).then(() => {
            console.log("new burger");
            location.reload()
        })
    })

    // when you click devoure it sets it to true
    $('.devoureBtn').click(function () {
        let id = $(this).data("id")
        let devoured = $(this).data("state")
        if (devoured === 0) {
            devoured = 1
        } else {
            devoured = 0
        }

        $.ajax('/api/burgers/' + id, {
            type: "PUT",
            data: {
                devoured
            }
        }).then(() => {
            location.reload()
        })
    })
})