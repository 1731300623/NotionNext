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
    #top-wrapper {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中（如果需要）*/
    padding-top: 2rem;
    padding-bottom: 1rem;
}
    #top-wrapper img {
        height: 42px; // 小屏幕上的默认高度
    }
    @media (min-width: 768px) { // md 及以上尺寸
        #top-wrapper img {
            height: 120px;
        }
    }
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
