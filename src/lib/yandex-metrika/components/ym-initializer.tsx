import { ymInitParams } from "../constants/ym-init-params";
import { useYMInitializer } from "../hooks/use-ym-initializer";

export function YMInitializer() {
  const { ymConfig } = useYMInitializer();

  if (!ymConfig.enabled) {
    return null;
  }

  return (
    <>
      <script type="text/javascript">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${ymConfig.id}', 'ym');

          ym(${ymConfig.id}, "init", ${JSON.stringify(ymInitParams)});
        `}
      </script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${ymConfig.id}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
