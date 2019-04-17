var RankingAcordes = []
var catEmoticonsS = []
var ActualVatoEmoticon = []
var ActualProduct = ''
$(document).ready(function () {

    var UPDATE = '';
    $('#summernote_ES').summernote(SummerOptionsES);
    $('#summernote_EN').summernote(SummerOptionsEN);

    var DTingred = $('#productos').DataTable({
        language: DT_es_mxLang,
        responsive: true,
        data: {},
        columns: [
            {
                data: "product_es",
                render: function (data, type, row) {
                    return '<span class="badge badge-dark">ES</span> <br>' + row.product_ES + '<hr> <span class="badge badge-dark">EN</span> <br>' + row.product_EN;
                }
            },
            {
                data: "description",
                render: function (data, type, row) {
                    return '<span class="badge badge-dark">ES</span> <br>' + TableDescription(row.description_ES) + '<hr> <span class="badge badge-dark">EN</span> <br>' + TableDescription(row.description_EN)
                }
            },
            {
                data: "img_url",
                render: function (data) {
                    return '<img width="60px" class="img-responsive img-thumbnail" src="' + data + '">'
                }
            },
            {
                data: "gender"
            },
            {
                data: "presentation"
            },
            {
                data: "nose",
                render: function (data, type, row) {
                    if (data) {
                        return '<center> <h5> ' + data.nose_ES + '</h5> <br>  <img width="50%" src="' + data.img_url + '"> </center>'
                    }
                    return '';
                }
            },
            {
                data: "brand",
                render: function (data, type, row) {
                    if (data) {
                        return '<center> <h5> ' + data.brand_ES + '</h5> <br>  <img width="50%" src="' + data.img_url + '"> </center>'

                    }
                    return '';

                }
            },
            {
                data: "accords",
                render: function (data, type, row) {
                    var cad = '';
                    $.each(data, function (i, item) {
                        cad = cad + '<li>' + item.accord_ES + ' / ' + item.accord_EN + ' </li>'
                    })
                    return '<center> <ul>' + cad + '</ul> </center>'
                }
            },
            {
                data: "gNotes",
                render: function (data, type, row) {
                    var cad = '';
                    $.each(data, function (i, item) {
                        cad = cad + '<li>' + item.ingredient_ES + ' / ' + item.ingredient_EN + ' </li>'
                    })
                    return '<center> <ul>' + cad + '</ul> </center>'
                }
            },
            {
                data: "bNotes",
                render: function (data, type, row) {
                    var cad = '';
                    $.each(data, function (i, item) {
                        cad = cad + '<li>' + item.ingredient_ES + ' / ' + item.ingredient_EN + ' </li>'
                    })
                    return '<center> <ul>' + cad + '</ul> </center>'
                }
            },
            {
                data: "mNotes",
                render: function (data, type, row) {
                    var cad = '';
                    $.each(data, function (i, item) {
                        cad = cad + '<li>' + item.ingredient_ES + ' / ' + item.ingredient_EN + ' </li>'
                    })
                    return '<center> <ul>' + cad + '</ul> </center>'
                }
            },
            {
                data: "tNotes",
                render: function (data, type, row) {
                    var cad = '';
                    $.each(data, function (i, item) {
                        cad = cad + '<li>' + item.ingredient_ES + ' / ' + item.ingredient_EN + ' </li>'
                    })
                    return '<center> <ul>' + cad + '</ul> </center>'
                }
            },
            {
                data: "cat_emoticons",
                render: function (data, type, row) {
                    var cad = '';
                    $.each(data, function (i, item) {
                        cad = cad + '<li>' + item.temp_ES + ' / ' + item.temp_EN + ' </li>'
                    })
                    return '<center> <ul>' + cad + '</ul> </center>'
                }
            },
            {
                data: "active",
                render: function (data, type, row) {
                    if (data) {
                        return '<center> <div class="checkbox"> <label> <input checked class="active_product" type="checkbox" value="' + row._id + '"></label> </div><c/enter> '
                    }
                    return '<center> <div class="checkbox"> <label> <input  class="active_product" type="checkbox" value="' + row._id + '"></label> </div></center> '

                }
            },
            /*  {
                  data: "tActive",
                  render: function (data, type, row) {
                      if (data) {
                          return '<center> <div class="checkbox"> <label> <input checked class="active_product_t" type="checkbox" value="' + row._id + '"></label> </div></center> '
                      }
                      return '<center> <div class="checkbox"> <label> <input  class="active_product_t" type="checkbox" value="' + row._id + '"></label> </div></center> '
  
                  }
              },*/
            {
                data: "_id",
                render: function (data, y, row) {
                    var btnAC = ''
                    var btnemo = ''
                    if (row.accords.length > 0) {
                        btnAC = '<button class="Cualify btn btn-success" value="' + data + '"><i class="fa fa-list"></i></button>';
                    }
                    if (row.cat_emoticons.length > 0) {
                        line = []
                        $.each(row.cat_emoticons, function (i, item) {
                            line.push(item._id)
                        })
                        btnemo = '<button info="' + line.join() + '" class="CualifyEMOS btn btn-info" value="' + data + '"><i class="fa fa-flickr"></i></button>';
                    }
                    return '<center>' +
                        '<button class="DeleteElement btn btn-danger" value="' + data + '"><i class="fa fa-trash"></i></button>'
                        + '<button class="EditElement btn btn-primary" value="' + data + '"><i class="fa fa-pencil"></i></button>'
                        + btnAC + btnemo
                        + '</center>'
                }
            },

        ]
    });

    $('#nuevo_elemento').click(function () {
        $('#myDataModal').modal('show');
        UPDATE = '';
        $('#txt_product_ES').val('')
        $('#summernote_ES').summernote('code', '')
        $('#txt_product_EN').val('')
        $('#summernote_EN').summernote('code', '')
        $('#img_product_save').val('')
        $('#img_product').val('')
        $('#gender_product').val(1)
        $('#presentation_product').val(0)
        cleanAllselect2();
    });

    $(document).on('click', '.EditElement', function () {
        UPDATE = $(this).val();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/product/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                data = data.data;
                $('#txt_product_ES').val(data.product_ES)
                $('#summernote_ES').summernote('code', data.description_ES)
                $('#txt_product_EN').val(data.product_EN)
                $('#summernote_EN').summernote('code', data.description_EN)
                $('#img_product_save').val(data.img_url);
                $('#gender_product').val(data.gender)
                $('#presentation_product').val(data.presentation)
                $('#nose_product').val(data.nose._id).trigger("change");
                $('#brand_product').val(data.brand._id).trigger("change");




                var b_notes = [];
                var m_notes = [];
                var t_notes = [];
                var g_notes = [];
                var acordess = [];
                var catemo = [];

                $.each(data.bNotes, function (i, item) {
                    b_notes.push(item._id);
                })
                $.each(data.mNotes, function (i, item) {
                    m_notes.push(item._id);
                })
                $.each(data.tNotes, function (i, item) {
                    t_notes.push(item._id);
                })
                $.each(data.gNotes, function (i, item) {
                    g_notes.push(item._id);
                })
                $.each(data.accords, function (i, item) {
                    acordess.push(item._id);
                })
                $.each(data.cat_emoticons, function (i, item) {
                    catemo.push(item._id);
                })
                $('#bNotes_product').val(b_notes).trigger("change");
                $('#mNotes_product').val(m_notes).trigger("change");
                $('#tNotes_product').val(t_notes).trigger("change");
                $('#gNotes_product').val(g_notes).trigger("change");
                $('#acords_product').val(acordess).trigger("change");

                $('#Emoticones_product').val(catemo).trigger("change");


                $('#myDataModal').modal('show');
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    });

    $(document).on('click', '.Cualify', function () {
        UPDATE = $(this).val();
        RankingAcordes = []
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/product/" + UPDATE,
        }).done(function (data) {
            HoldOn.close();
            $('#SlidersHERE_').html('');
            if (data.success == true) {
                data = data.data;
                var acordess = [];
                $.each(data.accords, function (i, item) {
                    acordess.push(item._id);
                    var inner = {}
                    inner.id = item._id;
                    inner.val = 100;
                    RankingAcordes.push(inner);
                    $('#SlidersHERE_').append('<hr><div class="row"> <div class="col-xs-12">' +
                        '<label>' + item.accord_ES + '/' + item.accord_EN + '</label>' +
                        '<input name="ageInputName_' + item._id + '" value="100" type="range" class="custom-range" min="0" max="100" step="1" id="RangueI_' + item._id + '">' +
                        ' <output name="ageOutputName_' + item._id + '" id="RangueO_' + item._id + '">100</output>' +
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
                    Getrank(UPDATE, item._id);
                })
                $('#myDataModalSliders').modal('show');

            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    });

    $(document).on('click', '.CualifyEMOS', function () {
        ActualVatoEmoticon = []
        ActualProduct = $(this).val()
        var linea = $(this).attr('info')
        linea = linea.split(',')
        $('#SlidersEmoticonosHERE_').html('')
        $('#myDataModalEmoticons').modal('show');
        $.each(catEmoticonsS, function (i, item) {
            $.each(linea, function (j, jtem) {
                if (item._id == jtem) {
                    $('#SlidersEmoticonosHERE_').append('<div class="col-sm-4"><center>' +
                        '<h3>' + item.temp_EN + '/' + item.temp_ES + '</h3>' +
                        '<hr>' +
                        '</center>' +
                        '<div id="SP_Emoticons_' + item._id + '"></div>' +
                        '</div>');

                    $.getJSON('/api/temp/emotion/' + jtem, {}, function (data) {
                        if (data.success) {
                            $.each(data.data, function (k, ktem) {
                                ActualVatoEmoticon.push(ktem._id);
                                $('#SP_Emoticons_' + ktem.temporalidad).append('<center>' +
                                    '<img  width="30px"  src="' + ktem.img_url + '">' +
                                    '<br><label>' + ktem.emotion_EN + '/' + ktem.emotion_EN + '</label>' +

                                    '<input category="' + ktem.temporalidad + '" value="0" type="range" class="custom-range" min="0" max="100" step="1" id="Range_Emo_' + ktem._id + '">' +
                                    '<input value="0%" id="nfo_X_' + ktem._id + '" class="form-control" disabled> ' +
                                    '</center>');
                                $('#Range_Emo_' + ktem._id).change(function () {
                                    var t = $(this).val();
                                    $('#nfo_X_' + ktem._id).val(t + '%');
                                })
                            });


                        }
                    })
                }
            });
        });
        callVotesEmotionsSaved();
    });




    var callVotesEmotionsSaved = function () {
        setTimeout(function () {

            $.getJSON('/api/emotionvotes/', {
                strictsearch: {
                    product: ActualProduct,
                    isSJ: true,
                },
            }, function (data) {
                if (data.success) {
                    $.each(data.data, function (i, item) {
                        $('#Range_Emo_' + item.emotion._id).val(item.voto)
                        $('#nfo_X_' + item.emotion._id).val(item.voto + '%')
                    });
                }
            });

        }, 350);


    };


    $('#SaveChangesEmoticonos_').click(function () {
        $.each(ActualVatoEmoticon, function (i, item) {
            var calf = $('#Range_Emo_' + item).val();
            var cat = $('#Range_Emo_' + item).attr('category');
            $.post('/api/emotionvotes/voteThis', {
                strictsearch: {
                    product: ActualProduct,
                    category: cat,
                    emotion: item,
                    isSJ: true,
                },
                voto: calf
            }, function (data) {
                $('#myDataModalEmoticons').modal('hide');
            });
        });
    });





    var Getrank = function (product, accord) {

        var StricT = {
            isSJ: true,
            product,
            accord
        }
        $.ajax({
            method: 'GET',
            data: {
                strictsearch: StricT,
                findOrCreate: true
            },
            url: '/api/accordrank',
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                var obj = {};
                if (data.isSingle) {
                    obj = data.data;
                } else {
                    obj = data.data[0];
                }

                $('#RangueI_' + obj.accord._id).val(obj.calification)
                $('#RangueO_' + obj.accord._id).val(obj.calification)
                $.each(RankingAcordes, function (i, item) {
                    if (item.id == obj.accord._id) {
                        RankingAcordes[i].val = obj.calification;
                    }
                })
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });

    }

    $('#SaveChangesSliders_').click(function () {
        $.each(RankingAcordes, function (i, item) {
            HoldOn.open(HoldOptions);
            var StricT = {
                isSJ: true,
                product: UPDATE,
                accord: item.id
            }
            $.ajax({
                method: 'POST',
                data: {
                    strictsearch: StricT,
                    rank: Number(item.val)
                },
                url: '/api/accordrank/rankThis',
            }).done(function (data) {
                HoldOn.close();
            }).fail(function (err) {
                HoldOn.close();
                alertify.error('Ocurrio un error  // An error have been ocurred');
                console.error(err);
            });
        });
        RankingAcordes = [];
        $('#myDataModalSliders').modal('hide')
    });

    $(document).on('click', '.DeleteElement', function () {
        DELETE = $(this).val();
        alertify.confirm('Confirma eliminar', '¿Seguro que desea eliminar este elemento? Esta Accion no tiene retorno.!', function () {
            HoldOn.open(HoldOptions);
            $.ajax({
                url: "/api/product/" + DELETE,
                method: "DELETE"
            }).done(function (data) {
                HoldOn.close();
                traeProducto();
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




    var traeProducto = function () {
        DTingred.clear().draw();
        HoldOn.open(HoldOptions);
        $.ajax({
            url: "/api/product",
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {

                    DTingred.clear().rows.add(data.data).draw();
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    }

    //catalogo de narices
    var getCatalogos = function () {
        $('#nose_product').html('')
        $('#brand_product').html('')
        $('#acords_product').html('')
        $('#bNotes_product').html('')
        $('#mNotes_product').html('')
        $('#tNotes_product').html('')
        $('#gNotes_product').html('')
        $('#Emoticones_product').html('')

        $('#nose_product').val(null).trigger("change");
        $('#brand_product').val(null).trigger("change");
        $('#acords_product').val(null).trigger("change");
        $('#bNotes_product').val(null).trigger("change");
        $('#mNotes_product').val(null).trigger("change");
        $('#tNotes_product').val(null).trigger("change");
        $('#gNotes_product').val(null).trigger("change");
        $('#Emoticones_product').val(null).trigger("change");

        $.ajax({
            url: "/api/temp",
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    catEmoticonsS = data.data;
                    $.each(data.data, function (i, item) {
                        $('#Emoticones_product').append('<option data-image="/cdn/assets/f/images/YAAFLEX.png" value="' + item._id + '" >' + item.temp_EN + '</option>');
                    })
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });

        // catalogo narices 
        $.ajax({
            url: "/api/nose",
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    $.each(data.data, function (i, item) {
                        $('#nose_product').append('<option data-image="' + item.img_url + '" value="' + item._id + '" >' + item.nose_ES + '</option>');
                    })
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });

        //catalogo de marcas
        $.ajax({
            url: "/api/brand",
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    $.each(data.data, function (i, item) {
                        $('#brand_product').append('<option data-image="' + item.img_url + '" value="' + item._id + '" >' + item.brand_ES + ' / ' + item.brand_EN + '</option>');
                    })
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });

        //catalogo de acordes
        $.ajax({
            url: "/api/accord",
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    $.each(data.data, function (i, item) {
                        $('#acords_product').append('<option data-image="' + item.img_url + '" value="' + item._id + '" >' + item.accord_ES + '</option>');
                    })
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });

        //catalogo de ingredientes
        $.ajax({
            url: "/api/ingredient",
        }).done(function (data) {
            HoldOn.close();
            if (data.success == true) {
                if (Number(data.count) > 0) {
                    $.each(data.data, function (i, item) {
                        $('#bNotes_product').append('<option data-image="' + item.img_url + '" value="' + item._id + '" >' + item.ingredient_ES + ' / ' + item.ingredient_EN + '</option>');
                        $('#mNotes_product').append('<option data-image="' + item.img_url + '" value="' + item._id + '" >' + item.ingredient_ES + ' / ' + item.ingredient_EN + '</option>');
                        $('#tNotes_product').append('<option data-image="' + item.img_url + '" value="' + item._id + '" >' + item.ingredient_ES + ' / ' + item.ingredient_EN + '</option>');
                        $('#gNotes_product').append('<option data-image="' + item.img_url + '" value="' + item._id + '" >' + item.ingredient_ES + ' / ' + item.ingredient_EN + '</option>');
                    })
                }
            }
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error  // An error have been ocurred');
            console.error(err);
        });
    }

    $('#img_product').change(function () {
        if (ValidateFile($(this))) {
            HoldOn.open(HoldOptions);
            var data = new FormData();
            data.append('Producto', $('#img_product')[0].files[0]);
            $.ajax({
                url: '/upload/image',
                data: data,
                contentType: false,
                processData: false,
                method: 'POST',
                success: function (data) {
                    HoldOn.close();
                    if (data.success) {
                        $('#img_product_save').val(data.file);
                    }
                },
                error: function (err) {
                    HoldOn.close();
                    alertify.error('Ocurrio un error con la imagen  // An error have been ocurred with the picture');
                    console.error(err);
                }
            });
        }
    })

    $('#SaveChanges').click(function () {
        if ($('#txt_product_ES').val() !== ''
            && !$('#summernote_ES').summernote('isEmpty')
            && $('#txt_product_EN').val() !== ''
            && !$('#summernote_EN').summernote('isEmpty')
            && Number($('#nose_product').val()) !== -1
            && Number($('#brand_product').val()) !== -1
        ) {
            var data = {
                product_ES: $('#txt_product_ES').val(),
                description_ES: $('#summernote_ES').summernote('code'),
                product_EN: $('#txt_product_EN').val(),
                description_EN: $('#summernote_EN').summernote('code'),
                img_url: $('#img_product_save').val(),
                gender: $('#gender_product').val(),
                presentation: $('#presentation_product').val(),
                nose: $('#nose_product').select2('data')[0].id,
                brand: $('#brand_product').select2('data')[0].id,

                accords: $('#acords_product').select2('data'),
                bNotes: $('#bNotes_product').select2('data'),
                mNotes: $('#mNotes_product').select2('data'),
                tNotes: $('#tNotes_product').select2('data'),
                gNotes: $('#gNotes_product').select2('data'),



            }


            var emo = $('#Emoticones_product').select2('data');
            console.log('llego A')
            var bnotes = []
            var mnotes = []
            var tnotes = []
            var gnotes = []
            var catemoticons = []
            var accordd = []


            for (var i = 0; i < emo.length; i++) {
                var item = emo[i]
                catemoticons.push(item.id)
            }



            $.each(data.bNotes, function (i, item) {
                bnotes.push(item.id)
            })
            $.each(data.mNotes, function (i, item) {
                mnotes.push(item.id)
            })
            $.each(data.tNotes, function (i, item) {
                tnotes.push(item.id)
            })
            $.each(data.gNotes, function (i, item) {
                gnotes.push(item.id)
            })
            $.each(data.accords, function (i, item) {
                accordd.push(item.id)
            })
            console.log('llego B')

            data.bNotes = bnotes;
            data.mNotes = mnotes;
            data.tNotes = tnotes;
            data.gNotes = gnotes;
            data.accords = accordd;
            data.cat_emoticons = catemoticons;

            var url = "/api/product";
            var method = 'POST';
            if (UPDATE !== '') {
                url = url + '/' + UPDATE;
                method = 'PUT'
            }

            console.log('llego C')
            $.ajax({
                url: url,
                method: method,
                data: data
            }).done(function (data) {
                HoldOn.close();
                $('#myDataModal').modal('hide');
                traeProducto();

                alertify.success('Guardado con exito! // Saved correctly');
                // location.reload()
            }).fail(function (err) {
                HoldOn.close();
                alertify.error('Ocurrio un error con  // An error have been ocurred ');
                console.error(err);
            });

        } else {
            alertify.error('Ingrese todos los datos / Insert all data');
        }

    });

    traeProducto();
    getCatalogos();

    function formatState(opt) {
        if (!opt.id) {
            return opt.text.toUpperCase();
        }

        var optimage = $(opt.element).attr('data-image');

        if (!optimage) {
            return opt.text;
        } else {
            var $opt = $(
                '<span ><img src="' + optimage + '" width="60px" /> ' + opt.text + '</span>'
            );
            return $opt;
        }
    };

    var toSelect = ['Emoticones_product', 'brand_product', 'nose_product', 'gNotes_product', 'bNotes_product', 'mNotes_product', 'tNotes_product', 'acords_product']

    var inicializeSelect2 = function (el) {
        $("#" + el).select2({
            width: 'resolve',
            templateResult: formatState,
            placeholder: "Select...",
            allowClear: true,
            dropdownParent: $("#myDataModal")
        });
        $("#" + el).select2('val', '')
    }


    $.each(toSelect, function (i, item) {
        inicializeSelect2(item)
    });

    var cleanAllselect2 = function () {
        $.each(toSelect, function (i, item) {
            $("#" + item).val(null).trigger("change");
        });
    }

    $(document.body).on('change', '.active_product', function () {
        isActive = $(this).prop('checked');
        vaule = $(this).val();
        $.ajax({
            url: '/api/product/' + vaule,
            method: 'PUT',
            data: { active: isActive }
        }).done(function (data) {
            HoldOn.close();
            $('#myDataModal').modal('hide');
            traeProducto();
            alertify.success('Guardado con exito! // Saved correctly');
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error con  // An error have been ocurred ');
            console.error(err);
        });

    });

    $(document.body).on('change', '.active_product_t', function () {
        isActive = $(this).prop('checked');
        vaule = $(this).val();
        $.ajax({
            url: '/api/product/' + vaule,
            method: 'PUT',
            data: { tActive: isActive }
        }).done(function (data) {
            HoldOn.close();
            $('#myDataModal').modal('hide');
            traeProducto();
            alertify.success('Guardado con exito! // Saved correctly');
        }).fail(function (err) {
            HoldOn.close();
            alertify.error('Ocurrio un error con  // An error have been ocurred ');
            console.error(err);
        });

    });


    var ventana = {};
    $('#_AddNose').click(function () {
        openInNewTab('/lx_admin/nariz');
    });

    $('#_AddBrand').click(function () {
        openInNewTab('/lx_admin/marca');
    });

    $('#_AddAcord').click(function () {
        openInNewTab('/lx_admin/acordes');
    });

    $('._AddING').click(function () {
        openInNewTab('/lx_admin/ingredientes');
    });

    function openInNewTab(url) {
        ventana = window.open(url, '_blank');
        ventana.focus();
        ventana.onbeforeunload = function () {
            getCatalogos();
        }
    }


    $('#txt_product_ES').change(function () {
        var value = $(this).val();
        if ($('#txt_product_EN').val() == "") {
            $('#txt_product_EN').val(value);
        }
    });

    $('#txt_product_EN').change(function () {
        var value = $(this).val();
        if ($('#txt_product_ES').val() == "") {
            $('#txt_product_ES').val(value);
        }
    });



});
