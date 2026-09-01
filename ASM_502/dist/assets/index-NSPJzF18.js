var lt=Object.defineProperty;var ct=(m,e,t)=>e in m?lt(m,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):m[e]=t;var w=(m,e,t)=>ct(m,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();class pt{constructor(){w(this,"routes",[]);w(this,"notFoundHandler")}addRoute(e,t){return this.routes.push({path:e,handler:t}),this}setNotFound(e){return this.notFoundHandler=e,this}navigate(e){window.location.hash=e}start(){window.addEventListener("hashchange",()=>this.resolve()),window.addEventListener("load",()=>this.resolve()),this.resolve()}resolve(){const e=window.location.hash.slice(1).split("?")[0]||"/";for(const t of this.routes){const n=this.matchRoute(t.path,e);if(n!==null){new URLSearchParams(window.location.hash.split("?")[1]||"").forEach((r,s)=>{n[s]=r}),t.handler(n);return}}this.notFoundHandler&&this.notFoundHandler()}matchRoute(e,t){const n=e.split("/"),o=t.split("/");if(n.length!==o.length)return null;const r={};for(let s=0;s<n.length;s++)if(n[s].startsWith(":"))r[n[s].slice(1)]=o[s];else if(n[s]!==o[s])return null;return r}}const F=[{img:"/banner1.png",alt:"Bộ sưu tập Hè 2026"},{img:"/banner2.png",alt:"Phong cách GenZ"},{img:"/banner3.png",alt:"Khuyến mãi đặc biệt"}],J={"Áo thun nữ":"/ao-thun-nu1.webp","Áo polo nữ":"/ao-polo-nu1.webp","Áo kiểu nữ":"/ao-kieu-nu1.webp","Áo chống nắng nữ":"/ao-chong-nang-nu1.webp","Áo thun dài tay nữ":"/ao-thun-dai-tay-nu1.webp","Áo sát nách nữ":"/ao-sat-nach-nu.webp","Váy nữ":"/vay1.webp","Quần shorts nữ":"/shorts1.webp","Áo thun nam":"/T-shipts1.webp","Quần shorts nam":"/shorts2.webp",Nữ:"/aonu1.webp",Nam:"/aophong.webp"};class tt{static render(e,t,n,o,r){return`
      ${this.renderBannerSlider()}
      ${this.renderTrustBar()}

      ${o?`
        <!-- FILTER RESULTS -->
        <div class="container" id="filter-results" style="margin-top: 40px; margin-bottom: 60px;">
          <h2 style="font-size:24px; font-weight:800; margin-bottom:24px;">KẾT QUẢ TÌM KIẾM (${e.length} sản phẩm)</h2>
          <div class="products-grid">
            ${e.length>0?e.map(s=>this.renderProductCard(s)).join(""):'<div style="grid-column:1/-1; padding:40px; text-align:center; color:#666;">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</div>'}
          </div>
        </div>
      `:`
        <!-- DEFAULT HOME SECTIONS -->
        ${this.renderCategoriesSection(t)}
        ${this.renderSaleSection(n.filter(s=>s.isOnSale).slice(0,8))}
        ${this.renderNewArrivals(n.slice().reverse().slice(0,8))}
        ${this.renderPromoBanner()}
        ${this.renderStyleCategories(t)}
        ${this.renderWholesaleCTA()}
        ${this.renderAppDownload()}
      `}
    `}static renderBannerSlider(){return`
      <div class="hero-slider" id="banner-slider">
        <div class="hero-slider-track" id="slider-track">
          ${F.map(e=>`
            <div class="hero-slide">
              <img src="${e.img}" alt="${e.alt}" loading="eager">
            </div>
          `).join("")}
        </div>
        <button class="slider-nav-btn prev" id="slider-prev">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button class="slider-nav-btn next" id="slider-next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <div class="slider-dots" id="slider-dots">
          ${F.map((e,t)=>`<button class="slider-dot ${t===0?"active":""}" data-index="${t}"></button>`).join("")}
        </div>
      </div>
    `}static renderTrustBar(){return`
      <div style="
        background: #fff;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding: 18px 0;
      ">
        <div class="container" style="
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        ">
          ${[{icon:"🚚",title:"Miễn phí vận chuyển",desc:"Đơn từ 499K"},{icon:"🔄",title:"Đổi trả miễn phí",desc:"Trong 30 ngày"},{icon:"💎",title:"Cam kết chính hãng",desc:"100% authentic"},{icon:"📞",title:"Hỗ trợ 24/7",desc:"Hotline: 1900.636.000"}].map(t=>`
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 4px;
              min-width: 160px;
            ">
              <span style="font-size: 28px; line-height: 1;">${t.icon}</span>
              <span style="font-size: 12px; font-weight: 700; color: #1a1a2e; text-transform: uppercase; letter-spacing: 0.3px;">${t.title}</span>
              <span style="font-size: 11px; color: #888;">${t.desc}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `}static renderCategoriesSection(e){const t=e.filter(o=>!o.parentId),n=e.filter(o=>o.parentId);return e.length===0?"":`
      <section class="home-section" style="padding-bottom:30px;">
        <div class="container">
          <div class="section-heading">
            <h2>DANH MỤC SẢN PHẨM</h2>
            <p>Khám phá các danh mục thời trang đa dạng</p>
          </div>

          ${t.map(o=>{const r=n.filter(i=>String(i.parentId)===String(o.id)),s=J[o.name]||"/aonu1.webp";return`
              <div style="margin-bottom: 48px;">
                <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:24px; padding-bottom:12px; border-bottom:1px solid #e0e0e0;">
                  <h3 style="font-size:22px; font-weight:800; color:#111; text-transform:uppercase; letter-spacing:1px; margin:0;">${o.name}</h3>
                  <a href="#/products?categoryId=${o.id}" class="view-all-link" style="font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">Xem tất cả</a>
                </div>
                <div class="category-cards-grid">
                  ${r.length>0?r.map(i=>{const d=J[i.name]||s;return`
                      <a href="#/products?categoryId=${i.id}" class="category-card-item">
                        <div class="category-card-image">
                          <img src="${d}" alt="${i.name}" loading="lazy">
                        </div>
                        <span class="category-card-name">${i.name}</span>
                      </a>
                    `}).join(""):`
                    <a href="#/products?categoryId=${o.id}" class="category-card-item">
                      <div class="category-card-image">
                        <img src="${s}" alt="${o.name}" loading="lazy">
                      </div>
                      <span class="category-card-name">Tất cả ${o.name}</span>
                    </a>
                  `}
                </div>
              </div>
            `}).join("")}
        </div>
      </section>
    `}static renderSaleSection(e){return e.length===0?"":`
      <section class="sale-section">
        <div class="container">
          <div class="sale-header">
            <div>
              <h2>🔥 KHUYẾN MÃI HOT</h2>
              <p style="font-size:14px; color:#888; margin-top:4px;">Nhanh tay kẻo hết - Số lượng có hạn!</p>
            </div>
            <div class="sale-countdown" id="sale-countdown">
              <span class="sale-countdown-label">Kết thúc sau:</span>
              <span class="sale-countdown-box" id="cd-hours">08</span>
              <span class="sale-countdown-sep">:</span>
              <span class="sale-countdown-box" id="cd-minutes">45</span>
              <span class="sale-countdown-sep">:</span>
              <span class="sale-countdown-box" id="cd-seconds">30</span>
            </div>
          </div>
          <div class="products-grid">
            ${e.map(t=>this.renderProductCard(t)).join("")}
          </div>
          <div style="text-align:center; margin-top:32px;">
            <a href="#/products?sale=true" class="btn btn-primary" style="padding:12px 40px;">XEM TẤT CẢ KHUYẾN MÃI</a>
          </div>
        </div>
      </section>
    `}static renderNewArrivals(e){return e.length===0?"":`
      <section class="home-section">
        <div class="container">
          <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:28px; border-bottom:2px solid #f0f0f0; padding-bottom:16px;">
            <div>
              <h2 style="font-size:26px; font-weight:800; color:#1a1a2e; text-transform:uppercase; letter-spacing:0.5px;">SẢN PHẨM MỚI</h2>
              <p style="font-size:13px; color:#888; margin-top:4px;">Cập nhật xu hướng thời trang mới nhất</p>
            </div>
            <a href="#/products" class="view-all-link">
              Xem tất cả
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
            </a>
          </div>
          <div class="products-grid">
            ${e.map(t=>this.renderProductCard(t)).join("")}
          </div>
        </div>
      </section>
    `}static renderPromoBanner(){return`
      <section class="promo-full-banner" style="margin:20px 0;">
        <a href="#/products">
          <img src="/spmoi_cate_desktop-banner.webp" alt="Sản phẩm mới - GENZ Fashion" loading="lazy">
        </a>
      </section>
    `}static renderStyleCategories(e){const t=e.filter(r=>!r.parentId),n=t.find(r=>r.name.toLowerCase().includes("nữ")),o=t.find(r=>r.name.toLowerCase().includes("nam"));return`
      <section class="home-section" style="padding-top:40px;">
        <div class="container">
          <div class="style-categories">
            <a href="#/products?categoryId=${n?n.id:""}" class="style-category-card">
              <img src="/banner-nu.webp" alt="Thời trang Nữ" loading="lazy">
              <div class="style-category-overlay">
                <h3>Thời Trang Nữ</h3>
                <span>Khám phá ngay <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg></span>
              </div>
            </a>
            <a href="#/products?categoryId=${o?o.id:""}" class="style-category-card">
              <img src="/banner-nam.webp" alt="Thời trang Nam" loading="lazy">
              <div class="style-category-overlay">
                <h3>Thời Trang Nam</h3>
                <span>Khám phá ngay <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg></span>
              </div>
            </a>
          </div>
        </div>
      </section>
    `}static renderWholesaleCTA(){return`
      <section style="
        background: linear-gradient(135deg, #1a1a2e 0%, #333f48 100%);
        padding: 60px 0;
        margin: 20px 0 0;
      ">
        <div class="container" style="
          display: flex;
          align-items: center;
          gap: 48px;
          flex-wrap: wrap;
        ">
          <!-- Left column -->
          <div style="flex: 1; min-width: 300px;">
            <h2 style="
              font-size: 30px;
              font-weight: 900;
              color: #fff;
              text-transform: uppercase;
              letter-spacing: 1px;
              line-height: 1.3;
              margin: 0 0 16px;
            ">ĐẶT HÀNG SỈ - CHIẾT KHẤU LÊN ĐẾN 40%</h2>
            <p style="
              font-size: 15px;
              color: rgba(255,255,255,0.8);
              line-height: 1.7;
              margin: 0 0 28px;
            ">Chương trình đặt sỉ dành cho các chủ shop, đại lý và doanh nghiệp. Nhận ngay mức chiết khấu hấp dẫn cùng chính sách hỗ trợ toàn diện từ GENZ Fashion.</p>
            <a href="#/contact" style="
              display: inline-block;
              background: #fff;
              color: #1a1a2e;
              font-size: 14px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              padding: 14px 36px;
              border-radius: 4px;
              text-decoration: none;
              transition: opacity 0.2s;
            ">LIÊN HỆ ĐẶT SỈ NGAY</a>
          </div>

          <!-- Right column -->
          <div style="flex: 0 0 auto; min-width: 280px;">
            ${[{icon:"📦",text:"MOQ chỉ từ 50 sản phẩm"},{icon:"💰",text:"Giá cạnh tranh nhất thị trường"},{icon:"🤝",text:"Hỗ trợ tư vấn 1-1"}].map(t=>`
              <div style="
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 24px;
              ">
                <span style="
                  font-size: 32px;
                  line-height: 1;
                  flex-shrink: 0;
                ">${t.icon}</span>
                <span style="
                  font-size: 15px;
                  font-weight: 600;
                  color: #fff;
                  letter-spacing: 0.3px;
                ">${t.text}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `}static renderAppDownload(){return`
      <section class="app-download-section">
        <div class="container">
          <div class="app-download-inner">
            <div class="app-download-image">
              <img src="/khamphatienich.webp" alt="GENZ App" loading="lazy">
            </div>
            <div class="app-download-content">
              <h2>KHÁM PHÁ TIỆN ÍCH TẠI GENZ APP</h2>
              <p>Tải ứng dụng GENZ Fashion để trải nghiệm mua sắm tiện lợi hơn với nhiều ưu đãi độc quyền chỉ có trên app.</p>
              <ul class="app-benefits">
                <li>
                  <span class="benefit-icon">🎁</span>
                  Nhận ngay voucher 50K cho đơn hàng đầu tiên
                </li>
                <li>
                  <span class="benefit-icon">🔔</span>
                  Thông báo khuyến mãi flash sale sớm nhất
                </li>
                <li>
                  <span class="benefit-icon">📦</span>
                  Theo dõi đơn hàng realtime mọi lúc mọi nơi
                </li>
                <li>
                  <span class="benefit-icon">💎</span>
                  Tích điểm thành viên - đổi quà hấp dẫn
                </li>
              </ul>
              <div class="app-qr-code">
                <img src="/QR.webp" alt="QR Code tải app">
                <div class="qr-text">
                  <strong>Quét mã QR để tải app</strong>
                  Có sẵn trên iOS & Android
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}static renderProductCard(e){const t=e.colors||[];return`
      <div class="product-card">
        <a href="#/product/${e.id}" style="text-decoration:none; color:inherit; display:block;">
          <div class="product-img-box">
            ${e.isOnSale?`<div class="product-discount-badge">-${e.discountPercent}%</div>`:""}
            <img src="${e.img}" alt="${e.name}" class="product-img" loading="lazy">
          </div>
          <div class="product-info" style="padding:10px 4px 4px;">
            <h3 class="product-name">${e.name}</h3>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:15px; font-weight:700; color:${e.isOnSale?"#da291c":"#1a1a2e"};">${e.formattedSalePrice||e.formattedPrice}</span>
              ${e.isOnSale?`<span style="font-size:12px; color:#bbb; text-decoration:line-through;">${e.formattedPrice}</span>`:""}
            </div>
            ${t.length>0?`
              <div style="display:flex; gap:5px; margin-top:8px; align-items:center;">
                ${t.slice(0,5).map(n=>{const o=typeof n=="object"?n.code:"#ccc";return`<div title="${typeof n=="object"?n.name:String(n)}" style="width:14px; height:14px; border-radius:50%; background:${o}; border:${o==="#ffffff"||o==="#FFFFFF"||o==="#fff"?"1px solid #ddd":"1px solid transparent"}; flex-shrink:0;"></div>`}).join("")}
                ${t.length>5?`<span style="font-size:11px; color:#999;">+${t.length-5}</span>`:""}
              </div>
            `:""}
          </div>
        </a>
      </div>
    `}static bindEvents(){const e=document.getElementById("slider-track"),t=document.querySelectorAll(".slider-dot"),n=F.length;let o=0,r;function s(h){o=(h%n+n)%n,e&&(e.style.transform=`translateX(-${o*100}%)`),t.forEach((l,g)=>{l.classList.toggle("active",g===o)})}function i(){s(o+1)}function d(){clearInterval(r),r=setInterval(i,5e3)}const a=document.getElementById("slider-prev"),p=document.getElementById("slider-next");a&&a.addEventListener("click",()=>{s(o-1),d()}),p&&p.addEventListener("click",()=>{i(),d()}),t.forEach(h=>h.addEventListener("click",()=>{s(parseInt(h.getAttribute("data-index")||"0")),d()})),d();const c=document.getElementById("cd-hours"),f=document.getElementById("cd-minutes"),y=document.getElementById("cd-seconds");if(c&&f&&y){let h=function(){const v=Math.max(0,g.getTime()-Date.now()),E=Math.floor(v/36e5),k=Math.floor(v%36e5/6e4),T=Math.floor(v%6e4/1e3);c&&(c.textContent=String(E).padStart(2,"0")),f&&(f.textContent=String(k).padStart(2,"0")),y&&(y.textContent=String(T).padStart(2,"0"))};const l=new Date,g=new Date(l.getFullYear(),l.getMonth(),l.getDate(),23,59,59);h(),setInterval(h,1e3)}const u=document.getElementById("home-filter-form");u&&u.addEventListener("submit",h=>{h.preventDefault();const l=new FormData(u),g=new URLSearchParams,v=l.get("categoryId");v&&g.set("categoryId",v);const E=l.get("priceRange");if(E){const[P,D]=E.split("-");P&&g.set("minPrice",P),D&&g.set("maxPrice",D)}const k=l.get("color");k&&g.set("color",k);const T=l.get("search");T&&g.set("search",T),window.location.hash=`#/?${g.toString()}`,setTimeout(()=>{const P=document.getElementById("filter-results");P&&P.scrollIntoView({behavior:"smooth",block:"start"})},100)})}}const ht="http://localhost:3005",gt=()=>{try{const m=JSON.parse(localStorage.getItem("genz_user")||"null");if(m!=null&&m.id)return{"x-user-id":String(m.id),"x-user-role":m.role||"user",Authorization:`Bearer ${m.token||""}`}}catch{}return{}},$=async(m,e={})=>{const t={...gt(),...e.headers||{}},n=m.startsWith("/api/")?m.replace("/api/","/api/v1/shop/"):m,o=await fetch(`${ht}${n}`,{...e,headers:t});if(!o.ok){let s=`API Error ${o.status}`;try{const i=await o.json();s=i.error||i.message||s}catch{}throw new Error(s)}if(o.status===204)return null;const r=await o.json();return r&&typeof r=="object"&&"success"in r&&"data"in r?r.data:r},_="genz_cart",O="genz_guest_id",ut=()=>{let m=localStorage.getItem(O);return m||(m="guest-"+Math.random().toString(36).slice(2,10)+Date.now(),localStorage.setItem(O,m)),m};class C{static getLocal(){const e=localStorage.getItem(_);return e?JSON.parse(e):[]}static saveLocal(e){localStorage.setItem(_,JSON.stringify(e)),window.dispatchEvent(new CustomEvent("cart-updated",{detail:{count:this.countLocal(e)}}))}static countLocal(e){return e.reduce((t,n)=>t+n.quantity,0)}static toDBItems(e){return e.map(t=>{var n;return{productId:t.product.id,productName:t.product.name,img:((n=t.product.images)==null?void 0:n[0])||"",price:t.product.price,salePrice:t.product.salePrice,stock:t.product.stock,size:t.size,color:t.color,quantity:t.quantity}})}static async syncToAPI(e,t){try{await $(`/api/cart/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:this.toDBItems(t)})})}catch(n){console.warn("CartService: không thể đồng bộ lên server",n)}}static getCurrentUserId(){const e=JSON.parse(localStorage.getItem("genz_user")||"null");return(e==null?void 0:e.id)??ut()}static isGuest(){return!JSON.parse(localStorage.getItem("genz_user")||"null")}static getCart(){return this.getLocal()}static async loadFromServer(e){var n;const t=e??this.getCurrentUserId();try{const o=await $(`/api/cart/${t}`);if(!o||!((n=o.items)!=null&&n.length))return;const r=o.items.map(s=>({product:{id:s.productId,name:s.productName,images:[s.img],price:s.price,salePrice:s.salePrice,stock:s.stock,sku:"",brand:"",description:"",categoryId:0,sizes:[],colors:[],rating:0,material:"",instruction:""},quantity:s.quantity,size:s.size,color:s.color}));this.saveLocal(r)}catch(o){console.warn("CartService.loadFromServer error:",o)}}static async mergeGuestCart(e){const t=localStorage.getItem(O);if(t)try{await $("/api/cart/merge",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({guestId:t,userId:e})}),localStorage.removeItem(O),await this.loadFromServer(e)}catch(n){console.warn("CartService.mergeGuestCart error:",n)}}static addItem(e,t=1,n="",o=""){var d;const r=this.getLocal(),s=o||((d=e.colors)!=null&&d.length?e.colors[0].name:""),i=r.findIndex(a=>a.product.id===e.id&&a.size===n&&a.color===s);i>=0?r[i].quantity+=t:r.push({product:e,quantity:t,size:n,color:s}),this.saveLocal(r),this.syncToAPI(this.getCurrentUserId(),r)}static removeItem(e,t,n){const o=this.getLocal().filter(r=>!(r.product.id===e&&r.size===t&&r.color===n));this.saveLocal(o),this.syncToAPI(this.getCurrentUserId(),o)}static updateQuantity(e,t,n,o){if(o<=0){this.removeItem(e,t,n);return}const r=this.getLocal(),s=r.find(i=>i.product.id===e&&i.size===t&&i.color===n);s&&(s.quantity=o,this.saveLocal(r),this.syncToAPI(this.getCurrentUserId(),r))}static getTotal(){return this.getLocal().reduce((e,t)=>{const n=t.product.salePrice||t.product.price;return e+n*t.quantity},0)}static getItemCount(){return this.getLocal().reduce((e,t)=>e+t.quantity,0)}static clearCart(){const e=this.getCurrentUserId();localStorage.removeItem(_),window.dispatchEvent(new CustomEvent("cart-updated",{detail:{count:0}})),$(`/api/cart/${e}`,{method:"DELETE"}).catch(()=>{})}}class U{constructor(e){w(this,"endpoint");this.endpoint=`/api/${e}`}async getAll(e){let t=this.endpoint;return e&&Object.keys(e).length>0&&(t+=`?${new URLSearchParams(e).toString()}`),await $(t)??[]}async getById(e){return $(`${this.endpoint}/${e}`)}async create(e){const t=await $(this.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t)throw new Error("Tạo mới thất bại");return t}async update(e,t){return $(`${this.endpoint}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async delete(e){return await $(`${this.endpoint}/${e}`,{method:"DELETE"}),!0}}class mt extends U{constructor(){super("users")}async login(e,t){const n=await $("/api/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})});if(!n)throw new Error("Email hoặc mật khẩu không đúng");return n}async register(e,t,n){const o=await $("/api/users/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,email:t,password:n})});if(!o)throw new Error("Đăng ký thất bại");return o}}const V=new mt;class z{static async login(e,t){const n=await V.login(e,t);return this.setCurrentUser(n),await C.mergeGuestCart(String(n.id)),n}static async register(e,t,n){return await V.register(e,t,n)}static getCurrentUser(){const e=localStorage.getItem(this.STORAGE_KEY);return e?JSON.parse(e):null}static setCurrentUser(e){localStorage.setItem(this.STORAGE_KEY,JSON.stringify(e)),window.dispatchEvent(new CustomEvent("auth-changed"))}static logout(){localStorage.removeItem(this.STORAGE_KEY),localStorage.removeItem("genz_cart"),window.dispatchEvent(new CustomEvent("auth-changed")),window.dispatchEvent(new CustomEvent("cart-updated",{detail:{count:0}}))}static isLoggedIn(){return!!this.getCurrentUser()}static getRole(){var e;return((e=this.getCurrentUser())==null?void 0:e.role)||"user"}static isAdmin(){const e=this.getRole();return e==="admin"||e==="staff"}static isManagerAdmin(){return this.getRole()==="admin"}static getAuthHeaders(){const e=this.getCurrentUser();return e?{"x-user-id":String(e.id),"x-user-role":e.role||"user"}:{}}}w(z,"STORAGE_KEY","genz_user");class b{static render(e,t=!1,n=!1){return t?this.renderAdminLayout(e):this.renderUserLayout(e,n)}static renderUserLayout(e,t){const n=z.getCurrentUser(),o=C.getItemCount(),s=(window.__categories||[]).filter(i=>!i.parentId);return`
      <!-- ====== TOP ANNOUNCEMENT BAR ====== -->
      <div class="announcement-bar" style="
        background: linear-gradient(135deg, #1a1a2e 0%, #2d3748 100%);
        color: #fff;
        font-size: 11px;
        padding: 6px 0;
        letter-spacing: 0.3px;
      ">
        <div class="container" style="display:flex; align-items:center; justify-content:center; gap:32px; flex-wrap:wrap;">
          <a href="tel:19006360000" style="color:#fff; text-decoration:none; display:flex; align-items:center; gap:5px; opacity:0.92; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.92'">
            📞 Hotline: <strong style="font-weight:600;">1900.636.000</strong>
          </a>
          <span style="width:1px; height:12px; background:rgba(255,255,255,0.25);"></span>
          <a href="mailto:hello@genz-fashion.vn" style="color:#fff; text-decoration:none; display:flex; align-items:center; gap:5px; opacity:0.92; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.92'">
            ✉ hello@genz-fashion.vn
          </a>
          <span style="width:1px; height:12px; background:rgba(255,255,255,0.25);"></span>
          <a href="tel:0987654321" style="color:#fff; text-decoration:none; display:flex; align-items:center; gap:5px; opacity:0.92; transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.92'">
            🏢 Đặt hàng sỉ: <strong style="font-weight:600;">0987.654.321</strong>
          </a>
        </div>
      </div>

      <!-- ====== HEADER ====== -->
      <header class="site-header">

        <!-- Top bar: Logo + Search + Actions -->
        <div class="header-top-bar">
          <div class="container" style="display:flex; align-items:center; height:72px; gap:24px;">

            <!-- Logo -->
            <a href="#/" class="site-logo">
              <span class="logo-text">GENZ</span>
              <span class="logo-sub">FASHION</span>
            </a>

            <!-- Search Bar -->
            <div class="header-search">
              <div class="header-search-inner" id="search-wrapper">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2.5" style="flex-shrink:0;">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" id="search-input" placeholder="Tìm kiếm sản phẩm...">
                <button id="search-btn">TÌM</button>
              </div>
            </div>

            <!-- Header Actions -->
            <div class="header-actions">
              ${n?`
                <div class="user-menu-trigger" id="user-menu-btn">
                  <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                    <div class="user-avatar">
                      ${n.name.charAt(0).toUpperCase()}
                    </div>
                    <span style="font-size:11px; color:#555;">${n.name.split(" ").pop()}</span>
                  </div>
                  <div class="user-dropdown" id="user-dropdown">
                    <a href="#/my-orders">📦 Đơn hàng của tôi</a>
                    <div style="border-top:1px solid #f0f0f0;"></div>
                    ${n.role==="admin"||n.role==="staff"?'<a href="#/admin" style="font-weight:600;">⚙️ Quản trị</a><div style="border-top:1px solid #f0f0f0;"></div>':""}
                    <button id="logout-btn" class="logout-btn">🚪 Đăng xuất</button>
                  </div>
                </div>
              `:`
                <a href="#/login" class="header-action-link">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Tài khoản</span>
                </a>
              `}

              <!-- Cart Button -->
              <button class="cart-icon-btn" id="cart-icon-btn">
                <div style="position:relative;">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  <span class="cart-badge-count" id="cart-badge" style="display:${o>0?"flex":"none"}">${o}</span>
                </div>
                <span class="label">Giỏ hàng</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Bar -->
        <nav class="main-nav">
          <div class="container">
            <ul class="nav-list">
              <li><a href="#/" class="nav-link-item" data-route="/">Trang Chủ</a></li>
              ${s.map(i=>`
                <li><a href="#/products?categoryId=${i.id}" class="nav-link-item" data-route="/products?categoryId=${i.id}">${i.name}</a></li>
              `).join("")}
              <li><a href="#/products" class="nav-link-item" data-route="/products">Sản Phẩm Mới</a></li>
              <li><a href="#/products?sale=true" class="nav-link-item nav-sale" data-route="/products?sale=true">🔥 Khuyến Mãi</a></li>
              <li><a href="#/about" class="nav-link-item" data-route="/about">Giới Thiệu</a></li>
              <li><a href="#/contact" class="nav-link-item" data-route="/contact">Liên Hệ</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <!-- ====== MAIN ====== -->
      <main style="min-height: calc(100vh - 400px);">${e}</main>

      <!-- ====== FOOTER ====== -->
      <footer class="site-footer">

        ${t?"":`
        <!-- Footer Newsletter Section -->
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 48px 0;
          text-align: center;
        ">
          <div class="container" style="max-width:600px;">
            <h3 style="color:#fff; font-size:22px; font-weight:700; margin:0 0 8px 0; letter-spacing:1px; text-transform:uppercase;">
              ĐĂNG KÝ NHẬN BẢN TIN
            </h3>
            <p style="color:rgba(255,255,255,0.85); font-size:14px; margin:0 0 24px 0; line-height:1.6;">
              Cập nhật ưu đãi độc quyền & xu hướng thời trang mới nhất từ GENZ
            </p>
            <div style="display:flex; gap:0; max-width:480px; margin:0 auto; border-radius:8px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.15);">
              <input type="email" placeholder="Nhập email của bạn..." style="
                flex:1;
                padding:14px 20px;
                border:none;
                outline:none;
                font-size:14px;
                color:#333;
                background:#fff;
                min-width:0;
              ">
              <button style="
                padding:14px 28px;
                background:#1a1a2e;
                color:#fff;
                border:none;
                font-size:13px;
                font-weight:700;
                letter-spacing:1px;
                cursor:pointer;
                white-space:nowrap;
                transition:background 0.2s;
              " onmouseover="this.style.background='#2d3748'" onmouseout="this.style.background='#1a1a2e'">
                ĐĂNG KÝ
              </button>
            </div>
          </div>
        </div>
        `}

        <!-- Main Footer -->
        <div style="background:#1a1a2e; padding:56px 0 40px 0; color:rgba(255,255,255,0.8);">
          <div class="container">
            <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:36px;">

              <!-- Col 1: Logo & Info -->
              <div>
                <div style="margin-bottom:20px;">
                  <span style="font-weight:900; font-size:24px; color:#fff; letter-spacing:3px;">GENZ</span>
                  <span style="font-size:10px; color:rgba(255,255,255,0.5); letter-spacing:3px; text-transform:uppercase; display:block; margin-top:2px;">FASHION</span>
                </div>
                <p style="font-size:13px; line-height:1.7; margin:0 0 16px 0; color:rgba(255,255,255,0.65);">
                  Thương hiệu thời trang trẻ trung, năng động dành cho thế hệ Gen Z Việt Nam.
                </p>
                <div style="font-size:12px; line-height:2; color:rgba(255,255,255,0.55);">
                  <div style="display:flex; align-items:flex-start; gap:8px;">
                    <span>📍</span>
                    <span>Tòa nhà FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>📞</span>
                    <a href="tel:02473030222" style="color:rgba(255,255,255,0.55); text-decoration:none;">024 - 7303.0222</a>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>✉️</span>
                    <a href="mailto:hello@genz-fashion.vn" style="color:rgba(255,255,255,0.55); text-decoration:none;">hello@genz-fashion.vn</a>
                  </div>
                </div>
              </div>

              <!-- Col 2: Về GENZ -->
              <div>
                <h3 style="color:#fff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 20px 0; padding-bottom:12px; border-bottom:2px solid rgba(255,255,255,0.1);">
                  Về GENZ
                </h3>
                <ul style="list-style:none; padding:0; margin:0;">
                  <li style="margin-bottom:10px;"><a href="#/about" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Giới thiệu</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Hệ thống cửa hàng</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Tin tức</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Tuyển dụng</a></li>
                </ul>
              </div>

              <!-- Col 3: Hỗ trợ khách hàng -->
              <div>
                <h3 style="color:#fff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 20px 0; padding-bottom:12px; border-bottom:2px solid rgba(255,255,255,0.1);">
                  Hỗ trợ khách hàng
                </h3>
                <ul style="list-style:none; padding:0; margin:0;">
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Hỏi đáp</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Chính sách vận chuyển</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Chính sách đổi trả</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Chính sách bảo mật</a></li>
                  <li style="margin-bottom:10px;"><a href="#" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Bảng kích cỡ</a></li>
                  <li style="margin-bottom:10px;"><a href="#/my-orders" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Tra cứu đơn hàng</a></li>
                </ul>
              </div>

              <!-- Col 4: Đặt hàng sỉ & Liên hệ -->
              <div>
                <h3 style="color:#fff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 20px 0; padding-bottom:12px; border-bottom:2px solid rgba(255,255,255,0.1);">
                  Đặt hàng sỉ & Liên hệ
                </h3>
                <div style="font-size:13px; line-height:2.2; color:rgba(255,255,255,0.6);">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>📞</span>
                    <span>Hotline sỉ: <a href="tel:0987654321" style="color:#fbbf24; text-decoration:none; font-weight:600;">0987.654.321</a></span>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>💬</span>
                    <span>Zalo OA: <strong style="color:rgba(255,255,255,0.85); font-weight:600;">GENZ Fashion</strong></span>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>✉️</span>
                    <a href="mailto:wholesale@genz-fashion.vn" style="color:rgba(255,255,255,0.6); text-decoration:none; font-size:12px;">wholesale@genz-fashion.vn</a>
                  </div>
                </div>
                <a href="#/contact" style="
                  display:inline-block;
                  margin-top:16px;
                  padding:10px 24px;
                  background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color:#fff;
                  text-decoration:none;
                  font-size:12px;
                  font-weight:700;
                  letter-spacing:0.5px;
                  border-radius:6px;
                  transition:opacity 0.2s;
                  text-transform:uppercase;
                " onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
                  Liên hệ tư vấn
                </a>
              </div>

              <!-- Col 5: Social & Payments -->
              <div>
                <h3 style="color:#fff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 20px 0; padding-bottom:12px; border-bottom:2px solid rgba(255,255,255,0.1);">
                  Kết nối với chúng tôi
                </h3>
                <div style="display:flex; gap:10px; margin-bottom:24px;">
                  <a href="#" title="Facebook" style="
                    width:36px; height:36px; border-radius:50%;
                    background:rgba(255,255,255,0.08); display:flex;
                    align-items:center; justify-content:center;
                    color:rgba(255,255,255,0.7); text-decoration:none;
                    transition:all 0.2s;
                  " onmouseover="this.style.background='#1877f2'; this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.color='rgba(255,255,255,0.7)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" title="Instagram" style="
                    width:36px; height:36px; border-radius:50%;
                    background:rgba(255,255,255,0.08); display:flex;
                    align-items:center; justify-content:center;
                    color:rgba(255,255,255,0.7); text-decoration:none;
                    transition:all 0.2s;
                  " onmouseover="this.style.background='#e4405f'; this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.color='rgba(255,255,255,0.7)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" title="YouTube" style="
                    width:36px; height:36px; border-radius:50%;
                    background:rgba(255,255,255,0.08); display:flex;
                    align-items:center; justify-content:center;
                    color:rgba(255,255,255,0.7); text-decoration:none;
                    transition:all 0.2s;
                  " onmouseover="this.style.background='#ff0000'; this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.color='rgba(255,255,255,0.7)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.96 3.27-5.96 3.27z"></path></svg>
                  </a>
                  <a href="#" title="TikTok" style="
                    width:36px; height:36px; border-radius:50%;
                    background:rgba(255,255,255,0.08); display:flex;
                    align-items:center; justify-content:center;
                    color:rgba(255,255,255,0.7); text-decoration:none;
                    transition:all 0.2s;
                  " onmouseover="this.style.background='#010101'; this.style.color='#69c9d0'" onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.color='rgba(255,255,255,0.7)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.88a8.28 8.28 0 0 0 4.76 1.5V6.93a4.84 4.84 0 0 1-1-.24z"/></svg>
                  </a>
                </div>

                <h3 style="color:#fff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 14px 0; padding-bottom:12px; border-bottom:2px solid rgba(255,255,255,0.1);">
                  Thanh toán
                </h3>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                  <span style="padding:5px 12px; background:rgba(255,255,255,0.1); border-radius:4px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.5px;">VNPAY</span>
                  <span style="padding:5px 12px; background:rgba(255,255,255,0.1); border-radius:4px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.5px;">VISA</span>
                  <span style="padding:5px 12px; background:rgba(255,255,255,0.1); border-radius:4px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.5px;">JCB</span>
                  <span style="padding:5px 12px; background:rgba(255,255,255,0.1); border-radius:4px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.5px;">MoMo</span>
                  <span style="padding:5px 12px; background:rgba(255,255,255,0.1); border-radius:4px; font-size:11px; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.5px;">COD</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div style="background:#12121f; padding:16px 0; text-align:center; font-size:12px; color:rgba(255,255,255,0.4); border-top:1px solid rgba(255,255,255,0.05);">
          <div class="container" style="display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap;">
            <span>© 2026 GENZ Fashion. All rights reserved.</span>
            <span style="width:1px; height:10px; background:rgba(255,255,255,0.15);"></span>
            <a href="#" style="color:rgba(255,255,255,0.4); text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='rgba(255,255,255,0.7)'" onmouseout="this.style.color='rgba(255,255,255,0.4)'">Chính sách bảo mật</a>
          </div>
        </div>
      </footer>

      <!-- ====== CART DRAWER ====== -->
      <div class="cart-overlay" id="cart-overlay"></div>
      <div class="cart-drawer" id="cart-drawer">
        <div class="cart-header">
          <h3 id="cart-drawer-title">Giỏ hàng (${o})</h3>
          <span class="close-cart" id="close-cart">✕</span>
        </div>
        <div class="free-ship-banner">
          <span style="color:#10b981; font-size:16px;">✓</span>
          Bạn đã được miễn phí vận chuyển
        </div>
        <div style="padding:10px 20px; border-bottom:1px solid var(--border); font-size:13px; display:flex; justify-content:space-between; align-items:center;">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:500;">
            <input type="checkbox" id="cart-select-all" checked style="width:15px;height:15px;accent-color:var(--primary);">
            Chọn tất cả
          </label>
          <span style="color:var(--text-secondary);">Đã chọn <strong id="cart-selected-count">${o}</strong> sản phẩm</span>
        </div>
        <div class="cart-items-container" id="cart-drawer-items"></div>
        <div class="cart-footer">
          <div class="promo-code-btn" style="cursor:pointer;">
            <span>🎟 Mã ưu đãi</span>
            <span style="color:var(--text-secondary); font-weight:400;">Chọn hoặc nhập mã &rsaquo;</span>
          </div>
          <div class="cart-subtotal">
            <span>Tạm tính</span>
            <span id="cart-drawer-total" style="color:var(--primary);">0 đ</span>
          </div>
          <button class="btn-checkout" id="btn-open-checkout-modal">THANH TOÁN</button>
        </div>
      </div>
    `}static renderAdminLayout(e){const t=window.location.hash.split("?")[0];return`
      <div style="display:grid; grid-template-columns:240px 1fr; min-height:100vh;">
        <aside style="background:#1a1a2e; color:white; position:sticky; top:0; height:100vh; overflow-y:auto;">
          <div style="padding:24px 20px; border-bottom:1px solid rgba(255,255,255,0.1);">
            <a href="#/" style="font-weight:900; font-size:20px; color:white; text-decoration:none; letter-spacing:3px;">GENZ</a>
            <div style="font-size:11px; color:rgba(255,255,255,0.5); letter-spacing:2px; text-transform:uppercase; margin-top:2px;">Admin Panel</div>
          </div>
          <nav style="padding:16px 0;">
            ${[{href:"#/admin",label:"📊 Dashboard",hash:"#/admin"},{href:"#/admin/products",label:"📦 Sản phẩm",hash:"#/admin/products"},{href:"#/admin/categories",label:"📂 Danh mục",hash:"#/admin/categories"},{href:"#/admin/wms-locations",label:"🏭 Vị trí Kho",hash:"#/admin/wms-locations"},{href:"#/admin/wms-inventory",label:"📊 Tồn Kho",hash:"#/admin/wms-inventory"},{href:"#/admin/wms-import",label:"📥 Nhập Hàng",hash:"#/admin/wms-import"},{href:"#/admin/wms-export",label:"📤 Xuất Kho",hash:"#/admin/wms-export"},{href:"#/admin/orders",label:"🛒 Đơn hàng",hash:"#/admin/orders"},{href:"#/admin/users",label:"👥 Users",hash:"#/admin/users"}].map(o=>`
              <a href="${o.href}" style="display:flex; align-items:center; gap:10px; padding:13px 20px; color:${t===o.hash?"white":"rgba(255,255,255,0.7)"}; background:${t===o.hash?"rgba(255,255,255,0.12)":"none"}; border-left:3px solid ${t===o.hash?"white":"transparent"}; text-decoration:none; font-size:14px; transition:all 0.2s;">
                ${o.label}
              </a>
            `).join("")}
            <div style="border-top:1px solid rgba(255,255,255,0.1); margin:16px 0;"></div>
            <a href="#/" style="display:flex; align-items:center; gap:10px; padding:13px 20px; color:rgba(255,255,255,0.6); text-decoration:none; font-size:14px;">
              🏠 Về trang chủ
            </a>
          </nav>
        </aside>
        <div style="background:#f5f5f7; padding:32px; overflow-y:auto;">
          ${e}
        </div>
      </div>
    `}static bindEvents(){const e=window.location.hash||"#/";document.querySelectorAll(".nav-link-item").forEach(u=>{u.classList.remove("active");const h=u.getAttribute("href")||"";(h===e||e==="#/"&&h==="#/")&&u.classList.add("active")});const t=document.getElementById("user-menu-btn"),n=document.getElementById("user-dropdown");t&&n&&(t.addEventListener("click",u=>{u.stopPropagation(),n.style.display=n.style.display==="none"?"block":"none"}),document.addEventListener("click",()=>{n&&(n.style.display="none")},{once:!0}));const o=document.getElementById("logout-btn");o&&o.addEventListener("click",()=>{z.logout(),window.location.href="#/",window.location.reload()});const r=document.getElementById("search-btn"),s=document.getElementById("search-input"),i=()=>{const u=s==null?void 0:s.value.trim();u&&(window.location.hash=`#/products?search=${encodeURIComponent(u)}`)};r&&r.addEventListener("click",i),s&&s.addEventListener("keydown",u=>{u.key==="Enter"&&i()});const d=document.getElementById("cart-icon-btn"),a=document.getElementById("cart-overlay"),p=document.getElementById("cart-drawer"),c=document.getElementById("close-cart"),f=u=>{u==null||u.preventDefault(),a==null||a.classList.add("show"),p==null||p.classList.add("open"),window.dispatchEvent(new CustomEvent("cart-open"))},y=()=>{a==null||a.classList.remove("show"),p==null||p.classList.remove("open")};d&&d.addEventListener("click",f),a&&a.addEventListener("click",y),c&&c.addEventListener("click",y),window.openCartDrawer=f}}class yt extends U{constructor(){super("products")}async getSaleProducts(){return this.getAll({sale:"true"})}async getByCategory(e){return this.getAll({categoryId:String(e)})}async search(e){return this.getAll({search:e})}async upload(e="file"){const t=document.getElementById(e);if(t&&t.files&&t.files.length>0){const n=t.files[0];let o=new FormData;return o.append("image",n),await(await fetch("http://localhost:3005/api/v1/shop/upload",{method:"POST",body:o})).json()}return null}insert(e){fetch("http://localhost:3005/api/v1/shop/products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t=>(console.log(t),!0)).catch(t=>(console.log(t),!1))}}const N=new yt;class ft extends U{constructor(){super("categories")}async addCategory(e){let n=JSON.parse(localStorage.getItem("genz_user")||"{}").token;return await(await fetch("http://localhost:3005/api/v1/shop/categories",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(e)})).json()}}const H=new ft;class Z{constructor(e){w(this,"id");this.id=e}}class M extends Z{constructor(t){super(t.id||t._id);w(this,"sku");w(this,"name");w(this,"images");w(this,"price");w(this,"salePrice");w(this,"categoryId");w(this,"brand");w(this,"description");w(this,"material");w(this,"instruction");w(this,"sizes");w(this,"colors");w(this,"rating");w(this,"stock");w(this,"weight");this.sku=t.sku||`SKU-${this.id}`,this.name=t.name,this.images=t.images||[],t.image&&this.images.push(t.image),this.price=t.price,this.salePrice=t.salePrice,t.category&&typeof t.category=="object"?this.categoryId=t.category.id||t.category._id:this.categoryId=t.categoryId||t.category,this.brand=t.brand||"GENZ",this.description=t.description||"",this.material=t.material,this.instruction=t.instruction,this.sizes=t.sizes||(t.size?[t.size]:[]),this.colors=t.colors||(t.color?[{name:t.color,code:"",image:""}]:[]),this.rating=t.rating||0,this.stock=t.stock||t.quantity||0,this.weight=t.weight||0}get img(){return this.images[0]||"https://picsum.photos/seed/genz/400/500"}get formattedPrice(){return new Intl.NumberFormat("vi-VN").format(this.price)+" đ"}get formattedSalePrice(){return this.salePrice?new Intl.NumberFormat("vi-VN").format(this.salePrice)+" đ":null}get discountPercent(){return this.salePrice?Math.round((1-this.salePrice/this.price)*100):0}get isOnSale(){return!!this.salePrice&&this.salePrice<this.price}get isInStock(){return this.stock>0}getStarRating(){const t=Math.floor(this.rating),n=this.rating%1>=.5,o=5-t-(n?1:0);return"★".repeat(t)+(n?"☆":"")+"☆".repeat(o)}toString(){return`${this.name} - ${this.formattedPrice}`}validate(){return this.name.length>0&&this.price>0&&this.categoryId>0}}class G extends Z{constructor(t){super(t.id||t._id);w(this,"name");w(this,"icon");w(this,"image");w(this,"parentId");this.name=t.name,this.icon=t.icon||"📌",this.image=t.image,t.parentId?this.parentId=typeof t.parentId=="object"?t.parentId._id||t.parentId.id:t.parentId:this.parentId=null}toString(){return`${this.icon} ${this.name}`}validate(){return this.name.length>0}}function A(m){return new Intl.NumberFormat("vi-VN").format(m)+" đ"}function x(m,e="success"){if(!document.getElementById("toast-styles")){const r=document.createElement("style");r.id="toast-styles",r.textContent=`
      .toast-notification {
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        display: flex; align-items: center; gap: 12px;
        padding: 14px 20px; border-radius: 8px;
        background: #333; color: white; font-size: 14px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        opacity: 0; transform: translateY(16px);
        transition: all 0.3s ease; max-width: 360px;
      }
      .toast-notification.show { opacity: 1; transform: translateY(0); }
      .toast-success { background: #1a7a4a; }
      .toast-error { background: #da291c; }
      .toast-warning { background: #d97706; }
      .toast-info { background: #0071e3; }
      .toast-icon { font-size: 16px; }
    `,document.head.appendChild(r)}const t=document.querySelector(".toast-notification");t&&t.remove();const n={success:"✓",error:"✕",warning:"⚠",info:"ℹ"},o=document.createElement("div");o.className=`toast-notification toast-${e}`,o.innerHTML=`
    <span class="toast-icon">${n[e]}</span>
    <span class="toast-message">${m}</span>
  `,document.body.appendChild(o),requestAnimationFrame(()=>o.classList.add("show")),setTimeout(()=>{o.classList.remove("show"),setTimeout(()=>o.remove(),300)},3e3)}function at(m=4){return`
    <style>
      .skeleton .skeleton-img { background:#e0e0e0; padding-top:133%; border-radius:4px; animation:pulse 1.5s infinite; }
      .skeleton .skeleton-text { background:#e0e0e0; height:14px; border-radius:4px; margin-top:10px; animation:pulse 1.5s infinite; }
      .skeleton .skeleton-text.short { width:60%; }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    </style>
  `+Array(m).fill("").map(()=>`
    <div class="product-card skeleton">
      <div class="skeleton-img"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
    </div>
  `).join("")}var et;(m=>{function e(n){return new Intl.NumberFormat("vi-VN").format(n)+" đ"}m.toCurrency=e;function t(n){return new Date(n).toLocaleDateString("vi-VN")}m.toDateString=t})(et||(et={}));class xt{static async render(e,t){e.innerHTML=b.render(`
      <section class="container"><div class="products-grid mt-4">${at(8)}</div></section>
    `),b.bindEvents();try{const n={};t!=null&&t.categoryId&&(n.categoryId=t.categoryId),t!=null&&t.search&&(n.search=t.search),t!=null&&t.sort&&(n.sort=t.sort),t!=null&&t.sale&&(n.sale=t.sale);const o=Object.keys(t||{}).some(c=>["categoryId","search","sort","sale","minPrice","maxPrice","color"].includes(c)),[r,s,i]=await Promise.all([N.getAll(o?n:void 0),H.getAll(),N.getAll()]);let d=r.map(c=>new M(c));const a=s.map(c=>new G(c)),p=i.map(c=>new M(c));t!=null&&t.minPrice&&(d=d.filter(c=>(c.salePrice||c.price)>=Number(t.minPrice))),t!=null&&t.maxPrice&&(d=d.filter(c=>(c.salePrice||c.price)<=Number(t.maxPrice))),t!=null&&t.color&&(d=d.filter(c=>c.colors.some(f=>f.name.toLowerCase().includes(t.color.toLowerCase())))),e.innerHTML=b.render(tt.render(d,a,p,o,t)),b.bindEvents(),tt.bindEvents()}catch(n){console.error("HomeController error:",n),e.innerHTML=b.render(`
        <div class="container" style="padding:80px 0; text-align:center;">
          <div style="font-size:48px; margin-bottom:16px;">⚠️</div>
          <h2 style="margin-bottom:12px;">Không thể kết nối server</h2>
          <p style="color:var(--text-secondary);">Vui lòng chạy lệnh <code>npm run server</code> trước.</p>
        </div>
      `),b.bindEvents()}}}const vt="modulepreload",bt=function(m){return"/"+m},nt={},wt=function(e,t,n){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),i=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));o=Promise.allSettled(t.map(d=>{if(d=bt(d),d in nt)return;nt[d]=!0;const a=d.endsWith(".css"),p=a?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const c=document.createElement("link");if(c.rel=a?"stylesheet":vt,a||(c.as="script"),c.crossOrigin="",c.href=d,i&&c.setAttribute("nonce",i),document.head.appendChild(c),a)return new Promise((f,y)=>{c.addEventListener("load",f),c.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(s){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=s,window.dispatchEvent(i),!i.defaultPrevented)throw s}return o.then(s=>{for(const i of s||[])i.status==="rejected"&&r(i.reason);return e().catch(r)})};class it{static render(e,t=[],n=[],o=[]){const r=!e.isInStock,s=e.colors&&e.colors.length>0?e.colors:[{name:"Mặc định",code:"#ccc",image:e.img}];return`
      <div class="container" style="margin-bottom:60px;">
        <nav class="breadcrumb">
          <a href="#/">Trang chủ</a> | <a href="#/products?categoryId=${e.categoryId}">Sản phẩm</a> | ${e.name}
        </nav>
        
        <div class="product-detail-layout">
          <!-- Left: Gallery -->
          <div class="gallery-container">
            <div class="gallery-thumbnails" id="gallery-thumbnails">
              ${e.images.map((i,d)=>`
                <img src="${i}" class="thumb-img ${d===0?"active":""}" data-index="${d}">
              `).join("")}
            </div>
            <div class="gallery-main">
              <img src="${e.img}" class="main-img" id="main-img">
            </div>
          </div>
          
          <!-- Right: Info -->
          <div class="pd-info">
            <h1 class="pd-title">${e.name}</h1>
            <div class="pd-sku">
              <span>SKU: ${e.sku}</span>
              <span style="cursor:pointer" title="Copy SKU">📋 Copy</span>
            </div>
            
            <div class="pd-price-row">
              <span class="pd-price">${e.formattedSalePrice||e.formattedPrice}</span>
              ${e.salePrice?`<span style="text-decoration:line-through; color:var(--text-secondary)">${e.formattedPrice}</span>`:""}
              <span class="pd-freeship">Freeship</span>
            </div>
            
            <div class="promo-banner">
              <div class="deal-text">Nhập mã DEAL100</div>
              <div style="font-weight:700; color:var(--primary)">Voucher giảm thêm tới 100K</div>
            </div>
            
            <div class="pd-section-label">Màu sắc: <span id="selected-color-name" style="font-weight:600; color:var(--text-primary)">${s[0].name}</span></div>
            <div class="color-swatches" id="color-swatches">
              ${s.map((i,d)=>`
                <div class="color-swatch ${d===0?"active":""}" data-color="${i.name}">
                  <img src="${i.image}" title="${i.name}">
                </div>
              `).join("")}
            </div>
            
            <div class="pd-section-label d-flex justify-between">
              <span>Kích cỡ: <span id="selected-size-name" style="font-weight:600; color:var(--text-primary)">${e.sizes[0]||""}</span></span>
              <a href="#" style="color:#0071e3; font-weight:500;">📏 Gợi ý tìm kích cỡ</a>
            </div>
            <div class="size-swatches" id="size-swatches">
              ${e.sizes.map((i,d)=>`
                <div class="size-swatch ${d===0?"active":""}" data-size="${i}">${i}</div>
              `).join("")}
            </div>
            
            <div class="pd-actions">
              <button id="add-to-cart-btn" class="btn btn-primary btn-block" ${r?"disabled":""}>
                ${r?"HẾT HÀNG":"THÊM VÀO GIỎ HÀNG"}
              </button>
              <button class="btn btn-outline btn-block">TÌM TẠI CỬA HÀNG</button>
            </div>
            
            <!-- Accordion -->
            <div class="accordion" id="pd-accordion">
              <div class="accordion-item active">
                <button class="accordion-header">Vị trí lưu kho (WMS)</button>
                <div class="accordion-content">
                  <div class="accordion-body">
                    ${n&&n.length>0?`
                      <ul style="list-style:none; padding:0; margin:0;">
                        ${n.map(i=>`
                          <li style="padding:12px; background:#f0f9ff; border:1px solid #bae6fd; border-radius:6px; margin-bottom:8px;">
                            <div style="font-size:12px; color:#0369a1; margin-bottom:4px; font-weight:600;">${i.pathStr}</div>
                            <div style="display:flex; justify-content:space-between; font-size:14px;">
                              <span>Tồn: <strong>${i.quantity}</strong></span>
                              <span>Pallet: <strong>${i.palletCode}</strong></span>
                            </div>
                          </li>
                        `).join("")}
                      </ul>
                    `:"<p>Chưa có dữ liệu lưu kho cho sản phẩm này.</p>"}
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-header">Mô tả</button>
                <div class="accordion-content">
                  <div class="accordion-body">
                    <p>${e.description}</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-header">Chất liệu</button>
                <div class="accordion-content">
                  <div class="accordion-body">
                    <p>${e.material||"Đang cập nhật thông tin chất liệu cho sản phẩm này."}</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <button class="accordion-header">Hướng dẫn sử dụng</button>
                <div class="accordion-content">
                  <div class="accordion-body">
                    <p>${e.instruction||"Giặt máy ở nhiệt độ thường. Không sử dụng hóa chất tẩy có chứa clo. Phơi trong bóng mát. Sấy khô ở nhiệt độ thấp."}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="policy-list">
              <div class="policy-item">
                <div class="policy-icon">💵</div>
                <div class="policy-text">
                  <strong>Thanh toán khi nhận hàng (COD)</strong>
                  <p>Giao hàng toàn quốc.</p>
                </div>
              </div>
              <div class="policy-item">
                <div class="policy-icon">🚚</div>
                <div class="policy-text">
                  <strong>Miễn phí giao hàng</strong>
                  <p>Với đơn hàng trên 599.000 đ.</p>
                </div>
              </div>
              <div class="policy-item">
                <div class="policy-icon">🔄</div>
                <div class="policy-text">
                  <strong>Đổi hàng miễn phí</strong>
                  <p>Trong 30 ngày kể từ ngày mua.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products Section -->
      ${t.length>0?`
        <div class="container" style="margin-bottom:60px;">
          <h2 style="font-size:24px; font-weight:800; text-transform:uppercase; margin-bottom:32px; padding-bottom:16px; border-bottom:2px solid #f0f0f0;">SẢN PHẨM LIÊN QUAN</h2>
          <div class="products-grid">
            ${t.map(i=>`
              <div class="product-card" style="transition:transform 0.3s; border-radius:8px; overflow:hidden;">
                <a href="#/product/${i.id}">
                  <div class="product-img-box" style="border-radius:8px; overflow:hidden;">
                    ${i.salePrice?`<div style="position:absolute;top:10px;left:10px;background:#dc2626;color:white;font-size:12px;font-weight:700;padding:4px 10px;z-index:1;border-radius:4px;">-${i.discountPercent}%</div>`:""}
                    <img src="${i.img}" alt="${i.name}" class="product-img" loading="lazy">
                  </div>
                  <div class="product-info" style="padding-top:12px;">
                    <div style="font-size:11px; color:var(--text-secondary); margin-bottom:6px; text-transform:uppercase;">${i.brand}</div>
                    <h3 class="product-name" style="font-size:15px; font-weight:500;">${i.name}</h3>
                    <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
                      <span class="product-price" style="color:${i.salePrice?"#dc2626":"var(--text-primary)"};">${i.formattedSalePrice||i.formattedPrice}</span>
                      ${i.salePrice?`<span style="font-size:12px; color:var(--text-secondary); text-decoration:line-through;">${i.formattedPrice}</span>`:""}
                    </div>
                  </div>
                </a>
              </div>
            `).join("")}
          </div>
        </div>
      `:""}

      <!-- User Reviews Section -->
      <div style="background:#f9f9f9; padding:60px 0; margin-bottom:40px;">
        <div class="container">
          <h2 style="font-size:24px; font-weight:800; text-align:center; text-transform:uppercase; margin-bottom:40px;">ĐÁNH GIÁ TỪ KHÁCH HÀNG</h2>
          ${o.length===0?`
            <div style="text-align:center; padding:40px; color:#666; font-size:15px; background:white; border-radius:8px;">
              Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên trải nghiệm và đánh giá nhé!
            </div>
          `:`
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:24px;">
              ${o.map(i=>`
                <div style="background:white; padding:24px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
                  <div style="color:#fbbf24; font-size:16px; margin-bottom:12px;">${"★".repeat(i.rating)}${"☆".repeat(5-i.rating)}</div>
                  <p style="font-size:14px; color:#555; margin-bottom:16px; line-height:1.6;">"${i.comment}"</p>
                  <div style="display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:36px; height:36px; background:#e0e0e0; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; color:#555;">${i.userName.charAt(0).toUpperCase()}</div>
                      <div>
                        <div style="font-size:13px; font-weight:700;">${i.userName}</div>
                        <div style="font-size:11px; color:#16a34a; font-weight:600;">✔️ Đã mua hàng</div>
                      </div>
                    </div>
                    <div style="font-size:11px; color:#999;">${new Date(i.createdAt).toLocaleDateString("vi-VN")}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    `}static bindEvents(e){var y;const t=e.colors&&e.colors.length>0?e.colors:[{name:"Mặc định",code:"#ccc",image:e.img}];let n=e.sizes[0]||"",o=((y=t[0])==null?void 0:y.name)||"";const r=document.getElementById("main-img"),s=document.querySelectorAll(".thumb-img");s.forEach((u,h)=>{u.addEventListener("click",()=>{s.forEach(l=>l.classList.remove("active")),u.classList.add("active"),r&&(r.src=e.images[h])})});const i=document.querySelectorAll(".color-swatch"),d=document.getElementById("selected-color-name");i.forEach(u=>{u.addEventListener("click",h=>{i.forEach(g=>g.classList.remove("active"));const l=h.currentTarget;l.classList.add("active"),o=l.dataset.color||"",d&&(d.textContent=o)})});const a=document.querySelectorAll(".size-swatch"),p=document.getElementById("selected-size-name");a.forEach(u=>{u.addEventListener("click",h=>{a.forEach(g=>g.classList.remove("active"));const l=h.currentTarget;l.classList.add("active"),n=l.dataset.size||"",p&&(p.textContent=n)})}),document.querySelectorAll(".accordion-header").forEach(u=>{u.addEventListener("click",h=>{const l=h.currentTarget.parentElement;l&&l.classList.toggle("active")})});const f=document.getElementById("add-to-cart-btn");f&&f.addEventListener("click",()=>{C.addItem(e,1,n,o),x("Đã thêm sản phẩm vào giỏ hàng!","success"),window.openCartDrawer&&window.openCartDrawer()})}}class X{static async getByProductId(e){try{return await $(`/api/products/${e}/reviews`)||[]}catch(t){return console.error("ReviewService.getByProductId error:",t),[]}}static async getByOrderIdAndUserId(e,t){try{return await $(`/api/orders/${e}/reviews?userId=${t}`)||[]}catch(n){return console.error("ReviewService.getByOrderIdAndUserId error:",n),[]}}static async getByUserId(e){try{return await $(`/api/users/${e}/reviews`)||[]}catch(t){return console.error("ReviewService.getByUserId error:",t),[]}}static async createReview(e){try{return await $("/api/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}catch(t){throw t}}}class ot{static async renderDetail(e,t){if(t!=null&&t.id){e.innerHTML=b.render(`
      <div class="container" style="padding:60px 0; text-align:center; color:var(--text-secondary)">
        <div style="font-size:32px; margin-bottom:16px;">⏳</div>Đang tải sản phẩm...
      </div>
    `),b.bindEvents();try{const{WmsService:o}=await wt(async()=>{const{WmsService:u}=await Promise.resolve().then(()=>Et);return{WmsService:u}},void 0),[r,s,i,d,a]=await Promise.all([N.getById(t.id),N.getAll(),H.getAll(),o.getProductLocations(t.id).catch(()=>[]),X.getByProductId(t.id).catch(()=>[])]);if(!r){e.innerHTML=b.render(`
          <div class="container" style="padding:80px 0; text-align:center;">
            <div style="font-size:64px; margin-bottom:16px;">🔍</div>
            <h2>Không tìm thấy sản phẩm</h2>
            <a href="#/products" class="btn btn-primary" style="margin-top:24px;">Xem tất cả sản phẩm</a>
          </div>
        `),b.bindEvents();return}const p=new M(r),c=i.find(u=>String(u.id||u._id)===String(p.categoryId));let f=[String(p.categoryId)];if(c)if(c.parentId){f.push(String(c.parentId));const u=i.filter(h=>String(h.parentId)===String(c.parentId));f=f.concat(u.map(h=>String(h.id||h._id)))}else{const u=i.filter(h=>String(h.parentId)===String(c.id));f=f.concat(u.map(h=>String(h.id||h._id)))}const y=s.map(u=>new M(u)).filter(u=>f.includes(String(u.categoryId))&&String(u.id)!==String(p.id)).slice(0,4);e.innerHTML=b.render(it.render(p,y,d,a)),b.bindEvents(),it.bindEvents(p)}catch(o){console.error("ProductController.renderDetail error:",o),e.innerHTML=b.render(`
        <div class="container" style="padding:80px 0; text-align:center;">
          <h2>Lỗi kết nối API. Vui lòng kiểm tra server.</h2>
        </div>
      `),b.bindEvents()}}}static async renderList(e,t){e.innerHTML=b.render(`
      <div class="container" style="padding:40px 0;">
        <div class="products-grid">${at(8)}</div>
      </div>
    `),b.bindEvents();try{const n={};t!=null&&t.categoryId&&(n.categoryId=t.categoryId),t!=null&&t.search&&(n.search=t.search),t!=null&&t.sale&&(n.sale=t.sale);const[o,r]=await Promise.all([N.getAll(n),H.getAll()]);let s=o.map(l=>new M(l));const i=r.map(l=>new G(l)),d=t!=null&&t.categoryId?String(t.categoryId):null,a=d?i.find(l=>String(l.id)===d):null;t!=null&&t.size&&(s=s.filter(l=>l.sizes&&l.sizes.includes(t.size))),t!=null&&t.color&&(s=s.filter(l=>l.colors&&l.colors.some(g=>{var v;return g.name.toLowerCase()===((v=t.color)==null?void 0:v.toLowerCase())}))),t!=null&&t.minPrice&&(s=s.filter(l=>(l.salePrice||l.price)>=Number(t.minPrice))),t!=null&&t.maxPrice&&(s=s.filter(l=>(l.salePrice||l.price)<=Number(t.maxPrice))),t!=null&&t.sort&&(t.sort==="price_asc"&&s.sort((l,g)=>(l.salePrice||l.price)-(g.salePrice||g.price)),t.sort==="price_desc"&&s.sort((l,g)=>(g.salePrice||g.price)-(l.salePrice||l.price)),t.sort==="name_asc"&&s.sort((l,g)=>l.name.localeCompare(g.name)),t.sort==="name_desc"&&s.sort((l,g)=>g.name.localeCompare(l.name)));const p=i.filter(l=>!l.parentId),c=i.filter(l=>l.parentId);let f="",y=(a==null?void 0:a.name)||"TẤT CẢ SẢN PHẨM";t!=null&&t.search&&(y=`KẾT QUẢ TÌM KIẾM: "${t.search}"`),(t==null?void 0:t.sale)==="true"&&(y="🔥 KHUYẾN MÃI HOT"),a&&a.name.toLowerCase().includes("nữ")?f=`
          <div style="background:#fff0f5; padding:40px 20px; text-align:center; margin-bottom: 20px;">
            <h1 style="font-size:36px; font-weight:700; color:#d87093; margin-bottom:10px; text-transform:uppercase;">${y}</h1>
            <p style="font-size:15px; color:#555; max-width:600px; margin:0 auto;">Tự tin tỏa sáng mỗi ngày với những thiết kế tôn dáng, mềm mại và đầy quyến rũ dành riêng cho phái đẹp.</p>
          </div>
        `:a&&a.name.toLowerCase().includes("nam")?f=`
          <div style="background:#2c3e50; padding:40px 20px; text-align:center; color:white; margin-bottom: 20px;">
            <h1 style="font-size:36px; font-weight:800; margin-bottom:10px; text-transform:uppercase;">${y}</h1>
            <p style="font-size:15px; opacity:0.8; max-width:600px; margin:0 auto;">Phong cách mạnh mẽ, lịch lãm và tối giản. Khẳng định bản lĩnh đàn ông đích thực.</p>
          </div>
        `:f=`
          <div style="width:100%; height:200px; background:linear-gradient(to right, #ece9e6, #ffffff); position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; margin-bottom:20px;">
            <img src="/banner2.png" style="position:absolute; width:100%; height:100%; object-fit:cover; opacity:0.3; filter:grayscale(50%);">
            <div style="position:relative; z-index:2; text-align:center;">
              <h1 style="font-size:36px; font-weight:900; color:#111; text-transform:uppercase;">${y}</h1>
            </div>
          </div>
        `;let u="";if(a){let l=[];a.parentId?l=c.filter(g=>String(g.parentId)===String(a.parentId)):l=c.filter(g=>String(g.parentId)===String(a.id)),l.length>0&&(u=`
            <div class="sub-category-strip">
              <a href="#/products?categoryId=${a.parentId||a.id}" class="sub-category-chip ${a.parentId?"":"active"}">
                <div class="sub-category-chip-img">
                  <img src="${a.image||"/aonu1.webp"}" alt="Tất cả">
                </div>
                <div class="sub-category-chip-name">Tất cả</div>
              </a>
              ${l.map(g=>`
                <a href="#/products?categoryId=${g.id}" class="sub-category-chip ${String(g.id)===String(a.id)?"active":""}">
                  <div class="sub-category-chip-img">
                    <img src="${g.image||"/aonu1.webp"}" alt="${g.name}">
                  </div>
                  <div class="sub-category-chip-name">${g.name}</div>
                </a>
              `).join("")}
            </div>
          `)}const h=`
        ${f}
        <div class="container" style="padding-bottom: 60px;">
          
          ${u}

          <!-- SHOP LAYOUT (SIDEBAR + CONTENT) -->
          <div class="shop-layout">
            <!-- SIDEBAR -->
            <aside class="shop-sidebar">
              <!-- Danh mục -->
              <div class="filter-section">
                <div class="filter-section-header" onclick="this.parentElement.classList.toggle('collapsed')">
                  <span class="filter-section-title">Danh mục sản phẩm</span>
                  <span class="filter-section-toggle">▼</span>
                </div>
                <div class="filter-section-body">
                  <ul class="filter-category-list">
                    <li><a href="#/products" class="${d?"":"active-filter"}">Tất cả sản phẩm</a></li>
                    ${p.map(l=>`
                      <li class="filter-category-item">
                        <a href="#/products?categoryId=${l.id}" class="${d===String(l.id)?"active-filter":""}" style="font-weight:700;">${l.name}</a>
                        <ul class="filter-category-children">
                          ${c.filter(g=>String(g.parentId)===String(l.id)).map(g=>`
                            <li class="filter-category-item">
                              <a href="#/products?categoryId=${g.id}" class="${d===String(g.id)?"active-filter":""}">- ${g.name}</a>
                            </li>
                          `).join("")}
                        </ul>
                      </li>
                    `).join("")}
                  </ul>
                </div>
              </div>

              <!-- Giá -->
              <div class="filter-section">
                <div class="filter-section-header" onclick="this.parentElement.classList.toggle('collapsed')">
                  <span class="filter-section-title">Khoảng Giá</span>
                  <span class="filter-section-toggle">▼</span>
                </div>
                <div class="filter-section-body">
                  <ul class="price-filter-list">
                    <li class="price-filter-option ${(t==null?void 0:t.maxPrice)==="200000"?"active":""}" data-max="200000">Dưới 200,000đ</li>
                    <li class="price-filter-option ${(t==null?void 0:t.minPrice)==="200000"&&(t==null?void 0:t.maxPrice)==="400000"?"active":""}" data-min="200000" data-max="400000">200,000đ - 400,000đ</li>
                    <li class="price-filter-option ${(t==null?void 0:t.minPrice)==="400000"&&(t==null?void 0:t.maxPrice)==="600000"?"active":""}" data-min="400000" data-max="600000">400,000đ - 600,000đ</li>
                    <li class="price-filter-option ${(t==null?void 0:t.minPrice)==="600000"?"active":""}" data-min="600000">Trên 600,000đ</li>
                  </ul>
                </div>
              </div>

              <!-- Kích cỡ -->
              <div class="filter-section">
                <div class="filter-section-header" onclick="this.parentElement.classList.toggle('collapsed')">
                  <span class="filter-section-title">Kích cỡ</span>
                  <span class="filter-section-toggle">▼</span>
                </div>
                <div class="filter-section-body">
                  <div class="size-filter-grid">
                    ${["XS","S","M","L","XL","XXL"].map(l=>`
                      <div class="size-filter-box ${(t==null?void 0:t.size)===l?"active":""}" data-size="${l}">${l}</div>
                    `).join("")}
                  </div>
                </div>
              </div>

              <!-- Màu sắc -->
              <div class="filter-section">
                <div class="filter-section-header" onclick="this.parentElement.classList.toggle('collapsed')">
                  <span class="filter-section-title">Màu sắc</span>
                  <span class="filter-section-toggle">▼</span>
                </div>
                <div class="filter-section-body">
                  <div class="color-filter-grid">
                    ${[{name:"Đen",code:"#000000"},{name:"Trắng",code:"#ffffff"},{name:"Be",code:"#d2b48c"},{name:"Xám",code:"#6b7280"},{name:"Xanh navy",code:"#1e3a5f"},{name:"Xanh lá",code:"#22c55e"},{name:"Hồng",code:"#f472b6"},{name:"Nâu",code:"#92400e"}].map(l=>`
                      <div class="color-filter-dot ${(t==null?void 0:t.color)===l.name?"active":""}" data-color="${l.name}" title="${l.name}" style="background-color: ${l.code};"></div>
                    `).join("")}
                  </div>
                </div>
              </div>
              
              <button id="clear-filters-btn" class="btn btn-outline btn-block" style="margin-top:10px;">XÓA BỘ LỌC</button>
            </aside>

            <!-- MAIN CONTENT -->
            <div class="shop-content">
              <div class="sort-bar">
                <div class="result-count">Hiển thị <strong>${s.length}</strong> sản phẩm</div>
                <select id="sort-select">
                  <option value="">Sắp xếp: Mặc định</option>
                  <option value="price_asc" ${(t==null?void 0:t.sort)==="price_asc"?"selected":""}>Giá: Thấp đến Cao</option>
                  <option value="price_desc" ${(t==null?void 0:t.sort)==="price_desc"?"selected":""}>Giá: Cao đến Thấp</option>
                  <option value="name_asc" ${(t==null?void 0:t.sort)==="name_asc"?"selected":""}>Tên: A - Z</option>
                  <option value="name_desc" ${(t==null?void 0:t.sort)==="name_desc"?"selected":""}>Tên: Z - A</option>
                </select>
              </div>

              <div class="products-grid">
                ${s.map(l=>this.renderProductCard(l)).join("")||`
                  <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>Không tìm thấy sản phẩm nào phù hợp</h3>
                    <p>Vui lòng thử điều chỉnh lại bộ lọc của bạn.</p>
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      `;e.innerHTML=b.render(h),b.bindEvents(),this.bindListEvents(t||{})}catch(n){console.error("ProductController.renderList error:",n),e.innerHTML=b.render(`
        <div class="container" style="padding:80px 0; text-align:center;">
          <h2>Lỗi kết nối API. Vui lòng kiểm tra server.</h2>
        </div>
      `),b.bindEvents()}}static bindListEvents(e){var n,o;const t=r=>{const s=new URLSearchParams(window.location.hash.split("?")[1]||"");Object.entries(r).forEach(([i,d])=>{d===null||d===""?s.delete(i):s.set(i,d)}),window.location.hash=`#/products?${s.toString()}`};(n=document.getElementById("sort-select"))==null||n.addEventListener("change",r=>{t({sort:r.target.value})}),document.querySelectorAll(".price-filter-option").forEach(r=>{r.addEventListener("click",()=>{const s=r.getAttribute("data-min")||"",i=r.getAttribute("data-max")||"";r.classList.contains("active")?t({minPrice:"",maxPrice:""}):t({minPrice:s,maxPrice:i})})}),document.querySelectorAll(".size-filter-box").forEach(r=>{r.addEventListener("click",()=>{const s=r.getAttribute("data-size")||"";t({size:r.classList.contains("active")?"":s})})}),document.querySelectorAll(".color-filter-dot").forEach(r=>{r.addEventListener("click",()=>{const s=r.getAttribute("data-color")||"";t({color:r.classList.contains("active")?"":s})})}),(o=document.getElementById("clear-filters-btn"))==null||o.addEventListener("click",()=>{const r=new URLSearchParams(window.location.hash.split("?")[1]||"");r.delete("minPrice"),r.delete("maxPrice"),r.delete("size"),r.delete("color"),r.delete("sort"),window.location.hash=`#/products?${r.toString()}`})}static renderProductCard(e){const t=e.colors||[];return`
      <div class="product-card" style="transition:transform 0.3s; border-radius:8px; overflow:hidden;">
        <a href="#/product/${e.id}" style="text-decoration:none; color:inherit;">
          <div class="product-img-box" style="border-radius:8px; overflow:hidden; position:relative;">
            ${e.isOnSale?`<div class="product-discount-badge">-${e.discountPercent}%</div>`:""}
            <img src="${e.img}" alt="${e.name}" class="product-img" loading="lazy">
          </div>
          <div class="product-info" style="padding-top:12px;">
            <h3 class="product-name" style="font-size:14px; font-weight:600;">${e.name}</h3>
            <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
              <span class="product-price" style="color:${e.isOnSale?"#da291c":"var(--text-primary)"}; font-weight:700;">${e.formattedSalePrice||e.formattedPrice}</span>
              ${e.isOnSale?`<span style="font-size:12px; color:var(--text-secondary); text-decoration:line-through;">${e.formattedPrice}</span>`:""}
            </div>
            ${t.length>0?`
              <div style="display:flex; gap:5px; margin-top:8px; align-items:center;">
                ${t.slice(0,5).map(n=>{const o=typeof n=="object"?n.code:"#ccc";return`<div title="${typeof n=="object"?n.name:String(n)}" style="width:14px; height:14px; border-radius:50%; background:${o}; border:${o==="#ffffff"||o==="#FFFFFF"||o==="#fff"?"1px solid #ddd":"1px solid transparent"}; flex-shrink:0;"></div>`}).join("")}
                ${t.length>5?`<span style="font-size:11px; color:#999;">+${t.length-5}</span>`:""}
              </div>
            `:""}
          </div>
        </a>
      </div>
    `}}class kt extends U{constructor(){super("orders")}async getByUser(e){return await $(`/api/orders/user/${e}`)||[]}async create(e){const t=await $("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t)throw new Error("Tạo đơn hàng thất bại");return t}async updateStatus(e,t){return this.update(e,{status:t})}}const L=new kt;class $t{static init(){window.addEventListener("cart-open",()=>this.renderDrawer()),window.addEventListener("cart-updated",()=>{var e;(e=document.getElementById("cart-drawer"))!=null&&e.classList.contains("open")&&this.renderDrawer()}),window.addEventListener("auth-changed",async()=>{z.isLoggedIn()&&await C.loadFromServer(),this.renderDrawer()}),document.addEventListener("click",async e=>{var n;const t=e.target;if(t.id==="btn-open-checkout-modal"||t.closest("#btn-open-checkout-modal")){this.openCheckoutModal();return}if(t.id==="btn-confirm-order"||t.closest("#btn-confirm-order")){await this.handleCheckout();return}if(t.id==="btn-cancel-checkout"||t.closest("#btn-cancel-checkout")){(n=document.getElementById("checkout-modal"))==null||n.remove();return}}),z.isLoggedIn()&&C.loadFromServer().catch(()=>{})}static openCheckoutModal(){var c,f;if(!z.isLoggedIn()){x("Vui lòng đăng nhập để đặt hàng","warning"),(c=document.getElementById("close-cart"))==null||c.click(),window.location.hash="#/login";return}const e=z.getCurrentUser(),t=C.getCart();if(t.length===0){x("Giỏ hàng trống","warning");return}const n=C.getTotal(),o=n>=5e5?0:3e4,r=n+o;(f=document.getElementById("checkout-modal"))==null||f.remove();const s=document.createElement("div");s.id="checkout-modal",s.style.cssText=`
      position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,0.6);
      display:flex; align-items:center; justify-content:center; padding:20px;
    `,s.innerHTML=`
      <div style="background:#fff; border-radius:16px; width:100%; max-width:520px; max-height:90vh; overflow-y:auto; padding:32px; box-shadow:0 25px 60px rgba(0,0,0,0.3);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h2 style="font-size:20px; font-weight:700; color:#1a1a2e;">🛒 Xác Nhận Đặt Hàng</h2>
          <button id="btn-cancel-checkout" style="background:none; border:none; font-size:24px; cursor:pointer; color:#666;">✕</button>
        </div>

        <div style="margin-bottom:20px;">
          <h3 style="font-size:14px; font-weight:600; color:#666; text-transform:uppercase; margin-bottom:12px; letter-spacing:1px;">Thông tin nhận hàng</h3>
          <div style="display:grid; gap:12px;">
            <input id="co-name"    type="text"  placeholder="Họ và tên *" required
              value="${(e==null?void 0:e.name)||""}"
              style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit;">
            <input id="co-phone"   type="tel"   placeholder="Số điện thoại *" required
              style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit;">
            <input id="co-email"   type="email" placeholder="Email *" required
              value="${(e==null?void 0:e.email)||""}"
              style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit;">
            <input id="co-address" type="text"  placeholder="Địa chỉ giao hàng *" required
              style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit;">
            <select id="co-payment" style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; outline:none; font-family:inherit; background:#fff;">
              <option value="cod">💵 Thanh toán khi nhận hàng (COD)</option>
              <option value="bank">🏦 Chuyển khoản ngân hàng</option>
              <option value="momo">📱 Ví MoMo</option>
              <option value="vnpay">💳 VNPay</option>
            </select>
            <!-- QR CODE CONTAINER -->
            <div id="qr-container" style="display:none; text-align:center; padding:16px; background:#f8f9fa; border-radius:12px; border:1px dashed #ccc; margin-top:8px;">
              <h4 style="font-size:14px; color:#e63946; margin-bottom:8px;">Quét mã QR để thanh toán</h4>
              <img id="qr-img" src="" style="width:200px; height:200px; object-fit:contain; border-radius:8px; margin:0 auto;">
              <p style="font-size:12px; color:#666; margin-top:8px;">Vui lòng chuyển đúng số tiền: <strong id="qr-amount-text" style="color:#1a1a2e; font-size:16px;"></strong></p>
              <p style="font-size:11px; color:#888; margin-top:4px;">(Đơn hàng sẽ tự động hủy nếu không thanh toán trong 24h)</p>
            </div>
          </div>
        </div>

        <div style="background:#f8f9fa; border-radius:12px; padding:16px; margin-bottom:20px;">
          <h3 style="font-size:14px; font-weight:600; color:#666; text-transform:uppercase; margin-bottom:12px; letter-spacing:1px;">Sản phẩm đặt hàng</h3>
          ${t.map(y=>{var h;const u=y.product.salePrice||y.product.price;return`
              <div style="display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid #e9ecef;">
                <img src="${((h=y.product.images)==null?void 0:h[0])||""}" alt="${y.product.name}" style="width:48px; height:60px; object-fit:cover; border-radius:8px;">
                <div style="flex:1; min-width:0;">
                  <div style="font-size:13px; font-weight:500; color:#1a1a2e; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${y.product.name}</div>
                  <div style="font-size:12px; color:#666; margin-top:2px;">Size: ${y.size} | Màu: ${y.color} | SL: ${y.quantity}</div>
                </div>
                <div style="font-size:13px; font-weight:600; color:#e63946; white-space:nowrap;">${A(u*y.quantity)}</div>
              </div>
            `}).join("")}
          <div style="display:flex; justify-content:space-between; margin-top:12px; font-size:13px; color:#666;">
            <span>Tạm tính</span><span>${A(n)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:4px; font-size:13px; color:#666;">
            <span>Phí giao hàng</span><span style="color:${o===0?"#16a34a":"#1a1a2e"}">${o===0?"Miễn phí":A(o)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:12px; padding-top:12px; border-top:2px solid #dee2e6; font-size:16px; font-weight:700; color:#e63946;">
            <span>Tổng cộng</span><span>${A(r)}</span>
          </div>
        </div>

        <button id="btn-confirm-order" style="
          width:100%; padding:16px; background:linear-gradient(135deg,#e63946,#c1121f);
          color:#fff; border:none; border-radius:12px; font-size:16px; font-weight:700;
          cursor:pointer; letter-spacing:0.5px; font-family:inherit;
          transition:transform 0.2s, box-shadow 0.2s;
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(230,57,70,0.4)'"
           onmouseout="this.style.transform=''; this.style.boxShadow=''">
          ✅ Xác Nhận Đặt Hàng
        </button>
      </div>
    `,document.body.appendChild(s);const i=document.getElementById("co-payment"),d=document.getElementById("qr-container"),a=document.getElementById("qr-img"),p=document.getElementById("qr-amount-text");i&&d&&a&&p&&i.addEventListener("change",()=>{var u,h;if(i.value!=="cod"){d.style.display="block",p.textContent=A(r);const l="970422",g="0000123456789",v="GENZ FASHION",k=`Thanh toan don hang ${((h=(u=document.getElementById("co-phone"))==null?void 0:u.value)==null?void 0:h.trim())||(e==null?void 0:e.phone)||"Khach hang"}`;a.src=`https://img.vietqr.io/image/${l}-${g}-compact.png?amount=${r}&addInfo=${encodeURIComponent(k)}&accountName=${encodeURIComponent(v)}`}else d.style.display="none"}),s.addEventListener("click",y=>{y.target===s&&s.remove()})}static async handleCheckout(){var f,y,u,h,l,g,v,E,k,T,P,D,W;if(!z.isLoggedIn()){x("Vui lòng đăng nhập để đặt hàng","warning"),(f=document.getElementById("checkout-modal"))==null||f.remove(),(y=document.getElementById("close-cart"))==null||y.click(),window.location.hash="#/login";return}const e=z.getCurrentUser(),t=C.getCart();if(t.length===0){x("Giỏ hàng trống","warning");return}const n=(h=(u=document.getElementById("co-name"))==null?void 0:u.value)==null?void 0:h.trim(),o=(g=(l=document.getElementById("co-phone"))==null?void 0:l.value)==null?void 0:g.trim(),r=(E=(v=document.getElementById("co-email"))==null?void 0:v.value)==null?void 0:E.trim(),s=(T=(k=document.getElementById("co-address"))==null?void 0:k.value)==null?void 0:T.trim(),i=(P=document.getElementById("co-payment"))==null?void 0:P.value;if(!n||!o||!r||!s){x("Vui lòng điền đầy đủ thông tin giao hàng","error");return}const d=C.getTotal(),a=d>=5e5?0:3e4,p={userId:String(e.id),customerName:n,customerEmail:r,customerPhone:o,customerAddress:s,paymentMethod:i||"cod",paymentStatus:"unpaid",items:t.map(B=>{var Q;return{productId:B.product.id,productName:B.product.name,img:((Q=B.product.images)==null?void 0:Q[0])||"",price:B.product.salePrice||B.product.price,quantity:B.quantity,size:B.size,color:B.color}}),total:d+a,shipping:a},c=document.getElementById("btn-confirm-order");c&&(c.disabled=!0,c.textContent="⏳ Đang xử lý...");try{const B=await L.create(p);C.clearCart(),(D=document.getElementById("checkout-modal"))==null||D.remove(),(W=document.getElementById("close-cart"))==null||W.click(),x(`🎉 Đặt hàng thành công! Mã đơn: #${B==null?void 0:B.id}`,"success"),setTimeout(()=>{window.location.hash="#/my-orders"},1500)}catch(B){x(B.message||"Đặt hàng thất bại, vui lòng thử lại","error"),c&&(c.disabled=!1,c.textContent="✅ Xác Nhận Đặt Hàng")}}static renderDrawer(){const e=C.getCart(),t=document.getElementById("cart-drawer-items"),n=document.getElementById("cart-drawer-total"),o=document.getElementById("cart-drawer-title"),r=document.getElementById("cart-selected-count");if(!t||!n||!o)return;const s=C.getItemCount();if(o.textContent=`Giỏ hàng (${s})`,r&&(r.textContent=s.toString()),e.length===0){t.innerHTML=`
        <div style="text-align:center; padding:40px 0; color:var(--text-secondary)">
          <div style="font-size:48px; margin-bottom:16px;">🛒</div>
          <p style="margin-bottom:16px;">Giỏ hàng đang trống</p>
          <button class="btn btn-primary" onclick="document.getElementById('close-cart').click(); window.location.hash='#/products'">Tiếp tục mua sắm</button>
        </div>
      `,n.textContent="0 đ";const a=document.getElementById("btn-open-checkout-modal");a&&(a.style.display="none");return}let i=0;t.innerHTML=e.map(a=>{var f;const p=a.product.salePrice||a.product.price;i+=p*a.quantity;const c=C.isGuest();return`
        <div class="cart-item">
          <img src="${((f=a.product.images)==null?void 0:f[0])||"https://picsum.photos/seed/genz/80/100"}" alt="${a.product.name}" class="cart-item-img">
          <div class="cart-item-info">
            <div class="cart-item-name">${a.product.name}</div>
            <div class="cart-item-variant">Màu: ${a.color} | Size: ${a.size}</div>
            <div class="cart-item-price">${A(p)}</div>
            <div class="qty-control">
              <button class="qty-btn btn-update-qty" data-id="${a.product.id}" data-size="${a.size}" data-color="${a.color}" data-change="-1">-</button>
              <input type="text" class="qty-input" value="${a.quantity}" readonly>
              <button class="qty-btn btn-update-qty" data-id="${a.product.id}" data-size="${a.size}" data-color="${a.color}" data-change="1">+</button>
            </div>
            ${c?'<div style="font-size:11px; color:#d97706; margin-top:4px;">⚠️ Đăng nhập để lưu giỏ hàng</div>':""}
          </div>
          <button class="cart-item-remove btn-remove-item" data-id="${a.product.id}" data-size="${a.size}" data-color="${a.color}">✕</button>
        </div>
      `}).join(""),n.textContent=A(i);const d=document.getElementById("btn-open-checkout-modal");d&&(d.style.display=""),this.bindDrawerEvents()}static bindDrawerEvents(){document.querySelectorAll(".btn-update-qty").forEach(e=>{e.addEventListener("click",t=>{const n=t.currentTarget,o=n.dataset.id||"",r=n.dataset.size||"",s=n.dataset.color||"",i=parseInt(n.dataset.change||"0"),a=C.getCart().find(p=>String(p.product.id)===o&&p.size===r&&p.color===s);a&&C.updateQuantity(o,r,s,a.quantity+i)})}),document.querySelectorAll(".btn-remove-item").forEach(e=>{e.addEventListener("click",t=>{const n=t.currentTarget;C.removeItem(n.dataset.id||"",n.dataset.size||"",n.dataset.color||"")})})}}class rt{static renderLogin(){return`
      <div style="min-height:100vh; display:flex; background:white;">
        <!-- Left Banner -->
        <div style="flex:1; background:url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop') center/cover; position:relative; display:none; @media(min-width:768px){display:block;}">
          <div style="position:absolute; inset:0; background:linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1));"></div>
          <div style="position:absolute; bottom:40px; left:40px; color:white; max-width:400px;">
            <h2 style="font-size:32px; font-weight:800; margin-bottom:12px; letter-spacing:1px; text-transform:uppercase;">Bộ Sưu Tập Mới</h2>
            <p style="font-size:16px; opacity:0.9; line-height:1.6;">Khám phá những xu hướng thời trang hàng đầu dành cho bạn. Đăng nhập để nhận ngay ưu đãi độc quyền.</p>
          </div>
        </div>
        
        <!-- Right Form -->
        <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:40px 24px; background:#f9f9f9;">
          <div style="width:100%; max-width:400px; background:white; padding:48px 40px; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.05);">
            <div style="text-align:center; margin-bottom:32px;">
              <a href="#/" style="display:inline-block; font-size:28px; font-weight:900; letter-spacing:4px; color:#111; text-decoration:none; margin-bottom:8px;">GENZ</a>
              <h1 style="font-size:22px; font-weight:700; margin-bottom:8px; color:#333;">Đăng nhập tài khoản</h1>
              <p style="color:var(--text-secondary); font-size:14px;">Chào mừng bạn trở lại!</p>
            </div>
            
            <form id="login-form">
              <div id="auth-error" style="display:none; background:#fee2e2; color:#b91c1c; padding:12px 16px; border-radius:4px; font-size:14px; margin-bottom:16px;"></div>
              
              <div style="margin-bottom:20px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">Email</label>
                <input type="email" id="email" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Nhập email của bạn" required onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <div style="margin-bottom:24px;">
                <label style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">
                  Mật khẩu
                  <a href="#" style="color:var(--primary); text-decoration:none; font-weight:500;">Quên mật khẩu?</a>
                </label>
                <input type="password" id="password" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Nhập mật khẩu" required onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <button type="submit" style="width:100%; padding:16px; background:#111; color:white; border:none; border-radius:6px; font-size:15px; font-weight:700; cursor:pointer; text-transform:uppercase; letter-spacing:1px; transition:background 0.2s;" onmouseover="this.style.background='var(--primary)'" onmouseout="this.style.background='#111'">ĐĂNG NHẬP</button>
            </form>
            
            <div style="text-align:center; margin-top:24px; font-size:14px; color:var(--text-secondary);">
              Chưa có tài khoản? <a href="#/register" style="color:var(--primary); font-weight:700; text-decoration:none;">Đăng ký ngay</a>
            </div>
            
          </div>
        </div>
      </div>
    `}static renderRegister(){return`
      <div style="min-height:100vh; display:flex; background:white;">
        <!-- Left Banner -->
        <div style="flex:1; background:url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop') center/cover; position:relative; display:none; @media(min-width:768px){display:block;}">
          <div style="position:absolute; inset:0; background:linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1));"></div>
          <div style="position:absolute; bottom:40px; left:40px; color:white; max-width:400px;">
            <h2 style="font-size:32px; font-weight:800; margin-bottom:12px; letter-spacing:1px; text-transform:uppercase;">Thành Viên Mới</h2>
            <p style="font-size:16px; opacity:0.9; line-height:1.6;">Đăng ký tài khoản ngay hôm nay để trở thành một phần của cộng đồng GenZ và nhận nhiều ưu đãi hấp dẫn.</p>
          </div>
        </div>
        
        <!-- Right Form -->
        <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:40px 24px; background:#f9f9f9;">
          <div style="width:100%; max-width:400px; background:white; padding:48px 40px; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.05);">
            <div style="text-align:center; margin-bottom:32px;">
              <a href="#/" style="display:inline-block; font-size:28px; font-weight:900; letter-spacing:4px; color:#111; text-decoration:none; margin-bottom:8px;">GENZ</a>
              <h1 style="font-size:22px; font-weight:700; margin-bottom:8px; color:#333;">Tạo tài khoản mới</h1>
              <p style="color:var(--text-secondary); font-size:14px;">Tham gia để mua sắm tiện lợi hơn</p>
            </div>
            
            <form id="register-form">
              <div id="auth-error" style="display:none; background:#fee2e2; color:#b91c1c; padding:12px 16px; border-radius:4px; font-size:14px; margin-bottom:16px;"></div>
              
              <div style="margin-bottom:16px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">Họ và tên</label>
                <input type="text" id="name" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Nhập họ và tên" required onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <div style="margin-bottom:16px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">Email</label>
                <input type="email" id="email" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Nhập email" required onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <div style="margin-bottom:16px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">Mật khẩu</label>
                <input type="password" id="password" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Tối thiểu 6 ký tự" required minlength="6" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <div style="margin-bottom:24px;">
                <label style="display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:#555;">Xác nhận mật khẩu</label>
                <input type="password" id="confirm-password" style="width:100%; padding:14px 16px; border:1px solid #e1e1e1; border-radius:6px; font-size:14px; outline:none; transition:border 0.2s;" placeholder="Nhập lại mật khẩu" required minlength="6" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#e1e1e1'">
              </div>
              
              <button type="submit" style="width:100%; padding:16px; background:#111; color:white; border:none; border-radius:6px; font-size:15px; font-weight:700; cursor:pointer; text-transform:uppercase; letter-spacing:1px; transition:background 0.2s;" onmouseover="this.style.background='var(--primary)'" onmouseout="this.style.background='#111'">ĐĂNG KÝ</button>
            </form>
            
            <div style="text-align:center; margin-top:24px; font-size:14px; color:var(--text-secondary);">
              Đã có tài khoản? <a href="#/login" style="color:var(--primary); font-weight:700; text-decoration:none;">Đăng nhập</a>
            </div>
          </div>
        </div>
      </div>
    `}}class st{static renderLogin(e){if(z.isLoggedIn()){window.location.hash="#/";return}e.innerHTML=rt.renderLogin(),this.bindLoginEvents()}static renderRegister(e){if(z.isLoggedIn()){window.location.hash="#/";return}e.innerHTML=rt.renderRegister(),this.bindRegisterEvents()}static bindLoginEvents(){const e=document.getElementById("login-form"),t=document.getElementById("auth-error");e&&e.addEventListener("submit",async n=>{n.preventDefault();const o=document.getElementById("email").value.trim(),r=document.getElementById("password").value.trim();if(t&&(t.style.display="none"),!o||!r){t&&(t.textContent="Vui lòng nhập email và mật khẩu",t.style.display="block");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)){t&&(t.textContent="Email không hợp lệ",t.style.display="block");return}try{await z.login(o,r),x("Đăng nhập thành công!","success"),window.location.hash=z.isAdmin()?"#/admin":"#/"}catch(i){t&&(t.textContent=i.message||"Đăng nhập thất bại",t.style.display="block")}})}static bindRegisterEvents(){const e=document.getElementById("register-form"),t=document.getElementById("auth-error");e&&e.addEventListener("submit",async n=>{n.preventDefault();const o=document.getElementById("name").value.trim(),r=document.getElementById("email").value.trim(),s=document.getElementById("password").value.trim(),i=document.getElementById("confirm-password").value.trim();if(t&&(t.style.display="none"),!o||!r||!s||!i){t&&(t.textContent="Vui lòng nhập đầy đủ thông tin",t.style.display="block");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)){t&&(t.textContent="Email không hợp lệ",t.style.display="block");return}if(s.length<6){t&&(t.textContent="Mật khẩu phải có ít nhất 6 ký tự",t.style.display="block");return}if(s!==i){t&&(t.textContent="Mật khẩu xác nhận không khớp",t.style.display="block");return}try{await z.register(o,r,s),x("Đăng ký thành công!","success"),window.location.hash="#/login"}catch(a){t&&(t.textContent=a.message||"Đăng ký thất bại",t.style.display="block")}})}}class R{static renderDashboard(e){return`
      <div>
        <h2 style="font-size:24px; font-weight:700; margin-bottom:24px; color:var(--text-primary);">Tổng quan</h2>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:20px;">
          <div style="background:white; padding:24px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
            <div style="color:var(--text-secondary); font-size:14px; margin-bottom:8px;">Doanh thu</div>
            <div style="font-size:28px; font-weight:700; color:var(--primary);">${new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(e.revenue)}</div>
          </div>
          <div style="background:white; padding:24px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
            <div style="color:var(--text-secondary); font-size:14px; margin-bottom:8px;">Đơn hàng</div>
            <div style="font-size:28px; font-weight:700;">${e.orders}</div>
          </div>
          <div style="background:white; padding:24px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
            <div style="color:var(--text-secondary); font-size:14px; margin-bottom:8px;">Sản phẩm</div>
            <div style="font-size:28px; font-weight:700;">${e.products}</div>
          </div>
          <div style="background:white; padding:24px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
            <div style="color:var(--text-secondary); font-size:14px; margin-bottom:8px;">Khách hàng</div>
            <div style="font-size:28px; font-weight:700;">${e.users}</div>
          </div>
        </div>
      </div>
    `}static renderProducts(e,t){return`
      <div>
        <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
          <h2 style="font-size:24px; font-weight:700;">Quản lý Sản phẩm</h2>
          <button id="btn-add-product" class="btn btn-primary">+ Thêm Sản phẩm</button>
        </div>
        
        <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
              <tr>
                <th style="padding:16px;">STT</th>
                <th style="padding:16px;">Ảnh</th>
                <th style="padding:16px;">Tên SP</th>
                <th style="padding:16px;">Giá</th>
                <th style="padding:16px;">Khối lượng</th>
                <th style="padding:16px;">Kích cỡ</th>
                <th style="padding:16px;">Màu sắc</th>
                <th style="padding:16px;">Tồn kho</th>
                <th style="padding:16px;">Danh mục</th>
                <th style="padding:16px;">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${e.map((n,o)=>`
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:16px;">${o+1}</td>
                  <td style="padding:16px;"><img src="${n.img}" style="width:40px; height:50px; object-fit:cover; border-radius:4px;"></td>
                  <td style="padding:16px; font-weight:500;">${n.name}</td>
                  <td style="padding:16px; color:var(--primary); font-weight:600;">${n.formattedPrice}</td>
                  <td style="padding:16px;">${n.weight}g</td>
                  <td style="padding:16px;">${n.sizes.join(", ")}</td>
                  <td style="padding:16px;">${n.colors.map(r=>r.name).join(", ")}</td>
                  <td style="padding:16px;">${n.stock}</td>
                  <td style="padding:16px;">
                    ${(()=>{const r=t.find(s=>s.id===n.categoryId);if(!r)return"Unknown";if(r.parentId){const s=t.find(i=>i.id===r.parentId);return s?s.name+" -> "+r.name:r.name}return r.name})()}
                  </td>
                  <td style="padding:16px;">
                    <button class="btn-edit-product" data-id="${n.id}" style="color:#0071e3; margin-right:12px; font-weight:bold;">Sửa</button>
                    <button class="btn-delete-product" data-id="${n.id}" style="color:var(--primary);">Xóa</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- Modal -->
        <div id="product-modal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center;">
          <div style="background:white; width:600px; max-height:90vh; overflow-y:auto; border-radius:8px; padding:24px;">
            <h3 id="modal-title" style="font-size:20px; font-weight:700; margin-bottom:20px;">Thêm Sản phẩm</h3>
            <form id="product-form">
              <input type="hidden" id="p-id">
              <div class="mt-2"><label>Tên SP (*)</label><input type="text" id="p-name" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" required></div>
              <div class="mt-2"><label>SKU</label><input type="text" id="p-sku" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
              <div class="mt-2"><label>Link Ảnh Chính hoặc Tải lên (*)</label>
                <div style="display:flex; gap:10px; align-items:flex-start;">
                  <div style="flex:1;">
                    <input type="url" id="p-img" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" placeholder="Nhập URL ảnh..." required>
                    <input type="file" id="p-img-upload" class="form-control mt-2" accept="image/*" style="width:100%; padding:10px; border:1px solid #ccc;">
                  </div>
                  <img id="p-img-preview" src="" style="width:80px; height:80px; object-fit:cover; border-radius:4px; border:1px solid #eee; display:none;">
                </div>
              </div>
              <div class="d-flex" style="gap:16px;">
                <div class="mt-2" style="flex:1"><label>Giá (*)</label><input type="number" id="p-price" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" required></div>
                <div class="mt-2" style="flex:1"><label>Giá Sale</label><input type="number" id="p-saleprice" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
              </div>
              <div class="d-flex" style="gap:16px;">
                <div class="mt-2" style="flex:1"><label>Khối lượng (g)</label><input type="number" id="p-weight" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" value="0"></div>
                <div class="mt-2" style="flex:1"><label>Kích cỡ (Cùng phẩy, vd: S,M,L)</label><input type="text" id="p-sizes" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
              </div>
              <div class="d-flex" style="gap:16px;">
                <div class="mt-2" style="flex:1"><label>Màu sắc (Cách phẩy, vd: Đỏ,Xanh)</label><input type="text" id="p-colors" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
                <div class="mt-2" style="flex:1"><label>Tồn kho (*)</label><input type="number" id="p-stock" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" value="10" required></div>
              </div>
              <div class="mt-2"><label>Danh mục (*)</label>
                <select id="p-category" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" required>
                  ${t.map(n=>{const o=n.parentId?t.find(s=>s.id===n.parentId):null,r=o?`${o.name} -> ${n.name}`:n.name;return`<option value="${n.id}">${r}</option>`}).join("")}
                </select>
              </div>
              <div class="mt-2"><label>Mô tả</label><textarea id="p-desc" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" rows="3"></textarea></div>
              <div class="mt-2"><label>Chất liệu</label><input type="text" id="p-material" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
              
              <div class="d-flex justify-between mt-4">
                <button type="button" id="btn-cancel-modal" class="btn btn-outline">Hủy</button>
                <button type="submit" id="btn-save-product" class="btn btn-primary">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `}static renderCategories(e,t){return`
      <div>
        <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
          <h2 style="font-size:24px; font-weight:700;">Quản lý Danh mục</h2>
          <button id="btn-add-category" class="btn btn-primary">+ Thêm Danh mục</button>
        </div>
        
        <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
              <tr>
                <th style="padding:16px;">STT</th>
                <th style="padding:16px;">Icon</th>
                <th style="padding:16px;">Tên Danh Mục</th>
                <th style="padding:16px;">Số lượng sản phẩm</th>
                <th style="padding:16px;">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              ${e.map((n,o)=>{const r=t.filter(s=>{var i;return s.categoryId===n.id||((i=e.find(d=>d.id===s.categoryId))==null?void 0:i.parentId)===n.id}).length;return`
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:16px;">${o+1}</td>
                  <td style="padding:16px;">${n.icon}</td>
                  <td style="padding:16px;">
                    ${(()=>{if(n.parentId){const s=e.find(i=>i.id===n.parentId);return s?`<span style="color:#666;">${s.name}</span> <span style="margin:0 8px;">&rarr;</span> <b>${n.name}</b>`:n.name}return`<b>${n.name}</b>`})()}
                  </td>
                  <td style="padding:16px;">${r} sản phẩm</td>
                  <td style="padding:16px;">
                    <button class="btn-edit-category" data-id="${n.id}" style="color:#0071e3; margin-right:12px; font-weight:bold;">Sửa</button>
                    <button class="btn-delete-category" data-id="${n.id}" style="color:var(--primary);">Xóa</button>
                  </td>
                </tr>
              `}).join("")}
            </tbody>
          </table>
        </div>

        <!-- Modal cho Danh mục -->
        <div id="category-modal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center;">
          <div style="background:white; width:500px; border-radius:8px; padding:24px;">
            <h3 id="cat-modal-title" style="font-size:20px; font-weight:700; margin-bottom:20px;">Thêm Danh Mục</h3>
            <form id="category-form">
              <input type="hidden" id="c-id">
              <div class="mt-2"><label>Tên Danh mục (*)</label><input type="text" id="c-name" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;" required></div>
              <div class="mt-2"><label>Icon (Mặc định 📌)</label><input type="text" id="c-icon" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;"></div>
              <div class="mt-2"><label>Danh mục cha (Tùy chọn)</label>
                <select id="c-parent" class="form-control" style="width:100%; padding:10px; border:1px solid #ccc;">
                  <option value="">-- Không có (Danh mục gốc) --</option>
                  ${e.filter(n=>!n.parentId).map(n=>`<option value="${n.id}">${n.name}</option>`).join("")}
                </select>
              </div>
              <div class="d-flex justify-between mt-4">
                <button type="button" id="btn-cancel-cat-modal" class="btn btn-outline">Hủy</button>
                <button type="submit" id="btn-save-category" class="btn btn-primary">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `}static renderOrders(e){return`
      <div>
        <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
          <h2 style="font-size:24px; font-weight:700;">Quản lý Đơn hàng</h2>
        </div>
        
        <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
              <tr>
                <th style="padding:16px;">Mã ĐH</th>
                <th style="padding:16px;">Khách hàng</th>
                <th style="padding:16px;">Ngày đặt</th>
                <th style="padding:16px;">Tổng tiền</th>
                <th style="padding:16px;">Trạng thái</th>
                <th style="padding:16px;">Thanh toán</th>
                <th style="padding:16px;">Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(t=>`
                <tr style="border-bottom:1px solid var(--border); ${t.cancelRequested?"background:#fefce8;":""}">
                  <td style="padding:16px;">
                    <div style="font-weight:600; color:var(--text);">${String(t.id).substring(0,8)}...</div>
                    ${t.cancelRequested?'<div style="margin-top:4px;"><span style="background:#fef08a; color:#854d0e; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:bold;">⚠️ Yêu cầu hủy</span></div>':""}
                    <button class="btn-view-order-details" data-id="${t.id}" style="margin-top:8px; background:transparent; border:1px solid var(--primary); color:var(--primary); padding:2px 6px; border-radius:4px; font-size:11px; cursor:pointer;">Xem chi tiết</button>
                  </td>
                  <td style="padding:16px;">
                    <div style="font-weight:500;">${t.customerName}</div>
                    <div style="font-size:12px; color:var(--text-secondary);">${t.customerPhone}</div>
                  </td>
                  <td style="padding:16px;">${t.formattedDate}</td>
                  <td style="padding:16px; font-weight:600; color:var(--primary);">${t.formattedTotal}</td>
                  <td style="padding:16px;">
                    <span style="background:${t.statusColor}; color:white; padding:4px 8px; border-radius:4px; font-size:12px;">${t.statusLabel}</span>
                    ${t.cancelRequested&&t.cancelReason?`<div style="font-size:11px; color:#b45309; margin-top:4px;">Lý do hủy: ${t.cancelReason}</div>`:""}
                    ${t.returnRequested?`<div style="font-size:11px; color:#d97706; margin-top:4px; font-weight:600;">Lý do hoàn: ${t.returnReason}</div>`:""}
                  </td>
                  <td style="padding:16px;">
                    <div style="font-size:12px; font-weight:600; padding:4px 8px; border-radius:4px; display:inline-block; border:1px solid ${t.paymentStatus==="paid"||t.paymentStatus==="refunded"?"#16a34a":"#d97706"}; color:${t.paymentStatus==="paid"||t.paymentStatus==="refunded"?"#16a34a":"#d97706"}; background:${t.paymentStatus==="paid"||t.paymentStatus==="refunded"?"#f0fdf4":"#fffbeb"};">
                      ${t.paymentStatus==="paid"?"Đã TT":t.paymentStatus==="refunded"?"Đã hoàn tiền":t.paymentStatus==="refund_requested"?"Yêu cầu hoàn":"Chưa TT"}
                    </div>
                  </td>
                  <td style="padding:16px;">
                    ${t.cancelRequested?`
                      <div style="display:flex; gap:8px;">
                        <button class="btn-approve-cancel" data-id="${t.id}" style="background:#ef4444; color:#fff; border:none; padding:4px 8px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold;">Duyệt hủy</button>
                        <button class="btn-deny-cancel" data-id="${t.id}" style="background:#e5e7eb; color:#374151; border:none; padding:4px 8px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold;">Từ chối</button>
                      </div>
                    `:t.returnRequested&&t.returnStatus==="pending"?`
                      <div style="display:flex; gap:8px;">
                        <button class="btn-approve-return" data-id="${t.id}" style="background:#f59e0b; color:#fff; border:none; padding:4px 8px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold;">Duyệt Hoàn</button>
                        <button class="btn-deny-return" data-id="${t.id}" style="background:#e5e7eb; color:#374151; border:none; padding:4px 8px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold;">Từ chối</button>
                      </div>
                    `:`
                    <select class="form-control update-order-status" data-id="${t.id}" style="padding:4px; border:1px solid var(--border);">
                      <option value="pending" ${t.status==="pending"?"selected":""}>Chờ xác nhận</option>
                      <option value="confirmed" ${t.status==="confirmed"?"selected":""}>Đã xác nhận</option>
                      <option value="shipping" ${t.status==="shipping"?"selected":""}>Đang giao hàng</option>
                      <option value="delivered" ${t.status==="delivered"?"selected":""}>Đã giao</option>
                      <option value="completed" ${t.status==="completed"?"selected":""}>Hoàn thành</option>
                      <option value="returned" ${t.status==="returned"?"selected":""}>Đã hoàn trả</option>
                      <option value="cancelled" ${t.status==="cancelled"?"selected":""}>Đã hủy</option>
                    </select>
                    `}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Order Details Modal -->
      <div id="order-details-modal" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:9999; align-items:center; justify-content:center;">
        <div style="background:#fff; width:90%; max-width:600px; border-radius:8px; overflow:hidden; display:flex; flex-direction:column; max-height:90vh;">
          <div style="padding:16px 20px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center; background:#f8fafc;">
            <h3 style="margin:0; font-size:16px; color:#1e293b;">Chi tiết đơn hàng</h3>
            <button id="close-order-modal" style="background:none; border:none; font-size:20px; cursor:pointer; color:#64748b;">&times;</button>
          </div>
          <div id="order-modal-content" style="padding:20px; overflow-y:auto; flex:1;">
            <!-- Render dynamic content here -->
          </div>
        </div>
      </div>
    `}}class dt extends Z{constructor(t){super(t.id);w(this,"userId");w(this,"customerName");w(this,"customerEmail");w(this,"customerPhone");w(this,"customerAddress");w(this,"items");w(this,"total");w(this,"status");w(this,"createdAt");w(this,"paymentMethod");w(this,"shipping");w(this,"cancelRequested");w(this,"cancelReason");w(this,"paymentStatus");w(this,"receivedAt");w(this,"returnRequested");w(this,"returnReason");w(this,"returnStatus");this.userId=t.userId,this.customerName=t.customerName,this.customerEmail=t.customerEmail,this.customerPhone=t.customerPhone,this.customerAddress=t.customerAddress,this.items=t.items||[],this.total=t.total||0,this.status=t.status||"pending",this.createdAt=t.createdAt,this.paymentMethod=t.paymentMethod||"cod",this.shipping=t.shipping||0,this.cancelRequested=t.cancelRequested||!1,this.cancelReason=t.cancelReason||"",this.paymentStatus=t.paymentStatus||"unpaid",this.receivedAt=t.receivedAt||null,this.returnRequested=t.returnRequested||!1,this.returnReason=t.returnReason||"",this.returnStatus=t.returnStatus||"none"}get formattedTotal(){return new Intl.NumberFormat("vi-VN").format(this.total)+" đ"}get formattedDate(){return new Date(this.createdAt).toLocaleString("vi-VN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})}get statusLabel(){return{pending:"Chờ xác nhận",confirmed:"Đã xác nhận",shipping:"Đang giao hàng",delivered:"Đã giao",completed:"Hoàn thành",returned:"Đã hoàn trả",cancelled:"Đã hủy"}[this.status]??this.status}get statusColor(){return{pending:"#d97706",confirmed:"#2563eb",shipping:"#7c3aed",delivered:"#059669",completed:"#16a34a",returned:"#9333ea",cancelled:"#dc2626"}[this.status]??"#666"}get statusCssClass(){return`status-${this.status}`}toString(){return`#${this.id} - ${this.customerName} - ${this.formattedTotal}`}validate(){return this.items.length>0&&this.customerName.length>0}}class j{static async checkAuth(){return z.isAdmin()?!0:(x("Bạn không có quyền truy cập trang quản trị","error"),window.location.hash="#/",!1)}static async renderDashboard(e){var t;if(await this.checkAuth())try{const[n,o,r]=await Promise.all([N.getAll(),L.getAll(),V.getAll()]),s={products:n.length,orders:o.length,revenue:o.reduce((i,d)=>i+(d.total||0),0),users:r.length};e.innerHTML=b.render(R.renderDashboard(s),!0),b.bindEvents()}catch(n){console.error(n),(t=n.message)!=null&&t.includes("403")&&(x("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại","error"),window.location.hash="#/login")}}static async renderProducts(e){if(await this.checkAuth())try{const[t,n]=await Promise.all([N.getAll(),H.getAll()]),o=t.map(s=>new M(s)),r=n.map(s=>new G(s));e.innerHTML=b.render(R.renderProducts(o,r),!0),b.bindEvents(),this.bindProductEvents(e,o,r)}catch(t){console.error(t)}}static async renderCategories(e){var t,n;if(await this.checkAuth())try{const[o,r]=await Promise.all([H.getAll(),N.getAll()]),s=o.map(y=>new G(y)),i=r.map(y=>new M(y));e.innerHTML=b.render(R.renderCategories(s,i),!0),b.bindEvents();const d=document.getElementById("category-modal"),a=document.getElementById("category-form"),p=document.getElementById("cat-modal-title"),c=y=>{d&&(d.style.display="flex",p&&(p.textContent=y?"Sửa Danh Mục":"Thêm Danh Mục"),y?(document.getElementById("c-id").value=String(y.id),document.getElementById("c-name").value=y.name,document.getElementById("c-icon").value=y.icon,document.getElementById("c-parent").value=y.parentId?String(y.parentId):""):(a==null||a.reset(),document.getElementById("c-id").value=""))},f=()=>{d&&(d.style.display="none")};(t=document.getElementById("btn-add-category"))==null||t.addEventListener("click",()=>c()),(n=document.getElementById("btn-cancel-cat-modal"))==null||n.addEventListener("click",f),a==null||a.addEventListener("submit",async y=>{y.preventDefault();const u=document.getElementById("c-id").value,h=document.getElementById("c-name").value,l=document.getElementById("c-icon").value||"📌",g=document.getElementById("c-parent").value||null,v={name:h,icon:l,parentId:g};try{u?(await H.update(u,v),x("Cập nhật thành công")):(await H.create(v),x("Thêm danh mục thành công")),f(),this.renderCategories(e)}catch(E){x(E.message||"Lỗi khi lưu danh mục","error")}}),document.querySelectorAll(".btn-edit-category").forEach(y=>{y.addEventListener("click",u=>{const h=u.currentTarget.dataset.id||"0",l=s.find(g=>String(g.id)===h);l&&c(l)})}),document.querySelectorAll(".btn-delete-category").forEach(y=>{y.addEventListener("click",async u=>{if(confirm("Xóa danh mục này?")){const h=u.currentTarget.dataset.id||"0";try{await H.delete(h),x("Xóa thành công"),this.renderCategories(e)}catch(l){x(l.message||"Lỗi khi xóa","error")}}})})}catch(o){console.error(o)}}static async renderOrders(e){if(await this.checkAuth())try{const n=(await L.getAll()).map(s=>new dt(s));e.innerHTML=b.render(R.renderOrders(n),!0),b.bindEvents(),document.querySelectorAll(".update-order-status").forEach(s=>{s.addEventListener("change",async i=>{const d=i.currentTarget,a=d.dataset.id||"0";try{const p=n.find(f=>String(f.id)===a),c={status:d.value};d.value==="delivered"||d.value==="completed"?p&&p.paymentStatus==="unpaid"&&(c.paymentStatus="paid"):(d.value==="cancelled"||d.value==="returned")&&p&&p.paymentStatus==="paid"&&(c.paymentStatus="refunded"),await L.update(a,c),x("Cập nhật trạng thái thành công","success"),this.renderOrders(e)}catch(p){x(p.message||"Lỗi cập nhật","error")}})}),document.querySelectorAll(".btn-approve-cancel").forEach(s=>{s.addEventListener("click",async i=>{const d=i.currentTarget.dataset.id||"0";if(confirm("Duyệt hủy đơn hàng này? Hệ thống sẽ chuyển trạng thái thành Đã hủy."))try{const a=n.find(c=>String(c.id)===d),p={status:"cancelled",cancelRequested:!1};a&&a.paymentStatus==="paid"&&(p.paymentStatus="refunded"),await L.update(d,p),x("Đã duyệt yêu cầu hủy","success"),this.renderOrders(e)}catch(a){x(a.message||"Lỗi duyệt","error")}})}),document.querySelectorAll(".btn-deny-cancel").forEach(s=>{s.addEventListener("click",async i=>{const d=i.currentTarget.dataset.id||"0";if(confirm("Từ chối yêu cầu hủy đơn này? Đơn hàng sẽ tiếp tục giao."))try{await L.update(d,{cancelRequested:!1,cancelReason:""}),x("Đã từ chối yêu cầu hủy","success"),this.renderOrders(e)}catch(a){x(a.message||"Lỗi","error")}})}),document.querySelectorAll(".btn-approve-return").forEach(s=>{s.addEventListener("click",async i=>{const d=i.currentTarget.dataset.id||"0";if(confirm("Duyệt yêu cầu hoàn hàng? Đơn sẽ chuyển sang Đã hoàn trả."))try{const a=n.find(c=>String(c.id)===d),p={returnStatus:"approved",status:"returned"};a&&a.paymentStatus==="paid"&&(p.paymentStatus="refunded"),await L.update(d,p),x("Đã duyệt hoàn hàng","success"),this.renderOrders(e)}catch(a){x(a.message||"Lỗi duyệt","error")}})}),document.querySelectorAll(".btn-deny-return").forEach(s=>{s.addEventListener("click",async i=>{const d=i.currentTarget.dataset.id||"0";if(confirm("Từ chối yêu cầu hoàn hàng?"))try{await L.update(d,{returnStatus:"rejected",returnRequested:!1,returnReason:""}),x("Đã từ chối hoàn hàng","success"),this.renderOrders(e)}catch(a){x(a.message||"Lỗi từ chối","error")}})}),document.querySelectorAll(".btn-delete-order").forEach(s=>{s.addEventListener("click",async i=>{const d=i.currentTarget.dataset.id||"0";if(confirm(`Xóa đơn hàng #${d}?`))try{await L.delete(d),x("Đã xóa đơn hàng","success"),this.renderOrders(e)}catch(a){x(a.message||"Lỗi xóa đơn","error")}})}),document.querySelectorAll(".btn-view-order-details").forEach(s=>{s.addEventListener("click",i=>{const d=i.currentTarget.dataset.id,a=n.find(h=>String(h.id)===d);if(!a)return;const p=document.getElementById("order-details-modal"),c=document.getElementById("order-modal-content");if(!p||!c)return;const y={cod:"Thanh toán khi nhận hàng",bank:"Chuyển khoản ngân hàng",momo:"Ví MoMo",vnpay:"VNPay"}[a.paymentMethod]||"COD",u=a.receivedAt?new Date(a.receivedAt).toLocaleString("vi-VN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}):"Chưa nhận hàng";c.innerHTML=`
            <div style="margin-bottom:16px; padding:12px; background:#f0f9ff; border-radius:6px; border:1px solid #bae6fd;">
              <div style="display:flex; flex-wrap:wrap; gap:16px; font-size:13px; color:#0369a1;">
                <div><strong>Ngày đặt:</strong> ${a.formattedDate}</div>
                <div><strong>Ngày nhận:</strong> ${u}</div>
                <div><strong>Phương thức TT:</strong> ${y}</div>
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <h4 style="margin:0 0 8px; font-size:14px; color:#333;">Thông tin khách hàng</h4>
              <div style="font-size:13px; color:#555; line-height:1.5;">
                <div><strong>Họ tên:</strong> ${a.customerName}</div>
                <div><strong>Số điện thoại:</strong> ${a.customerPhone}</div>
                <div><strong>Địa chỉ:</strong> ${a.customerAddress}</div>
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <h4 style="margin:0 0 8px; font-size:14px; color:#333;">Sản phẩm (${a.items.length})</h4>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${a.items.map(h=>`
                  <div style="display:flex; gap:12px; border:1px solid #eee; padding:8px; border-radius:4px;">
                    <img src="${h.img}" alt="${h.productName}" style="width:60px; height:60px; object-fit:cover; border-radius:4px;">
                    <div style="flex:1;">
                      <div style="font-weight:600; font-size:13px;">${h.productName}</div>
                      <div style="font-size:12px; color:#666; margin-top:4px;">Phân loại: ${h.color||""} - ${h.size||""}</div>
                      <div style="font-size:12px; color:#666; display:flex; justify-content:space-between; margin-top:4px;">
                        <span>SL: ${h.quantity}</span>
                        <span style="font-weight:600; color:var(--primary);">${(h.price*h.quantity).toLocaleString("vi-VN")} ₫</span>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
            <div style="border-top:1px dashed #ccc; padding-top:12px; display:flex; justify-content:space-between; font-weight:bold; font-size:15px;">
              <span>Tổng cộng:</span>
              <span style="color:var(--primary);">${a.formattedTotal}</span>
            </div>
          `,p.style.display="flex"})});const o=document.getElementById("close-order-modal"),r=document.getElementById("order-details-modal");o&&r&&(o.addEventListener("click",()=>{r.style.display="none"}),r.addEventListener("click",s=>{s.target===r&&(r.style.display="none")}))}catch(t){console.error(t)}}static async renderUsers(e){if(await this.checkAuth())try{const t=await V.getAll(),n=z.getCurrentUser(),o=z.isManagerAdmin();e.innerHTML=b.render(`
        <div class="admin-section">
          <div class="admin-section-header">
            <h2 class="admin-section-title">👥 Users</h2>
            <div style="font-size:13px; color:var(--text-secondary);">
              ${o?"🔑 <strong>Admin quản lý</strong> — có thể xóa tài khoản Nhân viên (Khách hàng không thể bị xóa)":"🔒 Nhân viên — không có quyền xóa tài khoản"}
            </div>
          </div>
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Phân quyền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                ${t.map(r=>{const s=r.id===(n==null?void 0:n.id),i=r.role==="user",d=r.role==="staff",a=o&&d&&!s,c={admin:'<span style="background:#7c3aed; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:700;">Admin quản lý</span>',staff:'<span style="background:#2563eb; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:700;">Nhân viên</span>',user:'<span style="background:#16a34a; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:700;">Khách hàng</span>'}[r.role]||r.role;return`
                    <tr>
                      <td>${r.id}</td>
                      <td>
                        <div style="font-weight:500;">${r.name}</div>
                        ${s?'<div style="font-size:11px; color:#d97706;">(Tài khoản của bạn)</div>':""}
                      </td>
                      <td style="color:var(--text-secondary);">${r.email}</td>
                      <td>${c}</td>
                      <td>
                        ${a?`<button class="btn-delete-user" data-id="${r.id}" data-name="${r.name}"
                              style="background:#ef4444; color:#fff; border:none; padding:6px 14px; border-radius:8px; font-size:12px; cursor:pointer; font-family:inherit; font-weight:600;">
                              🗑️ Xóa
                            </button>`:'<span style="font-size:12px; color:#9ca3af;">—</span>'}
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `,!0),b.bindEvents(),document.querySelectorAll(".btn-delete-user").forEach(r=>{r.addEventListener("click",async s=>{const i=s.currentTarget,d=i.dataset.id||"",a=i.dataset.name||"";if(confirm(`Xóa tài khoản "${a}"?
Thao tác này không thể hoàn tác.`))try{await $(`/api/users/${d}`,{method:"DELETE"}),x(`Đã xóa tài khoản ${a}`,"success"),this.renderUsers(e)}catch(p){x(p.message||"Lỗi khi xóa người dùng","error")}})})}catch(t){console.error(t),x(t.message||"Lỗi tải danh sách người dùng","error")}}static bindProductEvents(e,t,n){const o=document.getElementById("product-modal"),r=document.getElementById("btn-add-product"),s=document.getElementById("btn-close-modal"),i=document.getElementById("btn-cancel-modal"),d=document.getElementById("btn-save-product"),a=document.getElementById("product-form"),p=document.getElementById("p-img"),c=document.getElementById("p-img-upload"),f=document.getElementById("p-img-preview");c==null||c.addEventListener("change",h=>{var g;const l=(g=h.target.files)==null?void 0:g[0];if(l){const v=new FileReader;v.onload=E=>{var T;const k=(T=E.target)==null?void 0:T.result;p.value=k,f.src=k,f.style.display="block"},v.readAsDataURL(l)}}),p==null||p.addEventListener("input",()=>{p.value?(f.src=p.value,f.style.display="block"):f.style.display="none"});const y=h=>{var g;if(!o)return;o.style.display="flex";const l=document.getElementById("modal-title");if(l&&(l.textContent=h?"Sửa Sản Phẩm":"Thêm Sản Phẩm"),h){document.getElementById("p-id").value=String(h.id),document.getElementById("p-sku").value=h.sku||"",document.getElementById("p-name").value=h.name;const v=((g=h.images)==null?void 0:g[0])||h.img||"";p.value=v,v?(f.src=v,f.style.display="block"):f.style.display="none",c&&(c.value=""),document.getElementById("p-price").value=String(h.price),document.getElementById("p-saleprice").value=h.salePrice?String(h.salePrice):"",document.getElementById("p-weight").value=String(h.weight||0),document.getElementById("p-sizes").value=(h.sizes||[]).join(","),document.getElementById("p-colors").value=(h.colors||[]).map(E=>E.name).join(","),document.getElementById("p-category").value=String(h.categoryId),document.getElementById("p-desc").value=h.description,document.getElementById("p-material").value=h.material||"",document.getElementById("p-stock").value=String(h.stock)}else a==null||a.reset(),document.getElementById("p-id").value="",f.style.display="none",c&&(c.value="")},u=()=>{o&&(o.style.display="none")};r==null||r.addEventListener("click",()=>y()),s==null||s.addEventListener("click",u),i==null||i.addEventListener("click",h=>{h.preventDefault(),u()}),d==null||d.addEventListener("click",async h=>{if(h.preventDefault(),!(a!=null&&a.checkValidity())){a==null||a.reportValidity();return}const l=document.getElementById("p-id").value,g=document.getElementById("p-img").value,v=document.getElementById("p-sizes").value,E=document.getElementById("p-colors").value,k={name:document.getElementById("p-name").value,sku:document.getElementById("p-sku").value||"SKU-NEW",images:[g],price:Number(document.getElementById("p-price").value),salePrice:Number(document.getElementById("p-saleprice").value)||null,weight:Number(document.getElementById("p-weight").value)||0,categoryId:document.getElementById("p-category").value,brand:"GENZ",description:document.getElementById("p-desc").value,material:document.getElementById("p-material").value,stock:Number(document.getElementById("p-stock").value),sizes:v?v.split(",").map(T=>T.trim()):["S","M","L","XL"],colors:E?E.split(",").map(T=>({name:T.trim(),code:"#000",image:g})):[{name:"Đen",code:"#000000",image:g},{name:"Trắng",code:"#ffffff",image:g}]};try{l?(await N.update(l,k),x("Cập nhật sản phẩm thành công")):(await N.create(k),x("Thêm sản phẩm thành công")),u(),this.renderProducts(e)}catch(T){x(T.message||"Có lỗi xảy ra","error")}}),document.querySelectorAll(".btn-edit-product").forEach(h=>{h.addEventListener("click",l=>{const g=l.currentTarget.dataset.id||"0",v=t.find(E=>String(E.id)===g);v&&y(v)})}),document.querySelectorAll(".btn-delete-product").forEach(h=>{h.addEventListener("click",async l=>{const g=l.currentTarget.dataset.id||"0";if(confirm("Bạn có chắc muốn xóa sản phẩm này?"))try{await N.delete(g),x("Xóa sản phẩm thành công"),this.renderProducts(e)}catch(v){x(v.message||"Lỗi khi xóa sản phẩm","error")}})})}}class q{static renderLocations(e){let t=`
      <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
        <h2 style="font-size:24px; font-weight:700;">Sơ đồ Kho (Vị trí vật lý)</h2>
      </div>
      <div style="background:white; border-radius:8px; padding:24px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <p style="color:var(--text-secondary); margin-bottom:16px;">Sơ đồ phân cấp: Kho Tổng > Khu Vực > Dãy/Lô > Kệ Hàng > Tầng</p>
        <ul style="list-style:none; padding-left:0;">
    `;return e.length===0&&(t+="<li>Chưa có kho nào. Hãy tạo kho đầu tiên.</li>"),e.forEach(n=>{t+=`
        <li style="margin-bottom:12px; border:1px solid var(--border); padding:16px; border-radius:8px; background:#f9fafb;">
          <div class="d-flex justify-between">
            <strong style="font-size:16px; color:var(--primary);">🏢 Kho: ${n.name} (${n.code})</strong>
          </div>
          <ul style="list-style:none; padding-left:24px; margin-top:12px;">
            ${(n.zones||[]).map(o=>`
              <li style="margin-bottom:8px;">
                <div class="d-flex justify-between" style="background:#fff; padding:8px 12px; border:1px solid #ddd; border-radius:4px;">
                  <span>📍 Khu: ${o.name} (${o.code})</span>
                </div>
                <ul style="list-style:none; padding-left:24px; margin-top:8px;">
                  ${(o.aisles||[]).map(r=>`
                    <li style="margin-bottom:8px;">
                      <div class="d-flex justify-between" style="background:#f0f9ff; padding:8px 12px; border:1px solid #bae6fd; border-radius:4px;">
                        <span>📏 Dãy/Lô: ${r.name} (${r.code})</span>
                      </div>
                      <ul style="list-style:none; padding-left:24px; margin-top:8px;">
                        ${(r.shelves||[]).map(s=>`
                          <li style="margin-bottom:8px;">
                            <div class="d-flex justify-between" style="background:#fdf4ff; padding:8px 12px; border:1px solid #fbcfe8; border-radius:4px;">
                              <span>📚 Kệ: ${s.name} (${s.code})</span>
                            </div>
                            <ul style="list-style:none; padding-left:24px; margin-top:8px;">
                              ${(s.tiers||[]).map(i=>`
                                <li style="margin-bottom:4px; padding:4px 8px; background:#fefce8; border:1px solid #fef08a; border-radius:4px; font-size:13px;">
                                  ➖ Tầng: ${i.name} (${i.code}) - Sức chứa: ${i.capacity} Pallet
                                </li>
                              `).join("")}
                            </ul>
                          </li>
                        `).join("")}
                      </ul>
                    </li>
                  `).join("")}
                </ul>
              </li>
            `).join("")}
          </ul>
        </li>
      `}),t+="</ul></div>",t}static renderImportBatches(e){let t=`
      <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
        <h2 style="font-size:24px; font-weight:700;">Nhập Hàng (Lô & Pallet)</h2>
        <button id="btn-add-batch" class="btn btn-primary">+ Tạo Lô Nhập Mới</button>
      </div>
      <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
            <tr>
              <th style="padding:16px;">Mã Lô Nhập</th>
              <th style="padding:16px;">Ngày nhập</th>
              <th style="padding:16px;">Trạng thái</th>
              <th style="padding:16px;">Pallets</th>
            </tr>
          </thead>
          <tbody>
    `;return e.forEach(n=>{const o=new Date(n.importDate).toLocaleDateString("vi-VN");t+=`
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:16px; font-weight:bold;">${n.batchCode}</td>
          <td style="padding:16px;">${o}</td>
          <td style="padding:16px;">${n.status}</td>
          <td style="padding:16px;">
            <ul style="margin:0; padding-left:16px;">
              ${(n.pallets||[]).map(r=>`
                <li style="font-size:13px; margin-bottom:4px;">
                  <strong>${r.palletCode}</strong> - Vị trí: ${r.tierId?r.tierId.name:"Chưa xếp"}<br/>
                  <span style="color:#666;">Gồm: ${(r.stockItems||[]).map(s=>{var i;return((i=s.product)==null?void 0:i.name)+" x"+s.quantity}).join(", ")}</span>
                </li>
              `).join("")}
            </ul>
          </td>
        </tr>
      `}),t+="</tbody></table></div>",t}static renderInventory(e){let t=`
      <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
        <h2 style="font-size:24px; font-weight:700;">Bảng Tồn Kho</h2>
      </div>
      <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
            <tr>
              <th style="padding:16px; width:60px;">Ảnh</th>
              <th style="padding:16px;">Sản phẩm</th>
              <th style="padding:16px;">Tổng tồn</th>
              <th style="padding:16px;">Chi tiết vị trí lưu trữ (WMS)</th>
            </tr>
          </thead>
          <tbody>
    `;return e.length===0&&(t+='<tr><td colspan="4" style="padding:32px; text-align:center; color:#888;">Kho hiện đang trống.</td></tr>'),e.forEach(n=>{const o=n.product;t+=`
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:16px;"><img src="${o.img}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;"></td>
          <td style="padding:16px; font-weight:500;">${o.name}<br/><span style="font-size:12px; color:#888;">SKU: ${o.sku}</span></td>
          <td style="padding:16px; font-size:18px; font-weight:700; color:var(--primary);">${n.totalQuantity}</td>
          <td style="padding:16px;">
            <ul style="margin:0; padding-left:0; list-style:none;">
              ${n.locations.map(r=>`
                <li style="font-size:13px; margin-bottom:4px; padding:6px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:4px;">
                  <span style="color:#0369a1; font-weight:600;">${r.pathStr}</span> <br/>
                  Pallet: <strong>${r.palletCode}</strong> | Tồn trên Pallet: <strong style="color:red;">${r.quantity}</strong>
                </li>
              `).join("")}
            </ul>
          </td>
        </tr>
      `}),t+="</tbody></table></div>",t}static renderExports(e){let t=`
      <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
        <h2 style="font-size:24px; font-weight:700;">Lịch Sử Xuất Kho</h2>
        <button id="btn-add-export" class="btn btn-primary">+ Tạo Phiếu Xuất Kho</button>
      </div>
      <div style="background:white; border-radius:8px; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:var(--bg-light); border-bottom:1px solid var(--border);">
            <tr>
              <th style="padding:16px;">Mã Phiếu</th>
              <th style="padding:16px;">Ngày Xuất</th>
              <th style="padding:16px;">Lý do</th>
              <th style="padding:16px;">Chi tiết hàng xuất</th>
            </tr>
          </thead>
          <tbody>
    `;return e.length===0&&(t+='<tr><td colspan="4" style="padding:32px; text-align:center; color:#888;">Chưa có phiếu xuất nào.</td></tr>'),e.forEach(n=>{const o=new Date(n.exportDate).toLocaleString("vi-VN");t+=`
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:16px; font-weight:bold;">${n.receiptCode}</td>
          <td style="padding:16px;">${o}</td>
          <td style="padding:16px;"><span style="background:#e0f2fe; color:#0369a1; padding:4px 8px; border-radius:4px; font-size:12px;">${n.reason}</span></td>
          <td style="padding:16px;">
            <ul style="margin:0; padding-left:16px;">
              ${(n.items||[]).map(r=>{var s;return`
                <li style="font-size:13px; margin-bottom:4px;">
                  <strong>${((s=r.product)==null?void 0:s.name)||"Sản phẩm"}</strong> - SL: <strong>${r.quantity}</strong>
                  <ul style="list-style:circle; padding-left:20px; color:#666; font-size:12px;">
                    ${(r.palletDeductions||[]).map(i=>`
                      <li>Lấy từ Pallet: ${i.palletCode} (SL: ${i.quantity})</li>
                    `).join("")}
                  </ul>
                </li>
              `}).join("")}
            </ul>
          </td>
        </tr>
      `}),t+="</tbody></table></div>",t}static renderActionButtons(){return`
      <div class="d-flex justify-between align-center" style="margin-bottom:24px;">
        <h2 style="font-size:24px; font-weight:700;">Quản lý Cấu trúc Kho</h2>
        <div style="display:flex; gap:12px;">
          <button id="btn-add-warehouse" class="btn" style="background:#1e293b; color:white;">+ Thêm Kho</button>
          <button id="btn-add-zone" class="btn" style="background:#3b82f6; color:white;">+ Khu Vực</button>
          <button id="btn-add-aisle" class="btn" style="background:#0ea5e9; color:white;">+ Dãy</button>
          <button id="btn-add-shelf" class="btn" style="background:#06b6d4; color:white;">+ Kệ</button>
          <button id="btn-add-tier" class="btn" style="background:#14b8a6; color:white;">+ Tầng</button>
        </div>
      </div>
    `}static renderModals(){const e=`
      position:fixed; top:0; left:0; width:100%; height:100%; 
      background:rgba(0,0,0,0.5); display:none; justify-content:center; align-items:center; z-index:1000;
    `,t=`
      background:white; padding:24px; border-radius:8px; width:100%; max-width:500px;
      box-shadow:0 4px 6px rgba(0,0,0,0.1);
    `;return`
      <!-- Modal Add Warehouse -->
      <div id="modal-warehouse" style="${e}">
        <div style="${t}">
          <h3 style="margin-top:0;">Thêm Kho Tổng (Warehouse)</h3>
          <form id="form-warehouse">
            <div style="margin-bottom:16px;">
              <label>Tên Kho *</label>
              <input type="text" id="wh-name" class="form-control" required placeholder="VD: Kho Hà Nội">
            </div>
            <div style="margin-bottom:16px;">
              <label>Mã Kho (Code) *</label>
              <input type="text" id="wh-code" class="form-control" required style="text-transform:uppercase;" placeholder="VD: WH-HN">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" class="btn btn-close-modal" data-target="modal-warehouse">Hủy</button>
              <button type="submit" class="btn btn-primary">Lưu Kho</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Add Zone -->
      <div id="modal-zone" style="${e}">
        <div style="${t}">
          <h3 style="margin-top:0;">Thêm Khu Vực (Zone)</h3>
          <form id="form-zone">
            <div style="margin-bottom:16px;">
              <label>Trực thuộc Kho *</label>
              <select id="z-wh-id" class="form-control" required></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Tên Khu Vực *</label>
              <input type="text" id="z-name" class="form-control" required placeholder="VD: Khu A">
            </div>
            <div style="margin-bottom:16px;">
              <label>Mã Khu Vực (Code) *</label>
              <input type="text" id="z-code" class="form-control" required style="text-transform:uppercase;" placeholder="VD: ZA">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" class="btn btn-close-modal" data-target="modal-zone">Hủy</button>
              <button type="submit" class="btn btn-primary">Lưu Khu Vực</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Add Aisle -->
      <div id="modal-aisle" style="${e}">
        <div style="${t}">
          <h3 style="margin-top:0;">Thêm Dãy (Aisle)</h3>
          <form id="form-aisle">
            <div style="margin-bottom:16px;">
              <label>Trực thuộc Kho *</label>
              <select id="a-wh-id" class="form-control" required></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Trực thuộc Khu Vực *</label>
              <select id="a-z-id" class="form-control" required><option value="">-- Chọn Kho trước --</option></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Tên Dãy *</label>
              <input type="text" id="a-name" class="form-control" required placeholder="VD: Dãy 1">
            </div>
            <div style="margin-bottom:16px;">
              <label>Mã Dãy (Code) *</label>
              <input type="text" id="a-code" class="form-control" required style="text-transform:uppercase;" placeholder="VD: A1">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" class="btn btn-close-modal" data-target="modal-aisle">Hủy</button>
              <button type="submit" class="btn btn-primary">Lưu Dãy</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Add Shelf -->
      <div id="modal-shelf" style="${e}">
        <div style="${t}">
          <h3 style="margin-top:0;">Thêm Kệ (Shelf)</h3>
          <form id="form-shelf">
            <div style="margin-bottom:16px;">
              <label>Trực thuộc Kho *</label>
              <select id="s-wh-id" class="form-control" required></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Khu Vực *</label>
              <select id="s-z-id" class="form-control" required><option value="">-- Chọn Kho trước --</option></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Dãy *</label>
              <select id="s-a-id" class="form-control" required><option value="">-- Chọn Khu Vực trước --</option></select>
            </div>
            <div style="margin-bottom:16px;">
              <label>Tên Kệ *</label>
              <input type="text" id="s-name" class="form-control" required placeholder="VD: Kệ 1">
            </div>
            <div style="margin-bottom:16px;">
              <label>Mã Kệ (Code) *</label>
              <input type="text" id="s-code" class="form-control" required style="text-transform:uppercase;" placeholder="VD: S-A1-1">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" class="btn btn-close-modal" data-target="modal-shelf">Hủy</button>
              <button type="submit" class="btn btn-primary">Lưu Kệ</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Add Tier -->
      <div id="modal-tier" style="${e}">
        <div style="${t}">
          <h3 style="margin-top:0;">Thêm Tầng (Tier)</h3>
          <form id="form-tier">
            <div style="display:flex; gap:16px; margin-bottom:16px;">
              <div style="flex:1;">
                <label>Kho *</label>
                <select id="t-wh-id" class="form-control" required></select>
              </div>
              <div style="flex:1;">
                <label>Khu Vực *</label>
                <select id="t-z-id" class="form-control" required><option value="">-- Chọn Kho --</option></select>
              </div>
            </div>
            <div style="display:flex; gap:16px; margin-bottom:16px;">
              <div style="flex:1;">
                <label>Dãy *</label>
                <select id="t-a-id" class="form-control" required><option value="">-- Chọn Khu --</option></select>
              </div>
              <div style="flex:1;">
                <label>Kệ *</label>
                <select id="t-s-id" class="form-control" required><option value="">-- Chọn Dãy --</option></select>
              </div>
            </div>
            <div style="margin-bottom:16px;">
              <label>Tên Tầng *</label>
              <input type="text" id="t-name" class="form-control" required placeholder="VD: Tầng 1">
            </div>
            <div style="margin-bottom:16px;">
              <label>Mã Tầng (Code) *</label>
              <input type="text" id="t-code" class="form-control" required style="text-transform:uppercase;" placeholder="VD: T-A1-1-1">
            </div>
            <div style="margin-bottom:16px;">
              <label>Sức chứa (Pallet) *</label>
              <input type="number" id="t-capacity" class="form-control" required min="1" value="10">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" class="btn btn-close-modal" data-target="modal-tier">Hủy</button>
              <button type="submit" class="btn btn-primary">Lưu Tầng</button>
            </div>
          </form>
        </div>
      </div>
    `}}class S{static async getWarehouses(){return $("/api/wms/warehouses")}static async createWarehouse(e){return $("/api/wms/warehouses",{method:"POST",body:e})}static async getZones(e){return $(`/api/wms/warehouses/${e}/zones`)}static async createZone(e){return $("/api/wms/zones",{method:"POST",body:e})}static async getAisles(e){return $(`/api/wms/zones/${e}/aisles`)}static async createAisle(e){return $("/api/wms/aisles",{method:"POST",body:e})}static async getShelves(e){return $(`/api/wms/aisles/${e}/shelves`)}static async createShelf(e){return $("/api/wms/shelves",{method:"POST",body:e})}static async getTiers(e){return $(`/api/wms/shelves/${e}/tiers`)}static async createTier(e){return $("/api/wms/tiers",{method:"POST",body:e})}static async deleteLocation(e,t){return $(`/api/wms/locations/${e}/${t}`,{method:"DELETE"})}static async getBatches(){return $("/api/wms/import")}static async createImportBatch(e){return $("/api/wms/import",{method:"POST",body:e})}static async getProductLocations(e){return $(`/api/wms/products/${e}/locations`)}static async getInventory(){return $("/api/wms/inventory")}static async getExports(){return $("/api/wms/exports")}static async createExport(e){return $("/api/wms/exports",{method:"POST",body:e})}}const Et=Object.freeze(Object.defineProperty({__proto__:null,WmsService:S},Symbol.toStringTag,{value:"Module"}));class K{static async renderLocations(e){var t,n,o,r,s,i,d,a,p,c,f;try{const y=await S.getWarehouses();e.innerHTML=b.render(`
        ${q.renderActionButtons()}
        ${q.renderLocations(y)}
        ${q.renderModals()}
      `,!0),b.bindEvents();const u=async l=>{if(document.getElementById(l).style.display="flex",l!=="modal-warehouse"){const g=await S.getWarehouses();document.querySelectorAll('select[id$="-wh-id"]').forEach(E=>{E.innerHTML='<option value="">-- Chọn Kho --</option>'+g.map(k=>`<option value="${k._id}">${k.name}</option>`).join("")})}};(t=document.getElementById("btn-add-warehouse"))==null||t.addEventListener("click",()=>u("modal-warehouse")),(n=document.getElementById("btn-add-zone"))==null||n.addEventListener("click",()=>u("modal-zone")),(o=document.getElementById("btn-add-aisle"))==null||o.addEventListener("click",()=>u("modal-aisle")),(r=document.getElementById("btn-add-shelf"))==null||r.addEventListener("click",()=>u("modal-shelf")),(s=document.getElementById("btn-add-tier"))==null||s.addEventListener("click",()=>u("modal-tier")),document.querySelectorAll(".btn-close-modal").forEach(l=>{l.addEventListener("click",g=>{const v=g.target.getAttribute("data-target");v&&(document.getElementById(v).style.display="none")})}),(i=document.getElementById("a-wh-id"))==null||i.addEventListener("change",async l=>{const g=l.target.value,v=document.getElementById("a-z-id");if(v.innerHTML='<option value="">-- Chọn Khu Vực --</option>',!g)return;(await S.getZones(g)).forEach(k=>v.innerHTML+=`<option value="${k._id}">${k.name}</option>`)}),(d=document.getElementById("s-wh-id"))==null||d.addEventListener("change",async l=>{const g=l.target.value,v=document.getElementById("s-z-id");if(v.innerHTML='<option value="">-- Chọn Khu Vực --</option>',document.getElementById("s-a-id").innerHTML='<option value="">-- Chọn Dãy --</option>',!g)return;(await S.getZones(g)).forEach(k=>v.innerHTML+=`<option value="${k._id}">${k.name}</option>`)}),(a=document.getElementById("s-z-id"))==null||a.addEventListener("change",async l=>{const g=l.target.value,v=document.getElementById("s-a-id");if(v.innerHTML='<option value="">-- Chọn Dãy --</option>',!g)return;(await S.getAisles(g)).forEach(k=>v.innerHTML+=`<option value="${k._id}">${k.name}</option>`)}),(p=document.getElementById("t-wh-id"))==null||p.addEventListener("change",async l=>{const g=l.target.value,v=document.getElementById("t-z-id");if(v.innerHTML='<option value="">-- Chọn Khu Vực --</option>',!g)return;(await S.getZones(g)).forEach(k=>v.innerHTML+=`<option value="${k._id}">${k.name}</option>`)}),(c=document.getElementById("t-z-id"))==null||c.addEventListener("change",async l=>{const g=l.target.value,v=document.getElementById("t-a-id");if(v.innerHTML='<option value="">-- Chọn Dãy --</option>',!g)return;(await S.getAisles(g)).forEach(k=>v.innerHTML+=`<option value="${k._id}">${k.name}</option>`)}),(f=document.getElementById("t-a-id"))==null||f.addEventListener("change",async l=>{const g=l.target.value,v=document.getElementById("t-s-id");if(v.innerHTML='<option value="">-- Chọn Kệ --</option>',!g)return;(await S.getShelves(g)).forEach(k=>v.innerHTML+=`<option value="${k._id}">${k.name}</option>`)});const h=async(l,g)=>{var v;(v=document.getElementById(l))==null||v.addEventListener("submit",async E=>{E.preventDefault();try{await g(),x("Thêm vị trí thành công!"),this.renderLocations(e)}catch(k){x("Lỗi: "+k.message,"error")}})};h("form-warehouse",()=>S.createWarehouse({name:document.getElementById("wh-name").value,code:document.getElementById("wh-code").value.toUpperCase()})),h("form-zone",()=>S.createZone({warehouseId:document.getElementById("z-wh-id").value,name:document.getElementById("z-name").value,code:document.getElementById("z-code").value.toUpperCase()})),h("form-aisle",()=>S.createAisle({zoneId:document.getElementById("a-z-id").value,name:document.getElementById("a-name").value,code:document.getElementById("a-code").value.toUpperCase()})),h("form-shelf",()=>S.createShelf({aisleId:document.getElementById("s-a-id").value,name:document.getElementById("s-name").value,code:document.getElementById("s-code").value.toUpperCase()})),h("form-tier",()=>S.createTier({shelfId:document.getElementById("t-s-id").value,name:document.getElementById("t-name").value,code:document.getElementById("t-code").value.toUpperCase(),capacity:Number(document.getElementById("t-capacity").value)}))}catch{x("Lỗi tải dữ liệu kho","error")}}static async renderImportBatches(e){var t;try{const n=await S.getBatches();e.innerHTML=b.render(q.renderImportBatches(n),!0),b.bindEvents(),(t=document.getElementById("btn-add-batch"))==null||t.addEventListener("click",async()=>{const o=prompt("Nhập mã Lô Hàng nhập mới (VD: BATCH-001):");if(!o)return;const r=prompt("Nhập mã Pallet:");if(!r)return;const s=prompt("Nhập ID sản phẩm (ObjectId MongoDB):");if(!s)return;const i=prompt("Số lượng:");try{await S.createImportBatch({batchCode:o,pallets:[{palletCode:r,items:[{productId:s,quantity:Number(i)||1,importPrice:1e5}]}]}),x("Nhập hàng thành công!"),this.renderImportBatches(e)}catch(d){x("Lỗi: "+d.message,"error")}})}catch{x("Lỗi tải dữ liệu nhập hàng","error")}}static async renderInventory(e){try{const t=await S.getInventory();e.innerHTML=b.render(q.renderInventory(t),!0),b.bindEvents()}catch{x("Lỗi tải dữ liệu tồn kho","error")}}static async renderExports(e){var t;try{const n=await S.getExports();e.innerHTML=b.render(q.renderExports(n),!0),b.bindEvents(),(t=document.getElementById("btn-add-export"))==null||t.addEventListener("click",async()=>{const o=prompt("Nhập ID sản phẩm cần xuất (ObjectId):");if(!o)return;const r=prompt("Nhập số lượng cần xuất:");if(!r)return;const s=prompt("Nhập lý do xuất kho (VD: Xuất bán, Xuất hủy):")||"Xuất bán";try{await S.createExport({reason:s,items:[{productId:o,quantity:Number(r)}]}),x("Tạo phiếu xuất thành công! Hệ thống đã tự động trừ kho (FIFO)."),this.renderExports(e)}catch(i){x("Lỗi: "+(i.error||i.message),"error")}})}catch{x("Lỗi tải lịch sử xuất kho","error")}}}class zt{static render(e){const t=`
      <!-- Hero Section -->
      <div style="width:100%; height:400px; background:linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920&auto=format&fit=crop') center/cover; display:flex; align-items:center; justify-content:center; text-align:center; color:white;">
        <div>
          <h1 style="font-size:56px; font-weight:900; letter-spacing:4px; margin-bottom:16px;">VỀ CHÚNG TÔI</h1>
          <p style="font-size:18px; max-width:600px; margin:0 auto; line-height:1.6; color:rgba(255,255,255,0.9);">Hành trình mang thời trang chuẩn mực và phong cách năng động đến với hàng triệu khách hàng Việt Nam.</p>
        </div>
      </div>

      <div class="container" style="padding:80px 15px;">
        <!-- Story Section -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; margin-bottom:100px;">
          <div>
            <img src="https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=1000&auto=format&fit=crop" style="width:100%; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.1);">
          </div>
          <div>
            <h2 style="font-size:14px; font-weight:700; color:var(--primary); text-transform:uppercase; letter-spacing:2px; margin-bottom:12px;">CÂU CHUYỆN THƯƠNG HIỆU</h2>
            <h3 style="font-size:36px; font-weight:800; color:#111; margin-bottom:24px; line-height:1.2;">Bắt nguồn từ đam mê và sự tử tế</h3>
            <p style="font-size:16px; color:#555; line-height:1.8; margin-bottom:16px;">Ra đời với sứ mệnh mang đến những sản phẩm thời trang chất lượng, dễ tiếp cận cho mọi gia đình Việt. Chúng tôi tin rằng trang phục không chỉ để mặc, mà còn là cách để bạn thể hiện cá tính và sự tự tin mỗi ngày.</p>
            <p style="font-size:16px; color:#555; line-height:1.8;">Từ những chất liệu được tuyển chọn khắt khe đến quy trình sản xuất tối ưu, mỗi sản phẩm đến tay khách hàng đều là tâm huyết của đội ngũ thiết kế và kỹ thuật viên.</p>
          </div>
        </div>

        <!-- Vision Section -->
        <div style="background:#f9fafb; border-radius:16px; padding:80px; text-align:center; margin-bottom:100px;">
          <h2 style="font-size:32px; font-weight:800; margin-bottom:48px;">TẦM NHÌN & SỨ MỆNH</h2>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:40px;">
            <div>
              <div style="width:80px; height:80px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; margin:0 auto 24px; box-shadow:0 10px 20px rgba(0,0,0,0.05);">🎯</div>
              <h4 style="font-size:20px; font-weight:700; margin-bottom:12px;">Mục tiêu</h4>
              <p style="color:#666; line-height:1.6;">Trở thành thương hiệu thời trang số 1 Việt Nam về sự tiện dụng và chất lượng bền bỉ.</p>
            </div>
            <div>
              <div style="width:80px; height:80px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; margin:0 auto 24px; box-shadow:0 10px 20px rgba(0,0,0,0.05);">🌱</div>
              <h4 style="font-size:20px; font-weight:700; margin-bottom:12px;">Giá trị cốt lõi</h4>
              <p style="color:#666; line-height:1.6;">Khách hàng là trung tâm, sáng tạo không ngừng và phát triển bền vững cùng cộng đồng.</p>
            </div>
            <div>
              <div style="width:80px; height:80px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; margin:0 auto 24px; box-shadow:0 10px 20px rgba(0,0,0,0.05);">💚</div>
              <h4 style="font-size:20px; font-weight:700; margin-bottom:12px;">Trách nhiệm</h4>
              <p style="color:#666; line-height:1.6;">Ưu tiên sử dụng chất liệu thân thiện môi trường và xây dựng môi trường làm việc công bằng.</p>
            </div>
          </div>
        </div>
      </div>
    `;e.innerHTML=b.render(t),b.bindEvents()}}class It{static async render(e){if(!z.isLoggedIn()){e.innerHTML=b.render(`
        <div class="container" style="padding:80px 0; text-align:center;">
          <div style="font-size:64px; margin-bottom:16px;">🔐</div>
          <h2 style="font-size:24px; font-weight:800; margin-bottom:12px;">Đăng Nhập Để Xem Đơn Hàng</h2>
          <p style="color:var(--text-secondary); margin-bottom:24px;">Bạn cần đăng nhập để xem đơn hàng của mình.</p>
          <a href="#/login" class="btn btn-primary">Đăng nhập ngay</a>
        </div>
      `,!1,!0),b.bindEvents();return}const t=z.getCurrentUser();e.innerHTML=b.render(`
      <div class="container" style="padding:40px 0 80px;">
        <div style="text-align:center; margin-bottom:40px;">
          <h1 style="font-size:28px; font-weight:800; color:var(--text-primary);">📦 Đơn Hàng Của Tôi</h1>
          <p style="color:var(--text-secondary); margin-top:8px;">Xin chào, <strong>${t.name}</strong>!</p>
        </div>
        <div id="my-orders-content" style="max-width:800px; margin:0 auto;">
          <div style="text-align:center; padding:40px; color:var(--text-secondary);">
            <div style="font-size:32px; margin-bottom:12px;">⏳</div>Đang tải đơn hàng...
          </div>
        </div>
      </div>
    `,!1,!0),b.bindEvents();try{const n=await L.getByUser(String(t.id)),o=await X.getByUserId(String(t.id)),r=n.map(i=>new dt(i)),s=document.getElementById("my-orders-content");if(!s)return;if(r.length===0){s.innerHTML=`
          <div style="text-align:center; padding:60px 20px;">
            <div style="font-size:80px; margin-bottom:20px;">🛍️</div>
            <h3 style="font-size:20px; font-weight:600; margin-bottom:12px; color:var(--text-primary);">Bạn chưa có đơn hàng nào</h3>
            <p style="color:var(--text-secondary); margin-bottom:24px;">Hãy khám phá các sản phẩm GenZ Fashion ngay!</p>
            <a href="#/products" class="btn btn-primary btn-lg">Mua Sắm Ngay</a>
          </div>
        `;return}s.innerHTML=r.map(i=>`
        <div style="
          background:#fff; border-radius:16px; border:1px solid #e5e7eb;
          margin-bottom:20px; overflow:hidden;
          box-shadow:0 2px 8px rgba(0,0,0,0.06);
          transition: box-shadow 0.2s;
        " onmouseover="this.style.boxShadow='0 4px 20px rgba(0,0,0,0.12)'"
           onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.06)'">
          <!-- Header đơn hàng -->
          <div style="padding:16px 20px; background:${i.statusColor}15; border-bottom:1px solid ${i.statusColor}30; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <span style="font-size:13px; color:#666;">Mã đơn hàng</span>
              <span style="font-weight:700; font-size:15px; color:#1a1a2e; margin-left:8px;">#${i.id}</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:12px; color:#666;">${i.formattedDate}</span>
              <span style="
                background:${i.statusColor}; color:#fff;
                padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600;
              ">${i.statusLabel}</span>
              ${i.status==="pending"?`
                <button class="btn-cancel-user-order" data-id="${i.id}" style="background:#ef4444; border:none; color:#fff; padding:4px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:600; transition:opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                  Hủy đơn
                </button>
              `:i.status==="confirmed"?i.cancelRequested?`
                  <span style="font-size:12px; color:#d97706; font-weight:600;">⏳ Đang chờ admin duyệt hủy</span>
                `:`
                  <button class="btn-request-cancel-order" data-id="${i.id}" style="background:transparent; border:1px solid #ef4444; color:#ef4444; padding:4px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:600; transition:all 0.2s;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='transparent'">
                    Yêu cầu hủy đơn
                  </button>
                `:i.status==="delivered"?i.receivedAt?"":`
                  <button class="btn-confirm-received" data-id="${i.id}" style="background:#16a34a; border:none; color:#fff; padding:4px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:600; transition:opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">Đã nhận được hàng</button>
                `:i.status==="completed"&&i.receivedAt&&Date.now()-new Date(i.receivedAt).getTime()<=14*24*60*60*1e3?i.returnRequested?`
                    <span style="font-size:12px; color:#d97706; font-weight:600;">⏳ Đang chờ xử lý hoàn hàng</span>
                  `:`
                    <button class="btn-request-return" data-id="${i.id}" style="background:transparent; border:1px solid #f59e0b; color:#f59e0b; padding:4px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:600; transition:all 0.2s;" onmouseover="this.style.background='#fef3c7'" onmouseout="this.style.background='transparent'">Yêu cầu Hoàn Hàng</button>
                  `:""}
            </div>
          </div>

          <!-- Sản phẩm -->
          <div style="padding:16px 20px;">
            ${i.items.map(d=>{const a=o.some(p=>p.orderId===String(i.id)&&String(p.productId)===String(d.productId));return`
              <div style="display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid #f3f4f6;">
                <img src="${d.img||""}" alt="${d.productName}"
                  style="width:56px; height:70px; object-fit:cover; border-radius:8px; background:#f3f4f6;">
                <div style="flex:1; min-width:0;">
                  <div style="font-size:14px; font-weight:500; color:#1a1a2e; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${d.productName}</div>
                  <div style="font-size:12px; color:#666; margin-top:3px;">Size: ${d.size} | Màu: ${d.color} | SL: ${d.quantity}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:14px; font-weight:600; color:#e63946; white-space:nowrap;">${A(d.price*d.quantity)}</div>
                  ${i.status==="completed"?a?'<span style="font-size:11px; color:#16a34a; font-weight:600; display:block; margin-top:4px;">✔️ Đã đánh giá</span>':'<a href="#/review/'+i.id+"/"+d.productId+'" class="btn-review-product" style="display:inline-block; margin-top:4px; padding:4px 10px; font-size:11px; text-decoration:none; text-align:center; cursor:pointer; background:#fff; border:1px solid var(--primary); color:var(--primary); border-radius:4px;">⭐ Đánh giá</a>':""}
                </div>
              </div>
            `}).join("")}
          </div>

          <!-- Footer tổng tiền -->
          <div style="padding:12px 20px 16px; display:flex; justify-content:space-between; align-items:center; background:#fafafa;">
            <div style="font-size:13px; color:#666; display:flex; flex-direction:column; gap:4px;">
              <div>Phương thức: <strong>${this.getPaymentLabel(i)}</strong></div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span>Thanh toán: <strong style="color:${i.paymentStatus==="paid"?"#16a34a":i.paymentStatus==="refunded"?"#8b5cf6":"#d97706"}">${i.paymentStatus==="paid"?"Đã thanh toán":i.paymentStatus==="refunded"?"Đã hoàn tiền":"Chưa thanh toán"}</strong></span>
                ${i.paymentStatus==="unpaid"&&i.paymentMethod!=="cod"&&i.status!=="cancelled"?`
                  <button class="btn-check-payment" data-id="${i.id}" style="background:#f3f4f6; border:1px solid #d1d5db; border-radius:4px; padding:2px 6px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:4px;">
                    <span class="spin-icon" style="display:none;">⏳</span> 🔄 Cập nhật GD
                  </button>
                `:""}
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12px; color:#666; margin-bottom:2px;">Tổng tiền:</div>
              <div style="font-size:18px; font-weight:800; color:#e63946;">${i.formattedTotal}</div>
            </div>
          </div>
        </div>
      `).join(""),document.querySelectorAll(".btn-cancel-user-order").forEach(i=>{i.addEventListener("click",async d=>{const a=d.currentTarget.dataset.id;if(a&&confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?"))try{await L.update(a,{status:"cancelled"}),x("Đã hủy đơn hàng thành công","success"),this.render(e)}catch(p){x(p.message||"Lỗi khi hủy đơn hàng","error")}})}),document.querySelectorAll(".btn-request-cancel-order").forEach(i=>{i.addEventListener("click",async d=>{const a=d.currentTarget.dataset.id;if(!a)return;const p=prompt("Vui lòng nhập lý do bạn muốn hủy đơn hàng này:");if(p!==null){if(!p.trim()){x("Bạn phải nhập lý do hủy đơn","error");return}try{await L.update(a,{cancelRequested:!0,cancelReason:p.trim()}),x("Đã gửi yêu cầu hủy đơn thành công","success"),this.render(e)}catch(c){x(c.message||"Lỗi gửi yêu cầu","error")}}})}),document.querySelectorAll(".btn-confirm-received").forEach(i=>{i.addEventListener("click",async d=>{const a=d.currentTarget.dataset.id;if(a&&confirm("Bạn xác nhận đã nhận được hàng và hàng hóa trong tình trạng tốt chứ?"))try{const p=r.find(f=>String(f.id)===a),c={receivedAt:new Date().toISOString(),status:"completed"};p&&p.paymentStatus==="unpaid"&&(c.paymentStatus="paid"),await L.update(a,c),x("Cảm ơn bạn đã mua sắm tại GenZ Fashion!","success"),this.render(e)}catch(p){x(p.message||"Lỗi khi xác nhận","error")}})}),document.querySelectorAll(".btn-request-return").forEach(i=>{i.addEventListener("click",async d=>{const a=d.currentTarget.dataset.id;if(!a)return;const p=prompt("Vui lòng nhập lý do bạn muốn hoàn hàng (vd: Sản phẩm lỗi, sai màu,...):");if(p!==null){if(!p.trim()){x("Bạn phải nhập lý do hoàn hàng","error");return}try{await L.update(a,{returnRequested:!0,returnReason:p.trim(),returnStatus:"pending"}),x("Đã gửi yêu cầu hoàn hàng thành công. Admin sẽ liên hệ lại.","success"),this.render(e)}catch(c){x(c.message||"Lỗi gửi yêu cầu","error")}}})}),document.querySelectorAll(".btn-check-payment").forEach(i=>{i.addEventListener("click",async d=>{const a=d.currentTarget,p=a.dataset.id;if(!p)return;const c=a.querySelector(".spin-icon"),f=a.innerHTML;c&&(c.style.display="inline-block"),a.disabled=!0,setTimeout(async()=>{try{await L.update(p,{paymentStatus:"paid"}),x("✅ Giao dịch đã được xác nhận thành công từ ngân hàng!","success"),this.render(e)}catch(y){x(y.message||"Lỗi kết nối ngân hàng","error"),a.innerHTML=f,a.disabled=!1}},1500)})})}catch(n){const o=document.getElementById("my-orders-content");o&&(o.innerHTML=`
        <div style="text-align:center; padding:40px; color:var(--text-secondary);">
          <div style="font-size:48px; margin-bottom:12px;">⚠️</div>
          <p>Không thể tải đơn hàng: ${n.message}</p>
        </div>
      `)}}static getPaymentLabel(e){return{cod:"Thanh toán khi nhận hàng",bank:"Chuyển khoản ngân hàng",momo:"Ví MoMo",vnpay:"VNPay"}[e.paymentMethod]||"COD"}}class St{static render(e,t){return`
      <div class="container" style="padding: 60px 0; max-width: 600px; margin: 0 auto;">
        <h2 style="font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 24px;">ĐÁNH GIÁ SẢN PHẨM</h2>
        
        <div style="background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 24px;">
          <!-- Product Info -->
          <div style="display: flex; gap: 16px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #f0f0f0;">
            <img src="${e.images&&e.images.length>0?e.images[0]:""}" alt="${e.name}" style="width: 80px; height: 100px; object-fit: cover; border-radius: 4px; background: #f9f9f9;">
            <div>
              <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${e.name}</div>
              <div style="font-size: 13px; color: #666;">Cảm ơn bạn đã mua sắm tại GenZ Fashion. Hãy chia sẻ cảm nhận của bạn về sản phẩm này nhé!</div>
            </div>
          </div>

          <!-- Rating -->
          <div style="margin-bottom: 24px; text-align: center;">
            <div style="font-size: 15px; font-weight: 600; margin-bottom: 12px;">Chất lượng sản phẩm</div>
            <div class="star-rating" style="display: flex; gap: 8px; justify-content: center; font-size: 32px; color: #e0e0e0; cursor: pointer; user-select: none;">
              <span data-value="1" class="star">★</span>
              <span data-value="2" class="star">★</span>
              <span data-value="3" class="star">★</span>
              <span data-value="4" class="star">★</span>
              <span data-value="5" class="star">★</span>
            </div>
            <div id="rating-text" style="font-size: 13px; color: #e63946; font-weight: 600; margin-top: 8px; min-height: 20px;"></div>
          </div>

          <!-- Comment -->
          <div style="margin-bottom: 24px;">
            <textarea id="review-comment" placeholder="Hãy chia sẻ nhận xét của bạn về chất liệu, form dáng, màu sắc..." rows="4" style="width: 100%; padding: 12px; border: 1px solid #d9d9d9; border-radius: 4px; font-family: inherit; font-size: 14px; resize: vertical; outline: none; transition: border-color 0.3s;"></textarea>
          </div>

          <!-- Submit -->
          <button id="btn-submit-review" style="width: 100%; padding: 14px; background: var(--primary); color: white; border: none; border-radius: 4px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.3s;">
            Hoàn thành đánh giá
          </button>
        </div>
      </div>
    `}}class Tt{static async render(e,t){const n=t==null?void 0:t.orderId,o=t==null?void 0:t.productId;if(!n||!o){window.location.hash="#/my-orders";return}if(!z.getCurrentUser()){window.location.hash="#/login";return}e.innerHTML=b.render(`
      <div class="container" style="padding: 100px 0; text-align: center;">
        <h2>Đang tải thông tin sản phẩm...</h2>
      </div>
    `,!1,!0),b.bindEvents();try{const s=await N.getById(o);if(!s)throw new Error("Không tìm thấy sản phẩm");e.innerHTML=b.render(St.render(s,n),!1,!0),b.bindEvents(),this.bindEvents(n,o)}catch(s){console.error("Lỗi tải trang đánh giá:",s),e.innerHTML=b.render(`
        <div class="container" style="padding: 100px 0; text-align: center;">
          <h2>Đã có lỗi xảy ra. Không thể tải trang đánh giá.</h2>
          <a href="#/my-orders" class="btn btn-primary" style="margin-top: 16px;">Về Đơn hàng của tôi</a>
        </div>
      `,!1,!0),b.bindEvents()}}static bindEvents(e,t){const n=document.querySelectorAll(".star"),o=document.getElementById("rating-text"),r=document.getElementById("btn-submit-review"),s=document.getElementById("review-comment");let i=0;const d=["Tệ","Không hài lòng","Bình thường","Hài lòng","Tuyệt vời"];n.forEach(p=>{p.addEventListener("mouseover",c=>{const f=parseInt(c.target.dataset.value||"0");a(f)}),p.addEventListener("mouseout",()=>{a(i)}),p.addEventListener("click",c=>{i=parseInt(c.target.dataset.value||"0"),a(i),o&&(o.textContent=d[i-1])})});function a(p,c){n.forEach(f=>{parseInt(f.dataset.value||"0")<=p?f.style.color="#fbbf24":f.style.color="#e0e0e0"})}r&&r.addEventListener("click",async()=>{if(i===0){x("Vui lòng chọn số sao đánh giá","error");return}const p=(s==null?void 0:s.value)||"";try{r.disabled=!0,r.textContent="Đang gửi...";const c=z.getCurrentUser();await X.createReview({userId:String(c==null?void 0:c.id),userName:(c==null?void 0:c.name)||"Khách hàng",orderId:e,productId:t,rating:i,comment:p.trim()}),x("Cảm ơn bạn đã gửi đánh giá!","success"),window.location.hash="#/my-orders"}catch(c){x(c.message||"Lỗi khi gửi đánh giá","error"),r.disabled=!1,r.textContent="Hoàn thành đánh giá"}})}}class Y{static render(e){const t=`
      <!-- Hero Banner -->
      <div style="width:100%; height:360px; background:linear-gradient(135deg, #1a1a2e 0%, #333f48 100%); display:flex; align-items:center; justify-content:center; text-align:center; color:white;">
        <div>
          <h1 style="font-size:48px; font-weight:900; letter-spacing:4px; margin-bottom:16px; text-transform:uppercase;">LIÊN HỆ VỚI CHÚNG TÔI</h1>
          <p style="font-size:18px; max-width:620px; margin:0 auto; line-height:1.7; color:rgba(255,255,255,0.85);">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ qua bất kỳ kênh nào bên dưới — đội ngũ GENZ Fashion sẽ phản hồi nhanh nhất có thể.</p>
        </div>
      </div>

      <!-- Contact Info Cards -->
      <div class="container" style="padding:60px 15px 0;">
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:30px; margin-bottom:70px;">
          <!-- Card 1: Address -->
          <div style="background:#fff; border-radius:14px; padding:40px 30px; text-align:center; box-shadow:0 4px 24px rgba(0,0,0,0.07); transition:transform 0.3s ease, box-shadow 0.3s ease; cursor:default;" onmouseover="this.style.transform='translateY(-6px)'; this.style.boxShadow='0 12px 36px rgba(0,0,0,0.12)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 24px rgba(0,0,0,0.07)';">
            <div style="width:70px; height:70px; background:linear-gradient(135deg, #1a1a2e, #333f48); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:30px; margin:0 auto 20px; color:white;">📍</div>
            <h3 style="font-size:20px; font-weight:700; color:#111; margin-bottom:12px;">Địa chỉ</h3>
            <p style="color:#555; line-height:1.7; font-size:15px;">Tòa nhà FPT Polytechnic,<br>Trịnh Văn Bô, Nam Từ Liêm,<br>Hà Nội</p>
          </div>
          <!-- Card 2: Hotline -->
          <div style="background:#fff; border-radius:14px; padding:40px 30px; text-align:center; box-shadow:0 4px 24px rgba(0,0,0,0.07); transition:transform 0.3s ease, box-shadow 0.3s ease; cursor:default;" onmouseover="this.style.transform='translateY(-6px)'; this.style.boxShadow='0 12px 36px rgba(0,0,0,0.12)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 24px rgba(0,0,0,0.07)';">
            <div style="width:70px; height:70px; background:linear-gradient(135deg, #1a1a2e, #333f48); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:30px; margin:0 auto 20px; color:white;">📞</div>
            <h3 style="font-size:20px; font-weight:700; color:#111; margin-bottom:12px;">Hotline</h3>
            <p style="color:#555; line-height:1.7; font-size:15px;"><strong style="font-size:18px; color:#1a1a2e;">1900.636.000</strong><br>8h - 21h hàng ngày<br>Zalo: <strong>0987.654.321</strong></p>
          </div>
          <!-- Card 3: Email -->
          <div style="background:#fff; border-radius:14px; padding:40px 30px; text-align:center; box-shadow:0 4px 24px rgba(0,0,0,0.07); transition:transform 0.3s ease, box-shadow 0.3s ease; cursor:default;" onmouseover="this.style.transform='translateY(-6px)'; this.style.boxShadow='0 12px 36px rgba(0,0,0,0.12)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 24px rgba(0,0,0,0.07)';">
            <div style="width:70px; height:70px; background:linear-gradient(135deg, #1a1a2e, #333f48); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:30px; margin:0 auto 20px; color:white;">✉</div>
            <h3 style="font-size:20px; font-weight:700; color:#111; margin-bottom:12px;">Email</h3>
            <p style="color:#555; line-height:1.7; font-size:15px;"><a href="mailto:hello@genz-fashion.vn" style="color:var(--primary); text-decoration:none; font-weight:600;">hello@genz-fashion.vn</a><br><a href="mailto:wholesale@genz-fashion.vn" style="color:var(--primary); text-decoration:none; font-weight:600;">wholesale@genz-fashion.vn</a><br><span style="font-size:13px; color:#888;">(đặt hàng sỉ)</span></p>
          </div>
        </div>

        <!-- Two-column: Form + Wholesale -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:50px; margin-bottom:70px; align-items:start;">
          <!-- Left: Contact Form -->
          <div style="background:#fff; border-radius:14px; padding:40px; box-shadow:0 4px 24px rgba(0,0,0,0.07);">
            <h2 style="font-size:26px; font-weight:800; color:#111; margin-bottom:8px;">GỬI TIN NHẮN CHO CHÚNG TÔI</h2>
            <p style="color:#888; font-size:14px; margin-bottom:28px;">Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại sớm nhất.</p>
            <form id="contactForm" style="display:flex; flex-direction:column; gap:18px;">
              <!-- Họ tên -->
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#333; margin-bottom:6px;">Họ tên <span style="color:#e53935;">*</span></label>
                <input type="text" name="fullname" required placeholder="Nguyễn Văn A" style="width:100%; padding:12px 16px; border:1.5px solid #ddd; border-radius:8px; font-size:15px; outline:none; transition:border-color 0.2s; box-sizing:border-box;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#ddd'" />
              </div>
              <!-- Email -->
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#333; margin-bottom:6px;">Email <span style="color:#e53935;">*</span></label>
                <input type="email" name="email" required placeholder="email@example.com" style="width:100%; padding:12px 16px; border:1.5px solid #ddd; border-radius:8px; font-size:15px; outline:none; transition:border-color 0.2s; box-sizing:border-box;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#ddd'" />
              </div>
              <!-- Số điện thoại -->
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#333; margin-bottom:6px;">Số điện thoại <span style="color:#e53935;">*</span></label>
                <input type="tel" name="phone" required placeholder="0912 345 678" style="width:100%; padding:12px 16px; border:1.5px solid #ddd; border-radius:8px; font-size:15px; outline:none; transition:border-color 0.2s; box-sizing:border-box;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#ddd'" />
              </div>
              <!-- Chủ đề -->
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#333; margin-bottom:6px;">Chủ đề</label>
                <select name="subject" style="width:100%; padding:12px 16px; border:1.5px solid #ddd; border-radius:8px; font-size:15px; outline:none; background:#fff; color:#333; transition:border-color 0.2s; box-sizing:border-box; cursor:pointer;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#ddd'">
                  <option value="">-- Chọn chủ đề --</option>
                  <option value="wholesale">Tư vấn mua sỉ</option>
                  <option value="order-support">Hỗ trợ đơn hàng</option>
                  <option value="feedback">Góp ý sản phẩm</option>
                  <option value="partnership">Hợp tác kinh doanh</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <!-- Nội dung -->
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#333; margin-bottom:6px;">Nội dung <span style="color:#e53935;">*</span></label>
                <textarea name="message" required rows="5" placeholder="Nhập nội dung tin nhắn của bạn..." style="width:100%; padding:12px 16px; border:1.5px solid #ddd; border-radius:8px; font-size:15px; outline:none; resize:vertical; font-family:inherit; transition:border-color 0.2s; box-sizing:border-box;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#ddd'"></textarea>
              </div>
              <!-- Submit -->
              <button type="submit" style="padding:14px 32px; background:var(--primary); color:white; border:none; border-radius:8px; font-size:16px; font-weight:700; cursor:pointer; transition:opacity 0.2s; letter-spacing:0.5px;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">Gửi tin nhắn</button>
            </form>
          </div>

          <!-- Right: Wholesale Section -->
          <div style="background:linear-gradient(135deg, #f8f9fa 0%, #eef1f5 100%); border-radius:14px; padding:40px; box-shadow:0 4px 24px rgba(0,0,0,0.07);">
            <h2 style="font-size:26px; font-weight:800; color:#1a1a2e; margin-bottom:12px;">🏢 ĐẶT HÀNG SỈ & ĐẠI LÝ</h2>
            <p style="color:#555; font-size:15px; line-height:1.7; margin-bottom:24px;">GENZ Fashion luôn chào đón các đối tác, đại lý và cửa hàng muốn phân phối sản phẩm của chúng tôi. Chương trình bán sỉ được thiết kế linh hoạt, phù hợp với mọi quy mô kinh doanh.</p>

            <!-- Benefits -->
            <div style="margin-bottom:28px;">
              <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(0,0,0,0.06);">
                <span style="width:28px; height:28px; background:#1a7a4a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:700; flex-shrink:0;">✓</span>
                <span style="color:#333; font-size:15px;">Chiết khấu cao lên đến <strong>40%</strong></span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(0,0,0,0.06);">
                <span style="width:28px; height:28px; background:#1a7a4a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:700; flex-shrink:0;">✓</span>
                <span style="color:#333; font-size:15px;">Hỗ trợ đổi trả hàng linh hoạt</span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(0,0,0,0.06);">
                <span style="width:28px; height:28px; background:#1a7a4a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:700; flex-shrink:0;">✓</span>
                <span style="color:#333; font-size:15px;">Miễn phí vận chuyển đơn từ <strong>5 triệu</strong></span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(0,0,0,0.06);">
                <span style="width:28px; height:28px; background:#1a7a4a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:700; flex-shrink:0;">✓</span>
                <span style="color:#333; font-size:15px;">Nhân viên chuyên biệt tư vấn <strong>1-1</strong></span>
              </div>
              <div style="display:flex; align-items:center; gap:12px; padding:10px 0;">
                <span style="width:28px; height:28px; background:#1a7a4a; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:700; flex-shrink:0;">✓</span>
                <span style="color:#333; font-size:15px;">Catalogue và lookbook <strong>miễn phí</strong></span>
              </div>
            </div>

            <!-- Wholesale Contact Info -->
            <div style="background:#fff; border-radius:10px; padding:20px 24px; margin-bottom:24px; border-left:4px solid #1a1a2e;">
              <p style="margin:0 0 8px; color:#333; font-size:14px;"><strong>Hotline sỉ:</strong> <a href="tel:0987654321" style="color:var(--primary); text-decoration:none; font-weight:600;">0987.654.321</a></p>
              <p style="margin:0 0 8px; color:#333; font-size:14px;"><strong>Zalo OA:</strong> GENZ Fashion Wholesale</p>
              <p style="margin:0; color:#333; font-size:14px;"><strong>Email:</strong> <a href="mailto:wholesale@genz-fashion.vn" style="color:var(--primary); text-decoration:none; font-weight:600;">wholesale@genz-fashion.vn</a></p>
            </div>

            <!-- CTA Button -->
            <a href="tel:0987654321" style="display:block; text-align:center; padding:16px 32px; background:linear-gradient(135deg, #1a1a2e, #333f48); color:white; border-radius:10px; font-size:18px; font-weight:800; text-decoration:none; letter-spacing:1px; transition:opacity 0.2s; box-shadow:0 4px 16px rgba(26,26,46,0.3);" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">📞 GỌI NGAY</a>
          </div>
        </div>
      </div>

      <!-- Google Maps Embed -->
      <div style="width:100%; height:400px; filter:grayscale(0.3);">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863!2d105.7469!3d21.0381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b32b842a37%3A0xe91a56573e7f9a11!2sFPT%20Polytechnic%20Hanoi!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
          width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    `;e.innerHTML=b.render(t),b.bindEvents(),Y.bindFormEvents()}static bindFormEvents(){const e=document.getElementById("contactForm");e&&e.addEventListener("submit",t=>{t.preventDefault(),x("Cảm ơn bạn! Chúng tôi sẽ phản hồi trong 24h.","success"),e.reset()})}}const I=document.getElementById("app");if(I){$t.init();const m=new pt;m.addRoute("/",e=>{xt.render(I,e)}).addRoute("/products",e=>{ot.renderList(I,e)}).addRoute("/product/:id",e=>{ot.renderDetail(I,e)}).addRoute("/login",()=>{st.renderLogin(I)}).addRoute("/register",()=>{st.renderRegister(I)}).addRoute("/admin",()=>{j.renderDashboard(I)}).addRoute("/admin/products",()=>{j.renderProducts(I)}).addRoute("/admin/categories",()=>{j.renderCategories(I)}).addRoute("/admin/orders",()=>{j.renderOrders(I)}).addRoute("/admin/users",()=>{j.renderUsers(I)}).addRoute("/admin/wms-locations",()=>{K.renderLocations(I)}).addRoute("/admin/wms-import",()=>{K.renderImportBatches(I)}).addRoute("/admin/wms-inventory",()=>{K.renderInventory(I)}).addRoute("/admin/wms-export",()=>{K.renderExports(I)}).addRoute("/my-orders",()=>{It.render(I)}).addRoute("/review/:orderId/:productId",e=>{Tt.render(I,e)}).addRoute("/about",()=>{zt.render(I)}).addRoute("/contact",()=>{Y.render(I)}).setNotFound(()=>{I.innerHTML=b.render(`
        <div class="container" style="padding: 100px 0; text-align: center;">
          <h1 style="font-size: 64px; color: var(--primary);">404</h1>
          <h2 style="margin-bottom: 24px;">Không tìm thấy trang</h2>
          <a href="#/" class="btn btn-primary">Về Trang Chủ</a>
        </div>
      `),b.bindEvents()}),window.addEventListener("auth-changed",()=>{const e=window.location.hash||"#/";e!=="#/login"&&e!=="#/register"&&m.navigate(e)}),window.addEventListener("cart-updated",e=>{const t=document.getElementById("cart-badge");if(t){const n=e.detail.count;t.textContent=n.toString(),t.style.display=n>0?"flex":"none"}}),m.start()}
