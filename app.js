const app = document.querySelector('ytd-app');

function startUp() {
	if (!location.pathname.endsWith('/feed/subscriptions')) {
		return;
	}
	if (app) {
		console.log('%c[Hide-Subscription-Videos] Scraping videos...', 'color: #03fc24;');
		scrapeForVideos();
	}
}

function scrapeForVideos() {
	browser.storage.local.get().then(keywords => {
		if (Object.keys(keywords).length === 0) {
			return;
		}
		app.querySelectorAll('ytd-grid-video-renderer').forEach(function (video, index) {
			hideVideo(Object.keys(keywords), video, index)
		});
	}).catch(error => {
		console.log('[Hide-Subscription-Videos] Error: ' + error);
	});
}

function hideVideo(keywords, video, index) {
	keywords.every(keyword => {
		if (video.innerText.toLowerCase().includes(keyword)) {
			console.log(`Hiding video: ${video.innerText}`);
			video.remove();
			return false;
		}
		return true;
	});
}

// On finished load of YouTube page
document.addEventListener('yt-navigate-finish', startUp);

// On scrolling to bottom of the page
window.addEventListener('scroll', function() {
	if (document.documentElement.scrollHeight - window.innerHeight === document.documentElement.scrollTop) {
		startUp();
	}
});
