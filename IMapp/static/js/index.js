/**
 * Created by yangyuming on 16/4/21.
 */


$(document).ready(function() {

    //注册和登陆页切换动画
    $('.message a').click(function() {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        $('#username_register').val("");
        $('#password_register').val("");
        $('#email_register').val("");
    });


    $('#btn_login').click(function() {
        $.post("/check_passwd/", $("#form_login").serialize(), function(data, status) {
            if (data["pass"] == "false") {
                $("#password_login").val("");
                $("#password_login").attr({
                    "placeholder": "密码错误"
                });
                $('#password_login').focus();
                return false;
            }
        })

        $.post("/login/", $("#form_login").serialize(), function(data) {
            if (data["pass"] == "true") {
                window.location.href = "/";
            } else {
                $("#username_login").val("");
                $("#password_login").val("");
                $('#username_login').focus();
            }
        })
    })



    //用户名检查
    $('#username_login').blur(function() {
        $.post("/check_username/", $("#form_login").serialize(), function(data) {
            if (data["pass"] == "false") {
                $("#username_login").val("");
                $("#username_login").attr({
                    "placeholder": "用户名不存在"
                });
                $('#username_login').focus();
            }
        })
    })


    $("#form_login").submit(function() {
        return false;
    })

    $("#form_register").submit(function() {
        return false;
    })


    //注册用户名检查
    $('#username_register').blur(function() {

        var user = $(this).val();

        if (user == "") {
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

        $.post("/check_username/", $("#form_register").serialize(), function(data) {
            if (data["pass"] == "true") {
                $("#username_register").val("");
                $("#username_register").attr({
                    "placeholder": "该用户名已存在"
                });
                $('#username_register').focus();
            }
        })
    })


    //密码检查
    $('#btn_register').click(function() {
        var pwd = $('#password_register').val();

        if (pwd == "") {
            $('#password_register').val("");
            $('#password_register').attr({
                "placeholder": "密码不能为空"
            });
            $('#password_register').focus();
            return false;
        }

        var pattern = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*$/;
        if (!pattern.test(pwd)) {
            $('#password_register').val("");
            $('#password_register').attr({
                "placeholder": "只能由字母或数字组成"
            });
            $('#password_register').focus();
            return false;
        }

        if (pwd.length < 4 || pwd.length > 12) {
            $('#password_register').val("");
            $('#password_register').attr({
                "placeholder": "长度不符合要求，必须为4-12位"
            });
            $('#password_register').focus();
            return false;
        }

        var email = $('#email_register').val();
        var pattern = /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z]+\.)+[a-zA-Z]{2,3}$/;
        if (!pattern.test(email) && email != "") {
            $('#email_register').val("");
            $('#email_register').attr({
                "placeholder": "email格式不正确"
            });
            $('#email_register').focus();
            return false;
        }


        $.post("/register/", $("#form_register").serialize(), function(data) {
            if (data["pass"] == "true") {
                window.location.href = "/";
            } else {
                $("#username_register").val("");
                $("#password_register").val("");
                $("#email_register").val("");
                $('#username_register').focus();
            }
        })
    })

})
