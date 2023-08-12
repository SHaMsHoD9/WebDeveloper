
class Slider {

    constructor(config) {
        this.slider = document.querySelector(config.el);
        this.sliderBox = this.slider.querySelector('.sliderAllF__box');
        this.sliderItem = this.sliderBox.children
        this.next = this.slider.querySelector('.slider__Forward')
        this.prev = this.slider.querySelector('.slider__Back')

        this.timeMove = config.time == undefined ? 1000 : config.time

        this.dir = config.direction == 'X' ? 'X' : 'Y'


        this.height = this.slider.clientHeight
        this.width = this.slider.clientWidth

        this.moveSize = 'X' == this.dir ? this.width : this.height

        this.autoplay = config.autoplay

        this.interval = isNaN(config.interval) == true ? this.timeMove + 1000 : config.interval < this.timeMove + 1000 ? console.error('Interval time dan kichik bolishi keremas !!!') : config.interval

        this.activeSlide = 0

        this.sliderBox.style = ` 
                                  position: relative;
                                  height: ${this.height}px;
                                  overflow: hidden;
        `

        for (let i = 0; i < this.sliderItem.length; i++) {
            const slides = this.sliderItem[i]

            slides.style = ` 
                             position: absolute;
                             width: ${this.width}px;
                             height: ${this.height}px;  
                          `

            if (i != this.activeSlide) {
                slides.style.transform = ` translate${this.dir}(${this.moveSize}px)`
            }

            if (i == this.sliderItem.length - 1) {
                slides.style.transform = ` translate${this.dir}(-${this.moveSize}px)`
            }

        }





        this.next.addEventListener('click', () => this.clickBtn(this.next))
        this.prev.addEventListener('click', () => this.clickBtn(this.prev))
    }


    clickBtn(btn) {

        this.next.disabled = true
        this.prev.disabled = true

        setTimeout(() => {
            this.next.disabled = false
            this.prev.disabled = false
        }, this.timeMove)


        const nextOrPrev = btn == this.next ? this.moveSize * -1 : this.moveSize

        for (let i = 0; i < this.sliderItem.length; i++) {
            const slides = this.sliderItem[i]
            slides.style.transition = '0ms'

            if (i != this.activeSlide) {
                slides.style.transform = ` translate${this.dir}(${nextOrPrev * -1}px)`
            }
        }

        this.sliderItem[this.activeSlide].style.transform = ` translate${this.dir}( ${nextOrPrev}px)`
        this.sliderItem[this.activeSlide].style.transition = this.timeMove + 'ms'

        if (btn == this.next) {
            this.activeSlide++

            if (this.activeSlide >= this.sliderItem.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--

            if (this.activeSlide < 0) {
                this.activeSlide = this.sliderItem.length - 1
            }
        }


        this.sliderItem[this.activeSlide].style.transform = ` translate${this.dir}(0px)`
        this.sliderItem[this.activeSlide].style.transition = this.timeMove + 'ms'


    }

}



const slider3 = new Slider({
    el: "#carousel3",
    time: 1000,
    direction: 'X',
    autoplay: true,
    interval: 2000

})





