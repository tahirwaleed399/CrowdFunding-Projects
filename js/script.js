"use strict";
// variables initalliziation
let bookmark = document.querySelector(".bookmark");
let bookmark_text = document.getElementById("bookmark-text");
let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".modal");
let balanceBox = document.querySelector(".balance");
let backersBox = document.querySelector(".backers")
let balance = 37589;
let backers = 5008;
let bar = document.querySelector('.inner-bar');
let backProjectBtn = document.querySelector("#back-project");
let modalCross = document.querySelector(".cross-btn");
let bambooBoxes = document.querySelectorAll(".bamboo-box");
let modalBoxes = document.querySelectorAll(".modal-box");
let valueModalBoxes = document.querySelectorAll(".quantity");
let confirmation = document.querySelector(".thanks");
let thanksButton = confirmation.querySelector("button");
let freepledge = document.querySelector(".empty-one").querySelector("button");
let leftArr = [101, 53, 2];
let greater = [25, 75, 200];
let hamburger = document.querySelector(".hamburger");
let hi = document.querySelector(".hi");
let cross = document.querySelector(".cross");
let links = document.querySelector(".links");
let shade = document.querySelector(".shade");


hi.addEventListener("click", (e, i) => {
    if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        cross.classList.add("active");
        links.classList.add("active");
        shade.classList.add("active");
    } else {

        shade.classList.remove("active");
        links.classList.remove("active");
        hamburger.classList.add("active");
        cross.classList.remove("active");
    }
})

// function to remove active from all modal boxes 
function removeActiveFromModalBoxes() {
    modalBoxes.forEach((e, i) => {


        e.classList.remove("active");
    })
}
// function to open modal 
function openModal() {
    modalCross.scrollIntoView(true);
    overlay.classList.add("active");
    modal.classList.add("active");

    modalBoxes.forEach((e, i) => {
        e.addEventListener("click", () => {

            removeActiveFromModalBoxes()
            e.classList.add('active');
            e.scrollIntoView({ block: "center" });
        })
    })
}

// function to close modal 
function closeModal() {
    modal.classList.remove("active");
}

// function that update VAlues
function update() {

    balanceBox.innerHTML = "$" + balance;
    backersBox.innerHTML = backers;
    bambooBoxes.forEach((e, i) => {

        e.querySelector(".left-q").innerText = leftArr[i];

    });
    valueModalBoxes.forEach((e, i) => {

        e.querySelector(".left-q").innerText = leftArr[i];

    });

}
update();

// progress bar 
function updateBar() {
    let width = (balance / 100000) * 100;

    bar.style.transition = "width 1.5s ease-out";
    bar.style.width = `${width}%`;
    bar.style.maxWidth = `100%`;
}
updateBar()
    // book mark functionality on btn
bookmark.addEventListener("click", (e) => {

    if (bookmark.classList.contains("bookmarked")) {
        bookmark.classList.remove("bookmarked");
        bookmark_text.innerText = "Bookmark"

    } else {
        bookmark.classList.add("bookmarked");
        bookmark_text.innerText = "Bookmarked"

    }
})

// functionality on bak to project button 
backProjectBtn.addEventListener("click", (e) => {
        openModal();
        removeActiveFromModalBoxes();
    })
    // closing modal functionality on modal cross btn

modalCross.addEventListener("click", (e) => {
    closeModal();
    overlay.classList.remove("active");
})

// on clicking outside the modal over it 
overlay.addEventListener("click", () => {
    closeModal();
    confirmation.classList.remove("active");
    overlay.classList.remove("active")
})

// on clicking any card take you yo same card in modal box

bambooBoxes.forEach((e, i) => {

    let bambooBtn = e.querySelector("button");

    bambooBtn.addEventListener("click", () => {
        openModal();
        removeActiveFromModalBoxes()

        setTimeout(() => {

            modalBoxes[i + 1].classList.add("active");
            modalBoxes[i + 1].scrollIntoView({ block: "center" });
        }, 500);
    });
});
// clicking cards that have value os left 
valueModalBoxes.forEach((e, i) => {
    e.querySelector("button").addEventListener("click", (f, j) => {
        let remainding = parseInt(e.querySelector(".left-q").innerText);
        let input = e.querySelector(".pledge-input");
        let value = parseInt(input.value);
        if (value > greater[i]) {
            balance += value;
            remainding--;
            if (remainding < 0 || remainding == 0) {
                e.classList.add("inactive");
                e.classList.remove("active");
                bambooBoxes[i].classList.add("inactive");
            }
            backers++;
            leftArr[i] = remainding;
            update();
            closeModal();
            setTimeout(() => {
                confirmation.classList.add("active");

            }, 900);

            input.value = "";

        } else {
            input.classList.add("error");
            setTimeout(() => {

                input.classList.remove("error");
            }, 1000);
        }

    });

});
// on clicking card having no value
freepledge.addEventListener("click", (e, i) => {
        let input = freepledge.parentElement.querySelector(".pledge-input");

        let value = parseInt(input.value);
        if (value > 0) {
            input.classList.remove("error");
            balance += value;
            backers++;
            update();
            closeModal();
            setTimeout(() => {
                confirmation.classList.add("active");

            }, 900);


            input.value = "";
        } else {
            input.classList.add("error");
            setTimeout(() => {

                input.classList.remove("error");
            }, 1000);

        }

    })
    // functionality of thanks card at the end
thanksButton.addEventListener("click", () => {
    confirmation.classList.remove("active");
    overlay.classList.remove("active");
    bar.scrollIntoView({ block: "center" });
    bar.style.transition = "width 0s ease-in"
    bar.style.width = "0px";
    setTimeout(() => {

        updateBar();
    }, 1000);
})