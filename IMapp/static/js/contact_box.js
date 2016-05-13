/**
 * Created by yangyuming on 16/5/12.
 */

$(function () {


    var Contact;
    var addContact;
    Contact = function (arg) {
        this.name = arg.name, this.info = arg.info;
        this.draw = function (_this) {
            return function () {
                var $contact;
                $contact = $($('.contact_template').clone().html());

                $contact.find('.name').html(this.name);
                $('.contacts').append($contact);
                //return setTimeout(function () {
                //    return $message.addClass('appeared');
                //}, 0);
            };
        }(this);
        return this;
    };

    addContact = function (name, info) {
        var $contacts, contact;
        $contacts = $('.contacts');
        contact = new Contact({
            name: name,
            info: info
        });
        contact.draw();
        return $contacts.animate({scrollTop: $contacts.prop('scrollHeight')}, 300);
    }

    var update_chat_box = function (data) {

        $('.chat_window').hide();
        $('.messages').html("");
        $('.top_menu .title').text(data['chat_with']);
        $('.chat_window').show(500);

    };

    var refresh_contact_list = function () {
        $('.contacts').html("");

        $.post("/getContactList/", function (data) {
            for (contact in data)
                addContact(contact, data[contact]);
        })
    }



    $('[data-toggle="tooltip"]').tooltip();

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

    $('#add_contact').click(function () {
        $.post("/addContact/", {contact: $('#contact_name').val()}, function (data) {
            $('#contact_msg').html(data["msg"])
        })

        setTimeout(refresh_contact_list, 100);
    })

    $(document).ready(function () {
        refresh_contact_list();
    })

    $('.refresh_contact_list').click(refresh_contact_list);


    $('.contacts').on("click", ".name", function () {
        $.post("/chat_with_contact/", {contact: $(this).text()}, function (data) {
            update_chat_box(data);
        });
    })

});
