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
  
  // 创建卡片
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
    <div class="card-footer">
      <div class="qrcode-container" style="display: none;"></div>
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
    <button class="qrcode-toggle">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <rect x="7" y="7" width="3" height="3"/>
        <rect x="14" y="7" width="3" height="3"/>
        <rect x="7" y="14" width="3" height="3"/>
        <rect x="14" y="14" width="3" height="3"/>
      </svg>
      二维码
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

  // 将卡片和工具栏添加到模态框
  cardModal.appendChild(card);
  cardModal.appendChild(toolbar);
  document.body.appendChild(cardModal);

  // 添加事件监听
  const styleSwitch = toolbar.querySelector('.style-switch');
  const qrcodeToggle = toolbar.querySelector('.qrcode-toggle');
  const downloadBtn = toolbar.querySelector('.download-card');
  const copyBtn = toolbar.querySelector('.copy-card');
  const closeBtn = toolbar.querySelector('.close-modal');
  const qrcodeContainer = card.querySelector('.qrcode-container'); // 从卡片中查找二维码容器

  console.log('Found buttons:', {
    styleSwitch: !!styleSwitch,
    qrcodeToggle: !!qrcodeToggle,
    downloadBtn: !!downloadBtn,
    copyBtn: !!copyBtn,
    closeBtn: !!closeBtn,
    qrcodeContainer: !!qrcodeContainer
  });

  if (styleSwitch) {
    styleSwitch.addEventListener('click', () => switchStyle(card));
  }

  if (qrcodeToggle && qrcodeContainer) {
    qrcodeToggle.addEventListener('click', () => toggleQRCode(card, qrcodeContainer));
  } else {
    console.error('QR code toggle button or container not found', {
      toggle: !!qrcodeToggle,
      container: !!qrcodeContainer
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => downloadCard(card));
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => copyCard(card));
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

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

// 切换主题样式
function switchStyle(cardElement) {
  const currentStyle = cardElement.getAttribute('data-style') || '1';
  const nextStyle = currentStyle === '1' ? '2' : '1';
  cardElement.setAttribute('data-style', nextStyle);

  // 如果二维码正在显示，更新二维码颜色
  const qrcodeContainer = cardElement.querySelector('.qrcode-container');
  const button = cardElement.querySelector('.qrcode-toggle');

  if (!qrcodeContainer) {
    console.error('QR code container not found');
    return;
  }

  if (!button) {
    console.error('QR code toggle button not found');
    return;
  }

  if (qrcodeContainer.style.display === 'block') {
    qrcodeContainer.innerHTML = '';
    generateQRCode(cardElement, qrcodeContainer);
  }
}

// 切换二维码显示/隐藏
function toggleQRCode(cardElement, qrcodeContainer) {
  console.log('toggleQRCode called');
  const button = cardModal.querySelector('.qrcode-toggle');
  
  console.log('Found elements:', {
    qrcodeContainer: !!qrcodeContainer,
    button: !!button
  });

  if (!qrcodeContainer || !button) {
    console.error('Required elements not found');
    return;
  }

  if (qrcodeContainer.style.display === 'none') {
    qrcodeContainer.style.display = 'block';
    generateQRCode(cardElement, qrcodeContainer);
    button.classList.add('active');
  } else {
    qrcodeContainer.style.display = 'none';
    button.classList.remove('active');
  }
}

// 生成二维码
function generateQRCode(cardElement, qrcodeContainer) {
  console.log('Generating QR code');
  const isDarkTheme = cardElement.getAttribute('data-style') === '2';
  
  try {
    // 清除旧的二维码
    qrcodeContainer.innerHTML = '';
    
    // 创建新的二维码
    const qrcode = new QRCode(qrcodeContainer, {
      text: window.location.href,
      width: 70,
      height: 70,
      colorDark: isDarkTheme ? "#FFFFFF" : "#000000",
      colorLight: isDarkTheme ? "#000000" : "#FFFFFF",
      correctLevel: QRCode.CorrectLevel.H
    });
    
    console.log('QR code generated successfully');
  } catch (error) {
    console.error('Failed to generate QR code:', error);
  }
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

// 关闭模态框
function closeModal() {
  console.log('Closing modal');
  if (cardModal && document.body.contains(cardModal)) {
    document.body.removeChild(cardModal);
    cardModal = null;
  }
}

// 动态加载html2canvas
const script = document.createElement('script');
script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
document.head.appendChild(script);
