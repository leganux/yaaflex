

$(document).ready(function () {


    var CallServer = function () {

        $.getJSON('/finder/counters', {}, function (data) {
            if (data.success) {
                $('#countComments').text(data.data.countComments);
                $('#countReplys').text(data.data.countReply);
                $('#countAlerts').text(data.data.contAlerts);
                $('#countUsers').text(data.data.countUsers);
                $('#countPost').text(data.data.countPost);
                $('#countProducts').text(data.data.countProduct);
                $('#countReviewers').text(data.data.contReviewer);
            }
        });

        $.getJSON('/finder/os', {}, function (data) {
            if (data.success) {
                $('#TotalMemory').text(data.data.totalmem.toFixed(2) + 'MB');
                $('#FreeMemory').text(data.data.freemen.toFixed(2) + 'MB');
                $('#Uptime').text(data.data.uptime.toFixed(2) + 'HR');
                $('#freeDisk').text(data.data.freeDiskSpace.toFixed(2) + 'GB');
                $('#TotalDisk').text(data.data.totalDiskSpace.toFixed(2) + 'GB');
                $('#JSONCPUS').val(JSON.stringify(data.data.cpus));
                $('#hereishourserver').text(data.data.hora);

            }
        });
    }
    CallServer();
    setInterval(() => {
        CallServer();
    }, 10000);
});