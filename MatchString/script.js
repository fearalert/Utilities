function trimString(str) {
    return str.split(/\s+/).join(' ').trim();
}

function compareStrings() {
    const textarea1 = document.getElementById('textarea1').value;
    const textarea2 = document.getElementById('textarea2').value;

    const trimmedText1 = trimString(textarea1);
    const trimmedText2 = trimString(textarea2);

    const result = document.getElementById('result');
    
    if (trimmedText1 === trimmedText2) {
        result.textContent = 'The strings match!';
        result.style.color = 'green';
        alert(result.textContent);
    } else {
        result.textContent = 'The strings do not match.';
        result.style.color = 'red';
        alert(result.textContent);
    }
}

async function copyToClipboard(textareaId) {
    const textarea = document.getElementById(textareaId);
    try {
        if (textarea.value === ""){
            alert('The Textfield is empty. Cannot Copy Text')
        }
        else {
            await navigator.clipboard.writeText(textarea.value);
        alert('Copied the text: ' + textarea.value);
        }
        
    } catch (err) {
        alert('Failed to copy text: ' + err);
    }
}

function resetTextareas() {
    document.getElementById('textarea1').value = '';
    document.getElementById('textarea2').value = '';
    document.getElementById('result').textContent = '';
}
