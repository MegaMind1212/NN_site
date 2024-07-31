if (document.querySelector(".header-extended") == null) {
    // document.querySelector("header.site-header").style.position = "fixed";
}

document.querySelectorAll('.js-local-link').forEach(el => {
    el.addEventListener('click', handleLocalLinkNavigation);
});

function handleLocalLinkNavigation(e) {
    e.preventDefault();
    var target_link = this.getAttribute("href");
    var target = document.querySelector(target_link);
    if (target != null) {
        navToggle.classList.remove("open");
        window.scrollTo({
            top: target.offsetTop - siteHeader.clientHeight,
            left: 0,
            behavior: "smooth"
        });
    }
}


const navToggle = document.querySelector(".nav-toggle");
navToggle.addEventListener('click', function () {
    this.classList.toggle('open')
});

var location_hash = location.hash;

if (location_hash.length > 0) {
    var target = document.querySelector(location_hash);
    if (target != null && target.classList.contains("js-hash-target")) {
        window.addEventListener('load', function () {
            window.scrollTo({
                top: target.offsetTop - siteHeader.clientHeight,
                left: 0,
                behavior: "smooth"
            });
        });
    }
    else if (target != null && target.classList.contains("area")) {
        window.addEventListener('load', function () {
            target.querySelector(".area-head").click();
        });
    }
    else if (target != null && target.classList.contains("block-full")) {
        window.addEventListener('load', function () {
            target.parentNode.querySelector("a[href='" + location_hash + "']").click();
        });
    }
}
var _cursor = document.querySelector('.cursor');
var _cursorInside = document.querySelector('.cursor-inside');

window.addEventListener('mousemove', function (e) {
    var _cursorWidth = _cursor.clientWidth / 2;
    _cursor.style.transform = `translate( ${e.clientX - _cursorWidth}px, ${e.clientY - _cursorWidth}px)`;

    var _cursorInsideWidth = 2; //_cursorInside.clientWidth / 2;
    _cursorInside.style.transform = `translate( ${e.clientX - _cursorInsideWidth}px, ${e.clientY - _cursorInsideWidth}px)`;
    //_cursorInside.style.transform = e.clientX + "px";

});
function Handle_MouseOverLink() {
    _cursor.classList.add('on-link');

}
function Handle_MouseOutLink() {
    _cursor.classList.remove('on-link');

}
function RefreshAnchorHandlersForCursor() {
    var allLinks = document.querySelectorAll('a, .js-mouse-indicator, button');
    allLinks.forEach(function (element) {
        element.removeEventListener('mouseenter', Handle_MouseOverLink);
        element.removeEventListener('mouseleave', Handle_MouseOutLink);

        element.addEventListener('mouseenter', Handle_MouseOverLink);
        element.addEventListener('mouseleave', Handle_MouseOutLink);
    });
}
RefreshAnchorHandlersForCursor();


var siteHeader = document.querySelector("header.site-header");


window.addEventListener('load', removeLoadingScreen);

function removeLoadingScreen() {
    if (typeof (PageLoadingScreen) === 'undefined') return;
    PageLoadingScreen.classList.add("out");

    setTimeout(function () {
        document.body.removeChild(PageLoadingScreen);
        window.removeEventListener('load', removeLoadingScreen);
    }, 2100);
}

setTimeout(removeLoadingScreen, 6000);


var isSmallScreen = function () {
    return window.innerWidth < 768;
};


