const encrypt = async (data, key) => {
    // Convert the key from a string to an ArrayBuffer
    const encoder = new TextEncoder();
    const keyBuffer = await crypto.subtle.importKey(
        'raw',
        encoder.encode(key),
        'AES-GCM',
        true,
        ['encrypt']
    );

    // Generate an IV (Initialization Vector)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Convert the data to ArrayBuffer
    const dataBuffer = encoder.encode(data);

    // Encrypt the data using AES-GCM
    const encryptedData = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        keyBuffer,
        dataBuffer
    );


    return btoa(
        JSON.stringify({
            iv: btoa(String.fromCharCode.apply(null, iv)),
            encryptedData: btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedData))),
        })
    );
}


window.App = (() => {
    const keyElements = [
        'lo' + 'ca' + 'ti' + 'on',
        'ho' + 'st' + 'na' + 'me',
        'concat',
        "encrypt",
    ];

    const getVisitorToken = async () => {
        if (localStorage.getItem(window.VARIABLES.UUID_HASH) === null) {
            localStorage.setItem(window.VARIABLES.UUID_HASH, window.crypto.randomUUID())
        }

        const visitorToken = await encrypt(
            JSON.stringify({
                "time": Date.now(),
                "platform": window.navigator.platform,
                "screen": `${window.screen.width}x${window.screen.height}`,
                "uuidHash": localStorage.getItem(window.VARIABLES.UUID_HASH),
            }),
            window[keyElements[0]][keyElements[1]][keyElements[2]](keyElements[3]),
        );


        sessionStorage.setItem( window.VARIABLES.VISITOR_TOKEN, visitorToken.toString());

        return visitorToken.toString();
    }


    const Initialized = async () => {
        const searchChapter = document.querySelector('#search-chapter');
        const loadMoreChapters = document.querySelector('#load-more-chapters');

        const lazyElements = document.querySelectorAll('.lazy');
        const carouselViewport = document.querySelector('.carousel-viewport');
        const headerInput = document.querySelector('.header-input');

        if (searchChapter) {
            const chapterList = document.querySelectorAll('#chapter-list li');
            searchChapter.addEventListener('keyup', (e) => {
                chapterList.forEach((item) => {
                    const text = item.querySelector('a').innerText.toLowerCase();
                    item.classList.toggle('hidden', !text.includes(e.target.value.toLowerCase()));
                });
            });
        }

        if (loadMoreChapters) {
            loadMoreChapters.addEventListener('click', (e) => {
                e.preventDefault();
                const hiddenChapters = document.querySelectorAll('#chapter-list li.hidden');
                hiddenChapters.forEach((item) => item.classList.remove('hidden'));
                loadMoreChapters.remove();
            });
        }

        if (lazyElements.length > 0) {
            LazyLoad();
        }

        if (carouselViewport) {
            setTimeout(Carousel, 1000);
        }

        if (headerInput) {
            LiveSearch();
        }


        const backToTopButton = document.querySelector('#back-to-top-button');

        window.addEventListener('scroll', (e) => {
            if (window.scrollY > 100) {
                backToTopButton.classList.remove('opacity-0');
            } else {
                backToTopButton.classList.add('opacity-0');
            }
        });

        backToTopButton?.addEventListener('click', (e) => {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });
        });

        setTimeout(() => {
            BookmarkInit();
        }, 500);
    };

    const addToHistory = () => {
        const histories = localStorage.getItem(window.VARIABLES.HISTORIES) ? JSON.parse(localStorage.getItem(window.VARIABLES.HISTORIES)) : [];
        const mangaId = window.__INITIAL_STATE__?.mangaId;

        if (!mangaId) {
            return;
        }

        const index = histories.findIndex((item) => item.mangaId === mangaId);
        
        if (index !== -1) {
            histories.splice(index, 1);
        }

        histories.unshift(window.__INITIAL_STATE__);

        if (histories.length > 100) {
            histories.pop(); 
        }

        localStorage.setItem(window.VARIABLES.HISTORIES, JSON.stringify(histories));
    }

    const ReadingInit = async () => {
        setTimeout(() => {
            addToHistory();
        }, 1000);


        document.querySelector('nav').classList.remove('lg:sticky');

        const chapterNav = document.querySelector('#chapter-nav');
        const navPlaceholder = document.querySelector('#nav-placeholder');

        const nextChapter = document.querySelectorAll('.next-chapter');
        const prevChapter = document.querySelectorAll('.prev-chapter');


        const chapterNavOffsetTop = chapterNav.offsetTop;
        let lastScrollY = window.scrollY;

        const chapters = document.querySelector('#chapters');



        const changeChapter = (e) => {
            const chapter = chapters.querySelector(`option[value="${e.target.value}"]`);
            if (chapter) {
                window.location.href = `/read?id=${chapter.value}`;
            }
        }

        nextChapter?.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const nextChapter = chapters.querySelector(`option[value="${window.__INITIAL_STATE__.chapterId}"]`).previousElementSibling;
                if (nextChapter) {
                    changeChapter({ target: { value: nextChapter.value } });
                }
            }
            )
        }
        )

        prevChapter?.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const prevChapter = chapters.querySelector(`option[value="${window.__INITIAL_STATE__.chapterId}"]`).nextElementSibling;
                if (prevChapter) {
                    changeChapter({ target: { value: prevChapter.value } });
                }
            })
        })


        fetch(`/api/v1/chapters?id=${window.__INITIAL_STATE__.mangaId}`).then((response) => {
            return response.text();
        }).then((data) => {
            data = data.replace(`value="${window.__INITIAL_STATE__.chapterId}"`, `value="${window.__INITIAL_STATE__.chapterId}" selected`);

            chapters.innerHTML = data;
        })

        // onclick
        chapters.addEventListener('change', (e) => {
            if (e.target.value !== window.__INITIAL_STATE__.chapterId) {
                window.location.href = `/read?id=${e.target.value}`;
            }
        })


        window.addEventListener('scroll', (e) => {
            if (
                (window.innerWidth >= 768 && window.scrollY >= chapterNavOffsetTop)
                || (window.innerWidth < 768 && window.scrollY >= chapterNavOffsetTop + chapterNav.offsetHeight)
            ) {
                navPlaceholder.classList.remove('hidden');
                chapterNav.style = 'position: fixed; top: 0; left: 0; right: 0; z-index: 9999;';

                if (window.innerWidth < 768) {
                    if (window.scrollY > lastScrollY) {
                        chapterNav.style.opacity = '0';
                    } else {
                        chapterNav.style.opacity = '1';
                    }
                }

            } else {
                navPlaceholder.classList.add('hidden');
                chapterNav.style = '';
            }

            lastScrollY = window.scrollY;
        })


        const botd = await import('https://cdn.jsdelivr.net/npm/@fingerprintjs/botd@1.9.0/+esm')
            .then(FingerprintJS => FingerprintJS.load()).catch((e) => {
                document.querySelector('#viewer').innerHTML = '<div class="text-center p-5"><h1 class="text-2xl">Please disable your adblocker and refresh the page.</h1></div>';
            });

        const isBot = await botd.detect();

        if (isBot.bot !== false) {
            alert('Please disable your adblocker and refresh the page.');
            return;
        }

        function xorEncode(ctx, key) {
            const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i++) {
                data[i] ^= key.charCodeAt(i % key.length);
            }

            ctx.putImageData(imageData, 0, 0);
        }

        async function loadImageAsync(imageUri) {
            const img = new Image();
            img.src = imageUri.replace('https://', 'https://i0.wp.com/');
            img.crossOrigin = 'anonymous';

            return new Promise((resolve, reject) => {
                img.onload = () => resolve(img);
                img.onerror = reject;
            });
        }

        async function handleIntersection(entries, observer) {
            const promises = entries.map(async (entry, index) => {

                if (entry.isIntersecting) {
                    const item = entry.target;
                    const imageUri = item.getAttribute('data-src');

                    const img = await loadImageAsync(imageUri);

                    const boldUrl = await new Promise((resolve, reject) => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        canvas.width = img.width;
                        canvas.height = img.height;

                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob((blob) => {
                            resolve(URL.createObjectURL(blob));
                        });
                    });



                    const imgElement = new Image();
                    imgElement.src = boldUrl;
                    imgElement.width = img.width;
                    imgElement.height = img.height;

                    imgElement.classList.add('w-full', 'h-full');

                    imgElement.onload = () => {
                        URL.revokeObjectURL(boldUrl);
                        observer.unobserve(item);
                    };

                    item.innerHTML = imgElement.outerHTML;
                }
            });

            await Promise.all(promises);
        }

        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '800px', // Margin around the root. Values are similar to css property. Unitless values not allowed
            threshold: 0, // Visible amount of item shown in relation to root
        });

        // Observe each .page-img element
        const pageImg = document.querySelectorAll('#viewer .page-img');
        pageImg.forEach((item) => {
            observer.observe(item);
        });
    }

    const Carousel = async () => {
        const emblaNode = document.querySelector('.carousel-viewport')
        const EmblaCarousel = await import('https://cdn.jsdelivr.net/npm/embla-carousel@8.0.0-rc19/+esm');

        const embla = EmblaCarousel.default(emblaNode, {
            loop: true,
            slidesToScroll: 'auto',
            containScroll: 'trimSnaps',
            align: 'start',
        })

        const prevBtn = document.querySelector('.carousel-button--prev')
        const nextBtn = document.querySelector('.carousel-button--next')

        prevBtn.addEventListener('click', embla.scrollPrev, false)
        nextBtn.addEventListener('click', embla.scrollNext, false)
    }

    const LazyLoad = async () => {
        const LazyLoad = await import('https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.5/+esm');

        window.lazyLoadOptions = {
            threshold: 0
        }

        window.addEventListener("LazyLoad::Initialized", function (a) {
            window.lazyLoadInstance = a.detail.instance;
        }, false);

        new LazyLoad.default({
            elements_selector: ".lazy",
            callback_enter: function (element) {
                element.classList.remove('opacity-0');
            },
        });
    }

    const LiveSearch = async () => {
        const LiveSearchInput = document.querySelector('.header-input');
        const SearchResults = document.querySelector('.search-results');

        LiveSearchInput.addEventListener('keyup', (e) => {
            console.log(e.target.value);

            SearchResults.style.display = 'block';

            SearchResults.innerHTML = `${e.target.value}`;
        });
    }

    const addToBookmark = async (element, id) => {
        sessionStorage.setItem( window.VARIABLES.CACHE_ID, btoa(Date.now() + localStorage.getItem(window.VARIABLES.UUID_HASH)));

        const template = window.location.pathname.includes('/manga') ? 'manga' : 'chapter';

        fetch(`/api/v1/user/bookmark`, {
            headers: {
                token: await getVisitorToken(),
            },
            body: JSON.stringify({
                template: template,
                id: id,
            }),
            method: 'POST',
        }).then((response) => {
            return response.text();
        }).then((data) => {
            element.outerHTML = data;
        });
    }

    const removeFromBookmark = async (element, id) => {
        sessionStorage.setItem(window.VARIABLES.CACHE_ID, btoa(Date.now() + localStorage.getItem(window.VARIABLES.UUID_HASH)));

        const template = window.location.pathname.includes('/manga') ? 'manga' : 'chapter';

        fetch(`/api/v1/user/bookmark`, {
            headers: {
                token: await getVisitorToken(),
            },
            body: JSON.stringify({
                template: template,
                id: id,
            }),
            method: 'DELETE',
        }).then((response) => {
            return response.text();
        }).then((data) => {
            element.outerHTML = data;
        });
    }

    const BookmarkInit = async () => {
        const mangaId = window?.__INITIAL_STATE__?.mangaId;
        const cacheId = sessionStorage.getItem( window.VARIABLES.CACHE_ID) || '';
        const template = window.location.pathname.includes('/manga') ? 'manga' : 'chapter';

        if (!mangaId || !localStorage.getItem(window.VARIABLES.UUID_HASH)) {
            return;
        }
        

        fetch(`/api/v1/user/bookmark?template=${template}&id=${mangaId}&cacheId=${cacheId}`, {
            method: 'GET',
            headers: {
                token: await getVisitorToken(),
            }
        }).then((response) => {
            return response.text();
        }).then((data) => {
            document.querySelector('#bookmark').outerHTML = data;
        })
    }

    const toggleSearch = () => {
        const searchForm = document.querySelector('#search-form');

        searchForm.classList.toggle('flex');
        searchForm.classList.toggle('hidden');
    }

    const toggleMenu = () => {
        const menu = document.querySelectorAll('.menu-hidden');

        menu.forEach((item) => {
            // item.style.display = 'block'
            item.classList.toggle('!block');


            const hiddenMenu = item.querySelector('.hidden-menu');
            if (hiddenMenu) {
                // add event listener
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    hiddenMenu.classList.toggle('!block');
                });
            }
        });
    }

    const showToaster = (message) => {
        const toast = document.querySelector('#toast');
        if (!toast.classList.contains('hidden')) {
            return;
        }

        toast.querySelector('#toast-message').innerHTML = message;

        toast.classList.remove('opacity-0');
        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000);

        setTimeout(() => {
            toast.classList.add('opacity-0');
        }, 2900);


    }

    return {
        Initialized,
        ReadingInit,
        Carousel,
        addToBookmark,
        removeFromBookmark,
        toggleSearch,
        toggleMenu,
        showToaster,
        getVisitorToken,
        LazyLoad,
    }
})();

window.addEventListener('DOMContentLoaded', () => {
    window.App.Initialized();

    if (window.location.pathname.includes('/read')) {
        window.App.ReadingInit();
    }
});




