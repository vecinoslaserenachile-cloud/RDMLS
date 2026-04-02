import React, { useRef, useEffect, useState } from 'react';

export default function HolographicFigure({ image, name, color = '#38bdf8' }) {
    const canvasRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = 300;
        const H = 450;
        canvas.width = W;
        canvas.height = H;

        let isUnmounted = false;
        const img = new Image();
        
        img.onload = () => {
            if (!isUnmounted) setIsLoaded(true);
        };
        img.onerror = () => {
            if (!isUnmounted) setHasError(true);
        };
        img.src = image;

        let frame = 0;
        let animId;

        const draw = () => {
            if (isUnmounted) return;
            frame++;
            
            ctx.clearRect(0, 0, W, H);
            
            // Glow base
            const grad = ctx.createRadialGradient(W/2, H-50, 0, W/2, H-50, 160);
            grad.addColorStop(0, `${color}bb`);
            grad.addColorStop(0.3, `${color}44`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);

            // Solo dibujar si la imagen está cargada
            if (img.complete && img.naturalWidth > 0) {
                ctx.save();
                
                // Hologram transformation (floating & slight rotation)
                const floatingY = Math.sin(frame * 0.04) * 15;
                const scaleX = 0.85 + Math.sin(frame * 0.015) * 0.03;
                
                ctx.translate(W/2, H/2 + floatingY);
                ctx.scale(scaleX, 1);
                
                // Multiple layers for depth
                for(let i=0; i<3; i++) {
                    ctx.globalAlpha = 0.15 + (i * 0.08);
                    const offset = Math.sin(frame * 0.02 + i) * 3;
                    ctx.drawImage(img, -W/3 + offset, -H/3, (W/3)*2, (H/3)*2);
                }
                
                // Add color tint
                ctx.globalCompositeOperation = 'source-atop';
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.3;
                ctx.fillRect(-W/3, -H/3, (W/3)*2, (H/3)*2);
                
                ctx.restore();

                // Scanlines & Interference
                ctx.globalCompositeOperation = 'source-over';
                for (let i = 0; i < H; i += 4) {
                    const alpha = 0.03 + Math.sin(frame * 0.1 + i * 0.5) * 0.02;
                    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(0, i);
                    ctx.lineTo(W, i);
                    ctx.stroke();
                }

                // High-freq jitter lines
                if (Math.random() > 0.97) {
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 0.5;
                    ctx.globalAlpha = 0.5;
                    ctx.beginPath();
                    const y = Math.random() * H;
                    ctx.moveTo(0, y);
                    ctx.lineTo(W, y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            } else if (img.complete && (img.naturalWidth === 0 || hasError)) {
                ctx.font = '900 14px "Outfit"';
                ctx.fillStyle = color;
                ctx.textAlign = 'center';
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
                ctx.fillText('NODO OFFLINE', W/2, H/2);
                ctx.shadowBlur = 0;
            } else {
                // Loading state inside canvas
                ctx.font = '900 12px "Outfit"';
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.textAlign = 'center';
                ctx.fillText('CARGANDO...', W/2, H/2);
            }

            // Pedestal (Advanced Cyber Style)
            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.ellipse(W/2, H-30, 80, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Neon rings
            for(let i=0; i<3; i++) {
                ctx.strokeStyle = color;
                ctx.globalAlpha = 0.8 / (i + 1);
                ctx.lineWidth = 2 - (i*0.5);
                ctx.beginPath();
                ctx.ellipse(W/2, H-30, 80 + i*5, 20 + i*2, 0, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Projector Core
            ctx.fillStyle = color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = color;
            ctx.beginPath();
            ctx.arc(W/2, H-35, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Light Beams (Volumetric Style)
            ctx.globalAlpha = 0.4;
            for (let i = 0; i < 8; i++) {
                const gradBeam = ctx.createLinearGradient(W/2, H-35, W/2, H/2);
                gradBeam.addColorStop(0, `${color}66`);
                gradBeam.addColorStop(1, 'transparent');
                ctx.strokeStyle = gradBeam;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(W/2 - 50 + i * 14.2, H-35);
                ctx.lineTo(W/2, H/2 - 20);
                ctx.stroke();
            }
            ctx.globalAlpha = 1.0;

            animId = requestAnimationFrame(draw);
        };

        animId = requestAnimationFrame(draw);
        return () => {
            isUnmounted = true;
            cancelAnimationFrame(animId);
        };
    }, [image, color]); // Removed isLoaded, hasError from here

    return (
        <div style={{ position: 'relative', width: '300px', height: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <canvas ref={canvasRef} style={{ pointerEvents: 'none', filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' }} />
            <div style={{
                marginTop: '-40px',
                padding: '6px 16px',
                background: 'rgba(15,23,42,0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: `1px solid ${color}80`,
                color: color,
                fontSize: '0.75rem',
                fontWeight: '950',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                boxShadow: `0 0 30px ${color}30`,
                zIndex: 10
            }}>
                ID: {name}
            </div>
            {!isLoaded && !hasError && (
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <div className="pulse-fast" style={{ width: '30px', height: '30px', borderRadius: '50%', border: '3px solid transparent', borderTopColor: color, animation: 'spin 1s linear infinite' }}></div>
                </div>
            )}
        </div>
    );
}