document.querySelectorAll(".people-list article .picture, .people-list article h3, .people-list article .designation").forEach(el => {
    el.addEventListener('click', function (e) {


        var open_article = document.querySelector(".people-list article.open");

        var article = this.closest("article");


        var info = article.querySelector('.info');


        if (article == open_article) {
            open_article.querySelector(".info").style.height = "0";
            open_article.classList.remove("open");
            return;
        }

        if (open_article != null) {
            open_article.querySelector(".info").style.height = "0";
            open_article.classList.remove("open");
        }

        info.style.height = info.scrollHeight + "px";
        article.classList.add("open");

        setTimeout(() => {
            info.style.height = "auto"
        }, 400);

        window.scrollTo({
            top: article.offsetParent.offsetTop + article.offsetTop - siteHeader.clientHeight - 20,
            left: 0,
            behavior: "smooth"
        });
    });
});
document.querySelectorAll(".links-group .top").forEach(el => {
    el.addEventListener('click', function (e) {
        //console.log(e);
        var info = this.parentNode.querySelector('.content');
        console.log(info);
        if (this.parentNode.classList.contains('open')) {
            info.style.height = info.scrollHeight + "px";
            setTimeout(() => {
                info.style.height = 0;
            }, 10);
            this.parentNode.classList.remove("open");
        }
        else {
            info.style.height = info.scrollHeight + "px";
            this.parentNode.classList.add("open");

            setTimeout(() => {
                console.log("from timeout");
                console.log(info);
                info.style.height = "auto"
            }, 400);
        }


    });
});

document.querySelectorAll(".practice-areas .areas .area .area-head").forEach(el => {

    el.addEventListener('click', function (e) {
        var open_area = document.querySelector(".practice-areas .areas .area.open");

        var info = this.parentNode.querySelector('.area-body');

        var area = info.parentNode;

        if (area == open_area) {
            open_area.querySelector(".area-body").style.height = "0";
            open_area.classList.remove("open");
            return;
        }

        if (open_area != null) {
            open_area.querySelector(".area-body").style.height = "0";
            open_area.classList.remove("open");
        }

        info.style.height = info.scrollHeight + "px";
        this.parentNode.classList.add("open");

        setTimeout(() => {
            info.style.height = "auto"
        }, 400);

        window.scrollTo({
            top: this.parentNode.offsetTop - siteHeader.clientHeight,
            left: 0,
            behavior: "smooth"
        });

    });
});
var activeSectorBlock = null;


var anchor_blocks = [...document.querySelectorAll(".sectors a.block")]

anchor_blocks.forEach(el => {
    el.addEventListener('click', function (e) {

        var clickedItem = this;

        e.preventDefault();
        var info = document.querySelector(this.getAttribute('href'));

        if (info == activeSectorBlock) {
            activeSectorBlock.animate([{ height: 0 }], { duration: 60, fill: "forwards", easing: "ease" });
            activeSectorBlock = null;
            this.classList.remove('active');
            document.querySelectorAll(".sectors a.block.active").forEach(act => {
                act.classList.remove('active');
            });
            return;
        }
        if (activeSectorBlock != null) {
            activeSectorBlock.animate([{ height: 0 }], { duration: 600, fill: "forwards", easing: "ease" });
            document.querySelectorAll(".sectors a.block.active").forEach(act => {
                act.classList.remove('active');
            });
        }


        if (info.classList.contains('open')) {
            //info.style.height = info.scrollHeight + "px";
            //setTimeout(() => {
            //    info.style.height = 0;
            //}, 10);
            info.animate([{ height: 0 }], { duration: 600, fill: "forwards", easing: "ease" });
            this.classList.remove('active');
        }
        else {
            //info.style.height = info.scrollHeight + "px";
            //info.classList.add("open");

            //setTimeout(() => {
            //    console.log("from timeout");
            //    console.log(info);
            //    info.style.height = "auto"
            //    activeSectorBlock = info;
            //}, 400);
            info.animate([{ height: info.scrollHeight + "px" }], { duration: 600, fill: "forwards", easing: "ease" });
            activeSectorBlock = info;
            this.classList.add('active');
        }

        var idx = anchor_blocks.indexOf(clickedItem);
        console.log('index is ' + idx);
        if (window.innerWidth > 767) {
            if (idx < 4) {
                info.style.order = 5;
            }
            else if (idx < 8) {
                info.style.order = 9;
            } else if (idx < 12) {
                info.style.order = 13;
            }
        }
        else {

            if (idx < 2) {
                info.style.order = 3;
            }
            else if (idx < 4) {
                info.style.order = 5;
            }
            else if (idx < 6) {
                info.style.order = 7;
            }
            else if (idx < 8) {
                info.style.order = 9;
            }
            else if (idx < 10) {
                info.style.order = 11;
            }
            else if (idx < 12) {
                info.style.order = 13;
            }


        }
        setTimeout(function () {
            window.scrollTo({
                top: info.offsetTop - siteHeader.clientHeight,
                left: 0, behavior: "smooth"
            });
            info.style.height = "auto !important";
        }, 600);
    });
});

