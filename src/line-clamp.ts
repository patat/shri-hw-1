export default function lineClamp(element: HTMLElement) {
  const text: HTMLElement = element.querySelector('.line-clamp__text');
  const desiredHeight = element.clientHeight;

  while (text.offsetHeight > desiredHeight) { 
    text.textContent = text.textContent.replace(/\s(\S)*$/, '...');
  }
}