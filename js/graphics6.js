var l = 20;//maximum input

$("h3").text("0 to " + l);
$(".inputPascal").bind("keyup keydown", function () {
  var v = $(this).val();
  
  if (isNaN(v) || v > l || v < 0 || v - Math.floor(v) > 0 || v - Math.floor(v) < 0) {
    $(this).addClass("warning");    
    $(".pascal").html("<strong>input positive integer</strong> <em>equal or less than " + l + "</em>");
    $(".buttonPascal").prop("disabled", true).addClass("warningb").text("wrong..");
  } else if (v === "" || v.length === 0) {
    $(this).removeClass("warning");
    $(".pascal").html("");
    $(".buttonPascal").prop("disabled", false).removeClass("warningb")
    .text("Generate");
  } else {
    $(this).removeClass("warning");
    $(".pascal").html("");
    $(".buttonPascal").prop("disabled", false).removeClass("warningb")
    .text("draw?");
  }
});

$(".inputPascal")
.bind("click focus", function () {
  $(".pascalElm").each(function(k){
    $(this).delay(k*100).hide(100);
  });
  $("h1,h3")
  .slideDown($(this).val()*100);
  $(this).delay(200).queue(function(){
    $(this).val("");    
  }).dequeue();  
  $(".buttonPascal").text("Generate");
});

$(".buttonPascal").click(function () {
  var v = $(".inputPascal").val(),
    normal = 'spanPascal',
    small = 'spanPascalSmall',
    font, i, j;
  function PascalT(n, r) {
    numbers = (n > 1 && r > 0 && r < n) ?
      PascalT(n - 1, r - 1) + PascalT(n - 1, r)  :  1;    
    return numbers;
  }
  
  font = (v < 13) ? normal : small;

  for (i = 0; i <= v; i++) {
    $(".pascal").append("<div class='pascalElm'></div>");
    for (j = 0; j <= i; j++) {
      $(".pascalElm").eq(i)
      .append("<span class=" + font + ">" + PascalT(i, j) + "</span>");
    }
  }
 
  $(".buttonPascal").prop("disabled", true);
  $(".buttonPascal").text("look!");

  $("h1,h3").slideUp(200);
  $("span").each(function(k){
    $(this).delay(k*50 + 200)
    .animate({opacity:1},100);
  });

  $(".pascalElm:last-child").children("span:last-child")
  .prev().addClass("end");
  $(".pascalElm").children("span:last-child").prev().addClass("hl");
});