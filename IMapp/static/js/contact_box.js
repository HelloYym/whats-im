/**
 * Created by yangyuming on 16/5/12.
 */

$(function () {


    var Contact = function (arg) {
        this.name = arg.name, this.info = arg.info;
        this.draw = function (_this) {
            return function () {
                var $contact;
                $contact = $($('.contact_template').clone().html());

                $contact.find('.name').html(this.name);
                $('.' + this.info.group + ' .contacts').append($contact);
                //return setTimeout(function () {
                //    return $message.addClass('appeared');
                //}, 0);
            };
        }(this);
        return this;
    };

    var Group = function (group_name) {
        this.name = group_name;
        this.draw = function (_this) {
            return function () {
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


    var addContact = function (name, info) {
        var $contacts, contact;
        $contacts = $('.contacts');

        $contacts = $('.' + info.group + ' .contacts');
        contact = new Contact({
            name: name,
            info: info
        });
        contact.draw();
        return $contacts.animate({scrollTop: $contacts.prop('scrollHeight')}, 300);
    }

    var addGroup = function (group_name) {
        var $groups, group;
        $groups = $('.groups');
        group = new Group(group_name);
        group.draw();
        return $groups.animate({scrollTop: $groups.prop('scrollHeight')}, 300);
    }

    var update_chat_box = function (data) {
        $.post("/get_chat_with/", {}, function (data) {
            if (data['chat_with'] == "")
                $('.chat_window').hide();
            else {
                $('.chat_window').hide();
                $('.messages').html("");
                $('.top_menu .title').text(data['chat_with']);
                $('.chat_window').show(500);
            }
        });
    };

    var refresh_contact_list = function () {
        $('.contacts').html("");
        $('.groups').html("");

        $.post("/get_group_list/", function (data) {

            for (group in data)
                addGroup(group);
        })

        $.post("/get_contact_list/", function (data) {
            for (contact in data)
                addContact(contact, data[contact]);
        })
    }


    $('[data-toggle="tooltip"]').tooltip();

    $('.contact-panel').on("click",'.c-info', function () {
        //$(this).tooltip();
    });


    $('a[href="#cant-do-all-the-work-for-you"]').on('click', function (event) {
        event.preventDefault();
        $('#cant-do-all-the-work-for-you').modal('show');
    })

    $('[data-command="toggle-search"]').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('hide-search');

        if ($(this).hasClass('hide-search')) {
            $('.c-search').closest('.row').slideUp(100);
        } else {
            $('.c-search').closest('.row').slideDown(100);
        }
    })

    $('#contact-list').searchable({
        searchField: '#contact-list-search',
        selector: 'li',
        childSelector: '.col-xs-12',
        show: function (elem) {
            elem.slideDown(100);
        },
        hide: function (elem) {
            elem.slideUp(100);
        }
    })

    $('#addContactBtn').click(function () {
        $.post("/add_contact/", {
            contact: $('#inputContactName').val(),
            group: $('#inputContactGroup').val()
        }, function (data) {
            $('#contact_msg').html(data["msg"])
        })

        setTimeout(refresh_contact_list(), 200);
    })

    $(document).ready(function () {
        refresh_contact_list();
    })

    $('.refresh_contact_list').click(refresh_contact_list);


    $('.groups').on("click", ".name", function () {
        $.post("/chat_with_contact/", {contact: $(this).text()}, function (data) {
            if (data['response'] == "True")
                update_chat_box();
            else
                refresh_contact_list();
        });
    })

    $('.groups').on("click", ".delete", function () {
        $.post("/delete_contact/", {contact: $(this).parent().children('.name').text()}, function (data) {
            alert(data["msg"]);
            update_chat_box();
            setTimeout(refresh_contact_list(), 200);
        });
    })


    $('#logout_btn').click(function () {
        $.post("/logout/", {}, function(data) {
            if (data['logout'] == "true")
                window.location.href="/index/";
            else
                refresh_contact_list();
        });
    })

    context.init({preventDoubleContext: false});
    context.settings({compress: true});

    context.attach('.group-heading', [
		{header: 'Compressed Menu'},
		{text: 'Back', href: '#'},
		{text: 'Reload', href: '#'},
		{divider: true},
		{text: 'Save As', href: '#'},
		{text: 'Print', href: '#'},
		{text: 'View Page Source', href: '#'},
		{text: 'View Page Info', href: '#'},
		{divider: true},
		{text: 'Inspect Element', href: '#'},
		{divider: true},
		{text: 'Disable This Menu', action: function(e){
			e.preventDefault();
			context.destroy('html');
			alert('html contextual menu destroyed!');
		}},
		{text: 'Donate?', action: function(e){
			e.preventDefault();
			$('#donate').submit();
		}}
	]);

});
