document.addEventListener('DOMContentLoaded', (event) => {

    const textarea = document.createElement('textarea');
    const codeBlock = document.getElementById('editor');

    textarea.addEventListener('input', (e) => {
        codeBlock.textContent = e.target.value;
        Prism.highlightElement(codeBlock);
    });

    // Append the textarea offscreen
    Object.assign(textarea.style, {
        position: 'absolute',
        left: '-9999px',
        top: '0',
    });
    
    document.body.appendChild(textarea);

    // To allow the user to "edit" the code block,
    // when they click on the code block, focus the off-screen textarea.
    codeBlock.addEventListener('click', () => {
        textarea.focus();
    });

    // Focus the off-screen textarea initially
    textarea.focus();
});
