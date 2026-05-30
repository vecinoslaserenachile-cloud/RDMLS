import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldCheck, X, ArrowRight, Lock, UserPlus, LogIn } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = "283725387947-llfri9dtib13d5ln16e72gp94p0anhvt.apps.googleusercontent.com";

const LoginModal = ({ isOpen, onClose, onForceGuest }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: credentialResponse.credential
      });
      if (error) throw error;
      setSuccessMsg("¡Identidad confirmada! Accediendo...");
      setTimeout(() => { setLoading(false); onClose(); }, 1000);
    } catch (error) {
      const msg = error?.message || "";
      if (msg.includes("not enabled")) {
        console.error(error);
        setErrorMsg("Google Auth no está habilitado en tu panel de Supabase (Authentication > Providers).");
        setTimeout(() => { 
          setLoading(false); 
          if (onForceGuest) onForceGuest(); 
        }, 3000);
      } else {
        console.error("Error Real de Google:", error);
        setErrorMsg("Fallo al autenticar con Google. " + msg);
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Debes ingresar tu correo y contraseña.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      // Timeout protector de 15 segundos
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout: La base de datos Supabase no responde.")), 15000));
      
      let result;
      if (isRegistering) {
        result = await Promise.race([
          supabase.auth.signUp({ email: email.trim(), password: password }),
          timeoutPromise
        ]);
      } else {
        result = await Promise.race([
          supabase.auth.signInWithPassword({ email: email.trim(), password: password }),
          timeoutPromise
        ]);
      }

      const { data, error } = result;

      if (error) throw error;
      
      if (isRegistering) {
        if (data && data.user && data.user.identities && data.user.identities.length === 0) {
           setErrorMsg("Este correo ya está registrado. Haz clic en 'Tengo Cuenta'.");
           setIsRegistering(false);
           setLoading(false);
        } else {
           setSuccessMsg("¡Cuenta creada exitosamente! Accediendo...");
           setTimeout(() => { setLoading(false); onClose(); }, 2000);
        }
      } else {
        setSuccessMsg("¡Identidad confirmada! Accediendo...");
        setTimeout(() => { setLoading(false); onClose(); }, 1000);
      }
    } catch (error) {
      console.error("Sovereign Auth Error:", error);
      const msg = error?.message || "Error desconocido";
      if (msg.includes("Invalid login credentials")) {
        setErrorMsg("Credenciales incorrectas. Si es tu primera vez, haz clic en 'Nuevo Vecino' para registrarte.");
      } else if (msg.includes("Timeout")) {
        setErrorMsg("Demasiado tiempo de espera. Supabase podría estar pausado.");
      } else {
        setErrorMsg("Error: " + msg);
      }
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AnimatePresence>
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(10px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.05)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              width: '100%', maxWidth: '420px',
              overflow: 'hidden', position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '2rem 2rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <button 
                onClick={onClose}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}
              >
                <X size={20} />
              </button>
              <div style={{ width: '64px', height: '64px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <ShieldCheck size={32} color="#38bdf8" />
              </div>
              <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                Identidad Soberana
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
                Plataforma de acceso a la Red Vecinal.
              </p>
            </div>

            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              
              {/* Social Logins */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', width: '100%', minHeight: '40px' }}>
                <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => setErrorMsg('Error al conectar con Google.')}
                      useOneTap={false}
                      shape="pill"
                      size="large"
                      width="400"
                      theme="filled_black"
                      text="continue_with"
                    />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                <span style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>O CON CORREO E INSTITUCIONAL</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)' }} />
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%', padding: '0.9rem 1rem 0.9rem 3rem',
                      background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px', color: 'white', fontSize: '0.95rem',
                      outline: 'none', transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#38bdf8'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="#94a3b8" style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)' }} />
                  <input 
                    type="password" 
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%', padding: '0.9rem 1rem 0.9rem 3rem',
                      background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px', color: 'white', fontSize: '0.95rem',
                      outline: 'none', transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#38bdf8'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                {errorMsg && (
                  <div style={{ color: '#fca5a5', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', marginTop: '0.5rem' }}>
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div style={{ color: '#86efac', fontSize: '0.85rem', background: 'rgba(34, 197, 94, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.2)', marginTop: '0.5rem' }}>
                    {successMsg}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '0.9rem', marginTop: '1rem',
                    background: isRegistering ? '#38bdf8' : 'linear-gradient(135deg, #0ea5e9, #2563eb)',
                    color: isRegistering ? '#020617' : 'white',
                    border: 'none', borderRadius: '12px',
                    fontWeight: 800, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    boxShadow: isRegistering ? '0 0 20px rgba(56, 189, 248, 0.4)' : '0 4px 15px rgba(14, 165, 233, 0.3)',
                    transition: 'transform 0.1s'
                  }}
                  onMouseDown={(e) => { if(!loading) e.currentTarget.style.transform = 'scale(0.98)' }}
                  onMouseUp={(e) => { if(!loading) e.currentTarget.style.transform = 'scale(1)' }}
                  onMouseLeave={(e) => { if(!loading) e.currentTarget.style.transform = 'scale(1)' }}
                >
                  {loading ? 'Sincronizando Identidad...' : (
                    <>
                      {isRegistering ? <UserPlus size={18} /> : <LogIn size={18} />}
                      {isRegistering ? 'Crear Cuenta Libre' : 'Acceder'}
                    </>
                  )}
                </button>

                {/* Sub-Switch Mode */}
                <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '0.25rem', marginTop: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <button
                    type="button"
                    onClick={() => { setIsRegistering(false); setErrorMsg(''); setSuccessMsg(''); }}
                    style={{
                      flex: 1, padding: '0.6rem', border: 'none', borderRadius: '8px',
                      background: !isRegistering ? 'rgba(255,255,255,0.05)' : 'transparent',
                      color: !isRegistering ? 'white' : '#64748b',
                      fontSize: '0.85rem', fontWeight: !isRegistering ? 700 : 500, cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Tengo Cuenta
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsRegistering(true); setErrorMsg(''); setSuccessMsg(''); }}
                    style={{
                      flex: 1, padding: '0.6rem', borderRadius: '8px',
                      background: isRegistering ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                      color: isRegistering ? '#38bdf8' : '#64748b',
                      fontSize: '0.85rem', fontWeight: isRegistering ? 700 : 500, cursor: 'pointer',
                      transition: 'all 0.2s', border: isRegistering ? '1px solid rgba(56, 189, 248, 0.2)' : '1px solid transparent'
                    }}
                  >
                    Nuevo Vecino
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    if (onForceGuest) onForceGuest();
                  }}
                  style={{
                    width: '100%', padding: '0.6rem', marginTop: '1rem',
                    background: 'transparent', color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px',
                    fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="hover:bg-sky-500/10"
                >
                  Continuar de Invitado (60 min)
                </button>

              </form>

              <div style={{ marginTop: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <p style={{ color: '#475569', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', margin: 0 }}>
                  <Lock size={12} /> Conexión asegurada mediante protocolo de bóveda Supabase.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <a href="/privacidad" style={{ color: '#64748b', fontSize: '0.7rem', textDecoration: 'none' }} className="hover:text-sky-400">Política de Privacidad</a>
                  <a href="/terminos" style={{ color: '#64748b', fontSize: '0.7rem', textDecoration: 'none' }} className="hover:text-sky-400">Condiciones de Servicio</a>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </GoogleOAuthProvider>
  );
};

export default LoginModal;
