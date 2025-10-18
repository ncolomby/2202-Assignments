    let nextPlayer = 'X';

        // Step 1
    document.getElementById('next-lbl').innerText = nextPlayer;

   
    createGameBoard();

    function createGameBoard() {

        // Step 2:
        for (let i = 1; i <= 9; i++) {
            const cell = document.getElementById(`c${i}`);
            const btn = document.createElement('button');
            btn.innerText = '[ ]';
            cell.appendChild(btn);
        }

        // Step 3:
        let btns = document.querySelectorAll('button');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function (event) {
                takeCell(event);
            });
        }
    }

    function takeCell(event) {
        // Step 4:
        event.target.innerText = `[${nextPlayer}]`;
        event.target.disabled = true;

        nextPlayer = (nextPlayer === 'X') ? 'O' : 'X';
        document.getElementById('next-lbl').innerText = nextPlayer;

        // Step 6:
        if (isGameOver()) {
            document.getElementById('game-over-lbl').innerHTML = '<h1>Game Over</h1>';
        }
    }

    function isGameOver() {
        // Step 5:
        let btns = document.querySelectorAll('button');
        for (let i = 0; i < btns.length; i++) {
            if (!btns[i].disabled) {
                return false;
            }
        }
        return true;
    }


