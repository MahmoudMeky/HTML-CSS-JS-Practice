//Retriving Local Storage Data
if (window.localStorage.color) {
    document.documentElement.style.setProperty("--mainColor", window.localStorage.color)
};

//Creating Mobile Menu
let links = document.querySelector("nav ul");
let menuBars = document.querySelector("#mini-menu");
menuBars.onclick = function () {
    if (links.style.display == "flex") {
        links.style.display = "none"
    } else {
        links.style.display = "flex";
    }

    window.setTimeout(function () {
        links.classList.toggle("menu-showing");
    }, 50)
}


//Active Link in menu
let linksItems = links.children;
for (let i = 0; i < linksItems.length; i++) {
    linksItems[i].addEventListener("click", function () {

        // removing all active from all items
        for (let j = 0; j < linksItems.length; j++) {
            linksItems[j].classList.remove("active");
        }

        //adding active to the clicked one
        this.classList.add("active");
    })
}

//Background slider with time
let landingBackground = document.querySelector(".landing");
let stopBgSilder = document.querySelector("#stop");
let setTime = document.querySelector("#set");
let locStTime = window.localStorage.time;

if (locStTime) {
    bgSlider(locStTime)

} else {
    bgSlider();
};

if (locStTime == "STOPPED") {
    stopBgSilder.click();
}

function bgSlider(time = 10000) {

    let bgInterval = window.setInterval(function () {
        let r = Math.floor(Math.random() * 5 + 1);
        landingBackground.style.background = `url(images/landing${r}.jpg)`;
    }, time)

    setTime.onclick = function () {
        window.clearInterval(bgInterval);
        let time = document.querySelector("#controlbox .bgphotos input").value * 1000;
        //Check If empty
        if (time != "") {
            bgSlider(time);
            window.localStorage.setItem("time", time);
        }
    }

    stopBgSilder.onclick = function () {
        window.clearInterval(bgInterval);
        window.localStorage.time = "STOPPED";
    }
};


//Control Box 
//==> Showing control box
let controlBox = document.querySelector("#controlbox");
let controlBoxToggle = document.querySelector("#controlbox .toggle");
controlBoxToggle.onclick = function () {
    controlBox.classList.toggle("appear")
}

//==> Setting Colors 
let allColors = document.querySelectorAll("#controlbox .colors ul li");

//==>> For existing colors
// for(let i=0;i<allColors.length;i++){
//     allColors[i].style.backgroundColor=allColors[i].dataset.color;

//     allColors[i].addEventListener("click",function(){

//         document.styleSheets[1].cssRules[0].style.cssText=`
//             --mainColor:${this.dataset.color};
//         }`

//         //Adding to Local Storage
//         window.localStorage.setItem("color",this.dataset.color);

//     }
//     )
// }
allColors.forEach(function (li) {

    li.style.background = li.dataset.color;

    li.addEventListener("click", function (e) {

        //modifying main color
        document.documentElement.style.setProperty("--mainColor", e.target.dataset.color);

        // Adding to Local Storage
        window.localStorage.setItem("color", e.target.dataset.color);
    })
})



//==>> For ColorWrap
let ColorWrap = document.querySelector("#controlbox .colors ul div input");
ColorWrap.oninput = function () {
    // ColorWrap.parentElement.style.backgroundColor=ColorWrap.value;
    // document.styleSheets[1].cssRules[0].style.cssText=`--mainColor:${};}`
    document.documentElement.style.setProperty("--mainColor", ColorWrap.value);
    window.localStorage.setItem("color", ColorWrap.value);
};



//About US Photo Changing
let aboutUsImg = document.querySelector("#about-us img");
allColors.forEach(function (li, N) {
    li.addEventListener("click", function (e) {
        aboutUsImg.setAttribute("src", `images/about-us${N + 1}.jpg`);
        window.localStorage.setItem("ImgNumber", N + 1)
    })
});
if (window.localStorage.ImgNumber) {
    aboutUsImg.setAttribute("src", `images/about-us${window.localStorage.ImgNumber}.jpg`);
};



