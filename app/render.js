export default function render(data) {
  const templ = document.getElementById('event-card-template').content
    .querySelector('.event-card');
  const container = document.querySelector('.main-layout');

  data.forEach(item => {
    const instance = templ.cloneNode(true);

    instance.classList.add(`main-layout__item_size_${item.size}`);
    const isCritical = item.type === 'critical';
    if (isCritical) {
      instance.classList.add('event-card_type_critical');
    }
    instance.querySelector('.event-card__title').textContent = item.title;
    instance.querySelector('.event-card__source').textContent = item.source;
    instance.querySelector('.event-card__time').textContent = item.time;

    const iconPath = isCritical ? `img/${item.icon}-white.svg` : `img/${item.icon}.svg`;
    instance.querySelector('.event-card__icon').setAttribute('src', iconPath);

    const description = instance.querySelector('.event-card__description');
    if (item.description) {
      description.textContent = item.description;
    } else {
      description.remove();
    }

    const graph = instance.querySelector('.event-card__graph');
    if (!(item.data && item.data.type === 'graph')) {
      graph.remove();
    }
    
    const climate = instance.querySelector('.event-card__climate');
    if (item.data && item.data.temperature) {
      climate.querySelector('.event-card__temperature .event-card__climate-value').textContent = `${item.data.temperature} C`;
      climate.querySelector('.event-card__humidity .event-card__climate-value').textContent = `${item.data.humidity}%`;
    } else {
      climate.remove();
    }

    const music = instance.querySelector('.event-card__music');
    if (item.data && item.data.albumcover) {
      music.querySelector('.music__albumcover').style.backgroundImage = `url(${item.data.albumcover})`;
      music.querySelector('.music__title').textContent = `${item.data.artist} — ${item.data.track.name}`;
      music.querySelector('.music__length').textContent = item.data.track.length;
      music.querySelector('.music__volume-value').textContent = `${item.data.volume}%`;
    } else {
      music.remove();
    }

    const buttons = instance.querySelector('.event-card__buttons');
    if (item.data && item.data.buttons) {
      buttons.querySelectorAll('.event-card__button').forEach((button, index) => {
        button.textContent = item.data.buttons[index];
      });
    } else {
      buttons.remove();
    }

    const camera = instance.querySelector('.event-card__camera');
    if (item.data && item.data.image) {
      camera.querySelector('.event-card__view').style.backgroundImage = `url(img/${item.data.image})`;
    } else {
      camera.remove();
    }

    container.appendChild(instance);
  });
}