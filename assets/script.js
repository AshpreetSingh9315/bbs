function loco(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
 
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}
loco()



var tl = gsap.timeline()

tl.from("#nav",{
    opacity :0,
    delay : 0.2,
})


tl.from("#nav h1, #nav h3 , #nav h4",{
    y : -80,
    opacity : 0,
    duration: 0.3,
    stagger : 0.3
})

tl.from(".container .left h1",{
    x: -100,
    opacity: 0,
    duration: 0.3,
    stagger : 0.3,
})

tl.from(".container .right img",{
    opacity: 0,
    duration: 0.5,
    scale : 2, 
})

tl.from("#page2 h1",{
    opacity: 0, 
    duration: 0.5,
    scale : 1, 
    scrollTrigger: {
        scroller : '.main',
        trigger : '#page2 h1',
        start : 'top 70%',
        end: 'top 50%',
        scrub: 2,
    }
})

tl.from('#page2 .box1 , #page2 .box12',{
    scale : 0,
    opacity : 0,
    duration : 1,
    stagger: 0.3,
    scrollTrigger: {
        scroller : '.main',
        trigger : '#page2 .box1',
        start : 'top 70%',
        end: 'top 50%',
        markers : true,
        scrub : 2,
    }
})
