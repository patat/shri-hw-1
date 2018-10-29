export default function lineClamp(element) {
    const text = element.querySelector('.line-clamp__text');
    const desiredHeight = element.clientHeight;
    while (text.offsetHeight > desiredHeight) {
        text.textContent = text.textContent.replace(/\s(\S)*$/, '...');
    }
}