document.querySelectorAll(".position-header").forEach(el => {
    el.addEventListener('click', function (e) {
        //console.log(e);
        var info = this.parentNode.querySelector('.position-body');
        console.log(info);
        if (this.parentNode.classList.contains('open')) {
            info.style.height = info.scrollHeight + "px";
            setTimeout(() => {
                info.style.height = 0;
            }, 10);
            this.parentNode.classList.remove("open");
        }
        else {
            info.style.height = info.scrollHeight + "px";
            this.parentNode.classList.add("open");

            setTimeout(() => {
                console.log("from timeout");
                console.log(info);
                info.style.height = "auto"
            }, 400);
        }
    });
});


// window current size
var sizeInfo = document.querySelector(".current-window-size");
window.addEventListener('resize', function () {
    //  renderSizeInfo();
});
function renderSizeInfo() {
    sizeInfo.innerHTML = `${window.innerWidth} x ${window.innerHeight}`;
}
//renderSizeInfo();
// /window current size


function wire_about_page_lottie_animations() {
    var player = document.querySelector("lottie-player");
    player.autoplay = false;
    player.seek(0);
    var heroScreens = document.querySelector(".hero-screens");



    window.addEventListener('scroll', function () {

        const box = heroScreens.getBoundingClientRect();

        //  var a = (box.bottom) / (box.height + window.innerHeight) * 100;

        var a = (box.bottom - siteHeader.clientHeight) / box.height * 100;

        var scrolledPercentage = (100 - a);

        if (scrolledPercentage < 0)
            scrolledPercentage = 0;

        scrolledPercentage = Math.min(scrolledPercentage, 100);



        var to = 360 * scrolledPercentage / 100;

        //console.log(to);



        player.seek(to.toFixed(0));

    });
}

function wire_careers_page_lottie_animations() {
    var player = document.querySelector("lottie-player");

    a_player = player;

    player.autoplay = false;
    player.seek(0);
    var heroScreens = document.querySelector(".hero-screens");



    window.addEventListener('scroll', function () {

        const box = heroScreens.getBoundingClientRect();

        //  var a = (box.bottom) / (box.height + window.innerHeight) * 100;

        var a = (box.bottom - siteHeader.clientHeight) / box.height * 100;

        var scrolledPercentage = (100 - a);

        if (scrolledPercentage < 0)
            scrolledPercentage = 0;

        //scrolledPercentage = Math.min(scrolledPercentage, 100);



        var to = 260 * scrolledPercentage / 100;

        //console.log(to);

        if (to > 180) {
            to = 180
        }


        player.seek(to.toFixed(0));

    });
}


// reviews section

var reviews_section = document.querySelector("section.reviews");

