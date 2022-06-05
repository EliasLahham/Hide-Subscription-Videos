function popupStartUp() {
	eventListeners();
	displayKeywordsOnTable();
}

function eventListeners() {
	document.getElementById('add').addEventListener('click', addKeyword);
	document.getElementById('keyword').addEventListener('keydown', function(event) {
		if (event.key === 'Enter') {
			addKeyword();
		}
	});
	document.getElementById('reset-keywords').addEventListener('click', resetKeywords);
	document.getElementById('cancel-reset-keywords').addEventListener('click', cancelResetKeywords);
}

function addKeyword() {
	var keyword = document.getElementById('keyword').value.toLowerCase();
	if (keyword) { 
		browser.storage.local.set({[keyword]: keyword});
		document.getElementById('keyword').value = '';
		displayKeywordsOnTable();
	}
}

function removeKeyword(keyword) {
	browser.storage.local.remove(keyword);
	displayKeywordsOnTable();
}

function displayKeywordsOnTable() {
	browser.storage.local.get().then(function(result) {
		var keywords = Object.keys(result);
		var keywordsDiv = document.getElementById('keywords');
		keywordsDiv.innerHTML = '';
		if (keywords.length != 0) {
			var table = document.createElement('table');
			var headerRow = document.createElement('tr');
			var keywordHeader = document.createElement('th');
			var actionHeader = document.createElement('th');

			keywordHeader.classList.add('keyword-header');
			actionHeader.classList.add('action-header');
			keywordHeader.innerText = 'Keyword';
			actionHeader.innerText = 'Action';

			headerRow.appendChild(keywordHeader);
			headerRow.appendChild(actionHeader);
			table.appendChild(headerRow);
			keywordsDiv.appendChild(table);
		}

		keywords.forEach(function(keyword) {
			var row = document.createElement('tr');
			var keywordColumn = document.createElement('td');
			var actionColumn = document.createElement('td');
			var removeButton = document.createElement('button');

			keywordColumn.innerText = keyword;
			removeButton.classList.add('action-button');
			removeButton.classList.add('remove-button');
			removeButton.innerText = 'Remove';
			removeButton.addEventListener('click', function() {
				removeKeyword(keyword);
			});

			actionColumn.appendChild(removeButton);
			row.appendChild(keywordColumn);
			row.appendChild(actionColumn);
			table.appendChild(row);
		});
	});
}

function resetKeywords() {
	if (document.getElementById('reset-keywords').innerText === 'Are you sure?') {
		browser.storage.local.clear();
		displayKeywordsOnTable();
		cancelResetKeywords();
	} else {
		document.getElementById('reset-keywords').innerText = 'Are you sure?';
		document.getElementById('cancel-reset-keywords').style.display = 'inline-block';
	}
}

function cancelResetKeywords() {
	document.getElementById('reset-keywords').innerText = 'Reset Keywords';
	document.getElementById('cancel-reset-keywords').style.display = 'none';
}

popupStartUp();
