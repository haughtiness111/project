// 创建一个画布来生成课程图片
function generateCourseImage(text, bgColor) {
    // 创建canvas元素
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // 设置背景
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 设置文字样式
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 绘制文字
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // 转换为图片URL
    return canvas.toDataURL('image/jpeg', 0.8);
}

// 当页面加载完成后生成图片
document.addEventListener('DOMContentLoaded', function() {
    // 生成课程1图片
    const course1Image = generateCourseImage('AI助手开发实践', '#4CAF50');
    
    // 生成课程2图片
    const course2Image = generateCourseImage('教育软件设计原则', '#2196F3');

    // 创建下载链接
    function downloadImage(dataUrl, filename) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // 下载生成的图片
    downloadImage(course1Image, 'course1.jpg');
    downloadImage(course2Image, 'course2.jpg');
});