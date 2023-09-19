import React from 'react';

const headComponents = [
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
  />
];

if (process.env.CONTEXT === 'production') {
  headComponents.push(
    <script
      key="qualified-script"
      dangerouslySetInnerHTML={{
        __html: `
      (function(w,q){w['QualifiedObject']=q;w[q]=w[q]||function(){
      (w[q].q=w[q].q||[]).push(arguments)};})(window,'qualified');
      window.qualified('page');
    `
      }}
    />,
    <script
      key="qualified-js"
      id="qualified-js"
      async
      src="https://js.qualified.com/qualified.js?token=mdpGqx2V2oJXA51Q"
    />
  );
}

export const onRenderBody = ({setHeadComponents}) => {
  setHeadComponents(headComponents);
};
