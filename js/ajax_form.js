$(document).ready(function () {
    $("form").submit(function () {
        var formID = $(this).attr('id');
        var formNm = $('#' + formID);
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: formNm.serialize(),
            success: function (data) {
                
                $('.nonebox').animate({
                    'top': '-1100px'
                });
                
                $('.overlay').fadeIn('fast', function () {
                    $('#nonebox-thank').animate({
                        'top': '50%'
                    }, 500);
                });
//                $('form input[type="text"]').val('');
            },
            error: function (jqXHR, text, error) {
                $(formNm).html(error);
            }
        });
        return false;
    });
});
