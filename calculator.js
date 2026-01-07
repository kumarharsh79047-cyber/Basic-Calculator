let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        if (num === '.' && currentValue.includes('.')) return;
        currentValue = currentValue === '0' && num !== '.' ? num : currentValue + num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null && !shouldResetDisplay) {
        calculate();
    }
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operation === null || shouldResetDisplay) return;
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }
 
    currentValue = result === 'Error' ? result : String(Math.round(result * 100000000) / 100000000);
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay()};

function deleteDigit() {
    if (currentValue === 'Error') {
        clearDisplay();
        return;
    }
    currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === 'Backspace') {
        deleteDigit();
    }
});