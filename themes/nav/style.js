/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    body {
        background-color: #f8f9fa;
        background-image:
            radial-gradient(circle, #d1d5db 1px, transparent 1px);
        background-size: 20px 20px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        -webkit-font-smoothing: antialiased;
    }
    #theme-onenav {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 13px;
    }
    #top-wrapper img {
        height: 100px; /* 桌面端大尺寸 */
    }

    /* 平板端适中尺寸 */
    @media (max-width: 1024px) {
        #top-wrapper img {
            height: 80px;
        }
    }

    /* 手机端小尺寸 */
    @media (max-width: 768px) {
        #top-wrapper img {
            height: 50px;
        }
    }

    /* 小屏手机更小尺寸 */
    @media (max-width: 480px) {
        #top-wrapper img {
            height: 40px;
        }
    }
    /*#top-nav {
        background-color: rgb(251 251 251 / 70%);
    }*/
    .main-menu {
        box-shadow: 0 1px 4px rgb(0 0 0/8%);
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }

    .dark .main-menu {
        background-color: rgba(31, 41, 55, 0.95);
        backdrop-filter: blur(10px);
    }
    .nav-menu {
        padding: 8px 0px 4px 0px;
    }
    .nav-menu span{
        font-size: 15px;
        font-weight: 600;
        line-height: 2;
        color: #8c8c8c;
    }
    .nav-menu span:hover{
        color: #000000;
    }
    .nav-menu span>i{
        width: 18px;
        margin-right: 4px;
    }
    .nav-submenu {
        padding: 4px 0px 4px 2px;
    }
    .nav-submenu a>span{
        font-size: 13px;
        font-weight: 600;
        line-height: 1.3;
        color: rgb(153, 153, 153);
        text-align: left;
    }
    .nav-submenu a>span>i{
        margin-right: 10px;
    }
    .card-list {
        /*display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        list-style: none;*/
    }
    .stack-list > .category:first-child {
        /*padding-top: 16px !important;*/
    }
    .card {
        cursor: pointer;
        transition: box-shadow 0.1s ease-in-out;
        box-shadow: 0 1px 4px rgb(0 0 0 / 8%);
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 16px !important;
        display: flow-root;
        position: relative;
        box-sizing: border-box;
    }

    .dark .card {
        background-color: rgba(31, 41, 55, 0.9);
        border: 1px solid rgba(75, 85, 99, 0.3);
    }
    .card:hover {
        box-shadow: 0 14px 25px rgba(0, 0, 0, 0.16);
    }
    .notion-gallery-grid {
        padding-left: 4px;
        padding-right: 4px;
    }
    
    .notion-collection-card-cover {
        display: none;
    }
    
    // 深色模式的点阵网格背景
    .dark body{
        background-color: #111827;
        background-image:
            radial-gradient(circle, #374151 1px, transparent 1px);
        background-size: 20px 20px;
    }

  `}</style>
}

export { Style }
