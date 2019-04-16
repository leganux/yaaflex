const PbyCharge = 4;
var Page = 0;
var nomore = false;
var PostOrigin = -1;
var medals = []
var start = true;




$(document).ready(function () {


    

    $('#CancelReportuser').click(function () {
        $('#myDataModalReportUser').modal('hide');
    })

    $('#SendReportuser').click(function () {

        if ($('#complementReportUSER').val() == '') {
            return 0;
        }
        var data = {
            description: $('#complementReportUSER').val(),
        }

        if ($('#ResportUSERSelect_').val() == -1) {
            return 0;
        }
        data.motive = $('#ResportUSERSelect_').val();
        data.user = SJ_PROFILE_ID;
        data.kind = 4;

        $.post('/api/report/', data, function (data) {
            if (data.success) {
                $('#myDataModalReportUser').modal('hide');
                setTimeout(function () {
                    $('#ThnksNotify').modal('show');
                }, 500)
            }
        }).fail(function (err) {
            console.error(err);
        })
    })

    //cerrar modal de  reporte
    $('#CloseThanks').click(function () {
        $('#ThnksNotify').modal('hide');
    })

    $('#SendRquest').click(function () {
        if ($('#RequestSelect_').val() == '-1') {
            return 0;
        }
        if ($('#complementRequest').val() == '') {
            return 0;
        }
        var kind = $('#RequestSelect_').val();
        var DSC = $('#complementRequest').val();
        var html = '<br>El usuario con el ID : <b>' + SJ_SESSION._id + '</b><br>Solicita la creacion o cambio del elemento de tipo <b>' + kind + '</b><br> <b>Descripcion del usuario :</b>  <br>' + DSC;

        $.post('/api/email', {
            "to": SJ_NOTIF_MAIL,
            "subject": 'ScentJourney - Notificación de solicitud de requerimiento',
            "text": html,
        }, function (data) {
            if (data.success) {
                $('#ThnksNotifyRequest').modal('show');
                alertT_(7, SJ_SESSION._id, SJ_POST_USER._id, html)
            }
            $('#myDataModalRequest').modal('hide');
        }).fail(function (err) {
            console.error(err)
            $('#myDataModalRequest').modal('hide');
        })


    })

    $('#SJ_WhantAnewElement_').click(function () {
        $('#myDataModalRequest').modal('show');
        $('#RequestSelect_').val('-1');
        $('#complementRequest').val('');
    })
    $('#CancelRequest').click(function () {
        $('#myDataModalRequest').modal('hide');
    })
    $('#CloseThanksRequest').click(function () {
        $('#ThnksNotifyRequest').modal('hide');
    })


    if (SJ_PROFILE_ID == SJ_SESSION._id && SJ_SESSION.rieviewer == true) {
        $('#levantRequest_').show();
    }

    $.contextMenu({
        selector: '#AccionesDenunciaUser',
        trigger: 'left',
        callback: function (key, options) {
            var url = window.location;
            var uri = encodeURI(url)
            if (key == 'shareFB') {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + uri);
            }
            if (key == 'shareTW') {
                window.open('https://twitter.com/intent/tweet?url=' + uri + '&via=ScentJourney');
            }
            if (key == 'reportPost') {
                $('#myDataModalReportUser').modal('show');
            }
        },
        items: {
            "shareFB": { name: SJ_LANG.txt_share_on_fb, icon: "fab fa-facebook " },
            "shareTW": { name: SJ_LANG.txt_share_on_tw, icon: "fab fa-twitter" },
            "sep1": "---------",
            "reportPost": { name: SJ_LANG.txt_report_user, icon: "fas fa-bug" },
        }
    });

    $(window).scroll(function () {
        const offset = 200;
        if ($(window).scrollTop() + $(window).height() > $(document).height() - offset) {
            Page++;
            traePost(true);
        }
    });

    var traePost = function (isAppend) {
        if (nomore) {
            return 0;
        }

        $.ajax({
            url: "/api/post",
            dataType: 'json',
            data: {
                strictsearch: { autor: SJ_PROFILE_ID },
                "sort": { "dte_reg": "desc" },
                "search": { "isReply": true, active: true },
                "paginate": { "page": Page, "limit": PbyCharge },


            }
        }).done(function (data) {
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    if (!isAppend) {
                        $('#SpaceToADD_').html('');
                    }
                    $.each(data.data, function (i, item) {
                        var img = item.thumbnail
                        var ico = '';
                        var URLico = '';
                        if (item.origin === 3) {
                            img = item.product.img_url
                        }
                        switch (item.origin) {
                            case 1:
                                ico = '<i class="fab fa-instagram"></i>'
                                URLico = item.social_url;
                                break;
                            case 2:
                                ico = '<i class="fab fa-youtube"></i>'
                                URLico = item.social_url;
                                break;
                            case 3:
                                ico = '<i class="fab fa-facebook-square"></i>'
                                URLico = item.social_url;
                                break;

                            default:
                                ico = '<i class="far fa-image"></i>'
                                URLico = '/post/' + item._id;
                                break;

                        }

                        var btnEdit = '';
                        var btnDelete = '';
                        if (SJ_PROFILE_ID && SJ_SESSION && SJ_SESSION._id == SJ_PROFILE_ID) {
                            btnEdit = '<button value="' + item._id + '" class="btn btn-outline-primary btn-sm  _editSdataPost_">' + SJ_LANG.txt_edit_post + '</button>';
                            btnDelete = '<button value="' + item._id + '" class="btn btn-outline-primary btn-sm  _deleteSdataPost_">' + SJ_LANG.txt_delete_post + '</button>';
                        }

                        var Cntnt = '<div class="card border-light mb-3">' +
                            '<div class="card-header">' +
                            '<div class="row">' +
                            '<div class="col-sm-10">' +
                            '</div><div class="col-sm-2 ">' +
                            '<p class="noMargin" align="right">' +
                            '<a target="_blank" href="' + URLico + '">' + ico + '</a>' +
                            '</p></div></div></div>' +
                            '<div class="card-body"><div class="row">' +
                            '<div class="col-sm-12 col-md-3 lnx_content_eqlzr">' +
                            ' <a href="/post/' + item._id + '"><img id="EqualizeThis_' + item._id + '" src="' + img + '" class="lnx_eqlzr-square image " /></a>' +
                            '</div>' +
                            '<div class="col-sm-12 col-md-9"><br><br><h4 class="card-title">' + item.copy_title + '</h4>' +
                            '<p class="card-text">' +
                            item.copy.substring(0, 333) + '...' +
                            '</p> <hr class="noMargin"><br>' +
                            '<a href="/post/' + item._id + '"><button class="btn  btn-outline-primary btn-sm float-right">' + SJ_LANG.txt_see + '</button></a>' +
                            btnEdit +
                            btnDelete +

                            '</div></div></div ></div > ';


                        $('#SpaceToADD_').append(Cntnt);
                        llamaEqualizer('#EqualizeThis_' + item._id);

                    });

                } else {
                    nomore = true;
                }

            }

        }).fail(function (err) {
            console.error(err);
        });
    }


    const Base_URL = '/api/cat/'
    const CatCountries = Base_URL + 'getCountry'
    const CatStates = Base_URL + 'getState'
    var iFollowThis = false;

    var selecTEXT = 'Select one...';
    if (GlobalLang == 'ES') {
        selecTEXT = 'Selecciona uno ...';
    }

    $('#EditMyProfile_').click(function () {
        $('#ModalProfileEdit_').modal('show')
    });

    $('#MEditUserCountry_').change(function () {
        var country_id = $(this).val();


        $.getJSON(CatStates, { country_id }, function (data) {
            if (data.success && data.count > 0) {
                $('#MEditUserState_').html('<option>' + selecTEXT + '</>');
                $.each(data.data, function (i, item) {
                    $('#MEditUserState_').append('<option value ="' + item.id + '">' + item.name + '</option>');
                    if (SJ_SESSION.state) {
                        $('#MEditUserState_').val(SJ_SESSION.state);
                    }

                });
            }
        });

    });
    function llama_estados() {
        var country_id = $('#MEditUserCountry_').val();


        $.getJSON(CatStates, { country_id }, function (data) {
            if (data.success && data.count > 0) {
                $('#MEditUserState_').html('<option>' + selecTEXT + '</>');
                $.each(data.data, function (i, item) {
                    $('#MEditUserState_').append('<option value ="' + item.id + '">' + item.name + '</option>');
                    if (SJ_SESSION.state) {
                        $('#MEditUserState_').val(SJ_SESSION.state);
                    }

                });
            }
        });

    };


    $.getJSON(CatCountries, {}, function (data) {
        if (data.success && data.count > 0) {
            $('#MEditUserCountry_').html('<option>' + selecTEXT + '</>');
            $.each(data.data, function (i, item) {
                $('#MEditUserCountry_').append('<option value ="' + item.id + '">' + item.name + '</option>');
            });
            if (SJ_SESSION.country) {
                $('#MEditUserCountry_').val(SJ_SESSION.country);
            }
            if (SJ_SESSION.state) {
                llama_estados();
            }

        }
    });

    // verifica usuario username
    $('#MEditUsername_').keyup(function () {
        var user = $(this).val()
        $.ajax({
            url: "/api/user",
            dataType: 'json',
            data: {
                "strictsearch": { "username": user },
                "select": { "username": 0 },
            }
        }).done(function (data) {
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    $('#MBTNSaveUsername_').prop('disabled', true)
                } else {
                    $('#MBTNSaveUsername_').prop('disabled', false)
                }
            }
        }).fail(function (err) {
            console.error(err);
        });
    });

    // Guarda usuario username
    $('#MBTNSaveUsername_').click(function () {
        var user = $(MEditUsername_).val()
        $.ajax({
            url: "/api/user/" + SJ_PROFILE_ID,
            method: 'PUT',
            dataType: 'json',
            data: {
                username: user, isNonUserEdited: '0'
            }
        }).done(function (data) {
            if (data.success == true) {
                CallAlert(SJ_LANG.txt_message, SJ_LANG.txt_login_again)
                setTimeout(function () { location.href = '/logout'; }, 3000)
            }
        }).fail(function (err) {
            console.error(err);
        });
    });


    $('#MBTNCancel_').click(function () {

        $('#ModalProfileEdit_').modal('hide')
    });

    // Guarda usuario perfil

    $('#MBTNSave_').click(function () {
        if ($('#MEditUserCountry_').val() == -1 || $('#MEditUserState_').val() == -1 || $('#MEditDefaultLang_').val() == -1 || $('#MEditGender_').val() == -1) {
            $('#ModalProfileEdit_').modal('hide');
            CallAlert(SJ_LANG.txt_error, SJ_LANG.txt_fill_all)
            return 0;
        }

        $.ajax({
            url: "/api/user/" + SJ_PROFILE_ID,
            method: 'PUT',
            dataType: 'json',
            data: {
                email: $('#MEditEmail_').val(),
                provider_picture: $('#MEditUserImageSave_').val(),
                full_name: $('#MEditFullname_').val(),
                gender: $('#MEditGender_').val(),
                lang: $('#MEditDefaultLang_').val(),
                age: $('#MEditUserAge_').val(),
                phone: $('#MEditUserPhone_').val(),
                cellphone: $('#MEditUserCellphone_').val(),
                bio: $('#MEditUserBio_').val(),
                country: $('#MEditUserCountry_').val(),
                state: $('#MEditUserState_').val(),
                city: $('#MEditUserCity_').val(),
                adress: $('#MEditUserAdress_').val(),
                zip_code: $('#MEditUserCP_').val(),
                facebook_uri: $('#MEditUserFacebook_').val(),
                instagram_uri: $('#MEditUserInstagram_').val(),
                twitter_uri: $('#MEditUserTwitter_').val(),
                youtube_uri: $('#MEditUserYoutube_').val(),
            }
        }).done(function (data) {
            if (data.success == true) {
                CallAlert(SJ_LANG.txt_message, SJ_LANG.txt_login_again)
                setTimeout(function () { location.href = '/logout'; }, 3000)

            }
        }).fail(function (err) {
            console.error(err);
        });
    });


    // uploadImage
    $('#MEditUserImage_').change(function () {
        if (ValidateFile($(this))) {

            var data = new FormData();
            data.append('User_' + SJ_PROFILE_ID + '_', $('#MEditUserImage_')[0].files[0]);
            $.ajax({
                url: '/upload/image',
                data: data,
                contentType: false,
                processData: false,
                method: 'POST',
                success: function (data) {

                    if (data.success) {
                        $('#MEditUserImageSave_').val(data.file);
                    }
                },
                error: function (err) {
                    console.error(err);
                }
            });
        }
    })


    $('#MEditGender_').val(SJ_SESSION.gender);
    $('#MEditDefaultLang_').val(SJ_SESSION.lang);
    $('#MEditUserBio_').val(SJ_SESSION.bio);


    // followsAndFollowersFunctions

    var callFollowsNFollowers = function () {
        $('#Followers_m_space_').html('');
        $('#Following_m_space_').html('');
        $.getJSON('/api/actions/following/' + SJ_PROFILE_ID, {}, function (data) {
            if (start) {
                $.each(medals, function (i, item) {
                    if (item.trigger == 4 && (data.count >= item.trigger_min)) {
                        pintamedalla(i);
                    };
                });
            }

            if (data.success && data.count > 0) {
                $('#NoFollowing').html('&nbsp; <strong>' + data.count + '</strong> ' + SJ_LANG.txt_following);



                $.each(data.data, function (i, item) {
                    var elem = item.user_id;
                    var lineaSocial = '';




                    if (elem.facebook_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.facebook_uri + '" target="_blank"><i class="fab fa-facebook"></i></a>'
                    }
                    if (elem.instagram_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.instagram_uri + '" target="_blank"><i class="fab fa-instagram"></i></a>'
                    }
                    if (elem.twitter_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.twitter_uri + '" target="_blank"><i class="fab fa-twitter"></i></a>'
                    }
                    if (elem.youtube_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.youtube_uri + '" target="_blank"><i class="fab fa-youtube"></i></a>'
                    }

                    $('#Following_m_space_').append('<div class="row">' +
                        '<div class="col-sm-4">' +
                        '<p align="right"><img width="75px" src="' + elem.provider_picture + '" class="img img-fluid img-round img-thumbnail" ></p>' +
                        '<p align="right">' + lineaSocial + '</p>' +
                        '</div>' +
                        '<div class="col-sm-8">' +
                        '<a href="/profile/' + elem._id + '"><h5> ' + elem.full_name + ' </h5><p>@' + elem.username + ' </p> <button class="btn btn-outline-primary btn-sm btn-block">' + SJ_LANG.txt_see + '</button></a>' +
                        '</div>' +
                        '</div><hr>');
                })
            }
        });

        $.getJSON('/api/actions/followers/' + SJ_PROFILE_ID, {}, function (data) {

            if (start) {
                $.each(medals, function (i, item) {
                    if (item.trigger == 5 && (data.count >= item.trigger_min)) {
                        pintamedalla(i);
                    };
                });
            }


            if (data.success && data.count > 0) {


                $('#NoFollowers').html('&nbsp; <strong>' + data.data[0].followers.length + '</strong> ' + SJ_LANG.txt_followers);

                $.each(data.data[0].followers, function (i, item) {
                    var elem = item;
                    var lineaSocial = '';
                    if (elem.facebook_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.facebook_uri + '" target="_blank"><i class="fab fa-facebook"></i></a>'
                    }
                    if (elem.instagram_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.instagram_uri + '" target="_blank"><i class="fab fa-instagram"></i></a>'
                    }
                    if (elem.twitter_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.twitter_uri + '" target="_blank"><i class="fab fa-twitter"></i></a>'
                    }
                    if (elem.youtube_uri) {
                        lineaSocial = lineaSocial + '<a href="' + elem.youtube_uri + '" target="_blank"><i class="fab fa-youtube"></i></a>'
                    }
                    $('#Followers_m_space_').append('<div class="row">' +
                        '<div class="col-sm-4">' +
                        '<p align="right"><img width="75px" src="' + elem.provider_picture + '" class="img img-fluid img-round img-thumbnail" ></p>' +
                        '<p align="right">' + lineaSocial + '</p>' +
                        '</div>' +
                        '<div class="col-sm-8">' +
                        '<a href="/profile/' + elem._id + '"><h5> ' + elem.full_name + ' </h5><p>@' + elem.username + ' </p> <button class="btn btn-outline-primary btn-sm btn-block">' + SJ_LANG.txt_see + '</button> </a>' +


                        '</div>' +
                        '</div><hr>');

                    if (SJ_SESSION && SJ_SESSION._id == elem._id) {
                        iFollowThis = true;
                        $('#FollowPerson_').html('<i class="far fa-times-circle"></i><small>' + SJ_LANG.txt_unfollow + '</small></i>');
                    }
                });
            }
        });

    }

    $('#FollowPerson_').click(function () {

        var url = '/api/actions/follow'
        if (iFollowThis) {
            url = '/api/actions/unfollow'
        }
        var data = {
            "loguser": SJ_SESSION._id,
            "to_follow": SJ_PROFILE_ID
        }
        $.post(url, data, function (data) {
            start = false;
            if (data.success) {
                if (iFollowThis) {
                    iFollowThis = false;
                    $('#FollowPerson_').html('<i class="far fa-check-circle"></i></i><small>' + SJ_LANG.txt_follow + '</small></i>');
                } else {
                    iFollowThis = true;
                    $('#FollowPerson_').html('<i class="far fa-times-circle"></i><small>' + SJ_LANG.txt_unfollow + '</small></i>');

                    alertT_(3, SJ_SESSION._id, SJ_PROFILE_ID, false)
                }
                callFollowsNFollowers();
            }
        })

    })



    $('#NoFollowers').click(function () {
        $('#ModalFollowers_').modal('show')
    });
    $('#NoFollowing').click(function () {
        $('#ModalFollowing_').modal('show')
    });

    var SJ_FE_ = false;
    $(document).on('click', '._editSdataPost_', function () {

        var value = $(this).val();
        SJ_FE_ = value;
        $.getJSON('/api/post/' + value, {}, function (data) {
            if (data.success) {
                info = data.data;
                $('#i_post_title').val(info.copy_title)
                $('#i_post_description').val(info.copy)
                $('#ModalEDIT_').modal('show');
            }
        });
    });


    $('#MBTNSaveEdit_').click(function () {
        var title = $('#i_post_title').val()
        var description = $('#i_post_description').val()
        $.ajax({
            method: 'PUT',
            url: '/api/post/' + SJ_FE_,
            data: { copy_title: title, copy: description }
        }).done(function (data) {
            if (data.success) {
                location.reload();
            }
        }).fail(function (err) {
            alertInModal(SJ_LANG.error_default);
            console.error(err)
        });

    })
    $('#MBTNSaveDelete_').click(function () {

        $.ajax({
            method: 'DELETE',
            url: '/api/post/' + SJ_FE_,

        }).done(function (data) {
            if (data.success) {
                location.reload();
            }
        }).fail(function (err) {

            console.error(err)
        });

    })


    $(document).on('click', '._deleteSdataPost_', function () {
        $('#ModalDeleteS_').modal('show');
        var value = $(this).val();
        SJ_FE_ = value;
    });



    $('#MBTNCancelEdit_').click(function () {
        $('#ModalEDIT_').modal('hide');

    })

    $('#MBTNCancelDelete_').click(function () {
        $('#ModalDeleteS_').modal('show');
    })

    var pintamedalla = function (pos) {
        var name_ = medals[pos].medal_EN
        var desc_ = medals[pos].description_EN
        if (GlobalLang == 'ES') {
            name_ = medals[pos].medal_ES
            desc_ = medals[pos].description_ES
        }
        $('#row4MEDALS').append('<div class="col-sm-6"><center>' +
            '<img width="35px" class="img img-fluid" src="' + medals[pos].img_url + '">' +
            '<h5>' + name_ + '</h5>' +
            '<small>' + desc_ + '</small>' +
            '</center></div>');
    }

    $.get('/api/medal', {}, function (data) {
        if (data.success) {
            medals = data.data;
        }
        $('#row4MEDALS').html('');
        callFollowsNFollowers();
        traePost();
        callComments();
        $.ajax({
            url: "/api/post",
            dataType: 'json',
            data: {
                strictsearch: { autor: SJ_PROFILE_ID },
                "sort": { "dte_reg": "desc" },
                "search": { "isReply": true, active: true },
            }
        }).done(function (data) {
            $('#NoPost').html('&nbsp; <strong>' + data.count + '</strong> ' + SJ_LANG.txt_posts);

            $.each(medals, function (i, item) {
                console.log('each ', i, item)
                if (item.trigger == 1 && (data.count >= item.trigger_min)) {

                    pintamedalla(i);
                };
            });
        }).fail();
    }).fail(function () {
        callFollowsNFollowers();
        traePost();
        $.ajax({
            url: "/api/post",
            dataType: 'json',
            data: {
                strictsearch: { autor: SJ_PROFILE_ID },
                "sort": { "dte_reg": "desc" },
                "search": { "isReply": true, active: true },
            }
        }).done(function (data) {
            $('#NoPost').html('&nbsp; <strong>' + data.count + '</strong> ' + SJ_LANG.txt_posts);
        }).fail(function (err) {
            console.error(err)
        });
    });

    var callComments = function () {
        $.get('/api/comment', {
            strictsearch: {
                user: SJ_PROFILE_ID
            }
        }, function (data) {
            $.each(medals, function (i, item) {
                if (item.trigger == 2 && (data.count >= item.trigger_min)) {
                    pintamedalla(i);
                };
            });

        });
    }


    $.getJSON('/api/medalsbyuser', {
        strictsearch: {
            user: SJ_PROFILE_ID
        }
    }, function (datas) {
        if (datas.success) {
            $.each(datas.data, function (i, item) {

                var name_ = item.medal.medal_EN
                var desc_ = item.medal.description_EN
                if (GlobalLang == 'ES') {
                    name_ = item.medal.medal_ES
                    desc_ = item.medal.description_ES
                }

                $('#row4MEDALS').append('<div class="col-sm-6"><center>' +
                    '<img width="35px" class="img img-fluid" src="' + item.medal.img_url + '">' +
                    '<h5>' + name_ + '</h5>' +
                    '<small>' + desc_ + '</small>' +
                    '</center></div>');


            })
        }
    });





});
