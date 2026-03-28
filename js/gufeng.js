/* 墨韵书斋 - 古风动态特效脚本 */

(function() {
  const initGufeng = () => {
    const body = document.body;

    // 1. 注入背景元素
    if (!document.querySelector('.ink-texture')) {
      const ink = document.createElement('div');
      ink.className = 'ink-texture';
      body.appendChild(ink);
    }

    if (!document.querySelector('.mountain-bg')) {
      const mountain = document.createElement('div');
      mountain.className = 'mountain-bg';
      body.appendChild(mountain);
    }

    // 2. 初始化花瓣容器
    let petalContainer = document.getElementById('petals-container');
    if (!petalContainer) {
      petalContainer = document.createElement('div');
      petalContainer.id = 'petals-container';
      petalContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99;';
      body.appendChild(petalContainer);
    }

    // 3. 花瓣生成逻辑
    const createPetal = () => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      const duration = Math.random() * 10 + 10; // 10-20s
      const delay = Math.random() * 5;
      petal.style.animationDuration = duration + 's';
      petal.style.animationDelay = delay + 's';
      petal.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
      
      petalContainer.appendChild(petal);

      // 动画结束后移除元素，防止 DOM 过多导致卡顿
      setTimeout(() => {
        petal.remove();
      }, (duration + delay) * 1000);
    };

    // 每隔一段时间生成新花瓣
    const petalInterval = setInterval(() => {
      if (document.hidden) return; // 标签页隐藏时不生成
      if (petalContainer.children.length < 15) { // 限制同屏数量保证流畅
        createPetal();
      }
    }, 2000);

    // 4. 数字动画 (针对 Butterfly 的 card-archives 等统计)
    const animateNumbers = () => {
      const counters = document.querySelectorAll('.card-archives-count, .card-category-list-count, .card-tag-cloud-count');
      counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        if (isNaN(target)) return;
        
        let count = 0;
        const speed = target / 50; // 动画分50步完成
        
        const updateCount = () => {
          count += speed;
          if (count < target) {
            counter.innerText = Math.floor(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    };

    // 延迟执行数字动画
    setTimeout(animateNumbers, 1000);
  };

  // 兼容 PJAX
  if (typeof pjax !== 'undefined') {
    document.addEventListener('pjax:complete', initGufeng);
  }
  
  // 初始加载
  if (document.readyState === 'complete') {
    initGufeng();
  } else {
    window.addEventListener('load', initGufeng);
  }
})();
