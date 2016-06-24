/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


/**
 * Created by yangyuming on 16/4/21.
 */


// var ServerAddr = 'http://115.28.155.92';
var ServerAddr = 'http://127.0.0.1:8000';

$(document).ready(function() {

    //注册和登陆页切换动画
    $('.message a').click(function() {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        $('#username_register').val("");
        $('#password_register').val("");
        $('#email_register').val("");
    });


    $('#btn_login').click(function() {
        // window.location.href="home.html"; 
        $.post(ServerAddr + "/check_passwd/", $("#form_login").serialize(), function(data, status) {
            if (data["pass"] == "false") {
                $("#password_login").val("");
                $("#password_login").attr({
                    "placeholder": "密码错误"
                });
                $('#password_login').focus();
                return false;
            }
        })

        $.post(ServerAddr + "/login/", $("#form_login").serialize(), function(data) {
            if (data["pass"] == "true") {
                window.location.href = "home.html";
            } else {
                $("#username_login").val("");
                $("#password_login").val("");
                $('#username_login').focus();
            }
        })
    })



    //用户名检查
    $('#username_login').blur(function() {
        $.post(ServerAddr + "/check_username/", $("#form_login").serialize(), function(data) {
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

        $.post(ServerAddr + "/check_username/", $("#form_register").serialize(), function(data) {
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


        $.post(ServerAddr + "/register/", $("#form_register").serialize(), function(data) {
            if (data["pass"] == "true") {
                window.location.href = "chat_box.html";
            } else {
                $("#username_register").val("");
                $("#password_register").val("");
                $("#email_register").val("");
                $('#username_register').focus();
            }
        })
    })

})
