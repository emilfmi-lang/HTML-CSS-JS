const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');

let dragged = null;

// dragstart
draggables.forEach(drag => {
  drag.addEventListener('dragstart', e => {
    dragged = drag;
    drag.classList.add('dragging');
  });

  drag.addEventListener('dragend', e => {
    dragged = null;
    drag.classList.remove('dragging');
  });
});

// dragover and drop
dropZones.forEach(zone => {
  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('over');
  });

  zone.addEventListener('dragleave', e => {
    zone.classList.remove('over');
  });

  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('over');
    
    if(!dragged) return;
    const num = parseInt(dragged.dataset.number);
    const range = zone.dataset.range.split('-').map(n => parseInt(n));

    if(num >= range[0] && num <= range[1]){
      zone.appendChild(dragged);
    } else {
      alert(`Rəqəm ${num} bu qutuya yerləşdirilə bilməz!`);
    }
  });
});
