import { envs } from "@/shared/constants/envs";

import { ymInitParams } from "../constants/ym-init-params";

export function getYMLoaderScript() {
  const id = envs.VITE_YANDEX_METRIKA_ID;
  const isProduction = envs.MODE === "production";

  if (id && isProduction) {
    return `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}', 'ym');

      ym(${id}, "init", ${JSON.stringify(ymInitParams)});
    `;
  }
}
