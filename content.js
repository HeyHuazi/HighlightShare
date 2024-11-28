let cardModal = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "createCard") {
    createShareCard(request);
  }
});

function createShareCard(data) {
  if (cardModal) {
    document.body.removeChild(cardModal);
  }

  // 创建模态框
  cardModal = document.createElement('div');
  cardModal.className = 'highlight-share-modal';
  
  // 创建卡片容器
  const card = document.createElement('div');
  card.className = 'highlight-share-card';
  card.setAttribute('data-style', '1');

  // 获取页面信息
  const pageTitle = document.title;
  const pageUrl = window.location.href;
  const favicon = document.querySelector('link[rel*="icon"]')?.href || '/favicon.ico';

  // 处理选中的文本，保留段落格式
  const formattedText = data.selection ? formatSelectedText(data.selection) : '';

  // 构建卡片内容
  card.innerHTML = `
    <div class="card-header">
      <img src="${favicon}" class="favicon" alt="favicon" crossorigin="anonymous">
      <div class="page-info">
        <div class="page-title">${pageTitle}</div>
        <div class="page-url">${pageUrl}</div>
      </div>
    </div>
    <div class="card-content">
      ${formattedText ? `<div class="selected-text">${formattedText}</div>` : ''}
      ${data.imageUrl ? `<img src="${data.imageUrl}" class="selected-image" alt="selected image" crossorigin="anonymous">` : ''}
    </div>
  `;

  // 创建工具栏
  const toolbar = document.createElement('div');
  toolbar.className = 'card-toolbar';
  toolbar.innerHTML = `
    <button class="style-switch">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M23 4v6h-6"/>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
      切换
    </button>
    <button class="copy-card">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
      复制
    </button>
    <button class="download-card">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      下载
    </button>
    <button class="close-modal">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      关闭
    </button>
  `;

  // 添加事件监听
  toolbar.querySelector('.style-switch').addEventListener('click', switchStyle);
  toolbar.querySelector('.download-card').addEventListener('click', () => downloadCard(card));
  toolbar.querySelector('.copy-card').addEventListener('click', () => copyCard(card));
  toolbar.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(cardModal);
    cardModal = null;
  });

  // 添加卡片右键菜单
  card.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const contextMenu = document.createElement('div');
    contextMenu.className = 'card-context-menu';
    contextMenu.innerHTML = `
      <div class="menu-item copy">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        复制卡片
      </div>
      <div class="menu-item download">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        下载卡片
      </div>
    `;
    
    contextMenu.style.top = `${e.clientY}px`;
    contextMenu.style.left = `${e.clientX}px`;
    
    document.body.appendChild(contextMenu);
    
    const removeMenu = () => {
      if (document.body.contains(contextMenu)) {
        document.body.removeChild(contextMenu);
      }
      document.removeEventListener('click', removeMenu);
    };
    
    contextMenu.querySelector('.copy').addEventListener('click', () => {
      copyCard(card);
      removeMenu();
    });
    
    contextMenu.querySelector('.download').addEventListener('click', () => {
      downloadCard(card);
      removeMenu();
    });
    
    document.addEventListener('click', removeMenu);
  });

  cardModal.appendChild(card);
  cardModal.appendChild(toolbar);
  document.body.appendChild(cardModal);

  // 预加载图片
  const images = card.querySelectorAll('img');
  Promise.all(Array.from(images).map(img => {
    return new Promise((resolve, reject) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
        img.onerror = resolve; // 即使加载失败也继续
      }
    });
  })).then(() => {
    // 所有图片加载完成后，调整卡片大小
    card.style.maxHeight = '80vh';
    card.style.overflow = 'auto';
  });
}

function switchStyle() {
  const card = document.querySelector('.highlight-share-card');
  const currentStyle = card.getAttribute('data-style') || '1';
  const nextStyle = currentStyle === '1' ? '2' : '1';
  card.setAttribute('data-style', nextStyle);
}

