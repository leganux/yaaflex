$(document).ready(function () {

    var SaveReply = function (idParent) {
        var alerto = $('#E_Comment_' + idParent).attr('alerto')
        var postID = $('#E_Comment_' + idParent).attr('pid')
        var prodId = $('#E_Comment_' + idParent).attr('prodId')

        var msg = $('#E_Comment_' + idParent).val();

        if (!msg || msg == '') {
            return 0;
        }

        var uname = ''
        if ($('#E_Comment_' + idParent).attr('username')) {
            uname = $('#E_Comment_' + idParent).attr('username')
            msg = '@' + uname + ' ' + msg + ' ';
        }





        $.post('/api/reply', {
            user: SJ_SESSION._id,
            post: postID,
            product: prodId,
            reply: remove_Html_tags(msg),
            comment: idParent
        }, function (data) {
            if (data.success) {

                $('#EmojiTab_' + idParent).hide()
                $('#E_Comment_' + idParent).val('')
                $('#eliminate_' + idParent).click();

                alertT_(2, SJ_SESSION._id, alerto, remove_Html_tags(msg), postID, idParent);
            }
        });

    }



    var traemisalertas = function () {
        $('#todasAlertas_').html('');
        $.get('/api/useralert', {
            strictsearch: {
                to: SJ_SESSION._id
            }
        }, function (data) {
            if (data.success) {
                //$('#todasAlertas_').html('');
                $.each(data.data, function (i, item) {
                    switch (item.kind) {
                        case 1:
                            var txttitle = ''
                            var txtcopy = ''
                            var pic = ''
                            if (item.ref_post.isReply) {
                                txtcopy = item.ref_post.copy;
                                txttitle = item.ref_post.copy_title;
                            } else {
                                if (GlobalLang == 'ES') {
                                    txtcopy = item.ref_post.description_ES;
                                    txttitle = item.ref_post.post_ES;
                                } else {
                                    txtcopy = item.ref_post.description_EN;
                                    txttitle = item.ref_post.post_EN;
                                }
                            }
                            if (item.ref_post.origin != 3) {
                                pic = item.ref_post.thumbnail
                            } else {
                                pic = '/cdn/assets/f/images/myScentJourney.png'
                            }


                            $('#todasAlertas_').append('<div class="alert alert-dismissible alert-info"><button id="eliminate_' + item.parent_comment._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">| ' + SJ_LANG.txt_done + '</button>' +
                                '<br><hr>' +
                                '<div class="row">' +
                                '<div class="col-sm-3">' +
                                '<center><img width="150px" src="' + pic + '" class="img img-fuid img-thumbnail"> </center>' +
                                '</div>' +
                                '<div class="col-sm-9">' +
                                '<br>' +
                                '<a href="/user/' + item.from.username + '">' + item.from.username + '</a>' +
                                SJ_LANG.txt_commented + '  <h5>"' + FindArrobasandRemoveIT(item.comment) + '...' + '"</h5>' +
                                SJ_LANG.txt_on_your_post +
                                '<a href="/post/' + item.ref_post._id + '"> ' +
                                txttitle +
                                '</a>' +
                                '<hr>' +

                                '<div  class="row" >' +
                                '   <div style="background-color:#ffffff;" class="col noMargin" >' +
                                '       <div class="input-group">' +
                                '           <div class="input-group-prepend" id="ActionToggleBtn_' + item.parent_comment._id + '">' +
                                '               <div class="input-group-text">' +
                                '                   <i class="far fa-smile-wink"> </i>' +
                                '               </div>' +
                                '           </div>' +
                                '           <input prodId="' + item.ref_post.product + '" pid="' + item.ref_post._id + '" alerto="' + item.from._id + '" refid="' + item.parent_comment._id + '" class="form-control" type="text" placeholder="' + SJ_LANG.txt_respond + '... " id="E_Comment_' + item.parent_comment._id + '">' +
                                '           <button prodId="' + item.ref_post.product + '"  pid="' + item.ref_post._id + '" alerto="' + item.from._id + '" class="btn btn-sm btn-prymary" value="' + item.parent_comment._id + '" id="SaveComent_' + item.parent_comment._id + '"> ' + SJ_LANG.txt_send + '</button>' +
                                '       </div>' +
                                '   </div>' +
                                '</div>' +

                                '<div   class="row" >' +
                                '   <div  style="background-color:#ffffff;" class="col" >' +
                                '       <div id="EmojiTab_' + item.parent_comment._id + '" style="display:none">' +
                                '       </div>' +
                                '   </div>' +

                                '</div>' +




                                '</div>' +
                                '</div>' +
                                '</div>');

                            $('#ActionToggleBtn_' + item.parent_comment._id).click(function () {
                                $('#EmojiTab_' + item.parent_comment._id).slideToggle({ duration: 1000 });
                            });
                            llenaEmojiTab('#EmojiTab_' + item.parent_comment._id, '#E_Comment_' + item.parent_comment._id);
                            $('#SaveComent_' + item.parent_comment._id).click(function () {
                                var Value = $(this).val();
                                SaveReply(Value);
                            })
                            $('#E_Comment_' + item.parent_comment._id).keypress(function (e) {
                                var Value = $(this).attr('refid');
                                if (e.which == 13) {
                                    SaveReply(Value);
                                    return false;
                                }
                            });



                            break;
                        case 2:

                            var txttitle = ''
                            var txtcopy = ''
                            var pic = ''
                            if (item.ref_post.isReply) {
                                txtcopy = item.ref_post.copy;
                                txttitle = item.ref_post.copy_title;
                            } else {
                                if (GlobalLang == 'ES') {
                                    txtcopy = item.ref_post.description_ES;
                                    txttitle = item.ref_post.post_ES;
                                } else {
                                    txtcopy = item.ref_post.description_EN;
                                    txttitle = item.ref_post.post_EN;
                                }
                            }
                            if (item.ref_post.origin != 3) {
                                pic = item.ref_post.thumbnail
                            } else {
                                pic = '/cdn/assets/f/images/myScentJourney.png'
                            }


                            $('#todasAlertas_').append('<div class="alert alert-dismissible alert-info"><button id="eliminate_' + item.parent_comment._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">| ' + SJ_LANG.txt_done + '</button>' +
                                '<br><hr>' +
                                '<div class="row">' +
                                '<div class="col-sm-3">' +
                                '<center><img width="150px" src="' + pic + '" class="img img-fuid img-thumbnail"> </center>' +
                                '</div>' +
                                '<div class="col-sm-9">' +
                                '<br>' +
                                '<a href="/user/' + item.from.username + '">' + item.from.username + '</a>' +
                                SJ_LANG.txt_replied + '  <h5>"' + FindArrobasandRemoveIT(item.comment) + '...' + '"</h5>' +
                                SJ_LANG.txt_on_the_post +
                                '<a href="/post/' + item.ref_post._id + '"> ' +
                                txttitle +
                                '</a>' +
                                '<hr>' +

                                '<div  class="row" >' +
                                '   <div style="background-color:#ffffff;" class="col noMargin" >' +
                                '       <div class="input-group">' +
                                '           <div class="input-group-prepend" id="ActionToggleBtn_' + item.parent_comment._id + '">' +
                                '               <div class="input-group-text">' +
                                '                   <i class="far fa-smile-wink"> </i>' +
                                '               </div>' +
                                '           </div>' +
                                '           <input username="' + item.from.username + '" prodId="' + item.ref_post.product + '" pid="' + item.ref_post._id + '" alerto="' + item.from._id + '" refid="' + item.parent_comment._id + '" class="form-control" type="text" placeholder="' + SJ_LANG.txt_respond + '... " id="E_Comment_' + item.parent_comment._id + '">' +
                                '           <button  username="' + item.from.username + '" prodId="' + item.ref_post.product + '"  pid="' + item.ref_post._id + '" alerto="' + item.from._id + '" class="btn btn-sm btn-prymary" value="' + item.parent_comment._id + '" id="SaveComent_' + item.parent_comment._id + '"> ' + SJ_LANG.txt_send + '</button>' +
                                '       </div>' +
                                '   </div>' +
                                '</div>' +

                                '<div   class="row" >' +
                                '   <div  style="background-color:#ffffff;" class="col" >' +
                                '       <div id="EmojiTab_' + item.parent_comment._id + '" style="display:none">' +
                                '       </div>' +
                                '   </div>' +

                                '</div>' +




                                '</div>' +
                                '</div>' +
                                '</div>');

                            $('#ActionToggleBtn_' + item.parent_comment._id).click(function () {
                                $('#EmojiTab_' + item.parent_comment._id).slideToggle({ duration: 1000 });
                            });
                            llenaEmojiTab('#EmojiTab_' + item.parent_comment._id, '#E_Comment_' + item.parent_comment._id);
                            $('#SaveComent_' + item.parent_comment._id).click(function () {
                                var Value = $(this).val();
                                SaveReply(Value);
                            })
                            $('#E_Comment_' + item.parent_comment._id).keypress(function (e) {
                                var Value = $(this).attr('refid');
                                if (e.which == 13) {
                                    SaveReply(Value);
                                    return false;
                                }
                            });
                            break;


                        case 3:


                            $.getJSON('/api/actions/following/' + item.to._id, {}, function (dat) {
                                var losigo = false;
                                var lineaSocial = '';
                                if (dat.success) {
                                    $.each(dat.data, function (j, jtem) {
                                        var elem = jtem.user_id;
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

                                        if (item.from && elem._id === item.from._id) {
                                            console.log('entratrue', item.from, elem._id)
                                            losigo = true;
                                        }
                                    })

                                }
                                console.log('losigofinal', losigo)
                                if (losigo) {
                                    $('#todasAlertas_').append('<div class="alert alert-dismissible alert-info">' +

                                        '<button id="forclosing_' + item._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">| ' + SJ_LANG.txt_done + '</button>' +

                                        '<br><hr>' +
                                        '<div class="row">' +
                                        '<div class="col-sm-3">' +
                                        '<center><img width="150px" src="' + item.from.provider_picture + '" class="img img-fulid img-thumbnail"></center>' +
                                        '</div>' +
                                        '<div class="col-sm-9">' +
                                        '<a href="/user/' + item.from.username + '"><h4 class="noMargin">@' + item.from.username + '</h4></a>' +
                                        '<br>' + lineaSocial +
                                        '<h5>' + SJ_LANG.txt_started_to_follow_you + '</h5>' +

                                        '</div>' +
                                        '</div>' +
                                        '</div>');
                                } else {
                                    $('#todasAlertas_').append('<div class="alert alert-dismissible alert-info">' +

                                        '<button id="forclosing_' + item._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">| ' + SJ_LANG.txt_done + '</button>' +

                                        '<br><hr>' +
                                        '<div class="row">' +
                                        '<div class="col-sm-3">' +
                                        '<center><img width="150px" src="' + item.from.provider_picture + '" class="img img-fulid img-thumbnail"></center>' +
                                        '</div>' +
                                        '<div class="col-sm-9">' +
                                        '<a href="/user/' + item.from.username + '"><h4 class="noMargin">@' + item.from.username + '</h4></a>' +
                                        '<br>' + lineaSocial +
                                        '<h5>' + SJ_LANG.txt_started_to_follow_you + '</h5>' +

                                        '<p align="right"><button to="' + item.from._id + '" from="' + item.to._id + '" value="' + item._id + '" class=" followthis_ btn btn-primary" type="button" > ' + SJ_LANG.txt_follow_to + '</button></p>' +

                                        '</div>' +
                                        '</div>' +
                                        '</div>');
                                }

                            });


                            break;
                        case 4:

                            var txttitle = ''
                            var txtcopy = ''
                            var pic = ''
                            if (item.ref_post.isReply) {
                                txtcopy = item.ref_post.copy;
                                txttitle = item.ref_post.copy_title;
                            } else {
                                if (GlobalLang == 'ES') {
                                    txtcopy = item.ref_post.description_ES;
                                    txttitle = item.ref_post.post_ES;
                                } else {
                                    txtcopy = item.ref_post.description_EN;
                                    txttitle = item.ref_post.post_EN;
                                }
                            }
                            if (item.ref_post.origin != 3) {
                                pic = item.ref_post.thumbnail
                            } else {
                                pic = '/cdn/assets/f/images/myScentJourney.png'
                            }

                            $('#todasAlertas_').append('<div class="alert alert-dismissible alert-info">' +
                                '<button id="forclosingX_' + item._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">| ' + SJ_LANG.txt_done + '</button>' +
                                '<br><hr>' +
                                '<div class="row">' +
                                '<div class="col-sm-3">' +
                                '<center><img width="150px" src="' + item.from.provider_picture + '" class="img img-fulid img-thumbnail"></center>' +
                                '</div>' +
                                '<div class="col-sm-9">' +
                                '<a href="/user/' + item.from.username + '"><h4 class="noMargin">@' + item.from.username + '</h4></a>' +

                                '<h5>' + SJ_LANG.txt_likes_your_post + '</h5>' +
                                '<a  targe="_blank" href="/post/' + item.ref_post._id + '">' + txttitle + '</a>' +
                                '<p align="right"><button to="' + item.from._id + '" from="' + item.to._id + '" value="' + item._id + '" class=" Thanks_ btn btn-primary" type="button" > ' + SJ_LANG.txt_say_thanks + '</button></p>' +

                                '</div>' +
                                '</div>' +
                                '</div>');



                            break;
                        case 5:
                            $('#todasAlertas_').append('<div class="alert alert-dismissible alert-info">' +
                                '<button id="forc_' + item._id + '" value="' + item._id + '" class="close deletethis_" type="button" data-dismiss="alert">| ' + SJ_LANG.txt_done + '</button>' +
                                '<br><hr>' +
                                '<div class="row">' +
                                '<div class="col-sm-3">' +
                                '<center><img width="150px" src="' + item.from.provider_picture + '" class="img img-fulid img-thumbnail"></center>' +
                                '</div>' +
                                '<div class="col-sm-9">' +
                                '<a href="/user/' + item.from.username + '"><h4 class="noMargin">@' + item.from.username + '</h4></a>' +

                                '<h5>' + SJ_LANG.txt_thanksyou_4_likes_your_post + '</h5>' +

                                '</div>' +
                                '</div>' +
                                '</div>');

                            break;
                    }
                    //txt_on_the_post
                });
            }
        }).fail(function (err) {
            console.error(err);
        })
    }

    traemisalertas()



    $(document.body).on('click', '.Thanks_', function () {
        var from = $(this).attr('from')
        var to = $(this).attr('to');
        var xclose = $(this).val();
        alertT_(5, from, to, false);
        $('#forclosingX_' + xclose).click();
    });



    $(document.body).on('click', '.followthis_', function () {

        var url = '/api/actions/follow'
        var from = $(this).attr('from');
        var to = $(this).attr('to');
        var values = $(this).val();

        var data = {
            "loguser": from,
            "to_follow": to
        }
        $.post(url, data, function (data) {
            if (data.success) {
                alertT_(3, from, to, false)
                $('#forclosing_' + values).click();
            }
        })
    });


    $(document).on('click', '.deletethis_', function () {
        var del = $(this).val();
        $.ajax({
            url: '/api/useralert/' + del,
            method: 'DELETE'
        }).done(function (data) {

        }).fail(function (err) {
            console.error(err)
        })
    })

    setInterval(traemisalertas, 1000 * 60)
})