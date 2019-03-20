import React from "react";

export default ({ location }) => {
    console.log(location)
    return (
        <div>
            error页，找不到{location.pathname}
            <pre>
                {`
1、一个没有path属性的Route可以被任何的路径匹配，或 path 内容写为 *
2、Switch返回的是第一个成功匹配到的Route。
                `}
            </pre>
        </div>
  
    )
}