$(document).ready(function() {
    // 检测当前页面
    const isCoursePage = window.location.pathname.includes('course.html');
    
    // 初始化轮播图
    if (isCoursePage) {
        // 课程页面轮播图
        var courseSwiper = new Swiper('.course-swiper', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    } else {
        // 首页轮播图
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
            grabCursor: true,
            watchOverflow: true,
            keyboard: {
                enabled: true,
            },
            breakpoints: {
                320: {
                    autoplay: {
                        delay: 4000
                    }
                },
                768: {
                    autoplay: {
                        delay: 5000
                    }
                }
            }
        });

        // 鼠标悬停时暂停自动播放
        $('.swiper-container').on('mouseenter', function() {
            swiper.autoplay.stop();
        });

        $('.swiper-container').on('mouseleave', function() {
            swiper.autoplay.start();
        });
    }

    // 处理课程点击事件
    $('.course-list .weui-cell').on('click', function(e) {
        e.preventDefault();
        var courseTitle = $(this).find('.weui-cell__bd p:first-child').text();
        weui.toast('进入课程：' + courseTitle);
        // TODO: 实现课程详情页面跳转
    });

    // 处理底部导航栏点击事件
    $('.weui-tabbar__item').on('click', function(e) {
        if (!$(this).hasClass('weui-bar__item_on')) {
            // 移除其他项的选中状态
            $('.weui-tabbar__item').removeClass('weui-bar__item_on');
            // 添加当前项的选中状态
            $(this).addClass('weui-bar__item_on');
        }
    });

    // 处理功能按钮点击事件
    $('.weui-grid').on('click', function(e) {
        e.preventDefault();
        var feature = $(this).find('.weui-grid__label').text();
        
        switch(feature) {
            case '课程':
                window.location.href = 'course.html';
                break;
            case '案例':
                window.location.href = 'cases.html';
                break;
            case '测试':
                // TODO: 实现测试页面跳转
                weui.toast('进入测试页面');
                break;
            case '答疑':
                // TODO: 实现答疑页面跳转
                weui.toast('进入答疑页面');
                break;
        }
    });

    // 工具函数：检查网络状态
    function checkNetwork() {
        if (!navigator.onLine) {
            weui.toast('网络连接已断开', {
                duration: 2000,
                className: 'custom-classname'
            });
        }
    }

    // 监听网络状态变化
    window.addEventListener('online', checkNetwork);
    window.addEventListener('offline', checkNetwork);

    // 初始化页面时检查网络状态
    checkNetwork();
});

// 工具函数：格式化日期
function formatDate(date) {
    var d = new Date(date);
    var year = d.getFullYear();
    var month = ('0' + (d.getMonth() + 1)).slice(-2);
    var day = ('0' + d.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}

// 工具函数：简单的数据缓存
const cache = {
    set: function(key, value, expiration = 3600000) { // 默认1小时过期
        const item = {
            value: value,
            timestamp: new Date().getTime() + expiration
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    get: function(key) {
        const item = localStorage.getItem(key);
        if (!item) return null;
        
        const parsed = JSON.parse(item);
        if (new Date().getTime() > parsed.timestamp) {
            localStorage.removeItem(key);
            return null;
        }
        return parsed.value;
    },
    remove: function(key) {
        localStorage.removeItem(key);
    }
};