//Animation of Sections

let ourSkills = document.querySelector("#skills");
let gallerySection = document.querySelector("#gallery");
let aboutSection = document.querySelector("#about-us");

window.onscroll = function () {
    let windowHeight = window.innerHeight;

    //Animating the SKills Section
    let skillsOffesetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    if (window.scrollY > (skillsOffesetTop + skillsOuterHeight - windowHeight - 100)) {

        ourSkills.style.opacity = "1";

        let heading = document.querySelector("#skills h3");
        heading.style.opacity = "1";
        heading.style.cssText = "opacity:1;transform:translateY(0)";

        setTimeout(function () {

            let items = document.querySelector("#skills .items");

            items.style.opacity = "1";

        }, 500)

        //Filling the Progress
        setTimeout(function () {
            let progressItems = document.querySelectorAll(".bar");
            progressItems.forEach(function (el, i) {
                setTimeout(function () {
                    el.style.width = el.dataset.percentage;
                }, 250 * i)
            })
        }, 1000)
    }
    //End Skills Section

    //Animating the Gallery Section


    let galleryOffesetTop = gallerySection.offsetTop;
    let galleryOuterHeight = gallerySection.offsetHeight;
    if (window.scrollY > (galleryOffesetTop + galleryOuterHeight - windowHeight - 100)) {
        let galleryHeading = document.querySelector("#gallery h3");

        galleryHeading.style.cssText = "opacity:1;transform:translateY(0)";

        setTimeout(function () {

            let galleryPhotos = document.querySelectorAll("#gallery img");

            galleryPhotos.forEach(function (el, i) {
                setTimeout(function () {
                    el.style.opacity = 1;
                }, 100 * i)
            })

        }, 500)
    }



    //Coloring the Control Box when landing is passed
    let aboutSection = document.querySelector("#about-us");
    let aboutOffesetTop = aboutSection.offsetTop;
    let aboutOuterHeight = aboutSection.offsetHeight;


    if (window.scrollY > (aboutOffesetTop + aboutOuterHeight - windowHeight - 100)) {
        controlBox.style.cssText = "background-color:#eee";
        controlBoxToggle.style.cssText = "background-color:var(--mainColor);width:25px;height:25px;right:-25px;top:40px";
    } else {
        controlBox.style.cssText = "background-color:unset";
        controlBoxToggle.style.cssText = "background-color:Unset";
    }


    //Showing About Section 
    showElementOnScrollPopUp(aboutSection);
    //Showing the elemnts
    showElementOnScrollPopUp(timeLineSection);
    Array.from(timelineElements).forEach(function (el, i) {
        setTimeout(function () {
            showElementOnScrollPopUp(el, ".5s")
        }, 500 * (i + 1))
    })
};



//Start Gallery Section

let galleryPhotos = document.querySelectorAll("#gallery .imgs img");

