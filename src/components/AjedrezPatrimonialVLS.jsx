import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, RotateCcw, Trophy, Brain, ChevronRight, Clock, Flag, Zap } from 'lucide-react';

// ══════════════════════════════════════════════════════════════
// MOTOR DE AJEDREZ — PIEZAS Y LÓGICA
// ══════════════════════════════════════════════════════════════

const PIECES = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

const INIT_BOARD = [
  ['bR','bN','bB','bQ','bK','bB','bN','bR'],
  ['bP','bP','bP','bP','bP','bP','bP','bP'],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ['wP','wP','wP','wP','wP','wP','wP','wP'],
  ['wR','wN','wB','wQ','wK','wB','wN','wR'],
];

const color = (p) => p ? p[0] : null;
const type = (p) => p ? p[1] : null;
const enemy = (c) => c === 'w' ? 'b' : 'w';

function cloneBoard(b) { return b.map(r => [...r]); }

// Valores de piezas para evaluación
const PIECE_VALUES = { K: 20000, Q: 900, R: 500, B: 330, N: 320, P: 100 };

// Tablas de posición para cada pieza (perspectiva blancas)
const PST = {
  P: [
    [0,0,0,0,0,0,0,0],[50,50,50,50,50,50,50,50],[10,10,20,30,30,20,10,10],
    [5,5,10,25,25,10,5,5],[0,0,0,20,20,0,0,0],[5,-5,-10,0,0,-10,-5,5],
    [5,10,10,-20,-20,10,10,5],[0,0,0,0,0,0,0,0]
  ],
  N: [
    [-50,-40,-30,-30,-30,-30,-40,-50],[-40,-20,0,0,0,0,-20,-40],
    [-30,0,10,15,15,10,0,-30],[-30,5,15,20,20,15,5,-30],
    [-30,0,15,20,20,15,0,-30],[-30,5,10,15,15,10,5,-30],
    [-40,-20,0,5,5,0,-20,-40],[-50,-40,-30,-30,-30,-30,-40,-50]
  ],
  B: [
    [-20,-10,-10,-10,-10,-10,-10,-20],[-10,0,0,0,0,0,0,-10],
    [-10,0,5,10,10,5,0,-10],[-10,5,5,10,10,5,5,-10],
    [-10,0,10,10,10,10,0,-10],[-10,10,10,10,10,10,10,-10],
    [-10,5,0,0,0,0,5,-10],[-20,-10,-10,-10,-10,-10,-10,-20]
  ],
  R: [
    [0,0,0,0,0,0,0,0],[5,10,10,10,10,10,10,5],[-5,0,0,0,0,0,0,-5],
    [-5,0,0,0,0,0,0,-5],[-5,0,0,0,0,0,0,-5],[-5,0,0,0,0,0,0,-5],
    [-5,0,0,0,0,0,0,-5],[0,0,0,5,5,0,0,0]
  ],
  Q: [
    [-20,-10,-10,-5,-5,-10,-10,-20],[-10,0,0,0,0,0,0,-10],
    [-10,0,5,5,5,5,0,-10],[-5,0,5,5,5,5,0,-5],
    [0,0,5,5,5,5,0,-5],[-10,5,5,5,5,5,0,-10],
    [-10,0,5,0,0,0,0,-10],[-20,-10,-10,-5,-5,-10,-10,-20]
  ],
  K: [
    [-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],[-10,-20,-20,-20,-20,-20,-20,-10],
    [20,20,0,0,0,0,20,20],[20,30,10,0,0,10,30,20]
  ],
};

function getPST(piece, row, col) {
  const t = type(piece);
  const c = color(piece);
  const table = PST[t];
  if (!table) return 0;
  const r = c === 'w' ? row : 7 - row;
  return table[r][col];
}

