import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Video, X, CheckCircle } from 'lucide-react';

export default function MediaUploader({ onMediaUpload }) {
    const [dragging, setDragging] = useState(false);
    const [previewNodes, setPreviewNodes] = useState([]);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const newPreviews = files.map(file => ({
            name: file.name,
            type: file.type,
            size: (file.size / 1024 / 1024).toFixed(2), // MB
            url: URL.createObjectURL(file), // Mocking upload preview
            file
        }));

        setPreviewNodes(prev => [...prev, ...newPreviews]);

        if (onMediaUpload) {
            onMediaUpload(files); // Pass to parent component
        }
    };

    const removeFile = (index) => {
        setPreviewNodes((prev) => {
            const filtered = [...prev];
            URL.revokeObjectURL(filtered[index].url);
            filtered.splice(index, 1);
            return filtered;
        });
    };

    return (
        <div style={{ width: '100%', marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#00e5ff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ImageIcon size={20} /> Media Center Uploader
            </h4>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    border: dragging ? '2px dashed #00e5ff' : '2px dashed rgba(255,255,255,0.2)',
                    background: dragging ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                    borderRadius: '16px',
                    padding: '3rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
                    <div onClick={() => fileInputRef.current?.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '50%', border: '1px solid #38bdf8' }}>
                            <UploadCloud size={32} color="#38bdf8" />
                        </div>
                        <span style={{ color: 'white', fontSize: '0.9rem' }}>Subir Archivos</span>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>Arrastra o haz clic</span>
                    </div>

                    <div onClick={() => cameraInputRef.current?.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <div style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.2)', borderRadius: '50%', border: '1px solid #ec4899' }}>
                            <Camera size={32} color="#ec4899" />
                        </div>
                        <span style={{ color: 'white', fontSize: '0.9rem' }}>Cámara Nativa</span>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>Tomar foto in-situ</span>
                    </div>
                </div>

                <input type="file" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInput} accept="image/*,video/*,audio/*" />
                <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} style={{ display: 'none' }} onChange={handleFileInput} />
            </div>

            {/* Preview Section */}
            {previewNodes.length > 0 && (
                <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {previewNodes.map((file, i) => (
                        <div key={i} className="glass-panel" style={{ width: '120px', position: 'relative', padding: '0.5rem', borderRadius: '12px' }}>
                            <button onClick={() => removeFile(i)} className="btn-glass" style={{ position: 'absolute', top: '-10px', right: '-10px', padding: '0.2rem', borderRadius: '50%', background: '#ef4444', color: 'white', zIndex: 10 }}>
                                <X size={14} />
                            </button>
                            {file.type.startsWith('image/') ? (
                                <img src={file.url} alt="preview" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }} />
                            ) : file.type.startsWith('video/') ? (
                                <div style={{ width: '100%', height: '80px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                                    <Video size={32} color="white" />
                                </div>
                            ) : (
                                <div style={{ width: '100%', height: '80px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                                    <ImageIcon size={32} color="white" />
                                </div>
                            )}
                            <p style={{ margin: 0, fontSize: '0.7rem', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</p>
                            <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--text-muted)' }}>{file.size} MB</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
