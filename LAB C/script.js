let map = L.map('map').setView([53.430127, 14.564802], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);

document.getElementById("getLocation").addEventListener("click", function() {
    if (!navigator.geolocation) {
        console.log("No geolocation.");
    }

    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        map.setView([lat, lon]);
        let userMarker = L.marker([lat, lon]).addTo(map);
        userMarker.bindPopup(`Twoja lokalizacja: ${lat}, ${lon}`).openPopup();
    }, positionError => {
        console.error(positionError);
    });
});

if (Notification.permission === 'default') {
    Notification.requestPermission().then(function(result) {
        if (result === 'granted') {
            new Notification("Powiadomienia zostały włączone!");
        }
    });
}

document.getElementById("saveButton").addEventListener("click", function() {
    leafletImage(map, function(err, canvas) {
        let rasterMap = document.getElementById("rasterMap");
        let rasterContext = rasterMap.getContext('2d');
        rasterContext.drawImage(canvas, 0, 0, 300, 150);

        let pieceWidth = canvas.width / 4;
        let pieceHeight = canvas.height / 4;

        let pieces = [];
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                let pieceCanvas = document.createElement('canvas');
                pieceCanvas.width = pieceWidth;
                pieceCanvas.height = pieceHeight;
                let pieceContext = pieceCanvas.getContext('2d');
                pieceContext.drawImage(canvas, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

                pieceCanvas.dataset.position = `${x}-${y}`;
                pieceCanvas.id = `piece-${x}-${y}`;
                pieceCanvas.draggable = true;

                pieceCanvas.addEventListener('dragstart', handleDragStart);
                pieces.push(pieceCanvas);
            }
        }

        pieces = pieces.sort(() => Math.random() - 0.5);
        let table = document.getElementById('table');
        table.innerHTML = '';

        for (let piece of pieces) {
            table.appendChild(piece);
        }

        setupPuzzleArea();
    });
});

function setupPuzzleArea() {
    let table = document.getElementById('table');
    let puzzleArea = document.getElementById('puzzleArea');
    puzzleArea.innerHTML = '';

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            let cell = document.createElement('div');
            cell.classList.add('puzzleCell');
            cell.dataset.position = `${x}-${y}`;

            cell.addEventListener('dragover', function(event) {
                event.preventDefault();
            });

            cell.addEventListener('drop', function(event) {
                event.preventDefault();
                let pieceId = event.dataTransfer.getData('text/plain');
                let piece = document.getElementById(pieceId);

                if (piece.dataset.position === cell.dataset.position) {
                    cell.appendChild(piece);
                    piece.classList.add('correct');
                    piece.setAttribute('draggable', 'false');
                    checkPuzzleCompletion();
                } else {
                    alert("Nieprawidłowa pozycja! Spróbuj ponownie.");
                    table.appendChild(piece);
                }
            });

            puzzleArea.appendChild(cell);
        }
    }
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function checkPuzzleCompletion() {
    let correctPieces = document.querySelectorAll('.correct');
    if (correctPieces.length === 16) {
        console.log("Gratulacje! Ułożyłeś puzzle poprawnie!");

        if (Notification.permission === 'granted') {
            new Notification("Gratulacje! Puzzle zostały poprawnie ułożone!");
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification("Gratulacje! Puzzle zostały poprawnie ułożone!");
                }
            });
        }
    }
}
