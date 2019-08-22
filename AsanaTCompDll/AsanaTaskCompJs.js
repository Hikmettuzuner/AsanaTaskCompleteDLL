$(document).ready(function ($) {
    alert(" AsanaTASKJS ÇALIŞIYOR");

    $("#projectsfor_finish").html('<option value="">İlk Olarak Projenizi Seçiniz</option>');
    $("#tasksfor_finish").html('<option value="">İlk Olarak Projenizi Seçiniz</option>');
    var task_forper;
    var taskid_for;

    var settings = {
        "url": "https://app.asana.com/api/1.0/projects?opt_fields=created_at,modified_at,owner,due_date,current_status,public,name,notes,archived,workspace,color,members,followers",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + someSessionVariable
        },
    };
    $.ajax(settings).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            $("#projectsfor_finish").
                append($("<option value='" + response.data[i].id + "'>" + response.data[i].name + "</option>"));
        }
        okunann = document.getElementById("projectsfor_finish");
        okunann.addEventListener('change', function () {
            $("#tasksfor_finish").empty();
            okunanidd = okunann.options[okunann.selectedIndex].value;

            if (okunanidd == "") {
                $("#tasksfor_finish").html('<option value="-1">Görev Bulunmamaktadır</option>');
            }
            else {
                var settings_test = {
                    "url": "https://app.asana.com/api/1.0/projects/" + okunanidd + "/tasks?opt_fields=id,created_at,modified_at,name,notes,assignee,completed,assignee_status,completed_at,due_on,due_at,projects,memberships,tags,workspace,num_hearts,parent,hearts,followers,hearted&completed_since=2016-10-07T22:54:00.867Z",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": "Bearer " + someSessionVariable
                    },
                };
                $.ajax(settings_test).done(function (response) {
                    if (response.data.length == 0) {
                        $("#tasksfor_finish").html('<option value="-1">Görev Bulunmamaktadır</option>');
                        swal({
                            title: "Oops", text: "Tanımlı Görev Yok!", type:
                                "error"
                        }).then(function () {
                            location.reload();
                        }
                        );
                    }
                    for (var i = 0; i < response.data.length; i++) {

                        $("#tasksfor_finish").append($("<option value='" + response.data[i].id + "'>" + response.data[i].name + "</option>"));
                    }
                    task_forper = document.getElementById("tasksfor_finish");
                    task_forper.addEventListener('change', function () {

                        taskid_for = task_forper.options[task_forper.selectedIndex].value;
                        //console.log(taskid_for);
                    })
                    return 0;
                })
            }
        });
    });
    $("#Btn_task_finish").click(function () {

        a = document.getElementById("tasksfor_finish");
        b = a.options[a.selectedIndex].value;
        if (b == '') {

            swal({
                title: "Oops", text: "Lütfen Görev Seçiniz!", type:
                    "error"
            }).then(function () {
                location.reload();
            }
            );
        }
        //console.log(b);
        var settings_finished = {
            "url": "https://app.asana.com/api/1.0/tasks/" + b + "/?opt_pretty",
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + someSessionVariable
            },
            "data": {
                "completed": "true"
            }
        };
        $.ajax(settings_finished).done(function (response) {
            console.log(response);
            swal({
                title: "Tebrikler", text: "Görev Tamamlandı !", type:
                    "success"
            }).then(function () {
                location.reload();
            }
            );
        });
    }); //btn_task_finish Bitiyor
});