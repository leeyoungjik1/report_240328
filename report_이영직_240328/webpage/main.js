const srollImgContainer = document.getElementById('sroll-img-container')
const scrollImgBtns = document.querySelectorAll('.scroll-img-btn')
const noticeBtns = document.querySelectorAll('.notice-btn')
const noticeTitle = document.getElementById('notice-title')
const noticeDate = document.getElementById('notice-date')
import { noticeArr } from "./data.js"
console.log(noticeArr)


let timer, throttleDuration = 3000
function throttling(handler){
    if(!timer){
        handler()
        timer = setTimeout(function(){
            timer = null 
        }, throttleDuration)
    }
}

function changeImg(){
    let i = 1
    function initImg(){
        srollImgContainer.style.transition = 'none'
        srollImgContainer.style.left = -100 * i + '%'
        setTimeout(function(){
            srollImgContainer.style.transition = '2s'
        }, 100)
    }
    // setInterval(function(){
    //     // console.log(i)
    //     i++
    //     srollImgContainer.style.left = -100 * i + '%'
    //     if(i>3){
    //         i=1
    //         setTimeout(initImg, 2000)
    //     }
    // }, 5000)

    for(let [btnIndex, scrollImgBtn] of scrollImgBtns.entries()){
        scrollImgBtn.addEventListener('click', (e) => contorolImg(e, btnIndex))
    }
    function contorolImg(e, btnIndex){
        if(e.target.className.includes('left')){
            throttling(moveToLeft)
        }else if(e.target.className.includes('right')){
            throttling(moveToRight)
        }
        else if(e.target.className.includes('select')){
            moveToImg(btnIndex)
        }
    }
    function moveToLeft(){
        i--
        srollImgContainer.style.left = -100 * i + '%'
        if(i<1){
            i=3
            setTimeout(initImg, 2000)
        }
    }
    function moveToRight(){
        i++
        srollImgContainer.style.left = -100 * i + '%'
        if(i>3){
            i=1
            setTimeout(initImg, 2000)
        }
    }
    function moveToImg(btnIndex){
        i = btnIndex 
        srollImgContainer.style.left = -100 * btnIndex + '%'
    }
}

function showNotice(){
    let i = 0
    pushNotice()
    for(let noticeBtn of noticeBtns){
        noticeBtn.addEventListener('click', changeNotice)
    }
    function changeNotice(e){
        if(e.target.className.includes('up')){
            prevNotice()
        }else if(e.target.className.includes('down')){
            nextNotice()
        }
    }
    function pushNotice(){
        const noticeTitleA = noticeTitle.querySelector('a')
        noticeTitleA.innerHTML = noticeArr[i].title
        noticeTitleA.setAttribute('href', `/webpage/notice_content.html?id=${noticeArr[i].noticeIdNum}`)
        noticeDate.innerText = noticeArr[i].date
    }
    function nextNotice(){
        i++
        if(i<noticeArr.length){
            pushNotice()
        }else if(i>noticeArr.length-1){
            i=0
            pushNotice()
        }
    }
    function prevNotice(){
        i--
        if(i>-1){
            pushNotice()
        }else if(i<0){
            i=noticeArr.length-1
            pushNotice()
        }
    }
}

window.addEventListener('load', changeImg)
window.addEventListener('load', showNotice)