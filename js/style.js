$(document).ready(function(){
    // 기본 - 화면의 가로, 세로 크기 / 스크롤 존재가 있다면 스크롤 크기 없으면 0
    basicStyle();
    $(window).resize(function(){
        basicStyle();
    })

    // 스타일 인덱스
    styleIdx();

    // 스크롤 - 해더
    scrollHeader();

    // 팝업
    popup();

    // 제안
    proposal();
})

// 기본 - 화면의 가로, 세로 크기 / 스크롤 존재가 있다면 스크롤 크기 없으면 0
function basicStyle(){
    $('body').css('--fullHeight', window.innerHeight + 'px');
    $('body').css('--fullWidth', window.innerWidth + 'px');
    let scrollWidth;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        scrollWidth = '0'
    } else {
        scrollWidth = '17'
    }
    $('body').css('--scrollWidth', scrollWidth + 'px');
}

// 스타일 인덱스
function styleIdx(){
    $('[data-styleIdx]').each(function(){
        const childrenSelect = $(this).attr('data-styleIdx') ? $(this).children($(this).attr('data-styleIdx')) : $(this).children();
        $(this).css('--idxTotal', childrenSelect.length)
        childrenSelect.each(function(i){
            $(this).css('--styleIdx', i)
        })
    })
}

// 스크롤 - 해더
function scrollHeader(){
    $(window).scroll(function(){
        $(this).scrollTop() > 0 ? $('header').addClass('scroll') : $('header').removeClass('scroll');
    })
}

// 팝업
function popup(){
    $('[data-popupOpen]').click(function(){
        const popupName = $(this).attr('data-popupOpen');
        $(`[data-popup="${popupName}"]`).addClass('active');
    })

    $('[data-popupClose]').click(function(){
        $(`[data-popup]`).removeClass('active');
    })
}

// 제안
function proposal(){
    $('.proposalArea ul li div').each(function(){
        $(this).after($(this)[0].outerHTML)
        $(this).after($(this)[0].outerHTML)
    })
    setTimeout(function(){
        const parentsWidth = parseFloat($('.proposalArea ul li').innerWidth());
        const contentWidth = parseFloat($('.proposalArea ul li div').innerWidth());
        $('.proposalArea ul li').each(function(idx){
            const select = $(this);
            animateAter(select, idx)
        })
        function animateAter(select, idx){
            let moveValue;
            if(idx % 2 === 0){
                select.css('left', contentWidth - parentsWidth)
                moveValue = parseFloat(select.css('left')) + contentWidth;
            }else{
                select.css('left', 0)
                moveValue = parseFloat(select.css('left')) - contentWidth;
            }
            select.animate({left: moveValue}, 5000, 'linear', function(){
                animateAter(select, idx)
            })
        }
    },100)
}