// Generador de movimientos
function getMoves(board, row, col, enPassantSq, castleRights) {
  const piece = board[row][col];
  if (!piece) return [];
  const c = color(piece);
  const t = type(piece);
  const moves = [];

  const add = (r, c2) => {
    if (r >= 0 && r < 8 && c2 >= 0 && c2 < 8) {
      const target = board[r][c2];
      if (!target || color(target) !== c) moves.push([r, c2]);
      return !target;
    }
    return false;
  };

  const slide = (drs, dcs) => {
    for (let i = 0; i < drs.length; i++) {
      let r = row + drs[i], c2 = col + dcs[i];
      while (r >= 0 && r < 8 && c2 >= 0 && c2 < 8) {
        const target = board[r][c2];
        if (!target) { moves.push([r, c2]); r += drs[i]; c2 += dcs[i]; }
        else { if (color(target) !== c) moves.push([r, c2]); break; }
      }
    }
  };

  if (t === 'P') {
    const dir = c === 'w' ? -1 : 1;
    const startRow = c === 'w' ? 6 : 1;
    if (!board[row + dir]?.[col]) {
      moves.push([row + dir, col]);
      if (row === startRow && !board[row + 2 * dir]?.[col]) moves.push([row + 2 * dir, col]);
    }
    for (const dc of [-1, 1]) {
      const nr = row + dir, nc = col + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        if (board[nr][nc] && color(board[nr][nc]) !== c) moves.push([nr, nc]);
        if (enPassantSq && enPassantSq[0] === nr && enPassantSq[1] === nc) moves.push([nr, nc]);
      }
    }
  } else if (t === 'N') {
    for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) add(row+dr, col+dc);
  } else if (t === 'B') {
    slide([-1,-1,1,1],[-1,1,-1,1]);
  } else if (t === 'R') {
    slide([-1,1,0,0],[0,0,-1,1]);
  } else if (t === 'Q') {
    slide([-1,-1,1,1,0,0,-1,1],[-1,1,-1,1,-1,1,0,0]);
  } else if (t === 'K') {
    for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) add(row+dr, col+dc);
    // Enroque
    if (castleRights) {
      const cr = castleRights[c];
      const rank = c === 'w' ? 7 : 0;
      if (cr?.kingSide && !board[rank][5] && !board[rank][6] && !isUnderAttack(board, rank, 4, enemy(c)) && !isUnderAttack(board, rank, 5, enemy(c)) && !isUnderAttack(board, rank, 6, enemy(c))) moves.push([rank, 6]);
      if (cr?.queenSide && !board[rank][3] && !board[rank][2] && !board[rank][1] && !isUnderAttack(board, rank, 4, enemy(c)) && !isUnderAttack(board, rank, 3, enemy(c))) moves.push([rank, 2]);
    }
  }
  return moves;
}

function isUnderAttack(board, row, col, byColor) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && color(p) === byColor) {
        const mvs = getMoves(board, r, c, null, null);
        if (mvs.some(([mr, mc]) => mr === row && mc === col)) return true;
      }
    }
  }
  return false;
}

function findKing(board, c) {
  for (let r = 0; r < 8; r++)
    for (let col = 0; col < 8; col++)
      if (board[r][col] === c + 'K') return [r, col];
  return null;
}

function isInCheck(board, c) {
  const kingPos = findKing(board, c);
  if (!kingPos) return false;
  return isUnderAttack(board, kingPos[0], kingPos[1], enemy(c));
}

function applyMove(board, from, to, promoteTo = null) {
  const nb = cloneBoard(board);
  const piece = nb[from[0]][from[1]];
  const t = type(piece);
  const c = color(piece);

  // En passant capture
  if (t === 'P' && to[1] !== from[1] && !nb[to[0]][to[1]]) {
    nb[from[0]][to[1]] = null;
  }
  // Enroque
  if (t === 'K' && Math.abs(to[1] - from[1]) === 2) {
    const rank = from[0];
    if (to[1] === 6) { nb[rank][5] = nb[rank][7]; nb[rank][7] = null; }
    if (to[1] === 2) { nb[rank][3] = nb[rank][0]; nb[rank][0] = null; }
  }
  nb[to[0]][to[1]] = piece;
  nb[from[0]][from[1]] = null;
  // Promoción
  if (t === 'P' && (to[0] === 0 || to[0] === 7)) {
    nb[to[0]][to[1]] = c + (promoteTo || 'Q');
  }
  return nb;
}