if (reviews_section != null && reviews_section.querySelector(".reviews-reel article") != null) {

    var control_prev = reviews_section.querySelector(".control.prev");
    var control_next = reviews_section.querySelector(".control.next");
    var reel = reviews_section.querySelector(".reviews-reel");

    var current_item = reel.querySelector("article");

    var auto = true;
    var auto_direction = "forwards";
    control_next.addEventListener('click', function () {
        auto = false;
        var next_item = current_item.nextElementSibling;

        reel.scrollLeft = next_item.offsetLeft;

        current_item = next_item; recheckControls();
    });
    control_prev.addEventListener('click', function () {
        auto = false;
        var prev_item = current_item.previousElementSibling;

        reel.scrollLeft = prev_item.offsetLeft;

        current_item = prev_item; recheckControls();
    });

    function recheckControls() {
        control_next.disabled = current_item.nextElementSibling == null;
        control_prev.disabled = current_item.previousElementSibling == null;
    }
    function doAuto() {
        if (auto_direction == "forwards") {
            if (current_item.nextElementSibling == null) {
                auto_direction = "backwards";
            }
        }
        if (auto_direction == "backwards") {
            if (current_item.previousElementSibling == null) {
                auto_direction = "forwards";
            }
        }


        if (auto_direction == "forwards") {
            var next_item = current_item.nextElementSibling;

            reel.scrollLeft = next_item.offsetLeft;

            current_item = next_item;
            recheckControls();
        }
        if (auto_direction == "backwards") {
            var prev_item = current_item.previousElementSibling;

            reel.scrollLeft = prev_item.offsetLeft;

            current_item = prev_item;
            recheckControls();
        }
    }

    recheckControls();
    var autoInterval =
        setInterval(function () {
            if (auto == false) {
                clearInterval(autoInterval);
                return;
            }
            doAuto();
        }, 4000);
}
// /reviews section
// members-say section

var mebmersSay_section = document.querySelector(".section-members-say");

if (mebmersSay_section != null && mebmersSay_section.querySelector("article") != null) {

    var control_prev = mebmersSay_section.querySelector(".control.prev");
    var control_next = mebmersSay_section.querySelector(".control.next");
    var reel = mebmersSay_section.querySelector(".reel");

    var current_item = reel.querySelector("article");



    control_next.addEventListener('click', function () {
        //var next_item = current_item.nextElementSibling;

        reel.scrollLeft = reel.scrollLeft + reel.clientWidth;

        // current_item = next_item;
        recheckControls();
    });
    control_prev.addEventListener('click', function () {
        // var prev_item = current_item.previousElementSibling;

        reel.scrollLeft = reel.scrollLeft - reel.clientWidth;

        //current_item = prev_item;

        recheckControls();
    });

    function recheckControls() {
        control_next.disabled = reel.scrollLeft == reel.clientWidth;
        control_prev.disabled = reel.scrollLeft == 0;
    }
    recheckControls();
}
// /members-say section

// scroll with arrow
var controls = document.querySelectorAll(".control.scroll-with-arrow");

controls.forEach(control => {
    control.addEventListener('click', scrollWithControl_Handler);
});

function scrollWithControl_Handler() {

    var clickedControl = this;
    var target = document.querySelector(clickedControl.dataset.target);

    if (target.dataset.scrolls == "width") {
        if (clickedControl.classList.contains('next')) {
            target.scrollLeft = target.scrollLeft + target.clientWidth;
        }
        else {
            // if prev
            target.scrollLeft = target.scrollLeft - target.clientWidth;
        }
    }
    else {

        var currentItemInTargetContainer = target.querySelector(".current-scroll-with-arrow");

        if (currentItemInTargetContainer == null) {
            currentItemInTargetContainer = target.querySelector(":first-child");
        }
        var nextItemInTargetContainer = null;
        if (clickedControl.classList.contains('next')) {
            var nextItemInTargetContainer = currentItemInTargetContainer.nextElementSibling;
        }

        else if (clickedControl.classList.contains('prev')) {
            var nextItemInTargetContainer = currentItemInTargetContainer.previousElementSibling;
        }
        if (nextItemInTargetContainer != null) {
            target.scrollLeft = (nextItemInTargetContainer.offsetLeft - target.offsetLeft);
            nextItemInTargetContainer.classList.add('current-scroll-with-arrow');
        }
        currentItemInTargetContainer.classList.remove('current-scroll-with-arrow');
    }
}
function RechckScrollWithArrowControls() {
    controls.forEach(control => {
        var target = document.querySelector(control.dataset.target);

        if (control.classList.contains('prev')) {
            control.disabled = target.scrollLeft <= 0
        }
        else if (control.classList.contains('next')) {
            control.disabled = target.scrollLeft >= target.scrollWidth - target.clientWidth;
        }

    });
}
if (controls.length > 0) {
    setInterval(function () {
        RechckScrollWithArrowControls();
    }, 200);
}
// scroll with arrow


