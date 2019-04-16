var CallFB = function () {
    window.fbAsyncInit = function () {
        FB.init({
            xfbml: true,
            version: 'v3.2'
        });
    };
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}
CallFB();

var RankingAcordes = [];
var generalAccordes = []

const PbyCharge = 25;
var Page = 0;
var nomore = false;

const PbyCharge2 = 25;
var Page2 = 0;
var nomore2 = false;

const PbyChargeRP = 5;
var PageRP = 0;
var nomoreRP = false;

var ARROFEmotions = [];

var UPDATE = 0;


var ThisCommentEdit = false;
var ThisCommentEditReply = false;

var likedPost = false;

var KindReport = '';
var el4reportId = false;
var isChildResponse = false;

var elPost = {};
var PisReply = false;
var SJ_POST_USER = {};

var conteoGralEmoticons = [];

var AllStage = {};

// dibuja el grafico de acordes
var drawAccordsGraph = function (accords) {
    generalAccordes = accords
    $('#desc_acordesGral_').html('');
    $.each(accords, function (i, item) {


        var inner = {}
        inner.id = item._id;
        inner.val = 0;
        inner.prom = 0;
        inner.sj = 0;

        var txt_more = '';

        if (GlobalLang == 'ES') {
            inner.name = item.accord_ES
            inner.dsc = item.description_ES
            txt_more = 'Mas...';
        } else {
            inner.name = item.accord_EN
            inner.dsc = item.description_EN
            txt_more = 'More...';
        }
        RankingAcordes.push(inner);

        inner.dsc = inner.dsc.substring(0, 15)

        $('#desc_acordesGral_').append('' +
            ' <div class="row">' +
            '<div class="col-sm-4 lnx_content_eqlzr"><a href="/accord/' + inner.id + '"> <img id="EqualizeThis_' + item._id + '" class="img img-fluid" src="' + item.img_url + '"></a></div>' +
            '<div  class="col-sm-8"> <a href="/accord/' + inner.id + '"> <span id="titleandporcent_' + inner.id + '">' + inner.name + '</span> </a> ' +
            '<small>' + inner.dsc + '<a href="/accord/' + inner.id + '"> ' + txt_more + '</a>  </small></div>' +
            '</div><hr >');

        llamaEqualizer('#EqualizeThis_' + item._id);
    })


    $.ajax({
        method: 'GET',
        data: {
            strictsearch: {
                product: SJ_PRODUCT_ID,
            }
        },
        url: '/api/accordrank',
    }).done(function (data) {

        if (data.success == true) {
            var obj = data.data;

            $.each(obj, function (i, item) {
                $.each(RankingAcordes, function (j, jtem) {
                    if (jtem.id == item.accord._id) {
                        if (item.isSJ == true) {
                            jtem.sj = item.calification
                        } else {
                            jtem.prom = (jtem.prom + item.calification);
                        }
                        if (SJ_SESSION && SJ_SESSION._id && item.user && item.user._id == SJ_SESSION._id) {
                            jtem.val = item.calification;
                        }
                    }
                })
            });

            var names = [];
            var users = [];
            var SJ = [];
            $.each(RankingAcordes, function (i, item) {
                var texto = $('#titleandporcent_' + item.id).text();
                texto = '<center><h4 class="noMargin">' + texto + '</h4> <center> <small>' + SJ_LANG.txt_sj_acordes + '/' + SJ_LANG.txt_user_acordes + '</small></center> <h5 class="noMargin">' + item.sj + '%  / ' + (item.prom / (RankingAcordes.length) - 1).toFixed(0) + '% </h5></center>'
                $('#titleandporcent_' + item.id).html(texto);

                names.push(item.name)
                users.push((item.prom / (RankingAcordes.length) - 1).toFixed(2))
                SJ.push(item.sj)
            });

            var config = {};
            if (accords.length > 2) {
                config = {
                    type: 'radar',
                    data: {
                        labels: names,
                        datasets: [{
                            label: SJ_LANG.txt_sj_acordes,
                            backgroundColor: 'rgba(33,33,33,.3)',
                            borderColor: 'rgba(33,33,33,.3)',
                            pointBackgroundColor: 'rgba(33,33,33,.3)',
                            data: SJ
                        }, {
                            label: SJ_LANG.txt_user_acordes,
                            backgroundColor: 'rgba(0,0,0,.7)',
                            borderColor: 'rgba(0,0,0,.7)',
                            pointBackgroundColor: 'rgba(0,0,0,.7)',
                            data: users
                        }]
                    },
                    options: {
                        legend: {
                            position: 'top',
                        },
                        scale: {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                };
            } else {

                config = {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: SJ,
                            label: SJ_LANG.txt_sj_acordes
                        }, {
                            data: users,
                            label: SJ_LANG.txt_user_acordes
                        }],
                        labels: names
                    },
                    options: {
                        responsive: true
                    }
                };

            }



            window.myRadar = new Chart(document.getElementById('cnv_'), config);



        }
    }).fail(function (err) {
        console.error(err);
    });


};