function getLegalMoves(board, row, col, enPassantSq, castleRights) {
  const piece = board[row][col];
  if (!piece) return [];
  const c = color(piece);
  const candidates = getMoves(board, row, col, enPassantSq, castleRights);
  return candidates.filter(([tr, tc]) => {
    const nb = applyMove(board, [row, col], [tr, tc]);
    return !isInCheck(nb, c);
  });
}

function getAllLegalMoves(board, c, enPassantSq, castleRights) {
  const moves = [];
  for (let r = 0; r < 8; r++)
    for (let col = 0; col < 8; col++)
      if (board[r][col] && color(board[r][col]) === c) {
        const pMoves = getLegalMoves(board, r, col, enPassantSq, castleRights);
        pMoves.forEach(m => moves.push({ from: [r, col], to: m }));
      }
  return moves;
}

// ══════════════════════════════════════════════════════════════
// MOTOR IA — MINIMAX CON ALPHA-BETA PRUNING
// ══════════════════════════════════════════════════════════════

function evaluateBoard(board) {
  let score = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) continue;
      const val = PIECE_VALUES[type(p)] + getPST(p, r, c);
      score += color(p) === 'w' ? val : -val;
    }
  }
  return score;
}

function minimax(board, depth, alpha, beta, maximizing, enPassantSq, castleRights) {
  const currentColor = maximizing ? 'w' : 'b';
  const moves = getAllLegalMoves(board, currentColor, enPassantSq, castleRights);

  if (depth === 0 || moves.length === 0) {
    if (moves.length === 0) {
      if (isInCheck(board, currentColor)) return maximizing ? -99999 : 99999;
      return 0; // Stalemate
    }
    return evaluateBoard(board);
  }

  if (maximizing) {
    let best = -Infinity;
    for (const { from, to } of moves) {
      const nb = applyMove(board, from, to);
      const score = minimax(nb, depth - 1, alpha, beta, false, null, castleRights);
      best = Math.max(best, score);
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const { from, to } of moves) {
      const nb = applyMove(board, from, to);
      const score = minimax(nb, depth - 1, alpha, beta, true, null, castleRights);
      best = Math.min(best, score);
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

function getBestMove(board, depth, enPassantSq, castleRights) {
  const moves = getAllLegalMoves(board, 'b', enPassantSq, castleRights);
  if (moves.length === 0) return null;

  let bestMove = null;
  let bestScore = Infinity;

  // Orden: capturas primero (mejora alpha-beta)
  moves.sort((a, b) => {
    const capA = board[a.to[0]][a.to[1]] ? PIECE_VALUES[type(board[a.to[0]][a.to[1]])] : 0;
    const capB = board[b.to[0]][b.to[1]] ? PIECE_VALUES[type(board[b.to[0]][b.to[1]])] : 0;
    return capB - capA;
  });

  for (const move of moves) {
    const nb = applyMove(board, move.from, move.to);
    const score = minimax(nb, depth - 1, -Infinity, Infinity, true, null, castleRights);
    if (score < bestScore) { bestScore = score; bestMove = move; }
  }
  return bestMove;
}

// ══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════

const DIFFICULTY = {
  facil: { depth: 1, label: 'FÁCIL', color: '#10b981' },
  normal: { depth: 2, label: 'NORMAL', color: '#f59e0b' },
  dificil: { depth: 3, label: 'DIFÍCIL', color: '#ef4444' },
};

export default function AjedrezPatrimonialVLS({ onClose }) {
  const [board, setBoard] = useState(() => cloneBoard(INIT_BOARD));
  const [selected, setSelected] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [turn, setTurn] = useState('w');
  const [status, setStatus] = useState('playing'); // playing, check, checkmate, stalemate
  const [enPassantSq, setEnPassantSq] = useState(null);
  const [castleRights, setCastleRights] = useState({
    w: { kingSide: true, queenSide: true },
    b: { kingSide: true, queenSide: true },
  });
  const [thinking, setThinking] = useState(false);
  const [history, setHistory] = useState([]);
  const [captured, setCaptured] = useState({ w: [], b: [] });
  const [difficulty, setDifficulty] = useState('normal');
  const [showMenu, setShowMenu] = useState(true);
  const [moveCount, setMoveCount] = useState(0);
  const [lastMove, setLastMove] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const thinkingRef = useRef(false);

  const isMobile = window.innerWidth < 768;
  const boardSize = isMobile ? Math.min(window.innerWidth - 32, 400) : 560;
  const cellSize = boardSize / 8;

  const updateStatus = useCallback((b, t) => {
    const inCheck = isInCheck(b, t);
    const hasLegal = getAllLegalMoves(b, t, enPassantSq, castleRights).length > 0;
    if (!hasLegal && inCheck) setStatus('checkmate');
    else if (!hasLegal) setStatus('stalemate');
    else if (inCheck) setStatus('check');
    else setStatus('playing');
  }, [enPassantSq, castleRights]);

  const handleCellClick = useCallback((row, col) => {
    if (turn !== 'w' || thinking || status === 'checkmate' || status === 'stalemate') return;

    if (selected) {
      const isLegal = legalMoves.some(([r, c]) => r === row && c === col);
      if (isLegal) {
        const piece = board[selected[0]][selected[1]];
        const isPawn = type(piece) === 'P';
        const isPromoRow = (row === 0 && color(piece) === 'w');

        if (isPawn && isPromoRow) {
          setPromotion({ from: selected, to: [row, col] });
          setSelected(null);
          setLegalMoves([]);
          return;
        }

        makeMove(board, selected, [row, col]);
        return;
      }
      setSelected(null);
      setLegalMoves([]);
    }

    if (board[row][col] && color(board[row][col]) === 'w') {
      setSelected([row, col]);
      setLegalMoves(getLegalMoves(board, row, col, enPassantSq, castleRights));
    }
  }, [board, selected, legalMoves, turn, thinking, status, enPassantSq, castleRights]);

  const makeMove = useCallback((b, from, to, promoteTo = 'Q') => {
    const piece = b[from[0]][from[1]];
    const captured_piece = b[to[0]][to[1]];

    // Update captured
    if (captured_piece) {
      setCaptured(prev => ({
        ...prev,
        [color(piece)]: [...prev[color(piece)], captured_piece]
      }));
    }

    const nb = applyMove(b, from, to, promoteTo);

    // Update castle rights
    const newCR = { w: { ...castleRights.w }, b: { ...castleRights.b } };
    if (type(piece) === 'K') { newCR[color(piece)] = { kingSide: false, queenSide: false }; }
    if (type(piece) === 'R') {
      if (from[0] === 7 && from[1] === 7) newCR.w.kingSide = false;
      if (from[0] === 7 && from[1] === 0) newCR.w.queenSide = false;
      if (from[0] === 0 && from[1] === 7) newCR.b.kingSide = false;
      if (from[0] === 0 && from[1] === 0) newCR.b.queenSide = false;
    }

    // En passant square
    const newEP = (type(piece) === 'P' && Math.abs(to[0] - from[0]) === 2)
      ? [(from[0] + to[0]) / 2, from[1]] : null;

    setBoard(nb);
    setLastMove({ from, to });
    setSelected(null);
    setLegalMoves([]);
    setEnPassantSq(newEP);
    setCastleRights(newCR);
    setMoveCount(c => c + 1);
    setHistory(h => [...h, { from, to, piece, captured: captured_piece }]);

    const nextTurn = color(piece) === 'w' ? 'b' : 'w';
    setTurn(nextTurn);
    updateStatus(nb, nextTurn);
  }, [board, castleRights, updateStatus]);

  // AI move
  useEffect(() => {
    if (turn === 'b' && status === 'playing' && !thinkingRef.current) {
      thinkingRef.current = true;
      setThinking(true);
      const depth = DIFFICULTY[difficulty].depth;
      setTimeout(() => {
        const move = getBestMove(board, depth, enPassantSq, castleRights);
        if (move) makeMove(board, move.from, move.to);
        setThinking(false);
        thinkingRef.current = false;
      }, 300);
    }
    if (turn !== 'b') thinkingRef.current = false;
  }, [turn, status]);

  const resetGame = () => {
    setBoard(cloneBoard(INIT_BOARD));
    setSelected(null); setLegalMoves([]); setTurn('w');
    setStatus('playing'); setEnPassantSq(null);
    setCastleRights({ w: { kingSide: true, queenSide: true }, b: { kingSide: true, queenSide: true } });
    setThinking(false); setHistory([]); setCaptured({ w: [], b: [] });
    setMoveCount(0); setLastMove(null); setPromotion(null);
    thinkingRef.current = false;
  };

  const handlePromotion = (piece) => {
    if (!promotion) return;
    makeMove(board, promotion.from, promotion.to, piece);
    setPromotion(null);
  };

  const FILES = ['a','b','c','d','e','f','g','h'];
  const RANKS = ['8','7','6','5','4','3','2','1'];

  const statusMsg = {
    check: '⚠️ ¡JAQUE!',
    checkmate: turn === 'w' ? '🏳️ Las negras ganan' : '🏆 ¡Ganaste!',
    stalemate: '🤝 Tablas — Ahogado',
    playing: thinking ? '🤔 IA pensando...' : (turn === 'w' ? '⬜ Tu turno (Blancas)' : '⬛ Turno de la IA'),
  };

  const statusColor = { check: '#f59e0b', checkmate: '#ef4444', stalemate: '#94a3b8', playing: '#38bdf8' };

  if (showMenu) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 100100, background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '2rem', width: '100%' }}>
          {/* Botón cerrar */}
          <button onClick={onClose} style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', background: 'rgba(239,68,68,0.2)', border: '1px solid #ef4444', color: '#ef4444', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <X size={20} />
          </button>

          {/* Board preview decorativo */}
          <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>♟</div>
          <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900, margin: '0 0 0.5rem', letterSpacing: '-1px' }}>
            AJEDREZ <span style={{ color: '#fcd34d' }}>VLS</span>
          </h1>
          <p style={{ color: '#64748b', marginBottom: '3rem', fontSize: '0.9rem' }}>Motor IA con α-β Pruning · Patrimonio Cultural La Serena</p>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem' }}>SELECCIONA DIFICULTAD</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {Object.entries(DIFFICULTY).map(([k, v]) => (
                <button key={k} onClick={() => setDifficulty(k)} style={{
                  flex: 1, padding: '1rem', borderRadius: '16px', border: `2px solid ${difficulty === k ? v.color : 'rgba(255,255,255,0.1)'}`,
                  background: difficulty === k ? `${v.color}22` : 'rgba(255,255,255,0.03)',
                  color: difficulty === k ? v.color : '#64748b', fontWeight: 900, cursor: 'pointer', transition: '0.2s',
                  fontSize: '0.85rem'
                }}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => { resetGame(); setShowMenu(false); }} style={{
            width: '100%', padding: '1.2rem', background: 'linear-gradient(135deg, #fcd34d, #f59e0b)',
            border: 'none', borderRadius: '16px', color: '#000', fontSize: '1.1rem', fontWeight: 900,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            boxShadow: '0 10px 40px rgba(252,211,77,0.3)'
          }}>
            <Zap size={20} /> COMENZAR PARTIDA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100100, background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>

      {/* ── PANEL LATERAL ── */}
      {!isMobile && (
        <div style={{ width: '260px', background: 'rgba(0,0,0,0.4)', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#fcd34d', fontWeight: 900, fontSize: '1rem', letterSpacing: '1px' }}>AJEDREZ VLS</div>
              <div style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 'bold' }}>Motor IA · α-β Pruning</div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#ef4444', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={16} />
            </button>
          </div>

          {/* Status */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1rem', border: `1px solid ${statusColor[status]}33` }}>
            <div style={{ color: statusColor[status], fontWeight: 900, fontSize: '0.85rem' }}>{statusMsg[status]}</div>
            <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '4px' }}>Jugada #{moveCount} · {DIFFICULTY[difficulty].label}</div>
          </div>

          {/* Piezas capturadas */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 'bold', marginBottom: '8px' }}>CAPTURADAS</div>
            <div style={{ fontSize: '1.2rem', lineHeight: 1.4, minHeight: '28px' }}>{captured.w.map((p, i) => <span key={i}>{PIECES[p]}</span>)}</div>
            <div style={{ fontSize: '1.2rem', lineHeight: 1.4, minHeight: '28px', marginTop: '4px' }}>{captured.b.map((p, i) => <span key={i}>{PIECES[p]}</span>)}</div>
          </div>

          {/* Historial */}
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1rem', overflow: 'hidden' }}>
            <div style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={10} /> HISTORIAL
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '200px', fontSize: '0.7rem', color: '#94a3b8' }}>
              {history.slice(-20).map((m, i) => (
                <div key={i} style={{ padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', gap: '6px' }}>
                  <span style={{ color: '#64748b', minWidth: '24px' }}>{i + 1}.</span>
                  <span>{PIECES[m.piece]}</span>
                  <span>{FILES[m.from[1]]}{RANKS[m.from[0]]}→{FILES[m.to[1]]}{RANKS[m.to[0]]}</span>
                  {m.captured && <span style={{ color: '#ef4444' }}>×{PIECES[m.captured]}</span>}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={resetGame} style={{ flex: 1, padding: '0.7rem', background: 'rgba(100,116,139,0.2)', border: '1px solid rgba(100,116,139,0.3)', color: '#94a3b8', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <RotateCcw size={14} /> Nueva
            </button>
            <button onClick={() => { resetGame(); setShowMenu(true); }} style={{ flex: 1, padding: '0.7rem', background: 'rgba(252,211,77,0.1)', border: '1px solid rgba(252,211,77,0.3)', color: '#fcd34d', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Flag size={14} /> Menú
            </button>
          </div>
        </div>
      )}

      {/* ── TABLERO ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '1rem' : '2rem', gap: '1rem' }}>

        {/* Header móvil */}
        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div style={{ color: statusColor[status], fontWeight: 900, fontSize: '0.85rem' }}>{statusMsg[status]}</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={resetGame} style={{ padding: '6px 12px', background: 'rgba(100,116,139,0.2)', border: '1px solid rgba(100,116,139,0.4)', color: '#94a3b8', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <RotateCcw size={14} />
              </button>
              <button onClick={onClose} style={{ padding: '6px 12px', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Tablero SVG + celdas */}
        <div style={{ position: 'relative', width: boardSize, height: boardSize, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.8)', border: '3px solid rgba(252,211,77,0.3)' }}>
          {board.map((row, ri) => row.map((cell, ci) => {
            const isLight = (ri + ci) % 2 === 0;
            const isSelected = selected && selected[0] === ri && selected[1] === ci;
            const isLegal = legalMoves.some(([r, c]) => r === ri && c === ci);
            const isLastFrom = lastMove?.from[0] === ri && lastMove?.from[1] === ci;
            const isLastTo = lastMove?.to[0] === ri && lastMove?.to[1] === ci;
            const isKingInCheck = status === 'check' && cell && type(cell) === 'K' && color(cell) === turn;

            let bg = isLight ? '#f0d9b5' : '#b58863';
            if (isSelected) bg = '#f6f669';
            if (isLastFrom || isLastTo) bg = isLight ? '#cdd26a' : '#aaa23a';
            if (isKingInCheck) bg = '#ff6b6b';

            return (
              <div
                key={`${ri}-${ci}`}
                onClick={() => handleCellClick(ri, ci)}
                style={{
                  position: 'absolute',
                  left: ci * cellSize, top: ri * cellSize,
                  width: cellSize, height: cellSize,
                  background: bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: (turn === 'w' && !thinking && (cell && color(cell) === 'w' || isLegal)) ? 'pointer' : 'default',
                  fontSize: cellSize * 0.65,
                  lineHeight: 1,
                  transition: 'background 0.15s',
                  userSelect: 'none',
                }}
              >
                {/* Coordenadas */}
                {ci === 0 && <span style={{ position: 'absolute', top: 2, left: 3, fontSize: '0.55rem', fontWeight: 'bold', color: isLight ? '#b58863' : '#f0d9b5', opacity: 0.8 }}>{RANKS[ri]}</span>}
                {ri === 7 && <span style={{ position: 'absolute', bottom: 2, right: 3, fontSize: '0.55rem', fontWeight: 'bold', color: isLight ? '#b58863' : '#f0d9b5', opacity: 0.8 }}>{FILES[ci]}</span>}

                {/* Punto de movimiento legal */}
                {isLegal && !cell && (
                  <div style={{ width: cellSize * 0.28, height: cellSize * 0.28, borderRadius: '50%', background: 'rgba(0,0,0,0.2)', pointerEvents: 'none' }} />
                )}
                {isLegal && cell && (
                  <div style={{ position: 'absolute', inset: 0, border: '4px solid rgba(0,0,0,0.3)', borderRadius: '4px', pointerEvents: 'none' }} />
                )}

                {/* Pieza */}
                {cell && (
                  <span style={{
                    filter: `drop-shadow(0 2px 3px rgba(0,0,0,0.4))`,
                    transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                    transition: 'transform 0.15s',
                    zIndex: 1,
                  }}>
                    {PIECES[cell]}
                  </span>
                )}
              </div>
            );
          }))}

          {/* IA thinking overlay */}
          {thinking && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div style={{ background: 'rgba(15,23,42,0.9)', padding: '1rem 2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(252,211,77,0.3)' }}>
                <Brain size={20} color="#fcd34d" style={{ animation: 'pulse 1s infinite' }} />
                <span style={{ color: '#fcd34d', fontWeight: 900, fontSize: '0.85rem' }}>IA calculando...</span>
              </div>
            </div>
          )}
        </div>

        {/* Estado fin de juego */}
        {(status === 'checkmate' || status === 'stalemate') && (
          <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(252,211,77,0.4)', borderRadius: '16px', padding: '1.5rem 2rem', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{status === 'checkmate' && turn !== 'w' ? '🏆' : '🏳️'}</div>
            <div style={{ color: 'white', fontWeight: 900, fontSize: '1.1rem' }}>{statusMsg[status]}</div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '1rem' }}>Jugadas: {moveCount}</div>
            <button onClick={resetGame} style={{ padding: '0.7rem 2rem', background: '#fcd34d', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', color: '#000' }}>
              <RotateCcw size={14} style={{ display: 'inline', marginRight: '6px' }} />Nueva Partida
            </button>
          </div>
        )}
      </div>

      {/* ── MODAL PROMOCIÓN ── */}
      {promotion && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#1e293b', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(252,211,77,0.4)', textAlign: 'center' }}>
            <div style={{ color: '#fcd34d', fontWeight: 900, marginBottom: '1.5rem' }}>PROMOCIÓN — Elige pieza</div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Q', 'R', 'B', 'N'].map(p => (
                <button key={p} onClick={() => handlePromotion(p)} style={{ width: '64px', height: '64px', fontSize: '2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {PIECES['w' + p]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
      `}</style>
    </div>
  );
}
