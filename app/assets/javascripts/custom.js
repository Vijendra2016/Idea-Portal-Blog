function newArticle()
  {
    $("#new").removeClass('hidden');
    $("#index").addClass('hidden');
    $("#show").addClass('hidden');
    $("#showcomments").addClass('hidden');
    $("#addcomments").addClass('hidden');
    $("#btn-update").addClass('hidden');
    $("#btn-save").removeClass('hidden');
    $("#article")[0].reset();
  }
  function showArticle()
  {
         $("#index").removeClass('hidden'); 
         $("#new").addClass('hidden');  
         $("#show").addClass('hidden');  
         $("#showcomments").addClass('hidden');  
         $("#addcomments").addClass('hidden'); 

  }
  $("#btn-save").click(function() {
    var data1=$('form').serialize();
    $.ajax({
        url : '/articles',
        type: "POST",
        data: data1,
        format: "JSON",
        success: function(data, textStatus, jqXHR)
        {
          $("#show_articles").append('<tr id='+data.articles.id+'><td>'+data.articles.title+'</td><td>'+data.articles.text+'</td><td><a href="#" onclick="show('+data.articles.id+'); return false;">show</a></td><td><a href="#" onclick="edit('+data.articles.id+'); return false;">edit</a></td><td><a href="#" onclick="destroy('+data.articles.id+'); return false;">delete</a></td></tr>');
          $("#index").removeClass("hidden");
          $("#new").addClass("hidden");
          $("#show").addClass("hidden");
          $("#showcomments").addClass("hidden");
          $("#addcomments").addClass("hidden");
          $("#article")[0].reset();

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          alert ( 'Something went wrong!', error_message);
        }

    });
  });
  $("#btn-update").click(function() {
    var data1=$('form').serialize();
    var id =$('#article_id').val();
    $.ajax({
        url : '/articles/'+id,
        type: "PUT",
        data: data1,
        format: "JSON",
        success: function(data, textStatus, jqXHR)
        {
          var row = document.getElementById(id);
          row.parentNode.removeChild(row);
          $("#show_articles").append('<tr id='+data.articles.id+'><td>'+data.articles.title+'</td><td>'+data.articles.text+'</td><td><a href="#" onclick="show('+data.articles.id+'); return false;">show</a></td><td><a href="#" onclick="edit('+data.articles.id+'); return false;">edit</a></td><td><a href="#" onclick="destroy('+data.articles.id+'); return false;">delete</a></td></tr>');
          $("#index").removeClass("hidden");
          $("#new").addClass("hidden");
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          alert ( 'Something went wrong!', error_message);
        }

    });
  });
  $("#btn-comment-save").click(function() {
    var data1=$('form').serialize();
    var id =$('#article_id').val();
    $.ajax({
        url : '/articles/'+id+'/comments',
        type: "POST",
        data: data1,
        format: "JSON",
        success: function(data, textStatus, jqXHR)
        {
            $("#show_comments").append('<tr id='+data.comments.id+'><td>'+data.comments.commenter+'</td><td>'+data.comments.body+'</td><td><a href="#" onclick="destroy_comment('+data.comments.id+'); return false;">destroy</a></td></tr>');
            $("#comment_id").val(data.comments.id);
            $("#comment")[0].reset();

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          alert ( 'Something went wrong!', error_message);
        }
    });
  });
  function show(id){
    // alert(id);
    // alert('hello');
    $("#show_article").remove();
    $.ajax({
        url : '/articles/'+id,
        type: "GET",
        format: "JSON",
        success: function(data, textStatus, jqXHR)
        {
           $("#index").addClass("hidden");
           $("#show").removeClass("hidden");
           $("#show").append('<div id="show_article"><p><strong>Title:</strong>'+data.articles.title+'</p><p><strong>Text:</strong>'+data.articles.text+'</p></div>');
           $("#article_id").val(id);
           $("#addcomments").removeClass("hidden");

           show_comments(id);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          alert ( 'Something went wrong!', errorThrown);
        }

    });
  }
  function show_comments(id){
   $.ajax({
        url : '/articles/'+id+'/comments',
        type: "GET",
        format: "JSON",
        success: function(data, textStatus, jqXHR)
        {
           //alert(data.comments[0].commenter);
           $("#show_comments tbody tr").remove();
           $("#showcomments").removeClass("hidden");
           $("#show_comments").append('<tr><th>Commenter</th><th>Comments</th></tr>');
              $.each(data.comments, function(index, comments) {
                  $("#show_comments").append('<tr id='+comments.id+'><td>'+comments.commenter+'</td><td>'+comments.body+'</td><td><a href="#" onclick="destroy_comment('+comments.id+'); return false;">destroy</a></td></tr>');
           // 
              });
              //show_comments(id);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          alert ( 'Something went wrong!'+errorThrown, errorThrown);
        }

    }); 
  }

  function edit(id){
      $.ajax({
      url : '/articles/'+id,
      type: "GET",
      format: "JSON",
      success: function(data, textStatus, jqXHR)
      {
        // alert(data.articles.title);
        $("#new").removeClass("hidden"); 
        $("#index").addClass("hidden");
        $("#btn-save").addClass("hidden");
        $("#btn-update").removeClass("hidden");
        $("#article_title").val(data.articles.title);  
        $("#article_text").val(data.articles.text);  
        $("#article_id").val(data.articles.id);  
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert ( 'Something went wrong! '+errorThrown, errorThrown);
      }
    });
  }

  function destroy(id){
    $.ajax({
        url : '/articles/'+id,
        type: "DELETE",
        format: "JSON",
        success: function(data, textStatus, jqXHR)
        {
            var row = document.getElementById(id);
            row.parentNode.removeChild(row);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          alert ( 'Something went wrong! '+errorThrown, errorThrown);
        }
    });
  }
  function destroy_comment(id){
    var art_id=$("#article_id").val();
    $.ajax({
        url : '/articles/'+art_id+'/comments/'+id,
        type: "DELETE",
        format: "JSON",
        success: function(data, textStatus, jqXHR)
        {
            $("#show_comments").find("#"+id).remove();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          alert ( 'Something went wrong! '+errorThrown, errorThrown);
        }
    });
  }