if (document.querySelector(".header-extended") != null) {

    setInterval(function () {
        if (siteHeader.getBoundingClientRect().y < 100) {
            siteHeader.classList.add('snapped-to-top');
        }
        else {
            siteHeader.classList.remove('snapped-to-top');
        }
    }, 100);
}

function do_marque_clients() {
    var marqueGallery = document.querySelector(".marque ul");
    var $setOfItems = marqueGallery.innerHTML;



    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(target);

                if (window.innerWidth >= 768) {
                    marqueGallery.insertAdjacentHTML("beforeend", $setOfItems);
                    startObserver();
                }
            }
        });
    }, {
        root: marqueGallery,
        rootMargin: "100px",
        threshold: 1,
    });


    var target;
    var paused = false;
    var scrollPosition = 0;

    function animateScrollLeft() {
        scrollPosition += 2;
        marqueGallery.scrollTo(scrollPosition, 0);
        if (window.innerWidth < 768) return;
        if (paused) return;
        requestAnimationFrame(animateScrollLeft);
    }

    function startObserver() {
        target = marqueGallery.querySelector("li:last-child");
        observer.observe(target);
    }

    startObserver();
    requestAnimationFrame(animateScrollLeft);



    marqueGallery.addEventListener("mouseenter", function () {
        paused = true;
    });
    marqueGallery.addEventListener("mouseleave", function () {
        paused = false;
        animateScrollLeft();
    });


}
var clients_marque = document.querySelector(".clients .marque");

if (clients_marque != null && !isSmallScreen()) {
    do_marque_clients();
}

//document.querySelectorAll('.awards ul li').forEach(el_li => {
//    el_li.addEventListener('mouseenter', function () {
//        this.classList.add('hover');
//    });
//    el_li.addEventListener('mouseleave', function () {
//        this.classList.remove('hover');

//    });
//});

(function () {
    var peopleCircleEffect = document.querySelector(".effect-people");


    if (peopleCircleEffect == null) return;

    var numberOfRows = isSmallScreen() ? 3 : peopleCircleEffect.dataset.rowcount;

    var template = peopleCircleEffect.querySelector("template").innerHTML;

    peopleCircleEffect.innerHTML = "";

    var numerOfCirclesPerRow = isSmallScreen() ? 9 : 19;

    for (var i = 0; i < numerOfCirclesPerRow * numberOfRows; i++) {
        peopleCircleEffect.innerHTML += template;
    }

    var circles = [...document.querySelectorAll(".effect-people  .circle")];
    for (var j = 0; j < circles.length; j++) {
        var circle = circles[j];

        circle.addEventListener('mousemove', handleMouseEnter);
        //circle.addEventListener('mouseenter', handleMouseEnter);
        circle.addEventListener('mouseleave', handleMouseLeave);

    }


    function handleMouseEnter(e) {
        clearFromAll();

        this.classList.add("show");
        ///  console.log(cicles.indexOf(this));

        var indexInCircles = circles.indexOf(this);

        var indexInPrev = indexInCircles - numerOfCirclesPerRow;
        var indexInNext = indexInCircles + numerOfCirclesPerRow;


        var width = this.clientWidth;
        var height = this.clientWidth;
        var x = e.offsetX;
        var y = e.offsetY;

        if (x >= width / 2) {
            // towards right
            this.nextElementSibling?.classList.add('show');
        }
        else {
            this.previousElementSibling?.classList.add('show');
        }

        if (y > height / 2) {
            if (indexInNext <= circles.length) {
                var next = circles[indexInNext];
                next.classList.add("show");
                if (x >= width / 2) {
                    next.nextElementSibling?.classList.add("show");
                }
                else {
                    next.previousElementSibling?.classList.add("show");
                }
            }
        }
        else {

            if (indexInPrev > -1) {
                var prev = circles[indexInPrev];
                prev.classList.add('show');
                if (x >= width / 2) {
                    prev.nextElementSibling?.classList.add("show");
                }
                else {
                    prev.previousElementSibling?.classList.add("show");
                }

            }
        }


    }
    function handleMouseLeave() {
        //  clearFromAll();
    }
    peopleCircleEffect.addEventListener('mouseleave', () => {
        clearFromAll();
    });
    function clearFromAll() {
        circles.forEach(c => {
            c.classList.remove("show");
        });
    }
}());


