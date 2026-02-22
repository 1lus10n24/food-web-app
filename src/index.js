import "./style.css"
const deadline = "2026-03-01";
console.log("new feature");

function getTimeRemaining(deadline) {
    let now = new Date;
    const remaining = Date.parse(deadline) - Date.parse(now);
    let seconds = Math.floor((remaining / 1000) % 60);
    let minutes = Math.floor((remaining / 1000 / 60) % 60);
    let hours = Math.floor((remaining / 1000 / 60 / 60) % 24);
    let days = Math.floor(remaining / 1000 / 60 / 60 / 24)
    if (remaining < 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    }
    return {
        total: remaining,
        days,
        hours,
        minutes,
        seconds
    }
}



function setClock(deadline) {
    const days = document.querySelector("#days");
    const hours = document.querySelector("#hours");
    const minutes = document.querySelector("#minutes");
    const seconds = document.querySelector("#seconds");

    let refresh = setInterval(updateTimer, 1000);

    function updateTimer() {
        days.textContent = getZero(getTimeRemaining(deadline).days);
        hours.textContent = getZero(getTimeRemaining(deadline).hours);
        minutes.textContent = getZero(getTimeRemaining(deadline).minutes);
        seconds.textContent = getZero(getTimeRemaining(deadline).seconds);
        
        if (getTimeRemaining(deadline).total < 0) {
            clearInterval(refresh);
        }
    }

}

function getZero(number) {
    if (number >= 0 && number <= 9) {
        return `0${number}`;
    } else {
        return number;
    };
};

window.addEventListener('DOMContentLoaded', function() {
    const tabsParent = document.querySelector(".tabheader__items"),
        tabsItem = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        slides = document.querySelectorAll(".offer__slide"),
        timerCurrent = document.querySelector("#current"),
        timerTotal = document.querySelector("#total"),
        arrowBack = document.querySelector(".offer__slider-prev"),
        arrowNext = document.querySelector(".offer__slider-next")

    function hideContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabsItem.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showContent(indexToShow = 0) {
        tabsContent[indexToShow].classList.add("show", "fade");
        tabsContent[indexToShow].classList.remove("hide");
        tabsItem[indexToShow].classList.add("tabheader__item_active");
    }

    tabsParent.addEventListener("click", function(event) {
        if (event.target.classList.contains("tabheader__item")) {
            tabsItem.forEach((item, i) => {
                if (event.target === item) {
                    hideContent();
                    showContent(i);
                }
            })
        }
    });

    hideContent();
    showContent(0);
    setClock(deadline);

    const modalButtons = document.querySelectorAll(".btn_modal"),
        modalWindow = document.querySelector(".modal"),
        modalCloseBtn = document.querySelector(".modal__close")

    function closeModal(){            
        modalWindow.classList.remove("show", "fade");
        modalWindow.classList.add("hide");
        document.body.style.overflow = "";
    }

    let modalStatus = false;

    function openModal(){
        modalWindow.classList.add("show", "fade");
        modalWindow.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimer);
    }

    modalCloseBtn.addEventListener("click", closeModal);

    modalButtons.forEach((item) => {
        item.addEventListener("click", openModal)
    })

    modalWindow.addEventListener("click", function(event){
        if (event.target === modalWindow) {
            closeModal();
        };
    })

    document.addEventListener("keydown", function(event){
        if (event.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModal();
            console.log("click")
        };
    })

    function scrollDownModal() {
        const offsetY = window.pageYOffset;
        const client = document.documentElement.clientHeight;
        const documentHeight = document.documentElement.scrollHeight
        if (offsetY + client + 2 >= documentHeight) {
            openModal()
            document.removeEventListener("scroll", scrollDownModal);
        }
    }

    document.addEventListener("scroll", scrollDownModal)

    let modalTimer = setTimeout(() => {
        openModal()
    }, 10000);

    //Menu Card
    class Menu {
        constructor(src, alt, title, descr, priceUAH, selector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.priceUAH = priceUAH;
            this.parent = document.querySelector(selector);
        }

        render() {
            const card = document.createElement("div");
            card.innerHTML = `
                <div class="menu__item">
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.priceUAH * 0.02}</span> евр/день</div>
                    </div>
                </div>
            `;

            this.parent.append(card);
        }
        
    }

    const fitness = new Menu(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        ".menu__field .container"
    )

    const premium = new Menu(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        ".menu__field .container"
    )

    const post = new Menu(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        ".menu__field .container"
    )

    fitness.render();
    premium.render();
    post.render()

    //slider
    let currentIndex = 0;
    
    if (slides.length < 10) {
        timerTotal.textContent = `0${slides.length}`
    } else {
        timerTotal.textContent = slides.length;
    }

    function showSlider(n) {
        console.log(n)
        if (n > slides.length-1) {
            currentIndex = 0;
        } else if (n < 0) {
            currentIndex = slides.length-1;
        }

        slides.forEach((item) => {
            item.style.display = "none";
        })

        if (currentIndex < 9) {
            timerCurrent.textContent = `0${currentIndex+1}`
        } else {
            timerCurrent.textContent = currentIndex+1
        }
        
        slides[currentIndex].style.display = "block"
    }

    arrowNext.addEventListener("click", function() {
        currentIndex++
        showSlider(currentIndex);
    })

    arrowBack.addEventListener("click", function() {
        currentIndex--
        showSlider(currentIndex);
    })

    showSlider(currentIndex);

    const inputGender = document.querySelector("#gender"),
        inputPhysic = document.querySelector(".calculating__choose_big"),
        result = document.querySelector(".calculating__result span")

    function calcTotal() {
        if (!sex || !height || height < 0 || !weight || weight < 0 || !age || age < 0 || !ratio) {
            return result.textContent = '___';
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    
    let sex = 'female',
        height, weight, age, ratio = 1.375

    calcTotal();

    function getSatticInfo(parrent, active) {
        parrent.addEventListener("click", function(event) {
            if (event.target.tagName == "DIV") {
                if (event.target.getAttribute("data-ratio")) {
                    ratio = +event.target.getAttribute("data-ratio")
                } else {
                    sex = event.target.getAttribute("id");
                }
                const elems = parrent.querySelectorAll("div")
                elems.forEach((item) => {
                    item.classList.remove(active);
                })
                event.target.classList.add(active);

                calcTotal();
            }
        })
    }

    function getDynamicInfo(selector) {
        const elem = document.querySelector(selector);
        
        elem.addEventListener("input", function() {
            switch (elem.getAttribute("id")) {
                case "height":
                    height = +elem.value;
                    break;
                case "weight":
                    weight = +elem.value;
                    break;
                case "age":
                    age = +elem.value;
                    break
            }

            calcTotal();
        })
    }

    getSatticInfo(inputGender, "calculating__choose-item_active")
    getSatticInfo(inputPhysic, "calculating__choose-item_active")
    getDynamicInfo("#height");
    getDynamicInfo("#weight");
    getDynamicInfo("#age");
})