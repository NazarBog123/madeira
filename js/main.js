window.onbeforeunload = function () {
	window.scrollTo(0, 0)
}

const swiper = new Swiper('.story__right', {
	loop: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
})

const waySwiper = new Swiper('.way__swiper', {
	loop: true,
	spaceBetween: 29,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
})

const sliderSwiper = new Swiper('.slider__swiper', {
	loop: true,
	spaceBetween: 29,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
})

gsap.registerPlugin(ScrollTrigger)

const slider = document.querySelector('.slider')
const sliderRow = document.querySelector('.slider__row')
const cards = gsap.utils.toArray('.slider__card')

const container = sliderRow.parentElement
const containerWidth = container.offsetWidth
const rowWidth = sliderRow.scrollWidth
let scrollDistance = rowWidth - containerWidth
const isMobile = document.body.clientWidth <= 576

if (document.body.clientWidth <= 1340) {
	scrollDistance += 48
}

const heroSection = document.querySelector('.hero')
const expSection = document.querySelector('.exp')
const expSpacer = document.querySelector('.exp__spacer')

let pinSpacerHeight = 0

gsap.to(sliderRow, {
	x: -scrollDistance,
	ease: 'none',
	scrollTrigger: {
		pin: true,
		id: 'sliderAnim',
		trigger: '.slider_main',
		scrub: 0.75,
		// start: isMobile ? 'top top' : 'bottom bottom',
		// end: isMobile ? '+=1200' : 'top top',
		start: 'bottom bottom',
		end: 'top top',
		invalidateOnRefresh: true,

		onEnter: () => {
			if (isMobile) return
			console.log('enter forward start')

			expSpacer.style.height = `${expSection.clientHeight + heroSection.clientHeight}px`

			expSection.style.position = 'fixed'
			expSection.style.bottom = `${slider.clientHeight}px`

			heroSection.style.position = 'fixed'
			heroSection.style.bottom = `${slider.clientHeight + expSection.clientHeight}px`
		},
		onLeave: () => {
			if (isMobile) return
			console.log('leave forward end')

			const pinSpacer = document.querySelector('.pin-spacer')
			expSection.style.position = 'relative'
			expSection.style.bottom = `-${pinSpacer.clientHeight - slider.clientHeight}px`

			heroSection.style.position = 'relative'
			heroSection.style.bottom = `-${pinSpacer.clientHeight - slider.clientHeight}px`

			expSpacer.style.height = `0px`
		},
		onEnterBack: () => {
			if (isMobile) return
			console.log('enter back start')

			expSpacer.style.height = `${expSection.clientHeight + heroSection.clientHeight}px`

			expSection.style.position = 'fixed'
			expSection.style.bottom = `${slider.clientHeight}px`

			heroSection.style.position = 'fixed'
			heroSection.style.bottom = `${slider.clientHeight + expSection.clientHeight}px`
		},
		onLeaveBack: () => {
			if (isMobile) return
			console.log('leave back end')

			expSection.style.position = 'relative'
			expSection.style.bottom = '0'

			heroSection.style.position = 'relative'
			heroSection.style.bottom = '0'

			expSpacer.style.height = `0px`
		},
	},
})
