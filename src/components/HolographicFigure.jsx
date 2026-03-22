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
        const draw = () => {
            frame++;
            ctx.clearRect(0, 0, W, H);
            
            // Glow base
            const grad = ctx.createRadialGradient(W/2, H-50, 0, W/2, H-50, 100);
            grad.addColorStop(0, `${color}66`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);

            if (img.complete) {
                ctx.save();
                
                // Hologram transformation (floating & slight rotation)
                const floatingY = Math.sin(frame * 0.05) * 10;
                const scaleX = 0.8 + Math.sin(frame * 0.02) * 0.05;
                
                ctx.translate(W/2, H/2 + floatingY);
                ctx.scale(scaleX, 1);
                
                // Draw image with low opacity
                ctx.globalAlpha = 0.6;
                ctx.drawImage(img, -W/3, -H/3, (W/3)*2, (H/3)*2);
                
                // Add color tint
                ctx.globalCompositeOperation = 'source-atop';
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.3;
                ctx.fillRect(-W/3, -H/3, (W/3)*2, (H/3)*2);
                
                ctx.restore();

                // Scanlines
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = `rgba(255,255,255,0.1)`;
                ctx.lineWidth = 1;
                for (let i = 0; i < H; i += 4) {
                    const offset = (frame % 4);
                    ctx.beginPath();
                    ctx.moveTo(0, i + offset);
                    ctx.lineTo(W, i + offset);
                    ctx.stroke();
                }

                // Glitch effect occasionally
                if (Math.random() > 0.98) {
                    ctx.fillStyle = color;
                    ctx.fillRect(Math.random() * W, Math.random() * H, 50, 2);
                }
            }

            // Pedestal
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.ellipse(W/2, H-30, 60, 15, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Beams
            ctx.strokeStyle = `${color}33`;
            ctx.lineWidth = 1;
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(W/2 - 40 + i * 20, H-30);
                ctx.lineTo(W/2, H/2);
                ctx.stroke();
            }

            requestAnimationFrame(draw);
        };

        const animId = requestAnimationFrame(draw);
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
