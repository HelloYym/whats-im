/**
 * Created by yangyuming on 16/4/21.
 */


var ServerAddr = '127.0.0.1:8000'

$(document).ready(function () {

    //$.ajaxSetup({
    //        async: false,
    //        data: {
    //            csrfmiddlewaretoken: '{{ csrf_token }}'
    //        },
    //    }
    //)

    //注册和登陆页切换动画
    $('.message a').click(function () {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('#username_register').val("");
        $('#password_register').val("");
        $('#email_register').val("");
    });

    //用户名检查
    $('#username_login').blur(function () {

        $.post("/check_username/", {
            username: $('#username_login').val(),
            password: $('#password_login').val()
        }, function (data) {
            if (data["pass"] == "false") {
                $('#username_login').val('');
                $("#username_login").attr({
                    "value": "",
                    "placeholder": "用户名不存在"

                });
                $('#username_login').focus();
            }
        })
    })

    $("#form_login").submit(function () {

        var check = true;
        $.post("/check_passwd/", $("#form_login").serialize(), function (data, status) {
            if (data["pass"] == "false") {
                $('#password_login').val('');
                $("#password_login").attr({
                    "value": "",
                    "placeholder": "密码错误"
                });
                $('#password_login').focus();
                check = false;
            }
        })

        return check;
    })


    //注册用户名检查
    $('#username_register').blur(function () {
        var user = $(this).val();

        if (user == "") {
            $(this).val('');
            $(this).attr({
                "value": "",
                "placeholder": "用户名不能为空"
            });
            $('#username_register').focus();
        }

        if (user.length < 3 || user.length > 20) {
            $(this).attr({
                "value": "",
                "placeholder": "长度不符合要求，必须为3-20位"
            });
            $('#username_register').focus();
        }

        $.post("/check_username/", $("#form_register").serialize(), function (data) {
            if (data["pass"] == "true") {
                $('#username_register').val('');
                $("#username_register").attr({
                    "value": "",
                    "placeholder": "该用户名已存在"
                });
                $('#username_register').focus();
            }
        })
    })

    //密码检查
    $('#password_register').blur(function () {
        var pwd = $(this).val();

        if (pwd == "") {
            $(this).attr({
                "value": "",
                "placeholder": "密码不能为空"
            });
            $('#password_register').focus();
        }

        var pattern = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*$/;
        if (!pattern.test(pwd)) {
            $(this).attr({
                "value": "",
                "placeholder": "只能由字母或数字组成"
            });
            $('#password_register').focus();
        }

        if (pwd.length < 4 || pwd.length > 12) {
            $(this).attr({
                "value": "",
                "placeholder": "长度不符合要求，必须为4-12位"
            });
            $('#password_register').focus();
        }
    })

    //email检查
    $('#email_register').blur(function () {
        var email = $(this).val();
        var pattern = /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z]+\.)+[a-zA-Z]{2,3}$/;
        if (!pattern.test(email)) {
            $(this).attr({
                "value": "",
                "placeholder": "email格式不正确"
            });
            $('#email_register').focus();
        }
    })


})

