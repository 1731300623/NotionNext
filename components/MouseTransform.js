import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

/**
 * 鼠标变换效果组件
 * 提供多种鼠标样式和动画效果
 */
const MouseTransform = () => {
  const router = useRouter()
  const [cursorType, setCursorType] = useState('default')
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    // 创建主光标元素
    const cursor = document.createElement('div')
    cursor.className = 'mouse-transform-cursor'
    document.body.appendChild(cursor)

    // 创建光标轨迹元素
    const trail = document.createElement('div')
    trail.className = 'mouse-transform-trail'
    document.body.appendChild(trail)

    // 创建点击效果容器
    const clickEffectContainer = document.createElement('div')
    clickEffectContainer.className = 'click-effect-container'
    document.body.appendChild(clickEffectContainer)

    // 鼠标位置
    let mouse = { x: -100, y: -100 }
    let cursorPos = { x: -100, y: -100 }
    let trailPos = { x: -100, y: -100 }

    // 监听鼠标移动
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // 监听鼠标按下和释放
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // 监听鼠标进入不同元素
    const handleMouseEnter = (e) => {
      const target = e.target
      
      // 链接和按钮
      if (target.matches('a, button, [role="button"], [onclick]')) {
        setCursorType('pointer')
        cursor.classList.add('cursor-pointer')
        trail.classList.add('trail-pointer')
      }
      // 文本输入框
      else if (target.matches('input[type="text"], textarea, [contenteditable="true"]')) {
        setCursorType('text')
        cursor.classList.add('cursor-text')
        trail.classList.add('trail-text')
      }
      // 图片
      else if (target.matches('img, video')) {
        setCursorType('zoom')
        cursor.classList.add('cursor-zoom')
        trail.classList.add('trail-zoom')
      }
      // 可拖拽元素
      else if (target.matches('[draggable="true"]')) {
        setCursorType('grab')
        cursor.classList.add('cursor-grab')
        trail.classList.add('trail-grab')
      }
    }

    const handleMouseLeave = () => {
      setCursorType('default')
      cursor.className = 'mouse-transform-cursor'
      trail.className = 'mouse-transform-trail'
    }

    // 点击效果
    const createClickEffect = (x, y) => {
      const effect = document.createElement('div')
      effect.className = 'click-effect'
      effect.style.left = x + 'px'
      effect.style.top = y + 'px'
      clickEffectContainer.appendChild(effect)

      // 动画结束后移除元素
      setTimeout(() => {
        effect.remove()
      }, 600)
    }

    const handleClick = (e) => {
      createClickEffect(e.clientX, e.clientY)
    }

    // 添加事件监听
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('click', handleClick)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    // 动画循环
    const animate = () => {
      // 主光标缓动
      const cursorDamping = 0.15
      cursorPos.x += (mouse.x - cursorPos.x) * cursorDamping
      cursorPos.y += (mouse.y - cursorPos.y) * cursorDamping
      cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`

      // 轨迹缓动（更慢）
      const trailDamping = 0.08
      trailPos.x += (mouse.x - trailPos.x) * trailDamping
      trailPos.y += (mouse.y - trailPos.y) * trailDamping
      trail.style.transform = `translate(${trailPos.x}px, ${trailPos.y}px)`

      // 点击时的缩放效果
      if (isClicking) {
        cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px) scale(0.8)`
        trail.style.transform = `translate(${trailPos.x}px, ${trailPos.y}px) scale(1.2)`
      }

      requestAnimationFrame(animate)
    }

    animate()

    // 隐藏默认光标
    document.body.style.cursor = 'none'

    // 清理函数
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      document.body.removeChild(cursor)
      document.body.removeChild(trail)
      document.body.removeChild(clickEffectContainer)
      document.body.style.cursor = 'auto'
    }
  }, [router])

  return (
    <style jsx global>{`
      /* 隐藏默认光标 */
      * {
        cursor: none !important;
      }

      /* 主光标样式 */
      .mouse-transform-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid rgba(0, 0, 0, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: difference;
        transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease;
        transform-origin: center;
        margin-left: -10px;
        margin-top: -10px;
      }

      /* 光标轨迹 */
      .mouse-transform-trail {
        position: fixed;
        width: 40px;
        height: 40px;
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
        margin-left: -20px;
        margin-top: -20px;
      }

      /* 指针状态 */
      .cursor-pointer {
        width: 30px;
        height: 30px;
        margin-left: -15px;
        margin-top: -15px;
        background: rgba(59, 130, 246, 0.8);
        border-color: rgba(255, 255, 255, 0.9);
      }

      .trail-pointer {
        width: 50px;
        height: 50px;
        margin-left: -25px;
        margin-top: -25px;
        background: rgba(59, 130, 246, 0.15);
        border-color: rgba(59, 130, 246, 0.5);
      }

      /* 文本输入状态 */
      .cursor-text {
        width: 2px;
        height: 24px;
        margin-left: -1px;
        margin-top: -12px;
        border-radius: 0;
        background: rgba(0, 0, 0, 0.8);
        border: none;
      }

      .trail-text {
        opacity: 0;
      }

      /* 缩放状态 */
      .cursor-zoom {
        width: 35px;
        height: 35px;
        margin-left: -17.5px;
        margin-top: -17.5px;
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.8);
      }

      .trail-zoom {
        width: 60px;
        height: 60px;
        margin-left: -30px;
        margin-top: -30px;
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.3);
      }

      /* 抓取状态 */
      .cursor-grab {
        width: 25px;
        height: 25px;
        margin-left: -12.5px;
        margin-top: -12.5px;
        background: rgba(34, 197, 94, 0.8);
        border-color: rgba(255, 255, 255, 0.9);
      }

      .trail-grab {
        background: rgba(34, 197, 94, 0.1);
        border-color: rgba(34, 197, 94, 0.4);
      }

      /* 点击效果 */
      .click-effect {
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid rgba(59, 130, 246, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        animation: clickRipple 0.6s ease-out;
      }

      @keyframes clickRipple {
        0% {
          width: 30px;
          height: 30px;
          opacity: 1;
        }
        100% {
          width: 80px;
          height: 80px;
          opacity: 0;
        }
      }

      /* 暗色模式适配 */
      .dark .mouse-transform-cursor {
        background: rgba(0, 0, 0, 0.9);
        border-color: rgba(255, 255, 255, 0.8);
      }

      .dark .cursor-text {
        background: rgba(255, 255, 255, 0.8);
      }

      /* 移动设备隐藏 */
      @media (max-width: 768px) {
        .mouse-transform-cursor,
        .mouse-transform-trail,
        .click-effect-container {
          display: none;
        }
        
        * {
          cursor: auto !important;
        }
      }

      /* 触摸设备检测 */
      @media (hover: none) and (pointer: coarse) {
        .mouse-transform-cursor,
        .mouse-transform-trail,
        .click-effect-container {
          display: none;
        }
        
        * {
          cursor: auto !important;
        }
      }
    `}</style>
  )
}

export default MouseTransform