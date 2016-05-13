/* convert all links with class ajaxify in smth smarter */
var url_base = '';

// reload header 
function reload_header() {
    $.ajax({
        url: url_base + '/ajax/do/header/',
        success: function(data) {
            $('#topbar').html(data);
        },
        error: function(data) {
            // pass 
        }
    })
}
/*
$(document).ready(function (){
    // button links 
    $('.ajaxify').bind('click', function () {
        url = url_base + this;
        $.ajax({
            url: url + '?ajax=1',
            success: function(data) {
                $('#ajax-message').html(data);
                $('#ajax-message').show();
            },
            error: function(data) {
                document.location = url;
            }
        });
        return false;
    });
});
*/

$(document).ready(function(){
    

    $('#ajaxBusy').css({
    display:"none",
    margin:"0px",
    paddingLeft:"0px",
    paddingRight:"0px",
    paddingTop:"0px",
    paddingBottom:"0px",
    position:"absolute",
    right:"3px",
    top:"3px",
    width:"auto"
  });

    var answer_count = 1;
    var max = $("#answers").data("max-answers");

    function answer_element_template(i){
        return "<div id=\"answer_" +  i + "\">" + 
                "<label for=\"id_answer_" + i + "\">Answer " + (i+1).toString() + ":</label>" + 
                "<textarea id=\"id_answer_" + i + "\" rows=\"10\" cols=\"40\" name=\"answer_" + i +
                "\"></textarea>" + "<br/>" + "<label for=\"id_correct_ " + i + "\">Correct?</label>" +
                "<input id=\"id_correct_" + i + "\" name=\"correct_" + i + "\" type=\"checkbox\">" + 
                "</input></div><br/>";
    }

    $("#add_button").click(function(){
        answer_count++;
        if (answer_count < max){
            var answer_id = "answer_" + answer_count.toString();
            var label_for = "id_answer_" + answer_count.toString();
            var answer_text = "Answer " + (answer_count + 1).toString() + ": ";
            var checkbox_correct = "id_correct_" + answer_count.toString();
            var correct_id = "correct_" + answer_count.toString();
            $("#answers").append(answer_element_template(answer_count));

/*            
            $("<div/>", {
                attr : { id : answer_id }
                }).appendTo("#answers");

            $("<label/>", {
                attr : { for : label_for},
                text : answer_text
                }).appendTo("#" + answer_id);

            $("<textarea/>", {
                attr: { id: label_for, 
                rows : "10", 
                cols : "40", 
                name : answer_id }
                }).appendTo("#" + answer_id);

            $("<br/>").appendTo("#" + answer_id);

            $("<label/>", {
                attr: { for : checkbox_correct},
                text : "Correct? " 
                }).appendTo("#" + answer_id);

            $("<input/>", {
                attr : { id : checkbox_correct, 
                name : correct_id, 
                type : "checkbox" }
                }).appendTo("#" + answer_id);

  */              

            if(answer_count == max - 1){
                $("#add_button").hide();
                }
            }
        });


});

$(document).ready(function(){
    $('.ajaxify_content').bind('click', function(){
        var url = url_base + $(this).attr('href');
        $.ajax({
            url : url,
            type : "GET",
            beforeSend: function(data){
                $("#content").html('<div id="ajaxBusy" class="hidden"><p><img src="/static/img/ajax-loader.gif"></p></div>');
                $('#ajaxBusy').show(); 
            },
            complete: function(data){
                $("#ajaxBusy").hide();
            },
            success: function(data){
                $("div#content").html(data);
                $('title').text($('.section h2').text());
            },
            error: function(data) {
                document.location = url;
            }
        });

        return false;
    });
});
/*
$(document).ajaxStart(function(){ 
  $('#ajaxBusy').show(); 
}).ajaxStop(function(){ 
  $('#ajaxBusy').hide();
});*/