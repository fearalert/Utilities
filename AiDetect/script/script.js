require('dotenv').config();

const apiKey = process.env.API_KEY;

async function detectAndHumanize() {
    const inputText = document.getElementById('inputText').value;

    // Simple heuristic to "detect" AI-written text
    const aiKeywords = ['In conclusion', 'Firstly', 'Moreover', 'In addition', 'Thus', 'Therefore'];
    let isAIText = false;

    for (let keyword of aiKeywords) {
        if (inputText.includes(keyword)) {
            isAIText = true;
            break;
        }
    }

    const detectionResult = document.getElementById('detectionResult');
    if (isAIText) {
        detectionResult.textContent = 'The text is likely AI-generated.';
    } else {
        detectionResult.textContent = 'The text is likely human-written.';
    }

    const humanizedText = await getHumanizedText(inputText);
    if (detectionResult.textContent = 'The text is likely AI-generated'){
            document.getElementById('humanizedText').textContent = humanizedText;
    }
    else {
        document.getElementById('humanizedText').textContent = 'The text is already humanized';
    }
}

async function getHumanizedText(text) {
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: text,
            parameters: {
                max_length: 150
            }
        })
    });

    const data = await response.json();
    return data[0].generated_text || 'Error generating humanized text.';
}
