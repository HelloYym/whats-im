/**
 * Created by yangyuming on 16/5/12.
 */

(function () {

    var Archive = {};
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage, receiveMessage, showMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        showMessage = function (text, message_side) {
            var $messages, message;
            $messages = $('.messages');
            message = new Message({
                text: text,
                message_side: message_side
            });
            //Archive[$('.chat_window .title')].append(message);
            message.draw();
            return $messages.animate({scrollTop: $messages.prop('scrollHeight')}, 300);
        }


        sendMessage = function (text) {
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');    //清空消息框

            $.post("/push_message/", {"message": text}, function (data) {
                if (data['push'] == "False") {
                    showMessage("消息未发送", 'right');
                }
                else {
                    showMessage(text, 'right');
                }
            })
        };


        receiveMessage = function () {
            $.post("/pull_message/", {}, function (data) {
                if (data['pull'] == "True") {
                    showMessage(data['message'], 'left');
                }
            })
        };


        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });

        // 定时请求服务器，更新新消息
        setInterval(function () {
            receiveMessage();
        }, 1000);
    });
}.call(this));
