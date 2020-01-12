$(function(){
 
  function buildHTML(message){
    if ( message.text && message.image ) {
      var html =
       `<div class="message-list__tutto" data-message-id=${message.id}>
          <div class="message-list__tutto__userdate">
            <div class="message-list__tutto__userdate__user">
              ${message.user_name}
            </div>
            <div class="message-list__tutto__userdate__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__tutto__comment">
            <p class="message-list__tutto__comment__content">
             ${message.text}
            </p>
            <img src=${message.image} >
          </div>
        </div>`
      return html;
    } else if ( message.text ) {
      var html =
       `<div class="message-list__tutto" data-message-id=${message.id}>
          <div class="message-list__tutto__userdate">
            <div class="message-list__tutto__userdate__user">
              ${message.user_name}
            </div>
            <div class="message-list__tutto__userdate__date">
              ${message.created_at}
            </div>
        </div>
          <div class="message-list__tutto__comment">
            <p class="message-list__tutto__comment__content">
              ${message.text}
            </p>
          </div>
        </div>`
      return html;
  } else if ( message.image ) {
    var html =
       `<div class="message-list__tutto" data-message-id=${message.id}>
          <div class="message-list__tutto__userdate">
            <div class="message-list__tutto__userdate__user">
              ${message.user_name}
            </div>
            <div class="message-list__tutto__userdate__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__tutto__comment">
            <img src=${message.image} >
          </div>
        </div>`
      return html;
  };
  }

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
   .done(function(data){
     var html = buildHTML(data);
     $('.message-list').append(html);
     $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
     $('.message-form__new-message__submit-btn').prop('disabled', false);
     $('form')[0].reset();
    })

   .fail(function() {
     alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    last_message_id = $('.message-list__tutto:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.message-list').append(insertHTML);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".message-form__new-message__submit-btn").prop("disabled", false);
      }
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  };   
 

 if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}
});

