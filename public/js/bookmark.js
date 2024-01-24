const getBookmarks = async (page = 1) => {
    const cacheId = sessionStorage.getItem(window.VARIABLES.CACHE_ID) || '';
    const query = new URLSearchParams(window.location.search);

    query.set('cacheId', cacheId);
    query.set('page', page);
    
    const response = await fetch(`/api/v1/user/bookmarks?${query.toString()}`, {
        method: 'GET',
        headers: {
            'Token': await window.App.getVisitorToken(),
        },

    });

    if (response.status !== 200) {
        throw new Error('Cannot fetch bookmarks');
    }

    return await response.text();
}

const bookmarksContainer = document.querySelector('#bookmarks');

if (bookmarksContainer) {
    if (localStorage.getItem(window.VARIABLES.UUID_HASH) !== null) {
        const bookmarks = await getBookmarks();

        // bookmarksContainer.innerHTML = bookmarks;
        //appends the bookmarks to the container
        bookmarksContainer.insertAdjacentHTML('beforeend', bookmarks);
    
        window.lazyLoadInstance ? window.lazyLoadInstance.update() : window.App.LazyLoad();
    } else {
        const bookmarkEmpty = document.querySelector('#bookmark-empty');

        if (bookmarkEmpty) {
            bookmarkEmpty.classList.remove('hidden');
        }
    }   
}



