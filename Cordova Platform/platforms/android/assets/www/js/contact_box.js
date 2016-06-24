/**
 * Created by yangyuming on 16/5/12.
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




$(function() {

    var Contact = function(arg) {
        this.name = arg.name, this.info = arg.info;
        this.draw = function(_this) {
            return function() {
                var $contact;
                $contact = $($('.contact_template').clone().html());

                $contact.find('.name').html(this.name);
                $('.' + this.info.group + ' .contacts').append($contact);
            };
        }(this);
        return this;
    };

    var Group = function(group_name) {
        this.name = group_name;
        this.draw = function(_this) {
            return function() {
                var $group;
                $group = $($('.group_template').clone().html());
                $group.find('.group_name').html(this.name).attr("href", "#" + this.name);
                $group.find('.collapse').attr("id", this.name);
                $group.addClass(this.name);
                $('.groups').append($group);
            };
        }(this);
        return this;
    };


    var addContact = function(name, info) {
        var $contacts, contact;
        $contacts = $('.contacts');

        $contacts = $('.' + info.group + ' .contacts');
        contact = new Contact({
            name: name,
            info: info
        });
        contact.draw();
        return $contacts.animate({ scrollTop: $contacts.prop('scrollHeight') }, 300);
    }

    var addGroup = function(group_name) {
        var $groups, group;
        $groups = $('.groups');
        group = new Group(group_name);
        group.draw();
        return $groups.animate({ scrollTop: $groups.prop('scrollHeight') }, 300);
    }


    // 修改为自动切换到聊天框
    var update_chat_box = function(data) {
        $.post(ServerAddr + "/get_chat_with/", {}, function(data) {
            if (data['chat_with'] == "")
                $('.chat_window').hide();
            else {
                // $('.chat_window').hide();
                $('.messages').html("");
                $('.top_menu .title').text(data['chat_with']);
                $('.chat_window').show(200);
            }
        });
    };

    var refresh_contact_list = function() {
        $('.contacts').html("");
        $('.groups').html("");

        $.post(ServerAddr + "/get_group_list/", function(data) {
            for (group in data)
                addGroup(group);
        })

        $.post(ServerAddr + "/get_contact_list/", function(data) {
            for (contact in data)
                addContact(contact, data[contact]);
        })
    }


    $('a[href="#cant-do-all-the-work-for-you"]').on('click', function(event) {
        event.preventDefault();
        $('#cant-do-all-the-work-for-you').modal('show');
    })


    // 联系人搜索
    // $('[data-command="toggle-search"]').on('click', function(event) {
    //     event.preventDefault();
    //     $(this).toggleClass('hide-search');

    //     if ($(this).hasClass('hide-search')) {
    //         $('.c-search').closest('.row').slideUp(100);
    //     } else {
    //         $('.c-search').closest('.row').slideDown(100);
    //     }
    // })

    // $('#contact-list').searchable({
    //     searchField: '#contact-list-search',
    //     selector: 'li',
    //     childSelector: '.col-xs-12',
    //     show: function(elem) {
    //         elem.slideDown(100);
    //     },
    //     hide: function(elem) {
    //         elem.slideUp(100);
    //     }
    // })

    $('#addContactBtn').click(function() {
        $.post(ServerAddr + "/add_contact/", {
            contact: $('#inputContactName').val(),
            group: $('#inputContactGroup').val()
        }, function(data) {
            $('#contact_msg').html(data["msg"])
        })

        setTimeout(refresh_contact_list(), 300);
    })

    $(document).ready(function() {
        setTimeout(refresh_contact_list(), 200);
        var window_height = window.screen.height + "px";
        // $('.contact-panel').css("height", window_height);
        // $('.chat-window').style.height = window_height;
        // alert(window_height);
    })

    $('.refresh_contact_list').click(refresh_contact_list);



    $('.groups').on("click", ".name", function() {
        $.post(ServerAddr + "/chat_with_contact/", { contact: $(this).text() }, function(data) {
            if (data['response'] == "True") {
                $('.chat_window').hide();
                $('#chat_btn').click();
                update_chat_box();
            }
            else
                refresh_contact_list();
        });
    })

    $('.groups').on("click", ".delete", function() {
        $.post(ServerAddr + "/delete_contact/", { contact: $(this).parent().children('.name').text() }, function(data) {
            alert(data["msg"]);
            update_chat_box();
            setTimeout(refresh_contact_list(), 200);
        });
    })

    $('.logout_btn').click(function () {
        $.post(ServerAddr + "/logout/", {}, function(data) {
            if (data['logout'] == "true")
                window.location.href="index.html"; 
            else
                refresh_contact_list();
        });
    })

});
