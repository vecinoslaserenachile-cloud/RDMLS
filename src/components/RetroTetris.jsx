import React, { useEffect, useRef } from 'react';

export default function RetroTetris({ brightness, contrast }) {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const W = canvas.width = 400;
        const H = canvas.height = 800;
        const BLOCK = 40;
        const COLS = W / BLOCK, ROWS = H / BLOCK;

        const SHAPES = [
            [[1, 1, 1, 1]], // I
            [[1, 1], [1, 1]], // O
            [[0, 1, 0], [1, 1, 1]], // T
            [[1, 0, 0], [1, 1, 1]], // L
            [[0, 0, 1], [1, 1, 1]], // J
            [[0, 1, 1], [1, 1, 0]], // S
            [[1, 1, 0], [0, 1, 1]]  // Z
        ];
        const COLORS = [null, '#06b6d4', '#eab308', '#a855f7', '#f97316', '#3b82f6', '#22c55e', '#ef4444'];

        let board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
        let piece = null, score = 0, gameOver = false, gameStarted = false;
        let dropCounter = 0, dropInterval = 60; // frames

        const newPiece = () => {
            let id = Math.floor(Math.random() * SHAPES.length) + 1;
            let shape = SHAPES[id - 1];
            piece = { matrix: shape, x: Math.floor(COLS / 2) - 1, y: 0, color: id };
            if (collide(board, piece)) gameOver = true;
        };

        const collide = (board, p) => {
            const m = p.matrix;
            for (let y = 0; y < m.length; y++) {
                for (let x = 0; x < m[y].length; x++) {
                    if (m[y][x] !== 0 && (board[y + p.y] && board[y + p.y][x + p.x]) !== 0) {
                        return true;
                    }
                }
            }
            return false;
        };

        const rotate = (matrix) => {
            return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
        };

        const merge = () => {
            piece.matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) board[y + piece.y][x + piece.x] = piece.color;
                });
            });
            // clear lines
            outer: for (let y = ROWS - 1; y >= 0; y--) {
                for (let x = 0; x < COLS; x++) {
                    if (board[y][x] === 0) continue outer;
                }
                const row = board.splice(y, 1)[0].fill(0);
                board.unshift(row);
                score += 100;
                y++;
            }
            newPiece();
        };

        const handleKeyDown = (e) => {
            if (!gameStarted || gameOver) {
                if (e.key === ' ' || e.key === 'ArrowUp') {
                    gameStarted = true; gameOver = false; score = 0;
                    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
                    newPiece();
                }
                return;
            }
            if (e.key === 'ArrowLeft' || e.key === 'a') {
                piece.x--; if (collide(board, piece)) piece.x++;
            } else if (e.key === 'ArrowRight' || e.key === 'd') {
                piece.x++; if (collide(board, piece)) piece.x--;
            } else if (e.key === 'ArrowDown' || e.key === 's') {
                piece.y++; if (collide(board, piece)) { piece.y--; merge(); }
                dropCounter = 0;
            } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') {
                const prev = piece.matrix;
                piece.matrix = rotate(piece.matrix);
                if (collide(board, piece)) piece.matrix = prev;
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        const drawMatrix = (matrix, ox, oy, isPiece) => {
            matrix.forEach((row, y) => {
                row.forEach((val, x) => {
                    if (val !== 0) {
                        ctx.fillStyle = COLORS[isPiece ? piece.color : val];
                        ctx.fillRect((x + ox) * BLOCK, (y + oy) * BLOCK, BLOCK - 1, BLOCK - 1);
                        // Añadir aspecto de ladrillo / bloque arquitectónico colonial
                        ctx.fillStyle = 'rgba(255,255,255,0.2)';
                        ctx.fillRect((x + ox) * BLOCK + 2, (y + oy) * BLOCK + 2, BLOCK - 5, BLOCK / 2 - 2);
                        ctx.fillStyle = 'rgba(0,0,0,0.2)';
                        ctx.fillRect((x + ox) * BLOCK, (y + oy) * BLOCK + BLOCK - 4, BLOCK - 1, 4);
                        ctx.fillRect((x + ox) * BLOCK + BLOCK - 4, (y + oy) * BLOCK, 4, BLOCK - 1);
                    }
                });
            });
        };

        const updateAndDraw = () => {
            if (gameStarted && !gameOver) {
                dropCounter++;
                if (dropCounter > dropInterval - Math.floor(score / 500) * 5) {
                    piece.y++;
                    if (collide(board, piece)) { piece.y--; merge(); }
                    dropCounter = 0;
                }
            }

            ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);
            drawMatrix(board, 0, 0, false);
            if (piece && !gameOver) drawMatrix(piece.matrix, piece.x, piece.y, true);

            ctx.fillStyle = '#fff'; ctx.font = '20px monospace'; ctx.textAlign = 'left';
            ctx.fillText(`SCORE: ${score}`, 10, 30);

            if (!gameStarted || gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
                ctx.font = '30px monospace'; ctx.fillText(gameOver ? 'GAME OVER' : 'CONSTRUYENDO LS', W / 2, H / 2);
                ctx.font = '16px monospace'; ctx.fillText('ESPACIO / ARRIBA para iniciar/girar', W / 2, H / 2 + 40);
            }
            requestRef.current = requestAnimationFrame(updateAndDraw);
        };
        updateAndDraw();

        return () => { window.removeEventListener('keydown', handleKeyDown); cancelAnimationFrame(requestRef.current); };
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000', filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />;
}