(function () {
    var topWriting_pager = document.querySelector(".top-writings .pager");
    if (topWriting_pager != null) {
        var topWritings = [...document.querySelectorAll(".top-writings .top .post")];
        if (topWritings.length == 0) return;
        for (var i = 0; i < topWritings.length; i++) {
            topWriting_pager.innerHTML += "<span><i></i></span>";
        }
        var pagingItems = [...topWriting_pager.querySelectorAll("span")];


        var activePager = pagingItems[0];

        setInterval(function () {
            activePager = activePager.nextElementSibling == null ? pagingItems[0] : activePager.nextElementSibling;
            setActivePager();
        }, 3000);

        setActivePager();
        function setActivePager() {
            pagingItems.forEach(i => {
                i.classList.remove('active');
            });
            activePager.classList.add("active");
            topWritings.forEach(i => {
                i.classList.remove('active');
            });
            topWritings[pagingItems.indexOf(activePager)].classList.add('active');
        }

        pagingItems.forEach(p => {
            p.addEventListener("click", () => {
                activePager = this;
                setActivePager();
            });
        });
    }
}());

var btnUniversalDialogClose = document.querySelector(".universal-dialog .close");

if (btnUniversalDialogClose != null) {
    btnUniversalDialogClose.addEventListener('click', function () {
        UniversalDialog.classList.add('closing');
        setTimeout(function () {
            closeUniversalDialog();
            UniversalDialog.querySelector(".content .inner-content").innerHTML = "";
            UniversalDialog.classList.remove('closing');
        }, 2000);
    });
}

document.querySelectorAll(".js-opens-universal-dialog").forEach(d => {
    d.addEventListener('click', function (e) {
        e.preventDefault();
        UniversalDialog.querySelector(".content .inner-content").innerHTML = "<p>Loading...</p>";

        openUniversalDialog(this.classList.contains('js-hide-close'));
        fetch(this.href).then(r => {
            r.text().then(text => {
                UniversalDialog.querySelector(".content .inner-content").innerHTML = text;
            });
        });
    });
});

function openUniversalDialog(hideCloseButton = false) {
    UniversalDialog.classList.add('show');
    if (hideCloseButton) {
        UniversalDialog.classList.add('hide-close');
    }
    else {
        UniversalDialog.classList.remove('hide-close');
    }
}

function closeUniversalDialog() {
    UniversalDialog.classList.remove('show');
}

function agreeToDisclaimer() {
    localStorage.setItem("AgreedToDisclaimer", "yes");
    closeUniversalDialog();
}

if (localStorage.getItem("AgreedToDisclaimer") == null) {
    DisclaimerLink.click();
}


// writings search
var writingsSearchForm = document.querySelector('.writings-search-form');

