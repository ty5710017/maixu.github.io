const copyWxBtn = document.getElementById('copyWxBtn');
copyWxBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('kj99990').then(() => {
        copyWxBtn.textContent = '复制成功！';
        setTimeout(() => {
            copyWxBtn.textContent = '复制微信号';
        }, 1500);
    });
});