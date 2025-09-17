/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    body {
        background-color: #fbfbfb;
        background-image: radial-gradient(circle, #e0e0e0 1px, rgba(0, 0, 0, 0) 1px);
        background-size: 20px 20px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        -webkit-font-smoothing: antialiased;
    }
    #theme-onenav {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 13px;
    }

    /* --- 修改开始 --- */

    /* 默认样式 (小屏幕) */
    #top-wrapper {
        display: flex;
        flex-direction: row;      /* 改为行方向，让logo和文字横向排列 */
        align-items: center;      /* 垂直居中对齐 logo 和文字 */
        gap: 0.75rem;             /* 在 logo 和文字之间添加一些间距 (12px) */
    }

    #top-wrapper img {
        height: 38px; /* 稍微调小一点logo，给文字留出空间 */
        flex-shrink: 0; /* 防止logo图像被压缩 */
    }

    /* 使用伪元素在小屏幕上添加文字 */
    #top-wrapper::after {
        content: '滕甲彬的博客';
        font-size: 16px;      /* 调大字号，使其更清晰 */
        font-weight: bold;
        color: #333;
        white-space: nowrap;  /* 防止文字换行 */
    }
    
    .dark #top-wrapper::after {
        color: #f1f1f1; /* 深色模式下的文字颜色 */
    }

    /* 媒体查询 (md 及以上大屏幕尺寸) */
    @media (min-width: 768px) {
        #top-wrapper {
            display: flex;
            flex-direction: column;  /* 在大屏幕上恢复为列方向 */
            justify-content: center; /* 水平居中 */
            align-items: center;     /* 垂直居中 */
            padding-top: 2rem;
            padding-bottom: 1rem;
            gap: 0; /* 在大屏幕上不需要间距 */
        }

        #top-wrapper img {
            height: 120px; /* 恢复大屏幕上的logo高度 */
        }

        /* 在大屏幕上隐藏伪元素文字 */
        #top-wrapper::after {
            display: none;
        }
    }

    /* --- 修改结束 --- */

    /*#top-nav {
        background-color: rgb(251 251 251 / 70%);
    }*/
    .main-menu {
        box-shadow: 0 1px 4px rgb(0 0 0/8%);
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
        /*background-color: #fff;
        height: calc(100% - 16px);
        overflow: visible;
        padding: 15px;
        border-radius: 0.75rem;
        /*border-radius: 8px;*/
        margin-bottom: 16px !important;
        box-shadow: 0 1px 4px rgb(0 0 0 / 8%);
        cursor: pointer;
        display: flow-root;
        position: relative;
        box-sizing: border-box;
        transition: box-shadow 0.1s ease-in-out;*/
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
    
    // 底色
    .dark body{
        background-color: black;
        background-image: radial-gradient(circle, #333 1px, rgba(0, 0, 0, 0) 1px);
        background-size: 20px 20px;
    }
    .dark #top-wrapper img {
        filter: invert(1);
    }

  `}</style>
}

export { Style }

