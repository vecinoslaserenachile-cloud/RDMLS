import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MemorialHijosRegion from '../components/MemorialHijosRegion';

export default function TributePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ background: '#020617', minHeight: '100vh' }}>
            <MemorialHijosRegion 
                onClose={() => navigate('/')} 
                tributeId={id} 
            />
        </div>
    );
}
