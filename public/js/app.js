const App = (() => {
    const Initialized = () => {
        const headerLeftMenu = document.querySelectorAll('#header_left_menu li');
        headerLeftMenu.forEach((item) => {
            if (item.querySelector('a')?.getAttribute('href') === window.location.pathname) {
                item.classList.add('active');
            }
        });


        if (document.querySelector('.lazy')) {
            LazyLoad();
        }

        if (document.querySelector('.carousel-viewport')) {
            setTimeout(() => {
                Carousel();
            }, 1000);
        }

        if (document.querySelector('.header-input')) {
            LiveSearch();
        }
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

    return {
        Initialized
    }
})();

window.addEventListener('DOMContentLoaded', () => {
    App.Initialized();
});


