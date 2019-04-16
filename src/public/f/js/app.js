//const SJ_NOTIF_MAIL = 'myscentjourney@gmail.com';
const SJ_NOTIF_MAIL = 'telodijeangel@gmail.com';
var SJ_POST_USER = {};



// ===== Scroll to Top ====
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
    }, 500);
});

// particles

let resizeReset = function () {
    html = document.documentElement;
    w = canvasBody.width = document.documentElement.clientWidth;
    h = canvasBody.height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
}
const opts = {
    particleColor: "rgb(234, 234, 234)",
    lineColor: "rgb(234, 234, 234)",
    particleAmount: 75,
    defaultSpeed: .2,
    variantSpeed: .5,
    defaultRadius: 3,
    variantRadius: 2,
    linkRadius: 200,
};
window.addEventListener("resize", function () {
    deBouncer();
});
let deBouncer = function () {
    clearTimeout(tid);
    tid = setTimeout(function () {
        resizeReset();
    }, delay);
};
let checkDistance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
let linkPoints = function (point1, hubs) {
    for (let i = 0; i < hubs.length; i++) {
        let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
        let opacity = 1 - distance / opts.linkRadius;
        if (opacity > 0) {
            drawArea.lineWidth = 0.5;
            drawArea.strokeStyle = 'rgba(234 , 234, 234, ' + opacity + ')';
            drawArea.beginPath();
            drawArea.moveTo(point1.x, point1.y);
            drawArea.lineTo(hubs[i].x, hubs[i].y);
            drawArea.closePath();
            drawArea.stroke();
        }
    }
}
Particle = function (xPos, yPos) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = opts.particleColor;
    this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
    this.vector = {
        x: Math.cos(this.directionAngle) * this.speed,
        y: Math.sin(this.directionAngle) * this.speed
    };
    this.update = function () {
        this.border();
        this.x += this.vector.x;
        this.y += this.vector.y;
    };
    this.border = function () {
        if (this.x >= w || this.x <= 0) {
            this.vector.x *= -1;
        }
        if (this.y >= h || this.y <= 0) {
            this.vector.y *= -1;
        }
        if (this.x > w) this.x = w;
        if (this.y > h) this.y = h;
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
    };
    this.draw = function () {
        drawArea.beginPath();
        drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        drawArea.closePath();
        drawArea.fillStyle = this.color;
        drawArea.fill();
    };
};
function setup() {
    particles = [];
    resizeReset();
    for (let i = 0; i < opts.particleAmount; i++) {
        particles.push(new Particle());
    }
    window.requestAnimationFrame(loop);
}
function loop() {
    window.requestAnimationFrame(loop);
    drawArea.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    for (let i = 0; i < particles.length; i++) {
        linkPoints(particles[i], particles);
    }
}
const canvasBody = document.getElementById("canvas"),
    drawArea = canvasBody.getContext("2d");
let delay = 200, tid,
    rgb = opts.lineColor.match(/\\d+/g);
resizeReset();
setup();

var CutAtFirstDouble = function (str) {
    if (str.includes(':')) {
        str = str.split(':');
        content = '';
        for (var i = 1; i < str.length; i++) {
            content = content + str[i];
        }
        return {
            title: str[0].trim(),
            content: content.trim()
        }

    } else {
        return {
            title: str.substring(0, 20).trim(),
            content: str.substring(21).trim()
        }
    }
}

var TableDescription = function (str) {
    return str.replace(/<(?:.|\n)*?>/gm, '').substring(0, 240) + '... ';
}
var remove_Html_tags = function (str) {
    return str.replace(/<(?:.|\n)*?>/gm, '');
}

var ValidateFile = function (obj) {

    if (!obj || obj.val() == '') {
        obj.val('');
        return false;
    }
    var arch = obj[0].files[0];
    if (arch.size > 1024 * 1024 * 5) {

        alert('Error: El archivo no debe ser mayor a 5MB.');
        obj.val('');
        return false;
    }
    var name = obj.val();
    if (name.toLowerCase().includes('.jpg') || name.toLowerCase().includes('.png') || name.toLowerCase().includes('.gif') || name.toLowerCase().includes('.jpeg')) {
        return true;
    } else {
        obj.val('');
        alert('Error: El tipo de archivo es Invalido.');
        return false;
    }
}

var ValidateFile2 = function (obj) {

    if (!obj || obj.val() == '') {
        obj.val('');
        return false;
    }
    var arch = obj[0].files[0];
    if (arch.size > 1024 * 1024 * 5) {

        alertInModal(SJ_LANG.txt_invalid_size_file);
        obj.val('');
        return false;
    }
    var name = obj.val();
    if (name.toLowerCase().includes('.jpg') || name.toLowerCase().includes('.png') || name.toLowerCase().includes('.gif') || name.toLowerCase().includes('.jpeg')) {
        return true;
    } else {
        obj.val('');
        alertInModal(SJ_LANG.txt_invalid_file_ype);
        return false;
    }
}

var alertInModal = function (text) {
    $('#Space_i_error').append('<div class="alert alert-danger alert-dismissible fade show" role="alert"> ' + text + '<button class="close" type="button" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
}

$('#CloseAlert_').click(function () {
    $('#ModalAlertMSG_').modal('hide')
})


var CallAlert = function (title, text) {
    $('#ModalAlertMSG_').modal('show')
    $('#AlertTitle_').text(title)
    $('#AlertText_').text(text)
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
    { name: 'people', label: 'People', icon: '<i class="fas fa-smile"></i>' },
    { name: 'nature', label: 'Nature', icon: '<i class="fas fa-tree"></i>' },
    { name: 'food', label: 'Food', icon: '<i class="fas fa-utensils"></i>' },
    { name: 'activity', label: 'Activities', icon: '<i class="fas fa-bicycle"></i>' },
    { name: 'travel', label: 'Travel & Places', icon: '<i class="fas fa-plane"></i>' },
    { name: 'object', label: 'Objects', icon: '<i class="fas fa-plug"></i>' },
    { name: 'symbol', label: 'Symbols', icon: '<i class="fas fa-om"></i>' },
    { name: 'flag', label: 'Flags', icon: '<i class="fas fa-flag"></i>' }
];

var llenaEmojiTab = function (space, input) {
    var spaceN = space.replace('#', '').replace('.', '')
    $(space).html(
        '<div class="row">' +
        '<div class="col"> <center id="btnS_' + spaceN + '"> </center></div>' +
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


var scrollTo = function (el) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(el).offset().top - 100
    }, 2000);
}


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


function setCookie(cname, cvalue, exdays) {
    if (!exdays) {
        exdays = 15;
    }
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


$.ajax({
    url: "/api/config",
    method: 'GET'
}).done(function (data) {
    if (data.success && data.data._IDuserScentJourney) {
        SJ_POST_USER = data.data._IDuserScentJourney;
    }
});