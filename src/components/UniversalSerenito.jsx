import React, { useRef, useEffect, Suspense } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

/**
 * 🌟 SERENITO PROTAGONISTA - 38 MOVIMIENTOS
 * El nuevo estándar 3D para la plataforma VLS.
 */
export default function UniversalSerenito({ 
    animation = 'Idle', 
    scale = 1, 
    position = [0, 0, 0], 
    rotation = [0, 0, 0],
    onLoadAnimations 
}) {
    const group = useRef();
    const { scene, animations } = useGLTF('/vls-assets/serenito_3d_animado.glb');
    const { actions, names } = useAnimations(animations, group);

    useEffect(() => {
        if (onLoadAnimations && names.length > 0) {
            onLoadAnimations(names);
        }
    }, [names, onLoadAnimations]);

    useEffect(() => {
        if (!actions) return;

        // Intentamos encontrar la animación solicitada (case-insensitive)
        const targetName = names.find(n => n.toLowerCase().includes(animation.toLowerCase())) || names[0];
        const action = actions[targetName];

        if (action) {
            action.reset().fadeIn(0.5).play();
            return () => action.fadeOut(0.5);
        }
    }, [actions, animation, names]);

    return (
        <group ref={group} dispose={null} scale={scale} position={position} rotation={rotation}>
            <primitive object={scene} castShadow receiveShadow />
        </group>
    );
}

// Pre-cargar el modelo para evitar tirones
useGLTF.preload('/vls-assets/serenito_3d_animado.glb');
