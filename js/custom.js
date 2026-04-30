// 打开加微信弹窗
function openWx(){
    document.getElementById('wxModal').style.display = 'flex';
}

// 关闭
function closeWx(){
    document.getElementById('wxModal').style.display = 'none';
}

// 复制微信号
function copyWx(){
    let input = document.createElement('input');
    input.value = 'kj99990';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('复制成功！请打开微信粘贴添加');
}