async function downloadCard(cardElement) {
  try {
    showToast('正在生成卡片...');
    
    // 创建一个容器来保持样式隔离
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = cardElement.offsetWidth + 'px';
    container.style.height = 'auto';
    container.style.transform = 'none';
    container.style.zIndex = '-1';
    
    // 克隆卡片元素
    const clonedCard = cardElement.cloneNode(true);
    
    // 复制计算后的样式
    const computedStyle = window.getComputedStyle(cardElement);
    for (const prop of computedStyle) {
      clonedCard.style[prop] = computedStyle.getPropertyValue(prop);
    }
    
    // 确保背景色正确
    const isDarkMode = cardElement.getAttribute('data-style') === '2';
    clonedCard.style.backgroundColor = isDarkMode ? '#2c2c2c' : '#ffffff';
    clonedCard.style.position = 'relative';
    clonedCard.style.left = '0';
    clonedCard.style.top = '0';
    clonedCard.style.transform = 'none';
    clonedCard.style.margin = '0';
    clonedCard.style.width = '100%';
    
    // 复制子元素样式
    const sourceElements = cardElement.getElementsByTagName('*');
    const clonedElements = clonedCard.getElementsByTagName('*');
    for (let i = 0; i < sourceElements.length; i++) {
      const computedStyle = window.getComputedStyle(sourceElements[i]);
      for (const prop of computedStyle) {
        clonedElements[i].style[prop] = computedStyle.getPropertyValue(prop);
      }
    }
    
    container.appendChild(clonedCard);
    document.body.appendChild(container);

    const options = {
      useCORS: true,
      allowTaint: true,
      backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff',
      scale: 2,
      logging: false,
      width: cardElement.offsetWidth,
      height: cardElement.offsetHeight,
      removeContainer: true,
      foreignObjectRendering: false
    };

    const canvas = await html2canvas(clonedCard, options);
    document.body.removeChild(container);
    
    const dataUrl = canvas.toDataURL('image/png');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    chrome.runtime.sendMessage({
      action: 'downloadCard',
      dataUrl: dataUrl,
      filename: `highlight-share-${timestamp}.png`
    });

    showToast('卡片已生成，请选择保存位置');
  } catch (error) {
    console.error('Failed to download card:', error);
    showToast('生成卡片失败，请重试');
  }
}

async function copyCard(cardElement) {
  try {
    showToast('正在生成卡片...');
    
    // 创建一个容器来保持样式隔离
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = cardElement.offsetWidth + 'px';
    container.style.height = 'auto';
    container.style.transform = 'none';
    container.style.zIndex = '-1';
    
    // 克隆卡片元素
    const clonedCard = cardElement.cloneNode(true);
    
    // 复制计算后的样式
    const computedStyle = window.getComputedStyle(cardElement);
    for (const prop of computedStyle) {
      clonedCard.style[prop] = computedStyle.getPropertyValue(prop);
    }
    
    // 确保背景色正确
    const isDarkMode = cardElement.getAttribute('data-style') === '2';
    clonedCard.style.backgroundColor = isDarkMode ? '#2c2c2c' : '#ffffff';
    clonedCard.style.position = 'relative';
    clonedCard.style.left = '0';
    clonedCard.style.top = '0';
    clonedCard.style.transform = 'none';
    clonedCard.style.margin = '0';
    clonedCard.style.width = '100%';
    
    // 复制子元素样式
    const sourceElements = cardElement.getElementsByTagName('*');
    const clonedElements = clonedCard.getElementsByTagName('*');
    for (let i = 0; i < sourceElements.length; i++) {
      const computedStyle = window.getComputedStyle(sourceElements[i]);
      for (const prop of computedStyle) {
        clonedElements[i].style[prop] = computedStyle.getPropertyValue(prop);
      }
    }
    
    container.appendChild(clonedCard);
    document.body.appendChild(container);

    const options = {
      useCORS: true,
      allowTaint: true,
      backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff',
      scale: 2,
      logging: false,
      width: cardElement.offsetWidth,
      height: cardElement.offsetHeight,
      removeContainer: true,
      foreignObjectRendering: false
    };

    const canvas = await html2canvas(clonedCard, options);
    document.body.removeChild(container);
    
    canvas.toBlob(async (blob) => {
      try {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        showToast('卡片已复制到剪贴板');
      } catch (error) {
        console.error('Failed to copy card:', error);
        showToast('复制失败，请重试');
      }
    });
  } catch (error) {
    console.error('Failed to create card image:', error);
    showToast('生成卡片失败，请重试');
  }
}

// 格式化选中的文本，保留段落格式
function formatSelectedText(text) {
  if (!text) return '';
  
  // 分割文本为段落
  const paragraphs = text.split(/\n\s*\n/);
  
  // 处理每个段落
  return paragraphs
    .map(p => {
      // 处理单个段落中的换行
      const lines = p.trim().split('\n');
      const processedParagraph = lines
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('<br>');
      
      return processedParagraph ? `<p>${processedParagraph}</p>` : '';
    })
    .filter(p => p.length > 0)
    .join('');
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'highlight-share-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  }, 100);
}

// 动态加载html2canvas
const script = document.createElement('script');
script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
document.head.appendChild(script);
