const ITEM_RADIAL_DISTANCE = 250;
const container = document.querySelector('.creature-container');
let table;

function preload() {
  table = loadTable('section-leon.csv', 'csv');
}

function setup() {
  noCanvas();

  // get the number of rows in the table.
  numberOfItems = table.getRowCount();

  // parse and create "creature" items.
  const itemsArray = [];
  for (let r = 0; r < numberOfItems; r++) {
    const name = table.get(r, 0);
    const remark = table.get(r, 1);
    const link = table.get(r, 2);
    itemsArray.push({ name, remark, link });
  }

  // shuffle the items array randomly
  itemsArray.sort(() => Math.random() - 0.5);

  // create items from the shuffled array
  itemsArray.forEach((item) => {
    createItem(item.name, item.remark, item.link);
  });

  // then, apply rotation to each item.
  applyRotation();
}

function draw() {
  noLoop();
}

function createItem(name, remark, link) {
  const div = document.createElement('div');
  div.classList.add('creature-item');
  container.appendChild(div);

  const spacer = document.createElement('div');
  spacer.classList.add('spacer');
  spacer.style.width = `${floor(random(30, 150))}px`;
  div.appendChild(spacer);

  const h3 = document.createElement('h3');
  h3.textContent = name;
  h3.addEventListener('click', () => {
    window.open(link, 'Project');
  });
  div.appendChild(h3);

  const p = document.createElement('p');
  p.textContent = remark;
  div.appendChild(p);
}

function applyRotation() {
  const items = document.querySelectorAll('.creature-item');
  items.forEach((item, i) => {
    const angle = (360 / numberOfItems) * i;
    item.style.transform = `rotate(${angle}deg) translate(${ITEM_RADIAL_DISTANCE}px)`;
  });
}