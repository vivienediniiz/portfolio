document.querySelectorAll('.tec-img').forEach(imgContainer => {
    const tooltip = imgContainer.querySelector('.tooltip');
    
    imgContainer.addEventListener('mousemove', (e) => {
        // Calcula a posição relativa ao container
        const rect = imgContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Posiciona o tooltip com offset pequeno
        tooltip.style.transform = `translate(${x + 5}px, ${y + 5}px)`;
    });
});