if (writingsSearchForm != null) {
    var toggle = writingsSearchForm.querySelector(".toggle");
    var filterOptions = writingsSearchForm.querySelector(".options");
    var input_search = writingsSearchForm.querySelector("input[type=search]");

    if (location.href.indexOf("action=search") > -1) {
        window.scrollTo({
            top: writingsSearchForm.offsetTop - siteHeader.clientHeight - 40,
            left: 0,
            behavior: "smooth"
        });
    }

    input_search.addEventListener('focus', function () {
        window.scrollTo({
            top: writingsSearchForm.offsetTop - siteHeader.clientHeight - 40,
            left: 0,
            behavior: "smooth"
        });
    });

    filterOptions.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    toggle.addEventListener('click', function () {
        filterOptions.classList.add('open');
        setTimeout(function () {
            document.body.addEventListener('click', optionsOutsideClickHandler);
        }, 100);
        window.scrollTo({
            top: writingsSearchForm.offsetTop - siteHeader.clientHeight - 40,
            left: 0,
            behavior: "smooth"
        });

    });

    function optionsOutsideClickHandler() {
        filterOptions.classList.remove("open");
        setTimeout(function () {
            document.body.removeEventListener('click', optionsOutsideClickHandler);
        }, 100);
        // doSearch();
    }

    writingsSearchForm.querySelector(".filters .options .options-controls .btn-apply").addEventListener("click", function () {
        filterOptions.classList.remove("open");
        doSearch();
    });
    writingsSearchForm.querySelector(".filters .options .options-controls .btn-clear").addEventListener("click", function () {
        writingsSearchForm.querySelectorAll(".filters .options input").forEach(el => {
            el.checked = false;
        });
        syncTypeChecks();
        doSearch();
        filterOptions.classList.remove("open");
    });

    var allType = writingsSearchForm.querySelector(".types #TypeAll");
    var otherTypes = [...writingsSearchForm.querySelectorAll(".types input.other-type")];

    document.querySelector("#TypeAll").addEventListener('change', function () {
        if (this.checked) {
            types_in_options.forEach(t => {
                t.checked = false;
                syncTypeChecks();
            });
        }
        doSearch();
    });
    otherTypes.forEach(el => {
        el.addEventListener('change', function () {
            if (otherTypes.filter(e => e.checked == true).length > 0)
                allType.checked = false;

            types_in_options.filter(o => o.value == this.value)[0].checked = this.checked;
            doSearch();
        });

    });

    var types_in_options = [...filterOptions.querySelectorAll("[name=Types]")];

    types_in_options.forEach(t => {
        t.addEventListener('change', function () {
            syncTypeChecks();
        });
    });

    function syncTypeChecks(setAllTypeToUnChecked = false) {
        var checked_items = types_in_options.filter(t => t.checked);

        if (checked_items.length == 0) {
            allType.checked = true;
            otherTypes.forEach(t => {
                t.checked = false;
            });

        }
        else {
            allType.checked = false;
        }
        types_in_options.forEach(t => {
            otherTypes.filter(o => o.value == t.value)[0].checked = t.checked;
        });
        if (setAllTypeToUnChecked) {
            allType.checked = false;
        }

    }
    syncTypeChecks(true);

    writingsSearchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        doSearch();
    });

    document.querySelector(".clear-results").addEventListener("click", function () {
        window.location = "/writings";
    });
}
var searchResultsContainer = document.querySelector(".search-results-container");

function paginateSearchResult(pg) {
    doSearch(pg);
}
function doSearch(pg = 0) {
    writingsSearchForm.querySelector("[name=pg]").value = pg;
    document.querySelectorAll(".top-writings, .latest-writings").forEach(el => {
        el.style.display = "none";
    });
    document.querySelector(".search-result-writings").style = "block";

    searchResultsContainer.innerHTML = '<div class="loading">Loading search results...</div> ';

    window.scrollTo({
        top: writingsSearchForm.offsetTop - siteHeader.clientHeight - 40,
        left: 0,
        behavior: "smooth"
    });

    var payload = new FormData(writingsSearchForm);

    var query_raw = new URLSearchParams(payload);
    query_raw.delete("__RequestVerificationToken");
    var query = query_raw.toString();

    window.history.replaceState(null, "", "/writings?" + query);

    console.log(query);
    payload.append("IsAjax", true);


    fetch("/writings", {
        method: "POST",
        body: payload
    }).then(r => {
        if (r.ok) {
            r.text().then(r_text => {
                searchResultsContainer.innerHTML = r_text;
            });
        }
        else {
            searchResultsContainer.innerHTML = '<div class="loading">There was an error processing. Try Again.</div> ';
        }
        window.scrollTo({
            top: writingsSearchForm.offsetTop - siteHeader.clientHeight - 40,
            left: 0,
            behavior: "smooth"
        });
    });
}

