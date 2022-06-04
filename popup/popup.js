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

function deleteKeyword(keyword) {
	browser.storage.local.remove(keyword);
	displayKeywordsOnTable();
}

function displayKeywordsOnTable() {
	browser.storage.local.get().then(function(result) {
		var keywords = Object.keys(result);
		var keywordsDiv = document.getElementById('keywords');
		if (keywords.length != 0) {
			var table = document.createElement('table');
			keywordsDiv.innerHTML = '';
			keywordsDiv.appendChild(table);
			var headerRow = document.createElement('tr');
			headerRow.classList.add('header-row');
			var keywordHeader = document.createElement('th');
			keywordHeader.classList.add('keyword-header');
			keywordHeader.innerText = 'Keyword';
			var actionHeader = document.createElement('th');
			actionHeader.innerText = 'Action';
			keywordHeader.classList.add('action-header');
			headerRow.appendChild(keywordHeader);
			headerRow.appendChild(actionHeader);
			table.appendChild(headerRow);
		} else {
			keywordsDiv.innerHTML = '';
		}
		keywords.forEach(function(keyword) {
			var row = document.createElement('tr');
			var keywordColumn = document.createElement('td');
			keywordColumn.innerText = keyword;
			var actionColumn = document.createElement('td');
			var deleteButton = document.createElement('button');
			deleteButton.innerText = 'Remove';
			deleteButton.addEventListener('click', function() {
				deleteKeyword(keyword);
			});
			actionColumn.appendChild(deleteButton);
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
