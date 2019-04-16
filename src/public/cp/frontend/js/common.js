DT_en_usLang = {};
DT_es_mxLang = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
};




HoldOptions = {
    theme: "sk-circle",
    message: 'Espere... ',
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
}

SummerOptionsESimg = {
    lang: 'es-ES',
    height: 300,
    fontNames: ['SplendidN', 'Travelling', 'SplendidB', 'Lemon', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
    fontNamesIgnoreCheck: ['SplendidN', 'Travelling', 'SplendidB', 'Lemon', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
    toolbar: [
        // [groupName, [list of button]]
        ['fontname', ['fontname']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['type', 'strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['link', 'hr', 'picture', 'video', 'table']],
        ['misc', ['fullscreen', 'undo', 'redo', 'codeview']]

    ],
    placeholder: 'Ingresa aqui tu texto...'
};

SummerOptionsENimg = {
    height: 300,
    fontNames: ['SplendidN', 'Travelling', 'SplendidB', 'Lemon', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
    fontNamesIgnoreCheck: ['SplendidN', 'Travelling', 'SplendidB', 'Lemon', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],

    toolbar: [
        // [groupName, [list of button]]
        ['fontname', ['fontname']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['type', 'strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['link', 'hr', 'picture', 'video', 'table']],
        ['misc', ['fullscreen', 'undo', 'redo', 'codeview']]

    ],
    placeholder: 'Insert text here...'
};


SummerOptionsES = {
    lang: 'es-ES',
    height: 300,
    fontNames: ['SplendidN', 'Travelling', 'SplendidB', 'Lemon', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
    fontNamesIgnoreCheck: ['SplendidN', 'Travelling', 'SplendidB', 'Lemon', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
    toolbar: [
        // [groupName, [list of button]]
        ['fontname', ['fontname']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['type', 'strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['link', 'hr']],
        ['misc', ['fullscreen', 'undo', 'redo', 'codeview']]

    ],
    placeholder: 'Ingresa aqui tu texto...'
};

SummerOptionsEN = {
    height: 300,
    fontNames: ['SplendidN', 'Travelling', 'SplendidB', 'Lemon', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
    fontNamesIgnoreCheck: ['SplendidN', 'Travelling', 'SplendidB', 'Lemon', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],

    toolbar: [
        // [groupName, [list of button]]
        ['fontname', ['fontname']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['type', 'strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['link', 'hr']],
        ['misc', ['fullscreen', 'undo', 'redo', 'codeview']]

    ],
    placeholder: 'Insert text here...'
};


var CutAtFirstDouble = function (str) {
    if (str.includes(':')) {
        str = str.split(':');
        content = '';
        for (var i = 1; i < str.length; i++) {
            content = content + str[i];
        }
        return {
            title: str[0],
            content: content
        }

    } else {
        return {
            title: str.substring(0, 20),
            content: str.substring(21)
        }
    }
}

var ValidateFile = function (obj) {

    if (!obj || obj.val() == '') {
        obj.val('');
        return false;
    }
    var arch = obj[0].files[0];
    if (arch.size > 1024 * 1024 * 5) {
        alert('');
        alertify.error('Error: El archivo no debe ser mayor a 5MB.');
        obj.val('');
        return false;
    }
    var name = obj.val();
    if (name.toLowerCase().includes('.jpg') || name.toLowerCase().includes('.png') || name.toLowerCase().includes('.gif') || name.toLowerCase().includes('.jpeg')) {
        return true;
    } else {
        obj.val('');
        alertify.error('Error: El tipo de archivo es Invalido.');
        return false;
    }


}

var TableDescription = function (str) {
    return str.replace(/<(?:.|\n)*?>/gm, '').substring(0, 120) + '... ';
}


// fb SDK

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


//tw sdk

window.twttr = (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));


var getKeyvideoYoutube = function (url) {
    return url.split('=')[1];
}

var makeHastags = function (content) {

    if (content && content.includes('#')) {
        var exist = []
        var arr = content.match(/#[a-z_.,]+/g);
        for (var i = 0; i < arr.length; i++) {
            content = content.replace(arr[i] + ' ', '<a href="/hashtag/' + arr[i].replace('#', '').replace('.', '').replace(',', '') + '" target="_blank"> ' + arr[i] + ' </a>')
            if (i == arr.length - 1) {
                content = content.replace(arr[i], '<a href="/hashtag/' + arr[i].replace('#', '').replace(',', '').replace(',', '') + '" target="_blank"> ' + arr[i] + ' </a>')
            }
        }
    }
    return content;
}


$(document).ready(function () {

    setTimeout(function () {
        $('.note-editable').css('font-size', '14px');
        $('.note-editable').css('font-family', 'Travelling');
    }, 1000)


    jQuery.fn.autoResizeFbPost = function () {

        var fixWidth = function ($container, $clonedContainer, doParse) {
            // default parameter. 
            doParse = typeof doParse == 'undefined' ? true : doParse;
            var updatedWidth = $container.width();
            // update all div.fb-post with correct width of container
            var isMobile = window.matchMedia("only screen and (max-width: 600px)");

            if (isMobile.matches) {
                //Conditional script here  
                if (window.matchMedia("(orientation: portrait)").matches) {
                    // you're in PORTRAIT mode
                    updatedWidth = $(window).width();
                }

                if (window.matchMedia("(orientation: landscape)").matches) {
                    // you're in LANDSCAPE mode
                    updatedWidth = $(window).height();
                }
            }

            $clonedContainer
                .find('div.fb-post')
                .each(function () {
                    $(this).attr('data-width', updatedWidth);
                });
            $('div.embedded', $clonedContainer).each(function () {
                $(this).attr('max-width', updatedWidth);
            });
            // update page with adjusted markup
            $container.html($clonedContainer.html());

            //should we call FB.XFBML.parse? we don't want to do this at page load because it will happen automatically
            if (doParse && FB && FB.XFBML && FB.XFBML.parse)
                FB.XFBML.parse();
        };

        return this.each(function () {

            var $container = $(this),
                $clonedContainer = $container.clone();

            // make sure there is a .fb-post element before we do anything.
            if (!$container.find('div.fb-post').length) {
                return false;
            }

            // execute once (document.ready) and do not call FB.XFBML.parse()
            fixWidth($container, $clonedContainer, false);

            $(window).bind('resize', function () {
                fixWidth($container, $clonedContainer);
            }).trigger('resize');
        });
    };
})




var alertT_ = function (kind, IDfrom, IDto, txt, IDref, id_parentComment) {

    $.post('/api/useralert', {
        from: IDfrom,
        to: IDto,
        ref_post: IDref,
        comment: txt ? txt : 'N/A',
        kind: kind,
        parent_comment: id_parentComment
    }, function (data) {
        if (data.success) {

        }
    }).fail(function (err) {
        console.error(err);
    })
}


var FindArrobasandMAKEIT = function (content) {

    if (content && content.includes('@')) {
        console.log('arrobar pa robar')

        var arr = content.match(/@[a-z_.,]+/g);
        for (var i = 0; i < arr.length; i++) {
            content = content.replace(arr[i] + ' ', '<a href="/user/' + arr[i].replace('@', '').replace('.', '').replace(',', '') + '" target="_blank"> ' + arr[i] + ' </a>')
            if (i == arr.length - 1) {
                content = content.replace(arr[i], '<a href="/user/' + arr[i].replace('@', '').replace(',', '').replace(',', '') + '" target="_blank"> ' + arr[i] + ' </a>')
            }
        }
    }
    return content;
}

var FindArrobasandRemoveIT = function (content) {

    if (content && content.includes('@')) {
        console.log('arrobar pa robar')

        var arr = content.match(/@[a-z_.,]+/g);
        for (var i = 0; i < arr.length; i++) {
            content = content.replace(arr[i] + ' ', '')
            if (i == arr.length - 1) {
                content = content.replace(arr[i], '')
            }
        }
    }
    return content;
}



if (!String.fromCodePoint) {
    // ES6 Unicode Shims 0.1 , © 2012 Steven Levithan http://slevithan.com/ , MIT License
    String.fromCodePoint = function fromCodePoint() {
        var chars = [], point, offset, units, i;
        for (i = 0; i < arguments.length; ++i) {
            point = arguments[i];
            offset = point - 0x10000;
            units = point > 0xFFFF ? [0xD800 + (offset >> 10), 0xDC00 + (offset & 0x3FF)] : [point];
            chars.push(String.fromCharCode.apply(null, units));
        }
        return chars.join("");
    }
}

function toUnicode(code) {
    var codes = code.split('-').map(function (value, index) {
        return parseInt(value, 16);
    });
    try {
        return String.fromCodePoint.apply(null, codes);
    } catch (err) {
        //console.error('Error en emoji: ' + err)
        return '';
    }

}


var Emoji_categories = [
    { name: 'people', label: 'People', icon: 'Smiles' },
    { name: 'nature', label: 'Nature', icon: 'Nature' },
    { name: 'food', label: 'Food', icon: 'Food' },
    { name: 'activity', label: 'Activities', icon: 'Activities' },
    { name: 'travel', label: 'Travel & Places', icon: 'Travel/Places' },
    { name: 'object', label: 'Objects', icon: 'Objects' },
    { name: 'symbol', label: 'Symbols', icon: 'Symbols' },
    { name: 'flag', label: 'Flags', icon: 'Flags' }
];

var llenaEmojiTab = function (space, input) {
    var spaceN = space.replace('#', '').replace('.', '')
    $(space).html(
        '<div class="row">' +
        '<div class="col-sm-12"> <center id="btnS_' + spaceN + '"> </center></div>' +
        '</div> <hr class="noMargin">' +
        '<div class="row">' +
        '<div style="max-height:100px; overflow-y:auto;" class="col" id="emojiS_' + spaceN + '"></div>' +
        '</div>'
    );
    $.each(Emoji_categories, function (i, item) {
        $('#btnS_' + spaceN).append('<button value="' + item.name + '" id="btn_' + spaceN + '_' + item.name + '" class="btn btn-outline-default btn-sm">' + item.icon + '</button>');
        $('#btn_' + spaceN + '_' + item.name).click(function () {
            var cat = $(this).val()
            $('#emojiS_' + spaceN).html('');
            $.each(global_emojis, function (x, xtem) {
                if (cat == xtem.category) {
                    $('#emojiS_' + spaceN).append('<button id="' + spaceN + 'Xemoji_' + xtem.unicode.apple + '" class="btn btn-outline-default btn-circle noMargin .XEmojiButtn_' + spaceN + '" value="' + xtem.unicode.apple + '">' + toUnicode(xtem.unicode.apple) + '</button>');
                    $('#' + spaceN + 'Xemoji_' + xtem.unicode.apple).click(function () {
                        var Myemoji = $(this).val()

                        var inpt = $(input).val();
                        $(input).val(inpt + toUnicode(Myemoji));
                    })
                }
            })
        });
    });
    $('#btn_' + spaceN + '_' + 'people').click();






}

var remove_Html_tags = function (str) {
    return str.replace(/<(?:.|\n)*?>/gm, '');
}