galleryPhotos.forEach((el, i) => el.onclick = function () {
    //Create Pop up Window
    let popUpOverlay = document.createElement("div");
    popUpOverlay.setAttribute("id", "popup")
    popUpOverlay.style.cssText = `width:100%;background-color:rgb(0 0 0 / 49%);height:100%;position:fixed;top:0;z-index:300;transition:.5s;opacity:0`;
    let photoContainer = document.createElement("div");

    photoContainer.style.cssText = `background-color:red;width:790px;height:555px;position:absolute;left:50%;top:80%;transform:translate(-50%,-50%);border:12px solid white;transition:.5s;`;

    let galleryPhoto = new Image(550, 350);
    galleryPhoto.src = el.src;
    galleryPhoto.style.cssText = `width:100%;height:100%`;

    photoContainer.append(galleryPhoto);



    popUpOverlay.append(photoContainer);
    document.body.append(popUpOverlay);

    setTimeout(() => {
        popUpOverlay.style.opacity = 1;
        photoContainer.style.top = "50%";
    }, 100);


    // Create Close Button
    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "X";
    closeBtn.style.cssText = `top:12px;right:12px`;
    photoContainer.append(closeBtn);

    //Close Button Script
    // closeBtn.addEventListener("click", () => {
    //     popUpOverlay.style.opacity = 0;
    //     setTimeout(() => {
    //         popUpOverlay.remove()
    //     }, 400);
    // })


    //Close Button Another Script
    document.addEventListener("click", (e) => {
        if (e.target.innerHTML == "X") {
            hideElementbyOpacity(popUpOverlay);
            photoContainer.style.top = "60%";
            setTimeout(() => {
                popUpOverlay.remove();
            }, 400);
        }

    })

    //Removing the Popup when clicked outside it
    document.addEventListener('mouseup', function (e) {
        if (!photoContainer.contains(e.target)) {
            popUpOverlay.style.opacity = 0;
            photoContainer.style.top = "60%";
            setTimeout(() => {
                popUpOverlay.remove()
            }, 400);
        }
    });

    //Creating Navigation Arrows

    let flag = i; // Gets the Current Photo Index;

    let leftArrow = document.createElement("button");
    leftArrow.innerHTML = "<";
    leftArrow.style.cssText = "top:50%;left:20px;";

    let rightArrow = document.createElement("button");
    rightArrow.innerHTML = ">";
    rightArrow.style.cssText = "top:50%;right:20px;";

    leftArrow.addEventListener("click", function () {
        if (!flag == 0) {
            galleryPhoto.src = galleryPhotos[flag - 1].src;
            flag -= 1;
        }
    })

    rightArrow.addEventListener("click", function () {
        if (flag < galleryPhotos.length - 1) {
            galleryPhoto.src = galleryPhotos[flag + 1].src;
            flag += 1;
        }
    })

    photoContainer.append(leftArrow);
    photoContainer.append(rightArrow);

    //Creating changing images with timing
    let timer = document.createElement("button");
    timer.innerHTML = "Play";
    timer.style.cssText = "bottom:20px;right:50%;transform:translateX(50%);width:40px;border-radius:5px";
    photoContainer.append(timer);


    timer.addEventListener("click", function () {

        let galleryInterval = setInterval(changePhotos, 1500);

        timer.classList.toggle("Playing");

        if (timer.classList.contains("Playing")) {
            timer.innerHTML = "Stop"
        }
        else {
            timer.innerHTML = "Play"
        }

        function changePhotos() {
            if (timer.classList.contains("Playing")) {
                flag += 1;
                if (flag == galleryPhotos.length) {
                    flag = 0
                }
                galleryPhoto.src = galleryPhotos[flag].src;
            }
            else {
                window.clearInterval(galleryInterval)
            }
        }

    })

});



//Creating Function to hide Elements
function hideElementbyOpacity(element) {
    element.style.opacity = 0;
    element.style.transform = "translateY(30px)";
};


function showElementOnScrollPopUp(element, transitionTime = "1.5s") {
    // let windowHeight = window.innerHeight;
    // //Animating Section
    // let elementOffesetTop = element.offsetTop;
    // let elementOuterHeight = element.offsetHeight;

    // if (window.scrollY > (elementOffesetTop + elementOuterHeight - windowHeight)) {
    //     element.style.cssText = `opacity:1;transform:translateY(0);transition:${transitionTime}`;
    // };
    let position = element.getBoundingClientRect();
    if (position.top < window.innerHeight && position.bottom >= 0) {
        // console.log('Element is partially visible in screen');
        element.style.cssText = `opacity:1;transform:translateY(0);transition:${transitionTime}`;
    }
};

hideElementbyOpacity(aboutSection);

//Start Timeline

let timeLineSection = document.querySelector("#timeline");
let timelineElements = timeLineSection.firstElementChild.children;
//Hiding all timeLine Elements
hideElementbyOpacity(timeLineSection);
Array.from(timelineElements).forEach(function (el) {
    hideElementbyOpacity(el)
});

