var isloading = true
$(function(){
  setInterval(()=>{
    if(isloading){
      $(".loader").show()
    }else{
      $(".loader").hide()
    }
  }, 500);
})