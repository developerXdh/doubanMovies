// 热映电影
$(function(){
  $.ajax({
    url:"https://api.douban.com/v2/movie/in_theaters",
    type:"get",
    data:{
      count:50
    },
    dataType:"jsonp",
    success:function(res){
      console.log(res)
      res.subjects.forEach(element => {
        $(".hot-parent-node").append(
`<div class="hot col-lg-4 col-md-6">
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
})
// Top250
var pageList = [0,1,2,3,4]
var currentPage = currentPage || pageList[0]
function checkPage(){
  if(currentPage ===1){
    $(".pre").css("display","none")
  }
}
function getMovies(){
  $.ajax({
    url:"https://api.douban.com/v2/movie/top250",
    data:{
      start:currentPage,
      count:12
    },
    dataType:"jsonp",
    success:function(res){
      res.subjects.forEach(element => {
        $(".top250-parent-node").append(
`<div class="hot col-lg-4 col-md-6">
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
$(function(){
  checkPage()
  getMovies()
})
$(".pre").click(function(){
  currentPage -= 1

})