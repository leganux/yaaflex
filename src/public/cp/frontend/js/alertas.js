$(document).ready(function () {

    var obtainAlerts = function () {
        $.getJSON('/api/report/', {}, function (data) {
            $('#finizhed_').html('')
            $('#unfinizhed_').html('')
            if (data.success && data.count > 0) {
                $.each(data.data, function (i, item) {
                    var alert = ''

                    if (item.kind == 1) {
                        var postn = item.post.post_EN + ' / ' + item.post.post_ES;
                        var autor = 'ScentJourney'
                        if (item.post.isReply) {
                            postn = item.post.copy_title;
                            autor = item.post.autor.username
                        }

                        alert = '<b> Se reporta post : </b> ' + postn + '<br>' +
                            '<b> Post ID : </b> ' + item.post._id + '<br>' +
                            '<b> Autor : </b> ' + autor + '<br>' +
                            '<b> Motivo : </b> ' + item.motive + '<br>' +
                            '<b> Descripcion : </b> ' + item.description + '<br>' +
                            '<b> Fecha de reporte : </b> ' + item.date_posted
                    }
                    if (item.kind == 2) {
                        var postn = item.comment.post.post_EN + ' / ' + item.comment.post.post_ES;

                        if (item.comment.post.isReply) {
                            postn = item.comment.post.copy_title;

                        }
                        alert = '<b> Se reporta comentario : </b> ' + item.comment.comment + '<br>' +
                            '<b> Comentario ID : </b> ' + item.comment._id + '<br>' +
                            '<b> Post ID : </b> ' + item.comment.post._id + '<br>' +
                            '<b> Post Name : </b> ' + postn + '<br>' +
                            '<b> Autor : </b> ' + item.comment.user.username + '<br>' +
                            '<b> Motivo : </b> ' + item.motive + '<br>' +
                            '<b> Descripcion : </b> ' + item.description + '<br>' +
                            '<b> Fecha de reporte : </b> ' + item.date_posted

                    }
                    if (item.kind == 3) {
                        console.log('ELPOST', item.reply.post)
                        var postn = item.reply.post.post_EN + ' / ' + item.reply.post.post_ES;

                        if (item.reply.post.isReply) {
                            postn = item.reply.post.copy_title;

                        }
                        alert = '<b> Se reporta  respuesta de comentario : </b> ' + item.reply.reply + '<br>' +
                            '<b> respuesta de Comentario ID : </b> ' + item.reply._id + '<br>' +
                            '<b> Comentario ID : </b> ' + item.reply.comment._id + '<br>' +
                            '<b> Comentario  : </b> ' + item.reply.comment.comment + '<br>' +
                            '<b> Post ID : </b> ' + item.reply.post._id + '<br>' +
                            '<b> Post Name : </b> ' + postn + '<br>' +
                            '<b> Autor : </b> ' + item.reply.user.username + '<br>' +
                            '<b> Motivo : </b> ' + item.motive + '<br>' +
                            '<b> Descripcion : </b> ' + item.description + '<br>' +
                            '<b> Fecha de reporte : </b> ' + item.date_posted

                    }
                    if (item.kind == 4) {
                        alert = '<b> Se reporta  usuario : </b> ' + item.user.username + '<br>' +
                            '<b> Usuario ID : </b> ' + item.user._id + '<br>' +
                            '<b> Nombre completo : </b> ' + item.user.full_name + '<br>' +
                            '<b> Motivo : </b> ' + item.motive + '<br>' +
                            '<b> Descripcion : </b> ' + item.description + '<br>' +
                            '<b> Fecha de reporte : </b> ' + item.date_posted
                    }

                    if (item.solved == true) {
                        alert = '<div class="alert alert-success"> ' + alert +
                            '<hr><button value="' + item._id + '" class="btn btn-danger DeleteThis_">Eliminar</button>' +
                            '</div>';
                        $('#finizhed_').append(alert)
                    } else {
                        alert = '<div class="alert alert-danger"> ' + alert +
                            '<hr> <button value="' + item._id + '" class="btn btn-success AtendTHIS">Listo</button>' +
                            '<button value="' + item._id + '" class="btn btn-danger DeleteThis_">Eliminar</button>' +
                            '</div>';
                        $('#unfinizhed_').append(alert)
                    }
                });
            }
        })

    }

    obtainAlerts();


    $(document).on('click', '.DeleteThis_', function () {
        DELETE = $(this).val();
        alertify.confirm('Confirma eliminar', '¿Seguro que desea eliminar este elemento? Esta Accion no tiene retorno.!', function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: "/api/report/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                obtainAlerts();
                alertify.success('Eliminado correctamente // Delete success ')
            }).fail(function (err) {
                HoldOn.close();
                alertify.error('Ocurrio un error  // An error have been ocurred');
                console.error(err);
            });
        }, function () {
            HoldOn.close();
        });

    });

    $(document).on('click', '.AtendTHIS', function () {
        UPDATE = $(this).val();
        alertify.confirm('Confirma finalizar', '¿Seguro que desea finalizar esta alerta? Esta Accion no tiene retorno.!', function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: "/api/report/" + UPDATE,
                method: "PUT",
                data: { solved: true }
            }).done(function (data) {
                HoldOn.close();
                obtainAlerts();
                alertify.success('Actualizado de forma correcta ')
            }).fail(function (err) {
                HoldOn.close();
                alertify.error('Ocurrio un error  // An error have been ocurred');
                console.error(err);
            });
        }, function () {
            HoldOn.close();
        });

    });


    setInterval(() => {
        obtainAlerts();
    }, 1000 * 60 * 1);
});