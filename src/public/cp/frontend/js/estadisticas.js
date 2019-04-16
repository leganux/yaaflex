

$(document).ready(function () {

    var colors = ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850']


    var ConfigureChart = function (el, labels, datasets, title, fill, kind) {
        el.canvas.width = 1000;
        el.canvas.height = 300;


        $.each(datasets, function (i, item) {
            var ran = Math.floor(Math.random() * colors.length);
            var myc = colors[ran];
            item.borderColor = myc;
            item.backgroundColor = myc;
            item.fill = fill ? fill : false;
        })
        return {
            type: kind ? kind : 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                title: {
                    display: true,
                    text: title
                }
            }
        };
    }

    /* var ctx = document.getElementById('userCanvas').getContext('2d');
     var cfg = ConfigureChart(ctx, labels, datasets, 'Usuarios Nuevos', false);
     var chartUsers = new Chart(ctx, cfg);*/

    $.getJSON('/api/user', {}, function (data) {
        if (data.success && data.count > 0) {
            var labels = []
            var pos = {}
            var labelsSocial = []
            var posSocial = {}

            var labelsGender = []
            var posGender = {}
            $.each(data.data, function (i, item) {
                //usuarios registrados por fecha
                var fecha = moment(item.dt_reg).format('D/M/YYYY');
                if (!labels.includes(fecha)) {
                    labels.push(fecha);
                    pos[fecha] = 1;
                } else {
                    pos[fecha] = pos[fecha] + 1;
                }

                //usuarios  de red social que proviene

                var provider = item.provider
                if (!labelsSocial.includes(provider)) {
                    labelsSocial.push(provider);
                    posSocial[provider] = 1;
                } else {
                    posSocial[provider] = posSocial[provider] + 1;
                }

                //usuarios  genero

                if (item.gender) {
                    var gender = item.gender
                    if (!labelsGender.includes(gender)) {
                        labelsGender.push(gender);
                        posGender[gender] = 1;
                    } else {
                        posGender[gender] = posGender[gender] + 1;
                    }
                }

            });

            //usuarios registrados por fecha
            var datas = [];
            $.each(labels, function (i, item) {
                datas.push(pos[item]);
            });

            var datasets = [{
                data: datas,
                label: ''
            }];

            var ctx = document.getElementById('userCanvas').getContext('2d');
            var cfg = ConfigureChart(ctx, labels, datasets, 'Usuarios Nuevos', false);
            new Chart(ctx, cfg);

            //usuarios  de red social que proviene
            var dataSocial = [];
            $.each(labelsSocial, function (i, item) {
                dataSocial.push(posSocial[item]);
            });

            var datasetsSocial = [{
                data: dataSocial,
                label: ''
            }];

            var ctx = document.getElementById('userOrigenCanvas').getContext('2d');
            var cfg = ConfigureChart(ctx, labelsSocial, datasetsSocial, 'Red Social de origen', true, 'bar');
            new Chart(ctx, cfg);

            //usuarios  genero
            var dataGender = [];
            $.each(labelsGender, function (i, item) {
                dataGender.push(posGender[item]);
            });

            var datasetsGender = [{
                data: dataGender,
                label: ''
            }];

            var ctx = document.getElementById('userGenderCanvas').getContext('2d');
            var cfg = ConfigureChart(ctx, labelsGender, datasetsGender, 'Genero de los usuarios', true, 'bar');
            new Chart(ctx, cfg);

        }
    });


    $.getJSON('/api/post', {}, function (data) {
        if (data.success && data.count > 0) {
            var labels = []
            var pos = {}

            var labelsSocial = []
            var posSocial = {}

            var labelsUser = []
            var posUser = {}



            $.each(data.data, function (i, item) {
                //Post registrados por fecha
                var fecha = moment(item.dte_reg).format('D/M/YYYY');
                if (!labels.includes(fecha)) {
                    labels.push(fecha);
                    pos[fecha] = 1;
                } else {
                    pos[fecha] = pos[fecha] + 1;
                }

                //Post registrados por origen
                var origen = item.origin;
                if (!labelsSocial.includes(origen)) {
                    labelsSocial.push(origen);
                    posSocial[origen] = 1;
                } else {
                    posSocial[origen] = posSocial[origen] + 1;
                }

                //Post registrados por usuario
                if (item.autor) {
                    var user = item.autor.username;
                    if (!labelsUser.includes(user)) {
                        labelsUser.push(user);
                        posUser[user] = 1;
                    } else {
                        posUser[user] = posUser[user] + 1;
                    }
                }

            });

            //post registrados por usuario
            var datasUsuario = [];
            $.each(labelsUser, function (i, item) {
                datasUsuario.push(posUser[item]);
            });

            var datasetsusuario = [{
                data: datasUsuario,
                label: ''
            }];

            var ctx = document.getElementById('postCanvasbyuser').getContext('2d');
            var cfg = ConfigureChart(ctx, labelsUser, datasetsusuario, 'Post por usuario', true, 'bar');
            new Chart(ctx, cfg);

            //post registrados por fecha
            var datas = [];
            $.each(labels, function (i, item) {
                datas.push(pos[item]);
            });

            var datasets = [{
                data: datas,
                label: ''
            }];

            var ctx = document.getElementById('postCanvas').getContext('2d');
            var cfg = ConfigureChart(ctx, labels, datasets, 'Post registrados por dia', false);
            new Chart(ctx, cfg);

            //post registrados por origen
            var dataSocial = [];
            $.each(labelsSocial, function (i, item) {
                dataSocial.push(posSocial[item]);
                if (item == 1) {
                    labelsSocial[i] = 'Instagram'
                }
                if (item == 2) {
                    labelsSocial[i] = 'Youtube'
                }
                if (item == 3) {
                    labelsSocial[i] = 'Facebook'
                }
                if (item == 4) {
                    labelsSocial[i] = 'URL'
                }
                if (item == 5) {
                    labelsSocial[i] = 'Upload'
                }
            });

            var datasetsSocial = [{
                data: dataSocial,
                label: ''
            }];

            var ctx = document.getElementById('postCanvasSocial').getContext('2d');
            var cfg = ConfigureChart(ctx, labelsSocial, datasetsSocial, 'Fuente de post', true, 'bar');
            new Chart(ctx, cfg);


        }
    });

    $.getJSON('/api/comment', {}, function (data) {
        if (data.success && data.count > 0) {
            var labels = []
            var pos = {}

            var labelsUser = []
            var posUser = {}


            $.each(data.data, function (i, item) {
                //comments registrados por post
                var fecha = item.post._id
                if (!labels.includes(fecha)) {
                    labels.push(fecha);
                    pos[fecha] = 1;
                } else {
                    pos[fecha] = pos[fecha] + 1;
                }

                //comments registrados por usuario
                var user = item.user.username
                if (!labelsUser.includes(user)) {
                    labelsUser.push(user);
                    posUser[user] = 1;
                } else {
                    posUser[user] = posUser[user] + 1;
                }

            });

            //comments registrados por post
            var datas = [];
            $.each(labels, function (i, item) {
                datas.push(pos[item]);
            });

            var datasets = [{
                data: datas,
                label: ''
            }];

            var ctx = document.getElementById('commentCanvas').getContext('2d');
            var cfg = ConfigureChart(ctx, labels, datasets, 'Comentarios por Posts', true, 'bar');
            new Chart(ctx, cfg);

            //comments registrados por user
            var datasuser = [];
            $.each(labelsUser, function (i, item) {
                datasuser.push(posUser[item]);
            });

            var datasetsuser = [{
                data: datasuser,
                label: ''
            }];

            var ctx = document.getElementById('commentCanvasbyuser').getContext('2d');
            var cfg = ConfigureChart(ctx, labelsUser, datasetsuser, 'Comentarios por Usuario', true, 'bar');
            new Chart(ctx, cfg);




        }
    });


    $.getJSON('/api/postLikes', {}, function (data) {
        if (data.success && data.count > 0) {
            var labels = []
            var pos = {}

            $.each(data.data, function (i, item) {

                //likes registrados por post
                var fecha = item.post
                if (!labels.includes(fecha)) {
                    labels.push(fecha);
                    pos[fecha] = 1;
                } else {
                    pos[fecha] = pos[fecha] + 1;
                }



            });

            //comments registrados por post
            var datas = [];
            $.each(labels, function (i, item) {
                datas.push(pos[item]);
            });

            var datasets = [{
                data: datas,
                label: ''
            }];

            var ctx = document.getElementById('likespostCanvas').getContext('2d');
            var cfg = ConfigureChart(ctx, labels, datasets, 'Likes por Posts', true, 'bar');
            new Chart(ctx, cfg);



        }
    });


});