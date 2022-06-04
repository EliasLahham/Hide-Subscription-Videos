const app = document.querySelector('ytd-app');

function scrapeForVideos() {
	app.querySelectorAll('ytd-grid-video-renderer').forEach(hideVideo);
}

function hideVideo(video, index) {
	browser.storage.local.get().then(function(result) {
		var keywords = Object.keys(result);
		var title = video.innerText.toLowerCase();
		keywords.every(function(keyword) {
			if (title.includes(keyword)) {
				console.log(`Hiding video: ${video.innerText}`);
				video.remove();
				return false;
			}
			return true;
		});
	});
}

if (app) {
	console.log('%c[Hide-Subscription-Videos] is running!', 'color: #03fc24;');
	app.addEventListener('yt-navigate-finish', scrapeForVideos);
}

scrapeForVideos();
