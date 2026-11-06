/* PREENCHA OS DADOS DE SUPORTE E POLÍTICAS.
Troque as imagens demonstrativas do material e dos depoimentos pelas imagens finais.
A data da oferta é fixa: não é renovada automaticamente. */
const CONFIG={supportEmail:'',termsUrl:'',privacyUrl:'',offerEnd:'2026-11-06T00:00:00-03:00'};
const MODELS=[{name:'Papai Noel',image:'assets/modelo-1.webp'},{name:'Rena de Natal',image:'assets/modelo-2.webp'},{name:'Boneco de neve',image:'assets/modelo-3.webp'},{name:'Árvore de Natal',image:'assets/modelo-4.webp'},{name:'Biscoito natalino',image:'assets/modelo-5.webp'},{name:'A turma do Natal',image:'assets/modelo-6.webp'}];
const EXTRA=[{"name": "Meias de crochê", "image": "assets/modelo-extra-1.webp"}, {"name": "Mesa posta de Natal", "image": "assets/modelo-extra-2.webp"}, {"name": "Papai Noel com presentes", "image": "assets/modelo-extra-3.webp"}, {"name": "Enfeites para a árvore", "image": "assets/modelo-extra-4.webp"}, {"name": "Papai Noel em feltro", "image": "assets/modelo-extra-5.webp"}, {"name": "Puxa-sacos em tecido", "image": "assets/modelo-extra-6.webp"}];
const MATERIAL_INSTAGRAM = [
  {
    "name": "Rena Amigurumi — página 1",
    "image": "assets/pagina-material-1.webp"
  },
  {
    "name": "Rena Amigurumi — página 2",
    "image": "assets/pagina-material-2.webp"
  },
  {
    "name": "Papai Noel Clássico — página 1",
    "image": "assets/pagina-material-3.webp"
  },
  {
    "name": "Cestinhas Natalinas — página 1",
    "image": "assets/pagina-material-4.webp"
  },
  {
    "name": "Boneco de Neve — página 2",
    "image": "assets/pagina-material-5.webp"
  },
  {
    "name": "Boneco de Neve — página 1",
    "image": "assets/pagina-material-6.webp"
  },
  {
    "name": "Estrela Papai Noel — página 1",
    "image": "assets/pagina-material-7.webp"
  },
  {
    "name": "Almofada Papai Noel — página 1",
    "image": "assets/pagina-material-8.webp"
  }
];
const MATERIAL_LOOP = [
  {
    "name": "Mini Papai Noel Amigurumi",
    "image": "assets/amostra-material-1.webp"
  },
  {
    "name": "Tapete Natalino Retangular",
    "image": "assets/amostra-material-2.webp"
  },
  {
    "name": "Tapete Papai Noel em Crochê",
    "image": "assets/amostra-material-3.webp"
  },
  {
    "name": "Casa Natalina Porta-Objetos",
    "image": "assets/amostra-material-4.webp"
  },
  {
    "name": "Porta-Talheres Árvore de Natal",
    "image": "assets/amostra-material-5.webp"
  },
  {
    "name": "Biscoito de Natal",
    "image": "assets/amostra-material-6.webp"
  },
  {
    "name": "Sousplat Natalino",
    "image": "assets/amostra-material-7.webp"
  },
  {
    "name": "Duende de Natal",
    "image": "assets/amostra-material-8.webp"
  },
  {
    "name": "Porta-copos Natalino",
    "image": "assets/amostra-material-9.webp"
  },
  {
    "name": "Quadrado Papai Noel em Crochê",
    "image": "assets/amostra-material-10.webp"
  }
];
const TESTIMONIALS=[{"name": "Conversa ilustrativa 1", "image": "assets/conversa-1.webp"}, {"name": "Conversa ilustrativa 2", "image": "assets/conversa-2.webp"}, {"name": "Conversa ilustrativa 3", "image": "assets/conversa-3.webp"}, {"name": "Conversa ilustrativa 4", "image": "assets/conversa-4.webp"}, {"name": "Conversa ilustrativa 5", "image": "assets/conversa-5.webp"}, {"name": "Conversa ilustrativa 6", "image": "assets/conversa-6.webp"}];
const modal=document.getElementById('modal');
function openModal(title,html){modal.classList.remove('image-modal');document.getElementById('modal-title').textContent=title;document.getElementById('modal-content').innerHTML=html;modal.showModal()}
modal.querySelector('.close').onclick=()=>modal.close();modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
function makeImage(item, expanded = false) {
  const im = document.createElement('img');
  const hasPreview = /\/(pagina-material|conversa)-/.test(item.image);
  im.src = hasPreview && !expanded ? item.image.replace('.webp', '-preview.webp') : item.image;
  im.alt = item.name;
  im.loading = expanded ? 'eager' : 'lazy';
  im.decoding = 'async';
  return im;
}
document.querySelectorAll('[data-loop]').forEach(el=>{const type=el.dataset.loop;const items=type==='material'?MATERIAL_LOOP:type==='models-reverse'?EXTRA:MODELS;const repeated=Array.from({length:Math.ceil(12/items.length)},()=>items).flat();const track=document.createElement('div');track.className='marquee-track';for(let copy=0;copy<2;copy++){const group=document.createElement('div');group.className='marquee-group';if(copy)group.setAttribute('aria-hidden','true');repeated.forEach(item=>{const card=document.createElement('figure');card.className='loop-card';card.appendChild(makeImage(item));if(type!=='material'){const caption=document.createElement('figcaption');caption.textContent=item.name;card.appendChild(caption)}group.appendChild(card)});track.appendChild(group)}el.appendChild(track)});
const marqueeObserver = new IntersectionObserver(entries => {
  entries.forEach(({target, isIntersecting}) => target.classList.toggle('is-visible', isIntersecting));
});
document.querySelectorAll('[data-loop]').forEach(track => marqueeObserver.observe(track));
document.querySelectorAll('[data-carousel]').forEach(carousel=>{
 const isMaterial=carousel.dataset.carousel==='material',items=isMaterial?MATERIAL_INSTAGRAM:TESTIMONIALS,slides=carousel.querySelector('.slides'),dots=carousel.querySelector('.dots');
 let index=0,visible=false,timer=null,dragging=false,startX=0,startScroll=0,moved=false,touched=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function stop(){clearTimeout(timer);timer=null}
 function schedule(){stop();if(isMaterial&&visible&&!modal.open&&!dragging&&!touched&&!document.hidden&&!reduced.matches)timer=setTimeout(()=>{go((index+1)%items.length);schedule()},3000)}
 function go(i){index=(i+items.length)%items.length;slides.scrollTo({left:slides.children[index].offsetLeft-slides.children[0].offsetLeft,behavior:reduced.matches?'instant':'smooth'});markDots()}
 function markDots(){[...dots.children].forEach((d,i)=>{d.classList.toggle('active',i===index);d.setAttribute('aria-pressed',String(i===index))})}
 items.forEach((item,i)=>{const slide=document.createElement('button');slide.type='button';slide.className='manual-slide';slide.setAttribute('aria-label','Ampliar: '+item.name);slide.appendChild(makeImage(item));slide.addEventListener('click',()=>{if(moved)return;stop();openModal('', '');modal.classList.add('image-modal');const image=makeImage(item,true);document.getElementById('modal-content').appendChild(image)});slides.appendChild(slide);const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label','Ir para imagem '+(i+1));dot.onclick=()=>{go(i);schedule()};dots.appendChild(dot)});
 slides.addEventListener('scroll',()=>{const left=slides.getBoundingClientRect().left;index=[...slides.children].reduce((best,el,i)=>Math.abs(el.getBoundingClientRect().left-left)<Math.abs(slides.children[best].getBoundingClientRect().left-left)?i:best,0);markDots()},{passive:true});
 slides.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(index+(e.key==='ArrowRight'?1:-1));schedule()}});
 slides.addEventListener('pointerdown',e=>{stop();startX=e.clientX;startScroll=slides.scrollLeft;moved=false;touched=true;if(e.pointerType==='mouse'){dragging=true;slides.classList.add('dragging')}});
 slides.addEventListener('pointermove',e=>{if(touched&&Math.abs(e.clientX-startX)>6)moved=true;if(dragging){e.preventDefault();slides.scrollLeft=startScroll-(e.clientX-startX)}});
 function release(){dragging=false;touched=false;slides.classList.remove('dragging');schedule()}
 window.addEventListener('pointerup',release);slides.addEventListener('pointercancel',release);slides.addEventListener('dragstart',e=>e.preventDefault());
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.25});observer.observe(carousel);
 modal.addEventListener('close',schedule);document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',schedule);markDots();
});
document.querySelectorAll('[data-info]').forEach(b=>b.onclick=()=>{const k=b.dataset.info;if(k==='Atendimento'&&CONFIG.supportEmail){location.href='mailto:'+CONFIG.supportEmail;return}const url=k==='Termos de uso'?CONFIG.termsUrl:k==='Privacidade'?CONFIG.privacyUrl:'';if(url){location.assign(url);return}openModal(k,'<p>As informações de '+k.toLowerCase()+' serão disponibilizadas antes da abertura das vendas.</p>')});
function updateUrgency(){if(Date.now()>=new Date(CONFIG.offerEnd).getTime())document.getElementById('urgency').textContent='COLEÇÃO DE AMIGURUMIS DE NATAL • ESCOLHA SEU PLANO'}updateUrgency();setInterval(updateUrgency,60000);
