const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone, .number-pool'); // number-pool da drop zone oldu

let dragged = null;

// Drag start / end
document.querySelectorAll('.draggable').forEach(drag => {
  drag.addEventListener('dragstart', () => {
    dragged = drag;
    drag.classList.add('dragging');
  });

  drag.addEventListener('dragend', () => {
    dragged = null;
    drag.classList.remove('dragging');
  });
});

// Drop zones
document.querySelectorAll('.drop-zone, .number-pool').forEach(zone => {
  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('over');
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('over');
  });

  zone.addEventListener('drop', () => {
    zone.classList.remove('over');
    if(!dragged) return;

    const num = parseInt(dragged.dataset.number);

    // number-pool hər şeyi qəbul edir
    if(zone.classList.contains('number-pool')){
      zone.appendChild(dragged);
      return;
    }

    // drop zone yoxlaması
    const range = zone.dataset.range.split('-').map(n => parseInt(n));
    if(num >= range[0] && num <= range[1]){
      zone.appendChild(dragged);
    } else {
      // uyğunsuz drop
      zone.classList.add('invalid');
      setTimeout(()=> zone.classList.remove('invalid'), 400);
    }
  });
});
