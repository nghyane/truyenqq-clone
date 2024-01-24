const itemTemplate = document.querySelector('#history-template');
const localHistory = document.querySelector('#history-local');
const historyEmpty = document.querySelector('#history-empty');

const getHistoryLocal = async () => {
    const histories = localStorage.getItem(window.VARIABLES.HISTORIES) ? JSON.parse(localStorage.getItem(window.VARIABLES.HISTORIES)) : [];

    if (histories.length === 0) {
        historyEmpty?.classList.remove('hidden');
        return;
    }

    histories.map((item)=> {        
        const template = itemTemplate.innerHTML
        .replace(/MANGA_TITLE/g, item.mangaTitle)
        .replace(/MANGA_URL/g, item.mangaUrl)
        .replace(/MANGA_COVER/g, item.mangaCover)
        .replace(/CHAPTER_TITLE/g, item.chapterTitle)
        .replace(/CHAPTER_URL/g, item.chapterUrl)

        localHistory.insertAdjacentHTML('beforeend', template);
    })

    window.lazyLoadInstance ? window.lazyLoadInstance.update() : window.App.LazyLoad();
}

if (localHistory) {
    getHistoryLocal();
}


const clearHistory = document.querySelector('#clear-history');

clearHistory?.addEventListener('click', () => {
    localStorage.removeItem(window.VARIABLES.HISTORIES);
    window.location.reload();
})