import React from 'react';

export const onRenderBody = ({setHeadComponents}) => {
  setHeadComponents([
    <script
      key="feedback"
      dangerouslySetInnerHTML={{
        __html: `
          var ffWidgetId = '4220d7fc-6634-43f6-8261-fe5d270ede6a';
          var ffWidgetScript = document.createElement("script");
          ffWidgetScript.type = "text/javascript";
          ffWidgetScript.src = 'https://freddyfeedback.com/widget/freddyfeedback.js';
          document.head.appendChild(ffWidgetScript);
        `
      }}
    />,
  ]);
};
