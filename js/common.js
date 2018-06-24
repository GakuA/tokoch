$(function() {
	//タブ切り替え
	$("#tab > div").click( function() {
		$("#tab > div").removeClass("active");
		$(this).addClass("active");
	});

	//投稿
	$("#urlButton").click(function() {
		post();
	});
	$("#urlText").keypress(function(e) {
	if (e.which == 13) {
		post();
	}
} );
});

function post() {
	$("#mask").show();
	var postUrl = encodeURI($("#urlText").val());

	var youtubeId = postUrl.match(/^https?:\/\/www\.youtube\.com\/watch.*[?&]v=([^?&]+)/i);
	var nicoId = postUrl.match(/^http:\/\/www\.nicovideo\.jp\/watch\/(sm[^/?&]+)/i);

	if (youtubeId || nicoId) {
		$.ajax({
			type: "POST",
			url: "php/post.php",
			data: {
				"site": youtubeId ? "y" : "n",
				"urlAjax": postUrl
			},
			success: function(html) {
				if (html) {
					var arrData = JSON.parse(html);
					alert(arrData["title"]);
				} else {
					alert("失敗しました");
				}
				$("#mask").hide();
			},
			error: function() {
				alert("失敗しました");
				$("#mask").hide();
			}
		});
	} else {
		alert("URLが無効です");
		$("#mask").hide();
		return;
	}
}