$(document).ready(function () {

    //envia el reporte
    $('#SendReportPost').click(function () {

        if ($('#complementReportPost').val() == '') {
            return 0;
        }
        var data = {
            description: $('#complementReportPost').val(),
        }

        if (KindReport == 'post') {
            if ($('#ResportPostSelect_').val() == -1) {
                return 0;
            }
            data.motive = $('#ResportPostSelect_').val();
            data.post = el4reportId;
            data.kind = 1;
        }
        if (KindReport == 'comment') {
            if ($('#ResportCommentSelect_').val() == -1) {
                return 0;
            }
            data.motive = $('#ResportCommentSelect_').val();
            data.comment = el4reportId;
            data.kind = 2;
        }
        if (KindReport == 'subcomment') {
            if ($('#ResportCommentSelect_').val() == -1) {
                return 0;
            }
            data.motive = $('#ResportCommentSelect_').val();
            data.reply = el4reportId;
            data.kind = 3;
        }
        $.post('/api/report/', data, function (data) {
            if (data.success) {
                $('#myDataModalReport').modal('hide');
                setTimeout(function () {
                    $('#ThnksNotify').modal('show');
                }, 500)
            }
        }).fail(function (err) {
            console.error(err);
        })
    })

    //cerrar modal de  reporte
    $('#CancelReportPost').click(function () {
        $('#myDataModalReport').modal('hide');
    })

    //cerrar modal de  reporte
    $('#CloseThanks').click(function () {
        $('#ThnksNotify').modal('hide');
    })

    //context menu
    $.contextMenu({
        selector: '#AccionesPost',
        trigger: 'left',
        callback: function (key, options) {
            var url = window.location;
            var uri = encodeURI(url)
            if (key == 'shareFB') {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + uri);
            }
            if (key == 'shareTW') {
                window.open('https://twitter.com/intent/tweet?url=' + uri + '&via=ScentJourney&image-src=' + encodeURI(SJ_TITLE) + '&text=' + encodeURI(SJ_IMAGE));
            }
            if (key == 'reportPost') {
                $('#myDataModalReport').modal('show')
                KindReport = 'post'
                $('#SPReportComment_').hide()
                $('#SPReportPost_').show()
                el4reportId = SJ_P_ID
            }
        },
        items: {
            "shareFB": { name: SJ_LANG.txt_share_on_fb, icon: "fab fa-facebook " },
            "shareTW": { name: SJ_LANG.txt_share_on_tw, icon: "fab fa-twitter" },
            "sep1": "---------",
            "reportPost": { name: SJ_LANG.txt_report_post, icon: "fas fa-bug" },
        }
    });

    // likes para posts
    $('#LikesVotes_').click(function () {
        if (SJ_SESSION && SJ_SESSION._id) {
            var CNFG = {
                url: '/api/postLikes/',
                method: 'POST',
                data: {
                    user: SJ_SESSION._id,
                    post: SJ_P_ID,
                    vote: 1
                }
            }
            if (likedPost) {
                CNFG = {
                    url: '/api/postLikes/' + likedPost,
                    method: 'DELETE',
                    data: {}
                }
            }

            $.ajax(CNFG).done(function (data) {
                if (data.success) {
                    if (!likedPost) {
                        if (PisReply) {
                            alertT_(4, SJ_SESSION._id, elPost.autor._id, false, SJ_P_ID)
                        } else {
                            alertT_(4, SJ_SESSION._id, SJ_POST_USER._id, false, SJ_P_ID)
                        }
                    }
                    drawLikesPost();
                    likedPost = false;
                    $('#Corazon_lx_').removeClass('fas')
                    $('#Corazon_lx_').addClass('far')

                }
            }).fail(function (err) {
                console.error(err);
            });
        }
    });
    //dibuja los likes
    var drawLikesPost = function () {
        $.get('/api/postLikes/', {
            strictsearch: { post: SJ_P_ID }
        }, function (data) {
            if (data.success) {
                $('#tLikesCount_').text(data.count);
                if (SJ_SESSION && SJ_SESSION._id) {
                    $.ajax({
                        url: '/api/post/' + SJ_P_ID,
                        method: 'PUT',
                        data: { likes_count: data.count }
                    }).done(function (data) {

                    }).fail(function (err) {
                        console.error(err);
                    });
                }




                $.each(data.data, function (i, item) {
                    if (SJ_SESSION && SJ_SESSION._id) {
                        if (SJ_SESSION._id == item.user) {
                            likedPost = item._id;
                            $('#Corazon_lx_').removeClass('far')
                            $('#Corazon_lx_').addClass('fas')
                        }
                    }
                });
            }
        });
    }

    drawLikesPost();

    // cierra modal de acordes
    $('#SCncelD_').click(function () {
        $('#myDataModalSliders').modal('hide');
    })

    // cierra modal emotions
    $('#SCncelD_Emotions').click(function () {
        $('#myDataModalEmotions').modal('hide');
    })

    // emotions panel
    $('#emotionsVotes_').click(function () {
        $('#myDataModalEmotions').modal('show');
        $.get('/api/temp', {}, function (data) {
            if (data.success) {
                $('#EmotionsHERE_').html('')
                $.each(data.data, function (i, item) {
                    var name = '';
                    var txt = '';
                    if (GlobalLang == 'ES') {
                        name = item.temp_ES;
                        txt = item.description_ES;
                    } else {
                        name = item.temp_EN;
                        txt = item.description_EN;
                    }
                    $('#EmotionsHERE_').append('<div class="row"><div class="col">' +
                        '<h5>' + name + '</h5>' +
                        '<p>' + txt + '</p>' +
                        '</div></div>' +
                        '<div class="row"><div class="col">' +
                        '<center id="SP_emoticons_' + item._id + '"></center>' +
                        '</div></div><hr>'
                    );
                    $.get('/api/temp/emotion/' + item._id, {}, function (data) {
                        if (data.success) {
                            $.each(data.data, function (j, jtem) {
                                ARROFEmotions.push({
                                    id: jtem._id,
                                    val: 0
                                })
                                var emotionN = '';
                                if (GlobalLang == 'ES') {
                                    emotionN = jtem.emotion_ES
                                } else {
                                    emotionN = jtem.emotion_EN
                                }
                                emotionN = '<img width="30px" class="img img-fluid" src="' + jtem.img_url + '"> <br><small> ' + emotionN + ' </small> <br> <span  class="badge badge-dark" id="conterEmotion_' + jtem._id + '">0</span>'
                                $('#SP_emoticons_' + item._id).append('<button category="' + item._id + '" id="BTN_EMO_' + jtem._id + '" value="' + jtem._id + '" class="btn btn-default ">' + emotionN + '</button>');
                                if (SJ_SESSION && SJ_SESSION._id) {
                                    $('#BTN_EMO_' + jtem._id).click(function () {
                                        var category = $(this).attr('category');
                                        var emotion = $(this).val();
                                        $.post('/api/emotionvotes/voteThis', {
                                            strictsearch: {
                                                category,
                                                post: SJ_P_ID,
                                                user: SJ_SESSION._id
                                            }, emotion
                                        }, function (data) {
                                            if (data.success) {
                                                llamaVotos_emotions();
                                            }
                                        });
                                    });
                                }


                            })
                        }
                    });
                });

                llamaVotos_emotions();
            }
        });
    })

    // dibuja los votos de las emociones
    var llamaVotos_emotions = function () {
        $.each(ARROFEmotions, function (j, jtem) {
            jtem.val = 0;
        })

        $.get('/api/emotionvotes/', {
            strictsearch: {
                post: SJ_P_ID,
            }
        }, function (data) {
            if (data.success) {
                $.each(data.data, function (i, item) {
                    $.each(ARROFEmotions, function (j, jtem) {
                        if (item.emotion == jtem.id) {
                            jtem.val = jtem.val + 1;
                        }
                    })
                });
                $.each(ARROFEmotions, function (j, jtem) {
                    $('#conterEmotion_' + jtem.id).text(jtem.val);
                })

            }
        });
    }

    // despliega calificador de acordes
    $('#CualifyAccord_').click(function () {
        $('#SlidersHERE_').html('');
        UPDATE = SJ_PRODUCT_ID
        $.each(generalAccordes, function (i, item) {
            var title = GlobalLang == 'ES' ? item.accord_ES : item.accord_EN;
            $('#SlidersHERE_').append('<hr><div class="row"> <div class="col-sm-12">' +
                '<center><label>' + title + '</label>' +
                '<input name="ageInputName_' + item._id + '" value="100" type="range" class="custom-range form-control" min="0" max="100" step="1" id="RangueI_' + item._id + '">' +
                ' <output name="ageOutputName_' + item._id + '" id="RangueO_' + item._id + '">100</output></center>' +
                '</div></div>');
            $('#RangueI_' + item._id).change(function () {
                var value = $(this).val()
                $('#RangueO_' + item._id).val(value + '%')
                $.each(RankingAcordes, function (j, jtem) {
                    if (jtem.id == item._id) {
                        RankingAcordes[j].val = Number(value);
                    }
                })
            });

        })
        $.each(RankingAcordes, function (i, item) {
            $('#RangueI_' + item.id).val(item.val)
            $('#RangueO_' + item.id).val(item.val)
        });

        $('#myDataModalSliders').modal('show');
    });

    // Guarda ranking acordes
    $('#SVEDD_').click(function () {
        $.each(RankingAcordes, function (i, item) {

            var StricT = {
                isSJ: false,
                user: SJ_SESSION._id,
                product: SJ_PRODUCT_ID,
                accord: item.id
            }
            $.ajax({
                method: 'PUT',
                data: {
                    strictsearch: StricT,
                    rank: Number(item.val)
                },
                url: '/api/accordrank/rankThis',
            }).done(function (data) {

            }).fail(function (err) {

                console.error(err);
            });
        });
        RankingAcordes = [];
        $('#myDataModalSliders').modal('hide');
        setTimeout(function () {
            location.reload();
        }, 1000)
    });

    // trae post relacionados
    var num = Math.floor(Math.random() * 10) + 1;
    var Oss = {};
    switch (num) {
        case 1:
            Oss = {
                "description_EN": "desc"
            };
            break;
        case 2:
            Oss = {
                "description_ES": "asc"
            };
            break;
        case 3:
            Oss = {
                "dte_reg": "asc"
            };
            break;
        case 4:
            Oss = {
                "dte_reg": "desc"
            };
            break;
        case 5:
            Oss = {
                "origin": "asc"
            };
            break;
        case 6:
            Oss = {
                "origin": "desc"
            };
            break;
        case 7:
            Oss = {
                "social_url": "asc"
            };
            break;
        case 8:
            Oss = {
                "social_url": "desc"
            };
            break;
        case 9:
            Oss = {
                "product": "asc"
            };
            break;
        case 10:
            Oss = {
                "product": "desc"
            };
            break;
    }
    $.ajax({
        url: "/api/post",
        data: {
            "sort": Oss,
            "avoid": {
                _id: SJ_P_ID
            },
            "search": {
                "active": "true"
            },
            "paginate": {
                "page": 0,
                "limit": 3
            }
        },
    }).done(function (data) {
        if (data.success) {
            $('#myPostRelated_').html('')
            $.each(data.data, function (i, item) {
                var image = '/cdn/assets/f/images/myScentJourney.png';
                var description = '';
                var txt_more = '';
                if (item.isReply) {
                    description = TableDescription(item.copy).substring(0, 120) + '...';
                } else {
                    if (GlobalLang == 'ES') {
                        description = TableDescription(item.description_EN).substring(0, 120) + '...';
                    } else {
                        description = TableDescription(item.description_EN).substring(0, 120) + '...';
                    }
                }
                if (GlobalLang == 'ES') {
                    txt_more = 'Mas...';
                } else {
                    txt_more = 'More...';
                }

                if (item.origin !== 3) {
                    image = item.thumbnail;
                }

                $('#myPostRelated_').append('<div class="row"><div class="col-sm-6"><a href="/post/' + item._id + '"><img class="img-fluid" src="' + image + '"></a></div><div class="col-sm-6"><p class="">' + description + '<a href="/post/' + item._id + '">' + txt_more + '</a></p></div></div><hr>')
            });
        }
    }).fail(function (errn) {
        console.error(errn);
    });

    /*
    if (SJ_SESSION && SJ_SESSION._id) {
        $('#EscondeBTNVOTO_').show();
    }*/

    //dibuja emoticonos Nuevo
    var DrawIconosEmo_ = function (emociones) {
        if (window.myBar) {
            window.myBar.destroy();
        }
        if (emociones.length > 0) {
            $('#EscondeEmoticons_').show()
        }else{
            $('#EscondeEmoticons_').hide()
        }
        $('#WidgetEmoticons_').html('');
        EmotionsOFThis = emociones;
        conteoGralEmoticons = [];
        $.each(emociones, function (i, item) {
            var title = item.temp_EN
            var desc = item.description_EN
            if (GlobalLang == 'ES') {
                title = item.temp_ES
                desc = item.description_ES
            }
            $('#WidgetEmoticons_').append('<div class="col-sm-12 col-md-6 card">' +
                '<center>' +
                '<h3>' + title + '</h3>' +
                '</center>' +
                '<p align="justify">' + desc + '</p>' +
                '<div class="row" id="SP_CAT_EMO_' + item._id + '"></div>' +
                '<div id="SP_GRAPH_EMO_' + item._id + '"> ' +
                //'<h5>' + SJ_LANG.txt_average + '</h5>' +
                //'<canvas id="chartPie_' + item._id + '"></canvas></div>' +
                '</div>');

            $.getJSON('/api/temp/emotion/' + item._id, {}, function (data) {
                $.each(data.data, function (j, jtem) {


                    var txtt = jtem.emotion_EN;
                    if (GlobalLang == 'ES') {
                        txtt = jtem.emotion_ES;
                    }

                    conteoGralEmoticons.push({
                        emo: jtem._id,
                        cat: item._id,
                        SJ_cal: 0,
                        US_cal: 0,
                        name: txtt,
                        namecat: title
                    });

                    var line = '';
                    if (SJ_SESSION && SJ_SESSION._id) {
                        line = '<input category="' + item._id + '"  value="0" type="range" class="custom-range form-control" min="0" max="100" step="1" id="Slider_Emo_usr_' + jtem._id + '">' +
                            '<small id="Value_Emo_usr_' + jtem._id + '"> 0%</small>'
                    }
                    $('#SP_CAT_EMO_' + item._id).append('<div class="col-sm-12 col-md-6 "><center>' +
                        '<img width="30px" class="img img-fluid" src="' + jtem.img_url + '">' +
                        '<h4>' + txtt + '</h4>' +
                        '<small >' + SJ_LANG.txt_SJ_Vote_emo + '</small> / <small >' + SJ_LANG.txt_average_Vote_emo + '</small><br>' +
                        '<small id="SJEmoticon_' + jtem._id + '"></small> / <small id="USEREmoticon_' + jtem._id + '"></small>' +
                        line +
                        '</center><hr></div>');

                    $('#Slider_Emo_usr_' + jtem._id).change(function () {
                        var xx = $(this).val();
                        $(this).prop('disabled', true);
                        $('#Value_Emo_usr_' + jtem._id).html(xx + '%');

                        var calf = $(this).val();
                        var cat = $(this).attr('category');
                        $.post('/api/emotionvotes/voteThis', {
                            strictsearch: {
                                product: SJ_PRODUCT_ID,
                                category: cat,
                                emotion: jtem._id,
                                isSJ: false,
                                user: SJ_SESSION._id
                            },
                            voto: calf
                        }, function (data) {
                            $(this).prop('disabled', false);
                            DrawIconosEmo_(EmotionsOFThis);
                        }).fail(function (err) {
                            console.error(err);
                            $(this).prop('disabled', false);
                        });



                    })
                });
            });


        });

        irPorLosDatosCalificacion();
    }

    //tre los votos de las emociones NUEVO
    var irPorLosDatosCalificacion = function () {

        $.getJSON('/api/emotionvotes/', {
            strictsearch: {
                product: SJ_PRODUCT_ID,
            },
        }, function (data) {
            if (data.success) {
                $.each(data.data, function (i, item) {
                    if (item.isSJ) {
                        $('#SJEmoticon_' + item.emotion._id).html(item.voto + '%')
                    }
                    if (item.user && item.user._id == SJ_SESSION._id) {
                        $('#Slider_Emo_usr_' + item.emotion._id).val(item.voto);
                        $('#Value_Emo_usr_' + item.emotion._id).html(item.voto + '%');
                    }
                    $.each(conteoGralEmoticons, function (j, jtem) {
                        if (jtem.emo == item.emotion._id) {
                            if (item.isSJ) {
                                jtem.SJ_cal = jtem.SJ_cal + item.voto;
                            }
                            jtem.US_cal = jtem.US_cal + item.voto;

                            if (!jtem.count) {
                                jtem.count = 1;
                            } else {
                                jtem.count = jtem.count + 1;
                            }
                        }
                    })
                });

                $.each(conteoGralEmoticons, function (k, ktem) {
                    var prom = (ktem.US_cal / ktem.count).toFixed(2);
                    ktem.prom = prom;
                    $('#USEREmoticon_' + ktem.emo).html(prom + '%')
                });


                pintalaGraficaDeBarrasEmoticonos();

            }

        });

    }

    var pintalaGraficaDeBarrasEmoticonos = function () {
        var labels = [];
        var datasetSJ = [];
        var datasetAll = [];

        $.each(conteoGralEmoticons, function (i, item) {
            labels.push(item.name);
            datasetSJ.push(item.SJ_cal);
            datasetAll.push(item.prom);
        });

        var barChartData = {
            labels: labels,
            datasets: [{
                label: SJ_LANG.txt_SJ_Vote_emo,
                backgroundColor: '#212121',
                borderColor: '#212121',
                borderWidth: 1,
                data: datasetSJ
            }, {
                label: SJ_LANG.txt_average_Vote_emo,
                backgroundColor: '#BCBCBC',
                borderColor: '#BCBCBC',
                borderWidth: 1,
                data: datasetAll
            }]

        };

        var ctx_ = document.getElementById('canvas_emotions_').getContext('2d');
        window.myBar = new Chart(ctx_, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: ''
                }
            }
        });
    }

    // caga toda la info del post y los wdgets
    $.ajax({
        url: "/api/post/" + SJ_P_ID
    }).done(function (data) {
        if (data.success) {
            elPost = data.data;
            AllStage = data.data;
            if (data.data && data.data.autor) {
                var miautor = data.data.autor;
                var elem = miautor;
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


                $('#postedBYNAME_').html('<a href="/profile/' + miautor._id + '">@' + miautor.username + '</a>')
                $('#lineaSocial_').html(lineaSocial)

            }
            PisReply = data.data.isReply;

            if (data.data.isReply === false) {

                $.ajax({
                    url: "/api/config",
                    method: 'GET'
                }).done(function (data) {

                    if (data.success && data.data._IDuserScentJourney) {
                        SJ_POST_USER = data.data._IDuserScentJourney;
                        var lineaSocial = '';
                        var elem = data.data._IDuserScentJourney
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
                        $('#lineaSocial_').html(lineaSocial)
                        $('#postedBYNAME_').html('<a href="/profile/' + data.data._IDuserScentJourney._id + '">@' + data.data._IDuserScentJourney.username + '</a>')

                    }
                }).fail(function (errn) {
                    console.error(errn);
                });
            }

            DrawIconosEmo_(data.data.product.cat_emoticons);

            if (Number(data.data.origin) == 1) {
                $.ajax({
                    url: "/social/instagramPost",
                    data: { iurl: data.data.social_url.replace('www.', '') },
                    method: 'POST'
                }).done(function (dta) {

                    var coments = dta.data[1].replace('Comments', '').trim()
                    var likes = dta.data[0].replace('Likes', '').trim()
                    $('#insta_data').html('<p class="noMargin" align="right"> ' + coments + ' <i class="fa fa-comment"></i>' + likes + '<i class="fa fa-heart"></i></p>').show()
                }).fail(function (errn) {
                    console.error(errn);
                });
            }
            if (Number(data.data.origin) == 2) {
                $.ajax({
                    url: "/social/youtubeVideoData",
                    data: { yurl: data.data.social_url },
                    method: 'POST'
                }).done(function (datas) {
                    $('#insta_data').html('<p class="noMargin" align="right"> ' + datas.data.countViewers.replace('views', '').replace('vistas', '') + ' <i class="fa fa-eye"></i></p>').show()
                }).fail(function (err) {
                    console.error(err);
                });
            }

            // ingredientes !!!
            var obj = data.data;
            if (obj.product.gNotes.length > 0) {
                $('#P_G_Notes_').html('')
                $.each(obj.product.gNotes, function (i, item) {
                    var nombreING = '';
                    if (GlobalLang == 'ES') {
                        nombreING = item.ingredient_ES
                    } else {
                        nombreING = item.ingredient_EN
                    }
                    $('#P_G_Notes_').append('<div class="col-sm-4"><center><a href="/ingredient/' + item._id + '"><img class="img-fluid" width="30px" src="' + item.img_url + '"><p>' + nombreING + '</p></a></center></div>')
                });
                $('#GeneralNotes_').show();
                $('#NormalNotes_').hide();
            } else {
                $('#GeneralNotes_').hide();
                $('#NormalNotes_').show();
                $('#P_B_Notes_').html('')
                $('#P_M_Notes_').html('')
                $('#P_T_Notes_').html('')
                $.each(obj.product.bNotes, function (i, item) {
                    var nombreING = '';
                    if (GlobalLang == 'ES') {
                        nombreING = item.ingredient_ES
                    } else {
                        nombreING = item.ingredient_EN
                    }
                    $('#P_B_Notes_').append('<div class="col-sm-4"><center><a href="/ingredient/' + item._id + '"><img class="img-fluid" width="30px" src="' + item.img_url + '"><p>' + nombreING + '</p></a></center></div>')
                });
                $.each(obj.product.mNotes, function (i, item) {
                    var nombreING = '';
                    if (GlobalLang == 'ES') {
                        nombreING = item.ingredient_ES
                    } else {
                        nombreING = item.ingredient_EN
                    }
                    $('#P_M_Notes_').append('<div class="col-sm-4"><center><a href="/ingredient/' + item._id + '"><img class="img-fluid" width="30px" src="' + item.img_url + '"><p>' + nombreING + '</p></a></center></div>')
                });
                $.each(obj.product.tNotes, function (i, item) {
                    var nombreING = '';
                    if (GlobalLang == 'ES') {
                        nombreING = item.ingredient_ES
                    } else {
                        nombreING = item.ingredient_EN
                    }
                    $('#P_T_Notes_').append('<div class="col-sm-4"><center><a href="/ingredient/' + item._id + '"><img class="img-fluid" width="30px" src="' + item.img_url + '"><p>' + nombreING + '</p></a></center></div>')
                });
            }


            obj = obj.product;
            var AccordDesc = "";
            var BrandName = "";
            var BrandDesc = "";
            var ProductName = "";
            var ProductDesc = "";
            var NoseDesc = "";
            var NoseName = "";
            var txt_more = "";

            if (GlobalLang == 'ES') {
                BrandName = obj.brand.brand_ES;
                BrandDesc = TableDescription(obj.brand.description_ES).substring(0, 120) + '...';
                ProductName = obj.product_ES;
                ProductDesc = TableDescription(obj.description_ES).substring(0, 120) + '...';
                NoseName = obj.nose.nose_ES;
                NoseDesc = TableDescription(obj.nose.description_ES).substring(0, 120) + '...';
                txt_more = 'Mas...'
            } else {

                BrandName = obj.brand.brand_EN;
                BrandDesc = TableDescription(obj.brand.description_EN).substring(0, 120) + '...';
                ProductName = obj.product_EN;
                ProductDesc = TableDescription(obj.description_EN).substring(0, 120) + '...';
                NoseName = obj.nose.nose_EN;
                NoseDesc = TableDescription(obj.nose.description_EN).substring(0, 120) + '...';
                txt_more = 'More...'
            }

            if (obj.accords.length > 0) {
                $('#card_Accords_Sp').show();
                drawAccordsGraph(obj.accords);
            } else {
                $('#card_Accords_Sp').hide();
            }

            $('#P_PB_TituloA').html('<center><a href="/brand/' + obj.brand._id + '"><h5>' + BrandName + '</h5><img class="img-fluid" src="' + obj.brand.img_url + '"></a></center><p align="justify">' + BrandDesc + ' <a href="/brand/' + obj.brand._id + '">' + txt_more + '</a>  </p>')
            $('#P_PB_TituloB').html('<center><a href="/product/' + obj._id + '"><h5>' + ProductName + '</h5><img class="img-fluid" src="' + obj.img_url + '"></a></center><p align="justify">' + ProductDesc + ' <a href="/product/' + obj._id + '">' + txt_more + '</a>  </p>')
            $('#P_Nose_Name').html('<center><a href="/nose/' + obj.nose._id + '"><h5>' + NoseName + '</h5><img class="img-fluid" src="' + obj.nose.img_url + '"></a></center><p align="justify">' + NoseDesc + ' <a href="/nose/' + obj.nose._id + '">' + txt_more + '</a>  </p>')
        }
    }).fail(function (err) {
        console.error(err)
    });

    //esconde o mustra comentarios
    $('#btn_toggle_comments').click(function () {
        $('#Space4Commentstoggle_').toggle({
            duration: 1000,
        });;
    });

    //envia comantario click
    $('#SaveComent_').click(function () {
        SaveComment_X();
    });

    // envia comentario enter
    $('#E_Comment_').keypress(function (e) {
        if (e.which == 13) {
            SaveComment_X();
            return false;
        }
    });



    //guarda o actualiza comentario
    var SaveComment_X = function () {
        var content = $('#E_Comment_').val();
        if (!content || content == '') {
            return 0;
        }
        if (ThisCommentEdit == false) {
            $.post('/api/comment', {
                user: SJ_SESSION._id,
                post: SJ_P_ID,
                product: SJ_PRODUCT_ID,
                comment: remove_Html_tags(content)
            }, function (data) {
                if (data.success) {
                    nomore2 = false;
                    nomore = false;
                    Page2 = 0;
                    Page = 0;
                    Get_all_Coments_this(false);
                    Get_all_Coments_all(false);
                    $('#EmojiTab_').hide()
                    $('#E_Comment_').val('')
                    ThisCommentEdit = false;
                    if (AllStage.autor && SJ_SESSION) {
                        if (SJ_SESSION._id !== AllStage.autor._id) {
                            alertT_(1, SJ_SESSION._id, AllStage.autor._id, remove_Html_tags(content), SJ_P_ID, data.data._id);
                        }

                    }

                    if (!PisReply && SJ_SESSION && SJ_SESSION._id && SJ_SESSION._id !== SJ_POST_USER._id) {
                        alertT_(1, SJ_SESSION._id, SJ_POST_USER._id, remove_Html_tags(content), SJ_P_ID, data.data._id)
                    }
                }
            });
        } else {
            $.ajax({
                method: 'PUT',
                url: '/api/comment/' + ThisCommentEdit,
                data: {
                    comment: remove_Html_tags(content)
                }
            }).done(function (data) {
                $('#EmojiTab_').hide()
                $('#E_Comment_').val('')
                $('#CommentTXT_' + ThisCommentEdit).text(content)
                $('#CommentTXTAll_' + ThisCommentEdit).text(content)
                ThisCommentEdit = false;
            }).fail(function (err) {

                $('#E_Comment_').val('')
                ThisCommentEdit = false;
            });
        }
    };

    // eliminar comentario
    $(document.body).on('click', '.cmntDelete_', function () {
        var Deletes = $(this).val()
        $.ajax({
            method: 'DELETE',
            url: '/api/comment/' + Deletes,
        }).done(function (data) {
            $('#EmojiTab_').hide()
            nomore2 = false;
            nomore = false;
            Page2 = 0;
            Page = 0;
            Get_all_Coments_this(false);
            Get_all_Coments_all(false);
            $('#tCommentsCount_').html('0')
            $('#Space4Commentsthis_').html('');
            $('#Space4Commentsproduct_').html('');
        }).fail(function (err) {
            console.log(err)
        });
    });

    // eliminar reply
    $(document.body).on('click', '.cmntDeleteReply_', function () {
        var Deletes = $(this).val()
        $.ajax({
            method: 'DELETE',
            url: '/api/reply/' + Deletes,
        }).done(function (data) {
            $('#CompleteReply_' + Deletes).remove();
        }).fail(function (err) {
            console.log(err)
        });
    });

    // infinite scroll
    $(window).scroll(function () {
        const offset = 200;
        if ($(window).scrollTop() + $(window).height() > $(document).height() - offset) {
            Page++;
            Page2++;
            Get_all_Coments_this(true);
            Get_all_Coments_all(true);
        }
    });

    // trae comentarios del post
    var Get_all_Coments_this = function (isAppend) {
        // 
        if (nomore) {
            return 0;
        }

        $('#tCommentsCount_').html('0')
        $.ajax({
            url: "/api/comment",
            dataType: 'json',
            data: {
                "strictsearch": { "post": SJ_P_ID },
            }
        }).done(function (data) {
            if (data.success == true) {
                if (Number(data.count) > 99) {
                    $('#tCommentsCount_').html('+99')
                } else {
                    $('#tCommentsCount_').html(data.count)
                }
            }
        }).fail(function (err) {
            console.error(err);
        });


        $.ajax({
            url: "/api/comment",
            dataType: 'json',
            data: {
                "sort": { "date_posted": "desc" },
                "strictsearch": { "post": SJ_P_ID },
                "paginate": { "page": Page, "limit": PbyCharge },
            }
        }).done(function (data) {
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    if (!isAppend) {
                        $('#Space4Commentsthis_').html('');
                    }
                    $.each(data.data, function (i, item) {
                        let LineComentPlus = '&nbsp;';

                        if (SJ_SESSION && SJ_SESSION._id == item.user._id) {
                            LineComentPlus = '<button id="cmntEdit_' + item._id + '"  value="' + item._id + '" class=" btn btn-default btn-sm  noMargin Action " href="#">' + SJ_LANG.txt_edit + '</button>' +
                                '<button  value="' + item._id + '" class="btn btn-default btn-sm  noMargin Action cmntDelete_" href="#">' + SJ_LANG.txt_delete + '</button>' +
                                LineComentPlus;
                        }

                        LineComentPlus = '<button   id="Reply_this_' + item._id + '" value="' + item._id + '" class="btn btn-default btn-sm noMargin Action  " >' + SJ_LANG.txt_replies + '</button>' +
                            LineComentPlus;

                        let Cntnt = ' <div class="row noMargin">' +
                            '<div class="col-sm-2 noMargin">' +



                            '<a href="/profile/' + item.user._id + '"><img id="EqualizeThis_' + item.user._id + '" class="img lnx_eqlzr-circle" src="' + item.user.provider_picture + '"></a>' +
                            '</div>' +
                            '<div class="col-sm-10 noMargin">' +
                            '<br><div class="comment noMargin">' +

                            '<p class="noMargin" align="right">' +
                            '<button  class="btn btn-circle btn-outline-default btn-sm noMargin" id="CommentReport_' + item._id + '"><i class="fas fa-caret-down"></i></button>' +
                            '</p>' +



                            '<small class="hour float-right">' + item.date_posted + '</small>' +
                            '<a class="commentName" href="/profile/' + item.user._id + '">' + item.user.username + '</a>' +
                            '<p id="CommentTXT_' + item._id + '" class="noMargin" align="justify"> ' + FindArrobasandMAKEIT(item.comment) + '</p>' +
                            '<p class="noMargin" align="right">' +
                            LineComentPlus +
                            '</p>' +
                            '</div>' +

                            '<div  id="ReplySpace_' + item._id + '">' +
                            '<hr>';

                        if (SJ_SESSION && SJ_SESSION._id) {
                            Cntnt = Cntnt + '<div class="row" >' +
                                '   <div class="col" >' +
                                '       <div class="input-group">' +
                                '           <div class="input-group-prepend" id="ActionToggleBtn_' + item._id + '">' +
                                '               <div class="input-group-text">' +
                                '                   <i class="far fa-smile-wink"> </i>' +
                                '               </div>' +
                                '           </div>' +
                                '           <input alerto="' + item.user._id + '" refid="' + item._id + '" class="form-control" type="text" placeholder="' + SJ_LANG.ph_your_comment_here + '" id="E_Comment_' + item._id + '">' +
                                '           <button alerto="' + item.user._id + '" class="btn btn-sm btn-prymary" value="' + item._id + '" id="SaveComent_' + item._id + '"> ' + SJ_LANG.txt_send + '</button>' +
                                '       </div>' +
                                '   </div>' +
                                '</div>';
                        }

                        Cntnt = Cntnt + '<div class="row" >' +
                            '   <div class="col" >' +
                            '       <div id="EmojiTab_' + item._id + '" style="display:none">' +
                            '       </div>' +
                            '   </div>' +

                            '</div>';

                        Cntnt = Cntnt +
                            '<div class="row">' +
                            '<div class="col" id="ReplyCommentsSP_' + item._id + '">' +

                            '</div>' +
                            '</div>';



                        Cntnt = Cntnt + '<div class="row">' +
                            '<div class="col"> <br>' +
                            '<button value="' + item._id + '" id="LoadMoreComments_' + item._id + '" class="btn btn-block btn-sm btn-outline-primary">' + SJ_LANG.txt_load_more + '</button>' +
                            '</div>' +
                            '</div>' +
                            '</div></div></div> ';
                        $('#Space4Commentsthis_').append(Cntnt);
                        llamaEqualizer('#EqualizeThis_' + item.user._id);

                        var ELEMNT = item._id
                        $.contextMenu({
                            selector: '#CommentReport_' + item._id,
                            trigger: 'left',
                            callback: function (key, options) {

                                if (key == 'reportComment') {
                                    // console.log('Element', ELEMNT, options)
                                    $('#myDataModalReport').modal('show');
                                    KindReport = 'comment';
                                    el4reportId = ELEMNT
                                    $('#SPReportComment_').show()
                                    $('#SPReportPost_').hide()
                                }
                            },
                            items: {
                                "reportComment": { name: SJ_LANG.txt_report_comment, icon: "fas fa-bug" },
                            }
                        });

                        $('#ReplySpace_' + item._id).hide();
                        $('#Reply_this_' + item._id).click(function () {
                            $('#ReplySpace_' + item._id).slideToggle({ duration: 1000 });
                            PageRP = 0;
                            nomoreRP = false;

                            $('#ReplyCommentsSP_' + item._id).html('');
                            $('#LoadMoreComments_' + item._id).click();

                        });

                        $('#LoadMoreComments_' + item._id).click(function () {
                            var id = $(this).val();
                            $('#LoadMoreComments_' + id).show();
                            callMoreComments(id);
                        });


                        $('#cmntEdit_' + item._id).click(function () {
                            var id = $(this).val();
                            var TXT = $('#CommentTXT_' + id).text();
                            $('#E_Comment_').val(TXT);
                            ThisCommentEdit = id;
                            scrollTo('#E_Comment_');
                        });

                        $('#ActionToggleBtn_' + item._id).click(function () {
                            $('#EmojiTab_' + item._id).slideToggle({ duration: 1000 });
                        });
                        llenaEmojiTab('#EmojiTab_' + item._id, '#E_Comment_' + item._id);

                        $('#SaveComent_' + item._id).click(function () {
                            var Value = $(this).val();
                            SaveReply(Value);
                        })

                        $('#E_Comment_' + item._id).keypress(function (e) {
                            var Value = $(this).attr('refid');
                            if (e.which == 13) {
                                SaveReply(Value);
                                return false;
                            }
                        });
                    });
                } else {
                    nomore = true;
                }
            }
        }).fail(function (err) {
            console.error(err);
        });
    }

    // trae sub-comentarios del post
    var callMoreComments = function (idParent) {
        $.ajax({
            url: "/api/reply",
            dataType: 'json',
            data: {
                "sort": { "date_posted": "asc" },
                "strictsearch": { "product": SJ_PRODUCT_ID, comment: idParent },
                "paginate": { "page": PageRP, "limit": PbyChargeRP },
            }
        }).done(function (data) {
            if (data.success == true) {

                if (Number(data.count) < PbyChargeRP) {
                    nomoreRP = true;
                    $('#LoadMoreComments_' + idParent).hide();
                }
                if (Number(data.count) > 0) {
                    $.each(data.data, function (i, item) {

                        let LineComentPlus = '&nbsp;';
                        let LineComentRepl = '&nbsp;';

                        if (SJ_SESSION && SJ_SESSION._id == item.user._id) {
                            LineComentPlus = '<button id="cmntEditRP_' + item._id + '"  value="' + item._id + '" class=" btn btn-default btn-sm  noMargin Action " href="#">' + SJ_LANG.txt_edit + '</button>' +
                                '<button  value="' + item._id + '" class="btn btn-default btn-sm  noMargin Action cmntDeleteReply_" href="#">' + SJ_LANG.txt_delete + '</button>' +
                                LineComentPlus;
                        }

                        if (SJ_SESSION && SJ_SESSION._id != item.user._id) {
                            LineComentRepl = '<button id="ReplyChild_' + item._id + '" userid="' + item.user._id + '"  username="' + item.user.username + '" value="' + item._id + '" class=" btn btn-default btn-sm  noMargin Action " href="#">' + SJ_LANG.txt_respond + '</button>' +
                                LineComentRepl;
                        }


                        var Cntnt = ' <div id="CompleteReply_' + item._id + '" class="row noMargin">' +
                            '<div class="col-sm-2 noMargin">' +
                            '<br>' +
                            '<a href="/profile/' + item.user._id + '"><img id="EqualizeThis_' + item.user._id + '" class="img lnx_eqlzr-circle" src="' + item.user.provider_picture + '"></a>' +
                            '</div>' +
                            '<div class="col-sm-10 noMargin">' +
                            '<br><div class="comment noMargin">' +

                            '<p class="noMargin" align="right">' +
                            '<button  class="btn btn-circle btn-outline-default btn-sm noMargin" id="SubCommentReport_' + item._id + '"><i class="fas fa-caret-down"></i></button>' +
                            '</p>' +

                            '<small class="hour float-right">' + item.date_posted + '</small>' +
                            '<a class="commentName" href="/profile/' + item.user._id + '">' + item.user.username + '</a>' +
                            '<p  id="CommentTXTReply_' + item._id + '" class="noMargin" align="justify"> ' + FindArrobasandMAKEIT(item.reply) + '</p>' +
                            '<p class="noMargin" align="right">' +
                            LineComentPlus +
                            LineComentRepl +
                            '</p>' +
                            '</div></div></div> ';

                        $('#ReplyCommentsSP_' + idParent).append(Cntnt);
                        llamaEqualizer('#EqualizeThis_' + item.user._id);


                        var ELEMNT = item._id
                        $.contextMenu({
                            selector: '#SubCommentReport_' + item._id,
                            trigger: 'left',
                            callback: function (key, options) {
                                if (key == 'reportComment') {

                                    $('#myDataModalReport').modal('show');
                                    KindReport = 'subcomment';
                                    el4reportId = ELEMNT
                                    $('#SPReportComment_').show()
                                    $('#SPReportPost_').hide()
                                }
                            },
                            items: {
                                "reportComment": { name: SJ_LANG.txt_report_comment, icon: "fas fa-bug" },
                            }
                        });

                        $('#cmntEditRP_' + item._id).click(function () {
                            var id = $(this).val();
                            var TXT = $('#CommentTXTReply_' + id).text();
                            $('#E_Comment_' + idParent).val(TXT);
                            ThisCommentEditReply = id;
                            scrollTo('#E_Comment_' + idParent);
                        });


                        $('#ReplyChild_' + item._id).click(function () {
                            var id = $(this).val();
                            var user = $(this).attr('username');
                            isChildResponse = $(this).attr('userid');
                            var TXT = '@' + user + ' ';
                            $('#E_Comment_' + idParent).val(TXT);
                            scrollTo('#E_Comment_' + idParent);
                        });

                    });
                    PageRP++;
                } else {
                    nomoreRP = true;
                    $('#LoadMoreComments_' + idParent).hide();
                }
            }
        }).fail(function (err) {
            console.error(err);
        })

    }

    // Gusrda sub-comentarios del post
    var SaveReply = function (idParent) {

        var alerto = $('#E_Comment_' + idParent).attr('alerto')

        var msg = $('#E_Comment_' + idParent).val();

        if (!msg || msg == '') {
            return 0;
        }
        if (ThisCommentEditReply == false) {
            $.post('/api/reply', {
                user: SJ_SESSION._id,
                post: SJ_P_ID,
                product: SJ_PRODUCT_ID,
                reply: remove_Html_tags(msg),
                comment: idParent
            }, function (data) {
                if (data.success) {
                    nomoreRP = false;
                    PageRP = 0;
                    $('#LoadMoreComments_' + idParent).show();
                    $('#ReplyCommentsSP_' + idParent).html('');
                    $('#LoadMoreComments_' + idParent).click();
                    $('#EmojiTab_' + idParent).hide()
                    $('#E_Comment_' + idParent).val('')
                    ThisCommentEditReply = false;
                    if (SJ_SESSION._id !== alerto) {
                        alertT_(2, SJ_SESSION._id, alerto, remove_Html_tags(msg), SJ_P_ID, idParent)
                    }
                    if (isChildResponse) {
                        alertT_(2, SJ_SESSION._id, isChildResponse, remove_Html_tags(msg), SJ_P_ID, idParent)
                        isChildResponse = false;
                    }

                }
            });
        } else {
            $.ajax({
                method: 'PUT',
                url: '/api/reply/' + ThisCommentEditReply,
                data: {
                    reply: remove_Html_tags(msg)
                }
            }).done(function (data) {
                $('#EmojiTab_' + idParent).hide()
                $('#E_Comment_' + idParent).val('')
                $('#CommentTXTReply_' + ThisCommentEditReply).text(msg)
                ThisCommentEditReply = false;
            }).fail(function (err) {
                console.log(err)
                $('#E_Comment_' + idParent).val('')
                ThisCommentEditReply = false;
            });
        }
    }

    // trae comentarios del producto
    var Get_all_Coments_all = function (isAppend) {
        if (nomore2) {
            return 0;
        }

        $.ajax({
            url: "/api/comment",
            dataType: 'json',
            data: {
                "sort": { "date_posted": "desc" },
                "strictsearch": { "product": SJ_PRODUCT_ID },
                "paginate": { "page": Page2, "limit": PbyCharge2 },
            }
        }).done(function (data) {
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    if (!isAppend) {
                        $('#Space4Commentsproduct_').html('');
                    }
                    // OBJ.col1 = OBJ.col1 + '<a href="/post/' + item._id + '"><img data-src="' + item.thumbnail + '" class="img-thumbnail  img-center lazy"></a>'
                    $.each(data.data, function (i, item) {
                        var Cntnt = ' <div class="row noMargin">' +
                            '<div class="col-sm-2 noMargin">' +
                            '<br>' +
                            '<a href="/profile/' + item.user._id + '"><img id="EqualizeThis_' + item.user._id + '" class="img lnx_eqlzr-circle" src="' + item.user.provider_picture + '"></a>' +
                            '</div>' +
                            '<div class="col-sm-10 noMargin">' +
                            '<br><div class="comment noMargin">' +

                            '<p class="noMargin" align="right">' +
                            '<button  class="btn btn-circle btn-outline-default btn-sm noMargin" id="CommentReportS_' + item._id + '"><i class="fas fa-caret-down"></i></button>' +
                            '</p>' +

                            '<small class="hour float-right">' + item.date_posted + '</small>' +
                            '<a class="commentName" href="/profile/' + item.user._id + '">' + item.user.username + '</a>' +
                            '<p  id="CommentTXTAll_' + item._id + '" class="noMargin" align="justify"> ' + FindArrobasandMAKEIT(item.comment) + '</p>' +

                            '</div></div></div> ';

                        $('#Space4Commentsproduct_').append(Cntnt);
                        llamaEqualizer('#EqualizeThis_' + item.user._id);
                        var ELEMNT = item._id
                        $.contextMenu({
                            selector: '#CommentReportS_' + item._id,
                            trigger: 'left',
                            callback: function (key, options) {

                                if (key == 'reportComment') {
                                    // console.log('Element', ELEMNT, options)
                                    $('#myDataModalReport').modal('show');
                                    KindReport = 'comment';
                                    el4reportId = ELEMNT
                                    $('#SPReportComment_').show()
                                    $('#SPReportPost_').hide()

                                }
                            },
                            items: {
                                "reportComment": { name: SJ_LANG.txt_report_comment, icon: "fas fa-bug" },
                            }
                        });
                    });

                } else {
                    nomore2 = true;
                }

            }

        }).fail(function (err) {
            console.error(err);
        });
    }



    // llama las funciones de comentarios
    Get_all_Coments_this(false);
    Get_all_Coments_all(false);

    // invoca la creacion de la seccion de emojis
    llenaEmojiTab('#EmojiTab_', '#E_Comment_');

    // oculta o muestra el emoji
    $('#ActionToggleBtn').click(function () {
        $('#EmojiTab_').toggle()
    })




    // intenta activar el post de FB
    try {
        fbAsyncInit();
        $('#post').autoResizeFbPost();
    } catch (err) {
        CallFB();
        $('#post').autoResizeFbPost();
    }



});