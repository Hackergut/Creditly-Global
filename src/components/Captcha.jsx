import React, { useEffect, useRef } from 'react'

export default function Captcha({ onVerify }) {
  const captchaRef = useRef(null)

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.render(captchaRef.current, {
            sitekey: '6LdMC5ArAAAAALf6vAbpN8jacxsLnJG_OgZluIOl',
            callback: (token) => {
              onVerify(token)
            }
          })
        })
      }
    }

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [onVerify])

  return (
    <div className="flex justify-center my-4">
      <div ref={captchaRef}></div>
    </div>
  )
} 