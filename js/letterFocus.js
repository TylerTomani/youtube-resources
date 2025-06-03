addEventListener('keydown', e => {
    // Normalize e.code to alphanumeric letter/number, ignoring Shift
    let letter = '';
    if (/^Key[A-Z]$/.test(e.code)) {
        letter = e.code.replace('Key', '').toLowerCase();
    } else if (/^Digit[0-9]$/.test(e.code)) {
        letter = e.code.replace('Digit', '');
    } else {
        return; // Not a usable key (ignore punctuation, symbols, etc.)
    }

    const allAs = [...document.querySelectorAll('a, [id]')].filter(a => {
        const rect = a.getBoundingClientRect();
        return a.offsetParent != null && rect.width > 0 && rect.height > 0;
    });

    // Filter to elements whose *first visible alphanumeric character* matches the key
    const letteredAs = allAs.filter(a => {
        const words = a.textContent.trim().toLowerCase().split(/\s+/);

        return words.some(word => {
            const cleaned = word.replace(/^[^a-z0-9]+/i, ''); // Remove leading symbols
            if (!cleaned) return false;

            // If key is a number and cleaned starts with leading 0s like "02"
            if (/^\d+$/.test(cleaned) && /^[0]+[1-9]/.test(cleaned)) {
                // Allow match on either '0' or the first non-zero digit
                return cleaned[0] === letter || cleaned.match(/[1-9]/)?.[0] === letter;
            }

            // Standard alphanumeric match
            return cleaned[0] === letter;
        });
    });

    if (letteredAs.length === 0) return;

    const activeEl = document.activeElement;
    const iActiveEl = allAs.indexOf(activeEl);
    const iLetteredA = letteredAs.indexOf(activeEl);

    const keySignature = `${e.shiftKey ? 'shift+' : ''}${letter}`;
    let iLetter;

    if (keySignature !== window.lastKeySignature) {
        if (e.shiftKey) {
            const prev = [...letteredAs].reverse().find(a => allAs.indexOf(a) < iActiveEl);
            iLetter = letteredAs.indexOf(prev);
            if (iLetter === -1) iLetter = letteredAs.length - 1;
        } else {
            const next = letteredAs.find(a => allAs.indexOf(a) > iActiveEl);
            iLetter = letteredAs.indexOf(next);
            if (iLetter === -1) iLetter = 0;
        }
        letteredAs[iLetter]?.focus();
    } else {
        if (e.shiftKey) {
            iLetter = (iLetteredA - 1 + letteredAs.length) % letteredAs.length;
        } else {
            iLetter = (iLetteredA + 1) % letteredAs.length;
        }
        letteredAs[iLetter]?.focus();
    }

    window.lastKeySignature = keySignature;
});
