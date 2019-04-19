// Top250
var currentPage = currentPage || 0
var pageList = pageList || [1,2,3,4,5]

//检查上一页按钮和页数
function checkPage(){
  if(currentPage === 0){
    $(".pre").css("display","none")
  }
  else{
    $(".pre").css("display","inline")
  }
  if(pageList[0] >= 16){
    $(".next").css("display","none")
  }
  else{
    $(".next").css("display","inline")
  }
  var pageNumber = $(".page-number")
  if(pageList[0] <= 16){
    for(let i = 0;i<pageNumber.length;i++){
      pageNumber[i].textContent = pageList[i]
    }
  }
  else{
    for(let i = 0;i<pageNumber.length;i++){
      pageNumber[i].textContent = [17,18,19,20,21][i]
    }
  }
  pageNumber.each(
    function(){
      if(this.textContent == currentPage+1){
        $(this).addClass("activePage")
      }
      else{
        $(this).removeClass("activePage")
      }
    }
  )
}

//获取信息
function getMovies(){
  $.ajax({
    url:"https://api.douban.com/v2/movie/top250",
    data:{
      start:currentPage*12,
      count:12
    },
    dataType:"jsonp",
    contentType	:"application/json",
    success:function(res){
      $(".top").remove()
      res.subjects.forEach(element => {
        $(".top250-parent-node").append(
`<div class="top col-lg-4 col-md-6">
    <div>
      <a href="${element.alt}"><img src="${element.images.medium}" referrerpolicy ="never"/></a>
    </div>
    <div>
      <h1>${element.title}</h1>
      <p><span class="text-danger">${element.rating.average}分</span> / ${element.collect_count}收藏</p>
      <p>${element.year}年 / ${element.genres[0]} / ${element.genres[1]}</p>
      <p>导演：${element.directors[0].name}</p>
      <p>主演：${element.casts[0].name} / ${element.casts[1].name} / ${element.casts[2].name}</p>
    </div>
</div>`
        )
      })
    },
    error:function(err){
      console.log(err)
    }
  })
}

//页面挂载事件
$(function(){
  checkPage()
  getMovies()
})
//上一页
$(".pre").click(function(){
  pageList = pageList.map(item => item-1)
  currentPage = pageList[0]-1
  checkPage()
  getMovies()
})
//下一页
$(".next").click(function(){
  pageList = pageList.map(item => item+1)
  currentPage = pageList[0]-1
  checkPage()
  getMovies()
})
//首页
$(".first-page").click(function(){
  pageList = [1,2,3,4,5]
  currentPage = pageList[0]-1
  checkPage()
  getMovies()
})
//指定页
$(".page-number").click(function(){
  pageList = [this.textContent-0,this.textContent-0+1,this.textContent-0+2,this.textContent-0+3,this.textContent-0+4]
  currentPage = pageList[0]-1
  checkPage()
  getMovies()
})