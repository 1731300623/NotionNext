import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * 高级鼠标效果组件
 * 提供多种预设效果供选择
 */
const CursorEffects = () => {
  const effectType = siteConfig('CURSOR_EFFECT_TYPE', 'default')
  const primaryColor = siteConfig('CURSOR_EFFECT_COLOR', '#3b82f6')
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (effectType === 'none') return

    // 创建光标元素
    const cursor = document.createElement('div')
    cursor.className = `cursor-effect cursor-${effectType}`
    document.body.appendChild(cursor)

    // 创建粒子容器（用于某些效果）
    const particleContainer = document.createElement('div')
    particleContainer.className = 'cursor-particles'
    document.body.appendChild(particleContainer)

    let mouse = { x: -100, y: -100 }
    let cursorPos = { x: -100, y: -100 }
    let lastMouse = { x: -100, y: -100 }
    let velocity = { x: 0, y: 0 }

    // 设置CSS变量
    document.documentElement.style.setProperty('--cursor-color', primaryColor)

    // 鼠标移动处理
    const handleMouseMove = (e) => {
      velocity.x = e.clientX - mouse.x
      velocity.y = e.clientY - mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY

      // 生成粒子效果
      if (effectType === 'particles' || effectType === 'galaxy') {
        const distance = Math.sqrt(
          Math.pow(e.clientX - lastMouse.x, 2) + 
          Math.pow(e.clientY - lastMouse.y, 2)
        )
        
        if (distance > 5) {
          createParticle(e.clientX, e.clientY)
          lastMouse.x = e.clientX
          lastMouse.y = e.clientY
        }
      }
    }

    // 创建粒子
    const createParticle = (x, y) => {
      const particle = document.createElement('div')
      particle.className = `particle particle-${effectType}`
      particle.style.left = x + 'px'
      particle.style.top = y + 'px'
      
      if (effectType === 'galaxy') {
        const hue = Math.random() * 360
        particle.style.background = `hsl(${hue}, 70%, 50%)`
      }
      
      particleContainer.appendChild(particle)
      
      setTimeout(() => {
        particle.remove()
      }, 1000)
    }

    // 动画循环
    const animate = () => {
      // 根据效果类型应用不同的动画
      switch (effectType) {
        case 'default':
        case 'glow':
          // 平滑跟随
          const damping = 0.1
          cursorPos.x += (mouse.x - cursorPos.x) * damping
          cursorPos.y += (mouse.y - cursorPos.y) * damping
          cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`
          break
          
        case 'elastic':
          // 弹性效果
          const elasticDamping = 0.15
          const elasticForce = 0.3
          cursorPos.x += (mouse.x - cursorPos.x) * elasticDamping + velocity.x * elasticForce
          cursorPos.y += (mouse.y - cursorPos.y) * elasticDamping + velocity.y * elasticForce
          cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px) scale(${1 + Math.min(Math.abs(velocity.x + velocity.y) * 0.01, 0.5)})`
          break
          
        case 'magnetic':
          // 磁性吸附效果
          const magneticDamping = 0.05
          cursorPos.x += (mouse.x - cursorPos.x) * magneticDamping
          cursorPos.y += (mouse.y - cursorPos.y) * magneticDamping
          const rotation = Math.atan2(velocity.y, velocity.x) * 180 / Math.PI
          cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px) rotate(${rotation}deg)`
          break
          
        case 'morphing':
          // 变形效果
          cursorPos.x = mouse.x
          cursorPos.y = mouse.y
          const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)
          const scaleX = 1 + Math.min(Math.abs(velocity.x) * 0.05, 1)
          const scaleY = 1 + Math.min(Math.abs(velocity.y) * 0.05, 1)
          cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px) scale(${scaleX}, ${scaleY})`
          break
          
        case 'particles':
        case 'galaxy':
          // 粒子效果，光标隐藏
          cursor.style.display = 'none'
          break
      }

      requestAnimationFrame(animate)
    }

    // 监听事件
    document.addEventListener('mousemove', handleMouseMove)
    
    // 隐藏默认光标
    if (effectType !== 'none') {
      document.body.style.cursor = 'none'
      document.body.classList.add('cursor-effect-active')
    }

    animate()

    // 清理
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.body.removeChild(cursor)
      document.body.removeChild(particleContainer)
      document.body.style.cursor = 'auto'
      document.body.classList.remove('cursor-effect-active')
    }
  }, [effectType, primaryColor])

  return (
    <style jsx global>{`
      /* 隐藏默认光标 */
      body.cursor-effect-active * {
        cursor: none !important;
      }

      /* 基础光标样式 */
      .cursor-effect {
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: difference;
      }

      /* 默认效果 */
      .cursor-default {
        width: 20px;
        height: 20px;
        background: white;
        border: 2px solid var(--cursor-color, #3b82f6);
        border-radius: 50%;
        margin-left: -10px;
        margin-top: -10px;
      }

      /* 发光效果 */
      .cursor-glow {
        width: 30px;
        height: 30px;
        background: radial-gradient(circle, var(--cursor-color, #3b82f6) 0%, transparent 70%);
        border-radius: 50%;
        margin-left: -15px;
        margin-top: -15px;
        filter: blur(2px);
        opacity: 0.8;
      }

      /* 弹性效果 */
      .cursor-elastic {
        width: 40px;
        height: 40px;
        background: transparent;
        border: 3px solid var(--cursor-color, #3b82f6);
        border-radius: 50%;
        margin-left: -20px;
        margin-top: -20px;
        transition: transform 0.1s ease-out;
      }

      /* 磁性效果 */
      .cursor-magnetic {
        width: 30px;
        height: 6px;
        background: var(--cursor-color, #3b82f6);
        border-radius: 3px;
        margin-left: -15px;
        margin-top: -3px;
      }

      /* 变形效果 */
      .cursor-morphing {
        width: 25px;
        height: 25px;
        background: var(--cursor-color, #3b82f6);
        border-radius: 50%;
        margin-left: -12.5px;
        margin-top: -12.5px;
        opacity: 0.6;
      }

      /* 粒子容器 */
      .cursor-particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
      }

      /* 粒子样式 */
      .particle {
        position: fixed;
        pointer-events: none;
        opacity: 1;
        animation: particleFade 1s ease-out forwards;
      }

      .particle-particles {
        width: 5px;
        height: 5px;
        background: var(--cursor-color, #3b82f6);
        border-radius: 50%;
      }

      .particle-galaxy {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        box-shadow: 0 0 6px currentColor;
        animation: particleGalaxy 1s ease-out forwards;
      }

      @keyframes particleFade {
        0% {
          opacity: 1;
          transform: scale(1) translate(0, 0);
        }
        100% {
          opacity: 0;
          transform: scale(0.5) translate(0, -20px);
        }
      }

      @keyframes particleGalaxy {
        0% {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        100% {
          opacity: 0;
          transform: scale(2) rotate(180deg);
        }
      }

      /* 暗色模式适配 */
      .dark .cursor-default {
        background: black;
        border-color: white;
      }

      /* 移动设备禁用 */
      @media (max-width: 768px), (hover: none) and (pointer: coarse) {
        .cursor-effect,
        .cursor-particles {
          display: none !important;
        }
        
        body.cursor-effect-active * {
          cursor: auto !important;
        }
      }
    `}</style>
  )
}

export default CursorEffects