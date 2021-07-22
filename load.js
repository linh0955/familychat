$('body').on("click", 'a#mi', function(mi) {
mi.preventDefault();
var url = $(this).attr('href');
familychat(url);
});

var state = {
name: location.href,
page: document.title
};
history.pushState(state, document.title, location.href);
$(window).on("popstate", function(){
if(history.state){
familychat(history.state.name, true);}});
var familychat = function(link,pop = false){
$.fn.url = link;
var request = {
type: 'GET',
dataType: 'html',
url: link
};
$.ajax(request).done(function(data){
var title = data.split('<title>')[1].split('</title>')[0];
var body = data.split('<familychat>')[1].split('</familychat>')[0];
if(pop != true){
var state = {
name: link,
page: ''
};
history.pushState(state, null, state.name);
}
$("title").text(title);
$("familychat").html(body);
$('html,body').animate({scrollTop:0},200);
}).fail(function(){
$("familychat").html(body);
})
}