// /writings search


// newsletter form
var theNewsletterForm = document.querySelector(".the-newsletter-form");
function theNewsletterFormHandler(e) {
    e.preventDefault();
    var form = this;
    var submitBtn = form.querySelector(".btn-submit");

    if (form.classList.contains("processing")) {
        return;
    }

    form.classList.add("processing");

    submitBtn.classList.add('is-busy');
    var payload = new FormData(form);
    payload.append("jsVerified", true);
    fetch("/forms/NewsletterSignup", {
        method: "POST",
        body: payload
    }).then(r => {
        if (r.ok) {
            r.json().then(r_json => {

                if (r_json.success) {
                    submitBtn.classList.add("is-success");
                    submitBtn.classList.remove("is-busy");
                    setTimeout(() => {
                        submitBtn.classList.remove("is-success");
                        form.reset();
                    }, 5000);
                } else {
                    submitBtn.classList.remove("is-busy");
                    submitBtn.classList.remove("is-success");
                }
            });
        }
        else {
            submitBtn.classList.remove("is-busy");
            submitBtn.classList.remove("is-success");
        }
        form.classList.remove("processing");
    });
}
if (theNewsletterForm != null) {
    theNewsletterForm.addEventListener("submit", theNewsletterFormHandler);
}
// newsletter form

// contact form
var theContactForm = document.querySelector(".the-contact-form");
function theContactFormHandler(e) {
    e.preventDefault();
    var form = this;
    var submitBtn = form.querySelector(".btn-submit");

    if (form.classList.contains("processing")) {
        return;
    }

    form.classList.add("processing");

    submitBtn.classList.add('is-busy');
    var payload = new FormData(form);
    payload.append("jsVerified", true);
    fetch("/forms/ContactForm", {
        method: "POST",
        body: payload
    }).then(r => {
        if (r.ok) {
            r.json().then(r_json => {

                if (r_json.success) {
                    submitBtn.classList.add("is-success");
                    submitBtn.classList.remove("is-busy");
                    setTimeout(() => {
                        submitBtn.classList.remove("is-success");
                        form.reset();
                    }, 5000);
                } else {
                    submitBtn.classList.remove("is-busy");
                    submitBtn.classList.remove("is-success");
                }
            });
        }
        else {
            submitBtn.classList.remove("is-busy");
            submitBtn.classList.remove("is-success");
        }
        form.classList.remove("processing");
    });
}
if (theContactForm != null) {
    theContactForm.addEventListener("submit", theContactFormHandler);
}
// contact form

// scroll set
(function () {
    var scroll_set = document.querySelector(".scroll-set");
    if (scroll_set == null) return;



    var items = [...scroll_set.querySelectorAll("em")];

    var current = items[0];

    setInterval(function () {
        var next = current.nextElementSibling == null ? items[0] : current.nextElementSibling;
        next.style.transform = "translateY(100%)";
        current.style.transform = "translateY(0)";

        current.animate([
            { transform: "translateY(0)" },
            { transform: "translateY(-100%)" }

        ],
            {
                duration: 1000,

                easing: "ease",
                fill: "forwards"
            }
        );

        next.animate([
            { transform: "translateY(100%)" },
            { transform: "translateY(0)" }

        ],
            {
                duration: 1000,

                easing: "ease",
                fill: "forwards"
            }
        );
        current = next;
    }, 2000);

}());
// scroll set