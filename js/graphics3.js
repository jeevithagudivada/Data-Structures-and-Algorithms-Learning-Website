$(function()
{

  var num1,num2,firstIndex,secondIndex;
  var swapped = false; 
  var len = $("ul#boxes li").length;
  var s_time = 1800;
  var a_time = (s_time/2)-100;

  var bubble = function()
  {
      for( j=0; j <len-1; j++)
      { 
 
        (function(j)
         { 
            setTimeout(function()
            {  

              firstIndex = j;
              secondIndex = j+1
       
              num1 = parseInt($("ul#boxes li span").eq(firstIndex).html());
              num2 = parseInt($("ul#boxes li span").eq(secondIndex).html());
 
              if((secondIndex == len-1) && swapped == true){ swapped = false; setTimeout(function(){ bubble(); }, s_time); }

               if ( num1 > num2)
               {      

                swapped=true;
     
                $("ul#boxes li").eq(secondIndex).addClass("shrink").animate({"right":"110px"},a_time,function() { $(this).css({'right':''}).removeClass("shrink").insertBefore($(this).prev() ) });

                $("ul#boxes li").eq(firstIndex).addClass("shrink").animate({"left":"110px"},a_time,function() { $(this).css({'left':''}).removeClass("shrink"); });
              
                }
              
              }, s_time * j)
              })(j);
        } 
    }

  $("ul#boxes li ").each(function(index){ $(this).delay(500*index).animate({"bottom":"0"},500); });
  $("#act").click(function() { bubble(); });

});