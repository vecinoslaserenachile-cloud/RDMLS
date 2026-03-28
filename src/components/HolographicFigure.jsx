import React, { useRef, useEffect } from 'react';

export default function HolographicFigure({ image, name, color = '#38bdf8' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = 300;
        const H = 450;
        canvas.width = W;
        canvas.height = H;

        const img = new Image();
        img.src = image;
        let frame = 0;
        let animId;
        const draw = () => {
            frame++;
            ctx.clearRect(0, 0, W, H);
            
            // Glow base
            const grad = ctx.createRadialGradient(W/2, H-50, 0, W/2, H-50, 160);
            grad.addColorStop(0, `${color}bb`);
            grad.addColorStop(0.3, `${color}44`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);

            if (img.complete) {
                ctx.save();
                
                // Hologram transformation (floating & slight rotation)
                const floatingY = Math.sin(frame * 0.04) * 15;
                const scaleX = 0.85 + Math.sin(frame * 0.015) * 0.03;
                
                ctx.translate(W/2, H/2 + floatingY);
                ctx.scale(scaleX, 1);
                
                // Multiple layers for depth
                for(let i=0; i<3; i++) {
                    ctx.globalAlpha = 0.2 + (i * 0.1);
                    const offset = Math.sin(frame * 0.02 + i) * 2;
                    ctx.drawImage(img, -W/3 + offset, -H/3, (W/3)*2, (H/3)*2);
                }
                
                // Add color tint
                ctx.globalCompositeOperation = 'source-atop';
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.25;
                ctx.fillRect(-W/3, -H/3, (W/3)*2, (H/3)*2);
                
                ctx.restore();

                // Scanlines & Interference
                ctx.globalCompositeOperation = 'source-over';
                for (let i = 0; i < H; i += 3) {
                    const alpha = 0.05 + Math.sin(frame * 0.1 + i * 0.5) * 0.03;
                    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(0, i);
                    ctx.lineTo(W, i);
                    ctx.stroke();
                }

                // High-freq jitter lines
                if (Math.random() > 0.95) {
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    const y = Math.random() * H;
                    ctx.moveTo(0, y);
                    ctx.lineTo(W, y);
                    ctx.stroke();
                }
            }

            // Pedestal (Advanced Cyber Style)
            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.ellipse(W/2, H-30, 80, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Neon rings
            for(let i=0; i<3; i++) {
                ctx.strokeStyle = color;
                ctx.globalAlpha = 1 / (i + 1);
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

            animId = requestAnimationFrame(draw);
        };

        animId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animId);
    }, [image, color]);

    return (
        <div style={{ position: 'relative', width: '300px', height: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <canvas ref={canvasRef} style={{ pointerEvents: 'none' }} />
            <div style={{
                marginTop: '-40px',
                padding: '4px 12px',
                background: 'rgba(0,0,0,0.8)',
                borderRadius: '20px',
                border: `1px solid ${color}`,
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                boxShadow: `0 0 15px ${color}50`
            }}>
                Holograma Proyectado: {name}
            </div>
        </div>
    );
}
