const app = document.querySelector('ytd-app');

function startUp() {
	if (!location.pathname.endsWith('/feed/subscriptions')) {
		return;
	}
	if (app) {
		console.log('%c[Hide-Subscription-Videos] is running!', 'color: #03fc24;');
		scrapeForVideos();
	}
}

function scrapeForVideos() {
	browser.storage.local.get().then(keywords => {
		if (Object.keys(keywords).length === 0) {
			return;
		}
		app.querySelectorAll('ytd-grid-video-renderer').forEach(function (video, index) {
			hideVideo(keywords, video, index)
		});
	}).catch(error => {
		console.log('[Hide-Subscription-Videos] Error: ' + error);
	});
}

function hideVideo(keywords, video, index) {
	var keywords = Object.keys(keywords);
	var title = video.innerText.toLowerCase();
	keywords.every(function(keyword) {
		if (title.includes(keyword)) {
			console.log(`Hiding video: ${video.innerText}`);
			video.remove();
			return false;
		}
		return true;
	});
}

document.addEventListener('yt-navigate-finish', startUp);
