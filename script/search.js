// 热映电影
$("#search").submit(function(event){
  $(".search-list").remove()
  event.preventDefault()
  isloading = true
  var movieName = $(".search").val()
  $.ajax({
    url:"https://api.douban.com/v2/movie/search",
    data:{
      q:movieName
    },
    dataType:"jsonp",
    contentType	:"application/json",
    success:function(res){
      isloading = false
      res.subjects.forEach(element => {
        $(".search-parent-node").append(
`<div class="search-list col-lg-4 col-md-6">
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