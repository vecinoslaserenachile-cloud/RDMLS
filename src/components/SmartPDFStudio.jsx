import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, rgb } from 'pdf-lib';
import { motion } from 'framer-motion';
import { Upload, Download, Trash2, ChevronLeft, ChevronRight, Square, Type, X, LayoutGrid, Image as ImageIcon, ZoomIn, ZoomOut, Circle, PenTool, Pipette, MousePointer2, Undo2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker local para Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const SmartPDFStudio = ({ onClose }) => {
    const [file, setFile] = useState(null);
    const [fileBuffer, setFileBuffer] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    
    // Original dimensions of the current page from react-pdf
    const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
    
    // Tools: 'redact-rect', 'redact-circle', 'redact-freehand', 'text', 'image'
    const [activeTool, setActiveTool] = useState('redact-rect'); 
    
    // Eraser config
    const [eraserColor, setEraserColor] = useState('#ffffff');
    const [eraserWidth, setEraserWidth] = useState(10);
    const [textColor, setTextColor] = useState('#ffffff');
    
    // State for drawn items
    const [redactions, setRedactions] = useState([]); // { id, page, shape, x, y, w, h, r, points, color, strokeWidth }
    const [texts, setTexts] = useState([]); // { id, page, x, y, text, size, color }
    const [images, setImages] = useState([]); // { id, page, x, y, width, dataUrl, type, aspect }
    const [draggingElement, setDraggingElement] = useState(null); // { id, type, startX, startY, origX, origY, origPoints }
    const [undoHistory, setUndoHistory] = useState([]);
    
    // Drawing state
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentShape, setCurrentShape] = useState(null);
    
    // UI states
    const [isExporting, setIsExporting] = useState(false);
    const containerRef = useRef(null);

    const saveHistory = () => {
        setUndoHistory(prev => [...prev, {
            redactions: JSON.parse(JSON.stringify(redactions)),
            texts: JSON.parse(JSON.stringify(texts)),
            images: JSON.parse(JSON.stringify(images))
        }]);
    };

    const handleUndo = () => {
        if (undoHistory.length > 0) {
            const lastState = undoHistory[undoHistory.length - 1];
            setRedactions(lastState.redactions);
            setTexts(lastState.texts);
            setImages(lastState.images);
            setUndoHistory(prev => prev.slice(0, -1));
        }
    };

    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            setPageNumber(1);
            setRedactions([]);
            setTexts([]);
            setImages([]);
            setUndoHistory([]);
        }
    };

    const onImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new window.Image();
                img.onload = () => {
                    const aspect = img.width / img.height;
                    saveHistory();
                    setImages(prev => [...prev, {
                        id: Date.now(),
                        page: pageNumber,
                        x: 0.5,
                        y: 0.5,
                        width: 0.3, // 30% del ancho por defecto
                        dataUrl: e.target.result,
                        type: file.type,
                        aspect: aspect
                    }]);
                    setActiveTool('image'); // Cambiar a modo imagen para poder moverla
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        event.target.value = null; // reset
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onPageLoadSuccess = (page) => {
        // Get original unscaled dimensions
        setPageDimensions({
            width: page.originalWidth,
            height: page.originalHeight
        });
    };

    // Helper to get relative coordinates from mouse event
    const getRelativeCoordinates = (e) => {
        if (!containerRef.current) return { x: 0, y: 0 };
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate percentages
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        return { x, y };
    };

    const handleMouseDown = (e) => {
        if (!file) return;
        const pos = getRelativeCoordinates(e);
        
        if (activeTool.startsWith('redact')) {
            setIsDrawing(true);
            setStartPos(pos);
            if (activeTool === 'redact-rect') {
                setCurrentShape({ type: 'rect', x: pos.x, y: pos.y, w: 0, h: 0 });
            } else if (activeTool === 'redact-circle') {
                setCurrentShape({ type: 'circle', x: pos.x, y: pos.y, r: 0 });
            } else if (activeTool === 'redact-freehand') {
                setCurrentShape({ type: 'freehand', points: [pos] });
            }
        } else if (activeTool === 'text') {
            const userInput = prompt("Ingresa el texto a insertar:");
            if (userInput && userInput.trim() !== "") {
                saveHistory();
                setTexts(prev => [...prev, {
                    id: Date.now(),
                    page: pageNumber,
                    x: pos.x,
                    y: pos.y,
                    text: userInput,
                    size: 16, // default size in pt
                    color: textColor
                }]);
            }
        }
    };

    const handleElementMouseDown = (e, id, type, element) => {
        if (activeTool !== 'select' && activeTool !== 'image') return;
        e.stopPropagation();
        const pos = getRelativeCoordinates(e);
        saveHistory();
        setDraggingElement({ 
            id, type, action: 'move',
            startX: pos.x, startY: pos.y, 
            origX: element.x || 0, origY: element.y || 0,
            origPoints: element.points ? JSON.parse(JSON.stringify(element.points)) : null
        });
    };

    const handleResizeMouseDown = (e, id, type, element) => {
        if (activeTool !== 'select' && activeTool !== 'image') return;
        e.stopPropagation();
        const pos = getRelativeCoordinates(e);
        saveHistory();
        setDraggingElement({ 
            id, type, action: 'resize-br',
            startX: pos.x, startY: pos.y, 
            origW: element.w || element.width || 0,
            origH: element.h || 0,
            origR: element.r || 0,
            origSize: element.size || 16,
        });
    };

    const handleMouseMove = (e) => {
        const pos = getRelativeCoordinates(e);
        
        if (draggingElement) {
            const dx = pos.x - draggingElement.startX;
            const dy = pos.y - draggingElement.startY;
            
            if (draggingElement.action === 'move') {
                if (draggingElement.type === 'redaction') {
                    setRedactions(prev => prev.map(r => {
                        if (r.id === draggingElement.id) {
                            if (r.shape === 'freehand' && r.points) {
                                return { ...r, points: draggingElement.origPoints.map(p => ({ x: p.x + dx, y: p.y + dy })) };
                            }
                            return { ...r, x: draggingElement.origX + dx, y: draggingElement.origY + dy };
                        }
                        return r;
                    }));
                } else if (draggingElement.type === 'text') {
                    setTexts(prev => prev.map(t => t.id === draggingElement.id ? { ...t, x: draggingElement.origX + dx, y: draggingElement.origY + dy } : t));
                } else if (draggingElement.type === 'image') {
                    setImages(prev => prev.map(img => img.id === draggingElement.id ? { ...img, x: draggingElement.origX + dx, y: draggingElement.origY + dy } : img));
                }
            } else if (draggingElement.action === 'resize-br') {
                if (draggingElement.type === 'redaction') {
                    setRedactions(prev => prev.map(r => {
                        if (r.id === draggingElement.id) {
                            if (!r.shape || r.shape === 'rect') {
                                return { ...r, w: Math.max(0.01, draggingElement.origW + dx), h: Math.max(0.01, draggingElement.origH + dy) };
                            } else if (r.shape === 'circle') {
                                return { ...r, r: Math.max(0.01, draggingElement.origR + Math.max(dx, dy)) };
                            }
                        }
                        return r;
                    }));
                } else if (draggingElement.type === 'image') {
                    setImages(prev => prev.map(img => img.id === draggingElement.id ? { ...img, width: Math.max(0.05, draggingElement.origW + dx * 2) } : img));
                } else if (draggingElement.type === 'text') {
                    setTexts(prev => prev.map(t => t.id === draggingElement.id ? { ...t, size: Math.max(8, draggingElement.origSize + dx * 400) } : t));
                }
            }
            return;
        }

        if (!isDrawing || !activeTool.startsWith('redact')) return;
        
        if (activeTool === 'redact-rect') {
            setCurrentShape({
                type: 'rect',
                x: Math.min(startPos.x, pos.x),
                y: Math.min(startPos.y, pos.y),
                w: Math.abs(pos.x - startPos.x),
                h: Math.abs(pos.y - startPos.y)
            });
        } else if (activeTool === 'redact-circle') {
            const rx = Math.abs(pos.x - startPos.x);
            const ry = Math.abs(pos.y - startPos.y);
            const r = Math.max(rx, ry);
            setCurrentShape({ type: 'circle', x: startPos.x, y: startPos.y, r: r });
        } else if (activeTool === 'redact-freehand') {
            setCurrentShape(prev => prev ? { ...prev, points: [...prev.points, pos] } : { type: 'freehand', points: [startPos, pos] });
        }
    };

    const handleMouseUp = () => {
        if (draggingElement) {
            setDraggingElement(null);
            return;
        }

        if (!isDrawing || !activeTool.startsWith('redact')) return;
        setIsDrawing(false);
        
        if (currentShape) {
            if (currentShape.type === 'rect' && currentShape.w > 0.01 && currentShape.h > 0.01) {
                saveHistory();
                setRedactions(prev => [...prev, {
                    id: Date.now(), page: pageNumber, shape: 'rect',
                    x: currentShape.x, y: currentShape.y, w: currentShape.w, h: currentShape.h, color: eraserColor
                }]);
            } else if (currentShape.type === 'circle' && currentShape.r > 0.01) {
                saveHistory();
                setRedactions(prev => [...prev, {
                    id: Date.now(), page: pageNumber, shape: 'circle',
                    x: currentShape.x, y: currentShape.y, r: currentShape.r, color: eraserColor
                }]);
            } else if (currentShape.type === 'freehand' && currentShape.points && currentShape.points.length > 1) {
                saveHistory();
                setRedactions(prev => [...prev, {
                    id: Date.now(), page: pageNumber, shape: 'freehand',
                    points: currentShape.points, color: eraserColor, strokeWidth: eraserWidth
                }]);
            }
        }
        setCurrentShape(null);
    };

    const pickColor = async () => {
        if (!window.EyeDropper) {
            alert('Tu navegador no soporta el cuentagotas nativo. Usa el selector de color regular.');
            return;
        }
        try {
            const eyeDropper = new window.EyeDropper();
            const result = await eyeDropper.open();
            setEraserColor(result.sRGBHex);
        } catch (e) {
            console.log("Cuentagotas cancelado o falló", e);
        }
    };

    const removeRedaction = (id) => {
        saveHistory();
        setRedactions(prev => prev.filter(r => r.id !== id));
    };

    const removeText = (id) => {
        saveHistory();
        setTexts(prev => prev.filter(t => t.id !== id));
    };

    const removeImage = (id) => {
        saveHistory();
        setImages(prev => prev.filter(i => i.id !== id));
    };

    const scaleImage = (id, factor) => {
        saveHistory();
        setImages(prev => prev.map(img => img.id === id ? { ...img, width: Math.max(0.05, Math.min(1, img.width * factor)) } : img));
    };

    const scaleRedaction = (id, factor) => {
        saveHistory();
        setRedactions(prev => prev.map(r => {
            if (r.id === id) {
                if (!r.shape || r.shape === 'rect') return { ...r, w: r.w * factor, h: r.h * factor };
                if (r.shape === 'circle') return { ...r, r: r.r * factor };
                if (r.shape === 'freehand') return { ...r, strokeWidth: (r.strokeWidth || 10) * factor };
            }
            return r;
        }));
    };

    const scaleText = (id, factor) => {
        saveHistory();
        setTexts(prev => prev.map(t => t.id === id ? { ...t, size: Math.max(8, t.size * factor) } : t));
    };

    const hexToRgbPdfLib = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? rgb(
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255
        ) : rgb(1, 1, 1);
    };

    const exportPDF = async () => {
        if (!file) return;
        setIsExporting(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPages();

            // Apply Redactions
            for (const rect of redactions) {
                const pageIndex = rect.page - 1;
                if (pageIndex >= 0 && pageIndex < pages.length) {
                    const p = pages[pageIndex];
                    const { width, height } = p.getSize();
                    
                    // Convert relative coords (0-1) to pdf-lib coords
                    const color = hexToRgbPdfLib(rect.color || '#FFFFFF');
                    
                    if (!rect.shape || rect.shape === 'rect') {
                        const pdfX = rect.x * width;
                        const pdfY = height - (rect.y * height) - (rect.h * height);
                        const pdfW = rect.w * width;
                        const pdfH = rect.h * height;
                        
                        p.drawRectangle({
                            x: pdfX,
                            y: pdfY,
                            width: pdfW,
                            height: pdfH,
                            color: color,
                        });
                    } else if (rect.shape === 'circle') {
                        const pdfX = rect.x * width;
                        const pdfY = height - (rect.y * height);
                        const radiusPt = rect.r * width;
                        p.drawEllipse({
                            x: pdfX,
                            y: pdfY,
                            xScale: radiusPt,
                            yScale: radiusPt,
                            color: color,
                        });
                    } else if (rect.shape === 'freehand') {
                        if (rect.points && rect.points.length > 0) {
                            let pathStr = '';
                            rect.points.forEach((pt, i) => {
                                const px = pt.x * width;
                                const py = height - (pt.y * height);
                                if (i === 0) pathStr += `M ${px} ${py} `;
                                else pathStr += `L ${px} ${py} `;
                            });
                            // Approximation mapping for strokeWidth (pixels to points)
                            p.drawSvgPath(pathStr, {
                                borderColor: color,
                                borderWidth: (rect.strokeWidth / 1000) * Math.max(width, height),
                            });
                        }
                    }
                }
            }

            // Apply Texts
            for (const t of texts) {
                const pageIndex = t.page - 1;
                if (pageIndex >= 0 && pageIndex < pages.length) {
                    const p = pages[pageIndex];
                    const { width, height } = p.getSize();
                    
                    const pdfX = t.x * width;
                    // Text origin in pdf-lib is bottom-left of the first character
                    const pdfY = height - (t.y * height);
                    
                    p.drawText(t.text, {
                        x: pdfX,
                        y: pdfY,
                        size: t.size,
                        color: hexToRgbPdfLib(t.color),
                    });
                }
            }

            // Apply Images
            for (const img of images) {
                const pageIndex = img.page - 1;
                if (pageIndex >= 0 && pageIndex < pages.length) {
                    const p = pages[pageIndex];
                    const { width, height } = p.getSize();
                    
                    const imgBytes = await fetch(img.dataUrl).then(res => res.arrayBuffer());
                    let pdfImage;
                    if (img.type === 'image/png') {
                        pdfImage = await pdfDoc.embedPng(imgBytes);
                    } else {
                        pdfImage = await pdfDoc.embedJpg(imgBytes);
                    }
                    
                    // Convert coords (x, y is the center)
                    const imgW = img.width * width;
                    const imgH = imgW / img.aspect;
                    
                    const pdfX = (img.x * width) - (imgW / 2);
                    const pdfY = height - (img.y * height) - (imgH / 2);
                    
                    p.drawImage(pdfImage, {
                        x: pdfX,
                        y: pdfY,
                        width: imgW,
                        height: imgH,
                    });
                }
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `VecinoSmart_Edited_${file.name}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error("Error exportando PDF:", error);
            alert("Ocurrió un error al exportar el PDF.");
        }
        setIsExporting(false);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(5, 10, 25, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="glass-panel animate-slide-up" style={{ width: '100%', maxWidth: '1400px', height: '95vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
                
                {/* Header Superior */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                    <div>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: '#c084fc' }}><LayoutGrid size={28} /> Smart</span> PDF Studio
                        </h2>
                        <p style={{ color: '#94a3b8', margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>Motor de redacción y edición de documentos institucionales (100% Local)</p>
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'rgba(255,255,255,0.1)', cursor: 'pointer' }}>
                        <X size={24} color="white" />
                    </button>
                </div>

                {/* Main Workspace */}
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    
                    {/* Toolbar / Panel Izquierdo */}
                    <div style={{ width: '320px', background: 'rgba(0,0,0,0.3)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto' }}>
                        
                        <div>
                            <h3 style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Archivo Original</h3>
                            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', padding: '1rem', background: 'linear-gradient(45deg, #3b82f6, #2563eb)', color: 'white', borderRadius: '16px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 10px 20px rgba(37,99,235,0.3)', transition: 'all 0.3s' }}>
                                <Upload size={20} />
                                <span>Cargar PDF</span>
                                <input type="file" accept=".pdf" style={{ display: 'none' }} onChange={onFileChange} />
                            </label>
                            {file && <p style={{ color: '#38bdf8', fontSize: '0.85rem', marginTop: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</p>}
                        </div>

                        {file && (
                            <>
                                <div>
                                    <h3 style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Herramientas Smart</h3>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {/* Herramienta de Selección */}
                                        <button 
                                            onClick={() => setActiveTool('select')}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', padding: '0.8rem', borderRadius: '12px', border: activeTool === 'select' ? '1px solid #eab308' : '1px solid rgba(255,255,255,0.1)', background: activeTool === 'select' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(0,0,0,0.2)', color: activeTool === 'select' ? '#eab308' : '#cbd5e1', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '0.5rem', fontWeight: 'bold' }}
                                        >
                                            <MousePointer2 size={20} /> Seleccionar (Mover)
                                        </button>

                                        {/* Modos de Borrado */}
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button 
                                                onClick={() => setActiveTool('redact-rect')}
                                                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 0.5rem', borderRadius: '12px', border: activeTool === 'redact-rect' ? '1px solid #c084fc' : '1px solid rgba(255,255,255,0.1)', background: activeTool === 'redact-rect' ? 'rgba(192, 132, 252, 0.2)' : 'rgba(0,0,0,0.2)', color: activeTool === 'redact-rect' ? '#c084fc' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s' }}
                                                title="Borrador Rectangular"
                                            >
                                                <Square size={20} />
                                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Rect</span>
                                            </button>
                                            <button 
                                                onClick={() => setActiveTool('redact-circle')}
                                                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 0.5rem', borderRadius: '12px', border: activeTool === 'redact-circle' ? '1px solid #c084fc' : '1px solid rgba(255,255,255,0.1)', background: activeTool === 'redact-circle' ? 'rgba(192, 132, 252, 0.2)' : 'rgba(0,0,0,0.2)', color: activeTool === 'redact-circle' ? '#c084fc' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s' }}
                                                title="Borrador Circular"
                                            >
                                                <Circle size={20} />
                                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Círculo</span>
                                            </button>
                                            <button 
                                                onClick={() => setActiveTool('redact-freehand')}
                                                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 0.5rem', borderRadius: '12px', border: activeTool === 'redact-freehand' ? '1px solid #c084fc' : '1px solid rgba(255,255,255,0.1)', background: activeTool === 'redact-freehand' ? 'rgba(192, 132, 252, 0.2)' : 'rgba(0,0,0,0.2)', color: activeTool === 'redact-freehand' ? '#c084fc' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s' }}
                                                title="Borrador Mano Alzada"
                                            >
                                                <PenTool size={20} />
                                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Libre</span>
                                            </button>
                                        </div>

                                        {/* Selector de Color y Grosor para el Borrador */}
                                        <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 'bold' }}>Configuración de Borrado</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                                <input 
                                                    type="color" 
                                                    value={eraserColor} 
                                                    onChange={e => setEraserColor(e.target.value)}
                                                    style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
                                                    title="Elegir color de borrado"
                                                />
                                                <button 
                                                    onClick={pickColor}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '0.8rem' }}
                                                    title="Usar cuentagotas para copiar color del PDF"
                                                >
                                                    <Pipette size={16} /> Igualar Color
                                                </button>
                                            </div>
                                            
                                            {activeTool === 'redact-freehand' && (
                                                <div>
                                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Grosor (Mano alzada): {eraserWidth}</div>
                                                    <input 
                                                        type="range" 
                                                        min="2" max="50" 
                                                        value={eraserWidth} 
                                                        onChange={e => setEraserWidth(parseInt(e.target.value))}
                                                        style={{ width: '100%', accentColor: '#c084fc', cursor: 'pointer' }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Selector de Color de Texto */}
                                        <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: 'bold' }}>Configuración de Texto</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                                <input 
                                                    type="color" 
                                                    value={textColor} 
                                                    onChange={e => setTextColor(e.target.value)}
                                                    style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
                                                    title="Elegir color del texto"
                                                />
                                            </div>
                                            <button 
                                                onClick={() => setActiveTool('text')}
                                                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px', border: activeTool === 'text' ? '1px solid #2dd4bf' : '1px solid rgba(255,255,255,0.1)', background: activeTool === 'text' ? 'rgba(45, 212, 191, 0.2)' : 'rgba(0,0,0,0.2)', color: activeTool === 'text' ? '#2dd4bf' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%' }}
                                            >
                                                <Type size={24} />
                                                <div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'white' }}>Insertar Texto</div>
                                                    <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Haz clic en el PDF para escribir</div>
                                                </div>
                                            </button>
                                        </div>

                                        <button 
                                            onClick={() => setActiveTool('image')}
                                            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '16px', border: activeTool === 'image' ? '1px solid #f43f5e' : '1px solid rgba(255,255,255,0.1)', background: activeTool === 'image' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(0,0,0,0.2)', color: activeTool === 'image' ? '#f43f5e' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}
                                        >
                                            <ImageIcon size={24} />
                                            <div>
                                                <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'white' }}>Incrustar Imagen</div>
                                                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Escalar y mover logos JPG/PNG</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'white', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)' }}>
                                        <Upload size={14} /> Subir PNG/JPG
                                        <input type="file" accept="image/png, image/jpeg" style={{ display: 'none' }} onChange={onImageUpload} />
                                    </label>
                                </div>

                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Elementos (Página {pageNumber})</h3>
                                    <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1rem', flex: 1, overflowY: 'auto' }}>
                                        {redactions.filter(r => r.page === pageNumber).map(r => (
                                            <div key={r.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>Borrador {r.shape === 'circle' ? 'Circular' : r.shape === 'freehand' ? 'Libre' : 'Rect'}</span>
                                                    <button onClick={() => removeRedaction(r.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16}/></button>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                                                    <button onClick={() => scaleRedaction(r.id, 0.9)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ZoomOut size={14}/></button>
                                                    <button onClick={() => scaleRedaction(r.id, 1.1)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ZoomIn size={14}/></button>
                                                </div>
                                            </div>
                                        ))}
                                        {texts.filter(t => t.page === pageNumber).map(t => (
                                            <div key={t.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '150px' }}>T: "{t.text}"</span>
                                                    <button onClick={() => removeText(t.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16}/></button>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                                                    <button onClick={() => scaleText(t.id, 0.9)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ZoomOut size={14}/></button>
                                                    <button onClick={() => scaleText(t.id, 1.1)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ZoomIn size={14}/></button>
                                                </div>
                                            </div>
                                        ))}
                                        {images.filter(i => i.page === pageNumber).map(img => (
                                            <div key={img.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', marginBottom: '0.5rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>📷 Imagen incrustada</span>
                                                    <button onClick={() => removeImage(img.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16}/></button>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                                                    <button onClick={() => scaleImage(img.id, 0.9)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ZoomOut size={14}/></button>
                                                    <button onClick={() => scaleImage(img.id, 1.1)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ZoomIn size={14}/></button>
                                                </div>
                                            </div>
                                        ))}
                                        {redactions.filter(r => r.page === pageNumber).length === 0 && texts.filter(t => t.page === pageNumber).length === 0 && images.filter(i => i.page === pageNumber).length === 0 && (
                                            <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', margin: '1rem 0' }}>No hay modificaciones en esta hoja.</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <button 
                                        onClick={handleUndo}
                                        disabled={undoHistory.length === 0 || isExporting}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.1)', color: undoHistory.length === 0 ? '#475569' : 'white', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', cursor: undoHistory.length === 0 ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem', transition: 'all 0.2s' }}
                                    >
                                        <Undo2 size={18} /> Deshacer
                                    </button>
                                    <button 
                                        onClick={exportPDF}
                                        disabled={isExporting}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', width: '100%', padding: '1.2rem', background: 'linear-gradient(45deg, #10b981, #059669)', color: 'white', borderRadius: '16px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)', opacity: isExporting ? 0.7 : 1 }}
                                    >
                                        <Download size={20} />
                                        {isExporting ? 'Procesando...' : 'Finalizar y Exportar'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Canvas Area */}
                    <div style={{ flex: 1, background: '#020617', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto', position: 'relative' }}>
                        {!file ? (
                            <div style={{ margin: 'auto', textAlign: 'center', color: '#64748b' }}>
                                <div style={{ width: '120px', height: '120px', background: 'rgba(255,255,255,0.02)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Upload size={48} color="#475569" />
                                </div>
                                <h2 style={{ color: '#cbd5e1', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Zona de Trabajo PDF</h2>
                                <p style={{ fontSize: '0.9rem' }}>El documento nunca abandona tu computador.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '900px' }}>
                                {/* Pagination Controls */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', background: 'rgba(30, 41, 59, 0.8)', padding: '0.8rem 2rem', borderRadius: '24px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
                                    <button 
                                        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                        disabled={pageNumber <= 1}
                                        style={{ background: 'none', border: 'none', color: pageNumber <= 1 ? '#475569' : '#38bdf8', cursor: 'pointer' }}
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>
                                        Pág {pageNumber} de {numPages}
                                    </span>
                                    <button 
                                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                                        disabled={pageNumber >= numPages}
                                        style={{ background: 'none', border: 'none', color: pageNumber >= numPages ? '#475569' : '#38bdf8', cursor: 'pointer' }}
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                {/* PDF Render Area */}
                                <div style={{ position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)', cursor: activeTool === 'select' ? 'default' : (activeTool.startsWith('redact') ? 'crosshair' : 'text') }}>
                                    <Document 
                                        file={file} 
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        style={{ border: '1px solid #334155', borderRadius: '4px', overflow: 'hidden' }}
                                    >
                                        <Page 
                                            pageNumber={pageNumber} 
                                            onLoadSuccess={onPageLoadSuccess}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            width={800} // Fijo para buena visualización
                                        />
                                    </Document>
                                    
                                    {/* Overlay interactivo */}
                                    <div 
                                        ref={containerRef}
                                        style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                                        onMouseDown={handleMouseDown}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseUp}
                                    >
                                        {/* Dibujar parches */}
                                        {redactions.filter(r => r.page === pageNumber).map(r => {
                                            if (!r.shape || r.shape === 'rect') {
                                                return (
                                                    <div key={r.id} onMouseDown={(e) => handleElementMouseDown(e, r.id, 'redaction', r)} style={{ position: 'absolute', background: r.color || '#FFFFFF', border: activeTool === 'select' ? '2px dashed #eab308' : '1px solid rgba(0,0,0,0.1)', left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%`, cursor: activeTool === 'select' ? 'grab' : 'default', pointerEvents: activeTool === 'select' ? 'auto' : 'none' }}>
                                                        {activeTool === 'select' && <div onMouseDown={(e) => handleResizeMouseDown(e, r.id, 'redaction', r)} style={{ position: 'absolute', right: '-6px', bottom: '-6px', width: '12px', height: '12px', background: 'white', border: '2px solid #eab308', cursor: 'nwse-resize', pointerEvents: 'auto', zIndex: 20 }} />}
                                                    </div>
                                                );
                                            } else if (r.shape === 'circle') {
                                                return (
                                                    <div key={r.id} onMouseDown={(e) => handleElementMouseDown(e, r.id, 'redaction', r)} style={{ position: 'absolute', background: r.color || '#FFFFFF', border: activeTool === 'select' ? '2px dashed #eab308' : '1px solid rgba(0,0,0,0.1)', borderRadius: '50%', left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.r * 2 * 100}%`, aspectRatio: '1 / 1', transform: 'translate(-50%, -50%)', cursor: activeTool === 'select' ? 'grab' : 'default', pointerEvents: activeTool === 'select' ? 'auto' : 'none' }}>
                                                        {activeTool === 'select' && <div onMouseDown={(e) => handleResizeMouseDown(e, r.id, 'redaction', r)} style={{ position: 'absolute', right: '14%', bottom: '14%', transform: 'translate(50%, 50%)', width: '12px', height: '12px', background: 'white', border: '2px solid #eab308', cursor: 'nwse-resize', pointerEvents: 'auto', zIndex: 20, borderRadius: '50%' }} />}
                                                    </div>
                                                );
                                            } else if (r.shape === 'freehand') {
                                                if (!r.points || r.points.length === 0) return null;
                                                const pointsStr = r.points.map(p => `${p.x * 100},${p.y * 100}`).join(' ');
                                                return (
                                                    <svg key={r.id} viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
                                                        <polyline points={pointsStr} fill="none" stroke={r.color || '#FFFFFF'} strokeWidth={r.strokeWidth / 10} strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: activeTool === 'select' ? 'stroke' : 'none', cursor: activeTool === 'select' ? 'grab' : 'default' }} onMouseDown={(e) => handleElementMouseDown(e, r.id, 'redaction', r)} />
                                                    </svg>
                                                );
                                            }
                                            return null;
                                        })}

                                        {/* Dibujar textos */}
                                        {texts.filter(t => t.page === pageNumber).map(t => (
                                            <div 
                                                key={t.id}
                                                onMouseDown={(e) => handleElementMouseDown(e, t.id, 'text', t)}
                                                style={{
                                                    position: 'absolute',
                                                    color: t.color || 'black',
                                                    fontWeight: 'bold',
                                                    whiteSpace: 'nowrap',
                                                    pointerEvents: activeTool === 'select' ? 'auto' : 'none',
                                                    cursor: activeTool === 'select' ? 'grab' : 'default',
                                                    border: activeTool === 'select' ? '2px dashed #eab308' : 'none',
                                                    left: `${t.x * 100}%`,
                                                    top: `${t.y * 100}%`,
                                                    fontSize: `${t.size}px`,
                                                    transform: 'translateY(-100%)', // Ajuste visual
                                                    userSelect: 'none'
                                                }}
                                            >
                                                {t.text}
                                                {activeTool === 'select' && <div onMouseDown={(e) => handleResizeMouseDown(e, t.id, 'text', t)} style={{ position: 'absolute', right: '-6px', bottom: '-6px', width: '12px', height: '12px', background: 'white', border: '2px solid #eab308', cursor: 'nwse-resize', pointerEvents: 'auto', zIndex: 20 }} />}
                                            </div>
                                        ))}

                                        {/* Dibujar imágenes interactivas */}
                                        {images.filter(i => i.page === pageNumber).map(img => (
                                            <div 
                                                key={img.id}
                                                onMouseDown={(e) => handleElementMouseDown(e, img.id, 'image', img)}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${img.x * 100}%`,
                                                    top: `${img.y * 100}%`,
                                                    width: `${img.width * 100}%`,
                                                    aspectRatio: img.aspect,
                                                    transform: 'translate(-50%, -50%)',
                                                    cursor: (draggingElement && draggingElement.id === img.id && draggingElement.action === 'move') ? 'grabbing' : ((activeTool === 'select' || activeTool === 'image') ? 'grab' : 'default'),
                                                    border: (activeTool === 'select' || activeTool === 'image') ? '2px dashed #f43f5e' : 'none',
                                                    backgroundImage: `url(${img.dataUrl})`,
                                                    backgroundSize: '100% 100%',
                                                    backgroundRepeat: 'no-repeat',
                                                    pointerEvents: (activeTool === 'select' || activeTool === 'image') ? 'auto' : 'none',
                                                    boxShadow: (activeTool === 'select' || activeTool === 'image') ? '0 10px 25px rgba(0,0,0,0.5)' : 'none',
                                                }}
                                            >
                                                {(activeTool === 'select' || activeTool === 'image') && <div onMouseDown={(e) => handleResizeMouseDown(e, img.id, 'image', img)} style={{ position: 'absolute', right: '-6px', bottom: '-6px', width: '12px', height: '12px', background: 'white', border: '2px solid #f43f5e', cursor: 'nwse-resize', pointerEvents: 'auto', zIndex: 20 }} />}
                                            </div>
                                        ))}

                                        {/* Figura en dibujo (Preview) */}
                                        {isDrawing && currentShape && (
                                            <>
                                                {currentShape.type === 'rect' && (
                                                    <div style={{ position: 'absolute', background: `${eraserColor}80`, border: '2px dashed #c084fc', left: `${currentShape.x * 100}%`, top: `${currentShape.y * 100}%`, width: `${currentShape.w * 100}%`, height: `${currentShape.h * 100}%` }} />
                                                )}
                                                {currentShape.type === 'circle' && (
                                                    <div style={{ position: 'absolute', background: `${eraserColor}80`, border: '2px dashed #c084fc', borderRadius: '50%', left: `${currentShape.x * 100}%`, top: `${currentShape.y * 100}%`, width: `${currentShape.r * 2 * 100}%`, aspectRatio: '1 / 1', transform: 'translate(-50%, -50%)' }} />
                                                )}
                                                {currentShape.type === 'freehand' && currentShape.points && (
                                                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
                                                        <polyline points={currentShape.points.map(p => `${p.x * 100},${p.y * 100}`).join(' ')} fill="none" stroke={`${eraserColor}80`} strokeWidth={eraserWidth / 10} strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartPDFStudio;
