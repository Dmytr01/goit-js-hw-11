import{S as m,i as l}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const f="https://pixabay.com/api/",h="42443321-a6618d4e2f1d36fd52b1b59e6",p=document.querySelector(".search-form"),y=document.querySelector(".search-input"),c=document.querySelector(".gallery"),n=document.querySelector(".loader"),g=new m(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});p.addEventListener("submit",function(a){a.preventDefault();const s=encodeURIComponent(y.value.trim());if(s.trim()===""){l.error({title:"Error",message:"Please enter a search query."});return}L();const o=new URL(f);o.searchParams.set("key",h),o.searchParams.set("q",s),o.searchParams.set("image_type","photo"),o.searchParams.set("orientation","horizontal"),o.searchParams.set("safesearch",!0),fetch(o).then(r=>{if(!r.ok)throw new Error("Network response was not ok");return r.json()}).then(r=>{b(r.hits)}).catch(r=>{console.error(r)}).finally(()=>{u()})});function b(a){if(c.innerHTML="",a.length===0){l.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again."});return}const s=v(a);c.innerHTML=s,g.refresh(),u()}function v(a){return a.map(({webformatURL:s,largeImageURL:o,tags:r,likes:e,views:t,comments:i,downloads:d})=>`<li class="gallery-item">
      <a class="gallery-link" href="${o}">
        <img
          class="gallery-image"
          src="${s}"
          alt="${r}"
          width="360"
        />
      </a>
      <div class="thumb-block">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${e}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${t}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${i}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${d}</p>
        </div>
      </div>
    </li>`).join("")}function L(){n&&(n.style.display="block")}function u(){n&&(n.style.display="none")}
//# sourceMappingURL=commonHelpers.js.map
