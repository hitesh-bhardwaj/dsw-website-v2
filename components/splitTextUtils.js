// src/utils/splitText.js

// import SplitType from 'split-type';
import gsap from 'gsap';


export function SplitInLineOnly(element) {
  if (!element) return null;
  return new SplitType(element, {
    types: 'lines',
  });
}

export function SplitInLine(element) {
   if (!element) return null;
 
   // Break the text into lines
   const splitInstance = new SplitType(element, {
     types: 'lines',
   });
 
   // Add an additional div inside each line with the class name 'line-internal'
   splitInstance.lines.forEach(line => {
     const internalDiv = document.createElement('div');
     internalDiv.className = 'line-internal';
     internalDiv.innerHTML = line.innerHTML;
     line.innerHTML = '';
     line.appendChild(internalDiv);
   });
 
   return splitInstance;
 }

export function SplitInLineWordChar(element) {
    if (!element) return null;
    return new SplitType(element, {
      types: 'lines, words, chars',
    });
  }

export function SplitInLineWord(element) {
    if (!element) return null;
    return new SplitType(element, {
      types: 'lines, words',
    });
}

export function SplitInChar(element) {
  if (!element) return null;
  return new SplitType(element, {
    types: 'chars',
  });
}

export function SplitInWordChar(element) {
  if (!element) return null;
  return new SplitType(element, {
    types: 'words, chars',
  });
}
export function initMagneticButton() {
  const magnets = document.querySelectorAll('[data-magnetic-target]');

  if (window.innerWidth > 1024) {
    magnets.forEach((magnet) => {
      magnet.addEventListener('mousemove', moveMagnet);
      magnet.addEventListener('mouseleave', function (event) {
        const magneticInner = event.currentTarget.querySelector('.magnetic-inner');
        gsap.to(magneticInner, {
          x: 0,
          y: 0,
          duration: 1.4,
          ease: 'expo.out'
        });
      });
    });

    function moveMagnet(event) {
      const magnetButton = event.currentTarget;
      const bounding = magnetButton.getBoundingClientRect();
      const magnetsStrength = magnetButton.getAttribute('data-magnetic-strength');
      const magneticInner = magnetButton.querySelector('.magnetic-inner');
      const parentHasHover = magnetButton.parentElement.classList.contains('hover');
      
      const xMovement = ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) * magnetsStrength;
      const yMovement = ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) * magnetsStrength;

      if (parentHasHover) {
        gsap.to(magneticInner, {
          x: xMovement,
          y: yMovement,
          rotate: '0.001deg',
          duration: 1,
          ease: 'expo.out'
        });
      } else {
        gsap.to(magneticInner, {
          x: (event.clientX - bounding.left) - (bounding.width / 2),
          y: (event.clientY - bounding.top) - (bounding.height / 2),
          rotate: '0.001deg',
          duration: 1.4,
          ease: 'expo.out'
        });
      }
    }
  }
}

export function initSplit() {
  const elements = document.querySelectorAll('[data-split="letters"]');

  Array.from(elements).forEach((el) => {
    // Prevent duplicate splitting
    if (!el.hasAttribute("split-ran")) {
      const splitInstance = new SplitType(el, {
        types: "words, chars",
        charClass: "single-letter",
      });

      // Add delay if attribute is set
      if (el.hasAttribute("data-letters-delay")) {
        splitInstance.chars.forEach((char, index) => {
          const delay = `${index / 150}s`;
          char.style.setProperty("transition-delay", delay);
        });
      }

      el.setAttribute("split-ran", "true");
    }
  });
}
