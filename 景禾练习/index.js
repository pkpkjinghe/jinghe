window.onload = function () {
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    var jd_search = document.querySelector('.jd_search');
    window.onscroll = function () {

        var scrollTop = document.documentElement.scrollTop;


        if (bannerHeight > scrollTop) {
            var opacity = scrollTop / bannerHeight;

            jd_search.style.backgroundColor = `rgba(225,0,0,${opacity})`;

        }

    }

    function backTime() {
        var section1_nav = document.querySelector('.section1_nav')
        var spans = section1_nav.querySelector('.left').querySelectorAll('span');
        var backtime = 48000;


        var timeID = setInterval(function () {
            backtime--;
            if (backtime <= 0) {
                clearInterval(timeID);

            }
            var hourse = Math.floor(backtime / 3600);
            var minute = Math.floor(backtime % 3600 / 60);
            var second = Math.floor(backtime % 60);
            spans[0].innerHTML = Math.floor(hourse / 10);
            spans[1].innerHTML = Math.floor(hourse % 10);
            spans[3].innerHTML = Math.floor(minute / 10);
            spans[4].innerHTML = Math.floor(minute % 10);
            spans[6].innerHTML = Math.floor(second / 10);
            spans[7].innerHTML = Math.floor(second % 10);

        }, 1000)

    }
    backTime();
    bannerEffect();

    //轮播图
    function bannerEffect() {
        var banner = document.querySelector('.jd_banner');
        var imgBox = banner.querySelector('ul:first-of-type');
        var first = imgBox.querySelector('li:first-of-type');
        var last = imgBox.querySelector('li:last-of-type');

        imgBox.appendChild(first.cloneNode(true));
        imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild)
        // 设置对应的样式
        var lis = imgBox.querySelectorAll('li');
        var count = lis.length;

        var bannerWidth = banner.offsetWidth;
        console.log(bannerWidth);



        imgBox.style.width = count * bannerWidth + 'px';
        console.log(imgBox.style.width);


        // 设置每一个li元素的 宽度
        for (var i = 0; i < count; i++) {
            var li = lis[i];
            li.style.width = bannerWidth + 'px';

        }

        //设置默认偏移的宽度
        imgBox.style.left = -bannerWidth + 'px';
        console.log(imgBox.style.left);
        //屏幕的大小改变时候的宽度设置
        window.onresize = function () {
            bannerWidth = banner.offsetWidth;
            imgBox.style.width = count * bannerWidth + 'px';
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.width = bannerWidth + 'px';
            }
            imgBox.style.left = -index * bannerWidth + 'px';
        }


        var timeId;
        var index = 1;

        function timeds() {
            timeId = setInterval(function () {

                index++;

                imgBox.style.transition = 'left 0.5s ease-in-out';
                setTimeout(function () {
                    if (index == count - 1) {
                        imgBox.style.transition = 'none';
                        imgBox.style.left = -bannerWidth + 'px';
                        index = 1;
                    }
                }, 500)
                imgBox.style.left = (-index * bannerWidth) + 'px';


            }, 2000)

        }
        timeds();

        function circleGo(index) {
            var circle = document.querySelector('.jd_bannerIndicator');
            var liss = circle.querySelectorAll('li');
            for (var i = 0; i < liss.length; i++) {
                var li = liss[i];
                li.classList.remove('active');
            }
            liss[index -1].classList.add('active');
        }


        //轮播图的 手触发事件

        var startX, moveX, disX;

        //节流阀开始
        var isEnd=true;//说明这个过渡介绍了
        imgBox.addEventListener('touchstart', function (e) {
            clearInterval(timeId);
            startX = e.targetTouches[0].clientX;
            imgBox.style.height = bannerHeight + 'px';

        });
        imgBox.addEventListener('touchmove', function (e) {
                if(isEnd=true){
                    
                moveX = e.targetTouches[0].clientX;
                disX = moveX - startX;
                console.log(disX);
                imgBox.style.transition = 'none';
                imgBox.style.left = (-index * bannerWidth + disX) + "px";

                }
           
        });
        imgBox.addEventListener('touchend', function (e) {
            isEnd=false;
            if (Math.abs(disX) >= 100) {
                //左右翻页
                if (disX < 0) {
                    index++;
                    imgBox.style.transition = 'left 0.5s ease-in-out';
                    imgBox.style.left = (-index * bannerWidth) + "px";
                } else {
                    index--;
                    imgBox.style.transition = 'left 0.5s ease-in-out';
                    imgBox.style.left = (-index * bannerWidth) + "px";
                }

            } else if (Math.abs(disX) <= 100) {
                imgBox.style.transition = 'left 0.5s ease-in-out';
                imgBox.style.left = (-index * bannerWidth) + "px";
            }
            timeds();
          

        });
        imgBox.addEventListener('webkitTransitionEnd', function () {
            if (index == count - 1) {
                index = 1;
                imgBox.style.transition = 'none';
                imgBox.style.left = -index * bannerWidth + 'px';
            } else if (index == 0) {
                index = count - 2;
                imgBox.style.transition = 'none';
                imgBox.style.left = -index * bannerWidth + 'px';
            }

            //高亮显示 排他留自己
            circleGo(index);
            setTimeout(function(){
                isEnd=true;
                clearInterval(timeId);
                timeds();
            },100)
          

        });


    }


}