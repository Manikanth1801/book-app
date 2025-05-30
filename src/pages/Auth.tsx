import React, { useState } from 'react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button 
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        
        {isLogin ? (
          <div className="login-form">
            <h2>Login to Your Account</h2>
            {/* Login form will be added here */}
          </div>
        ) : (
          <div className="signup-form">
            <h2>Create New Account</h2>
            {/* Signup form will be added here */}
          </div>
        )}

        <div className="social-auth">
          <h3>Or continue with</h3>
          <div className="social-buttons">
            <button className="google-btn">Google</button>
            <button className="facebook-btn">Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 