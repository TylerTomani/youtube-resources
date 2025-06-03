// 
addEventListener('DOMContentLoaded', e => {
    addEventListener('keydown', e => {
        const letter = e.key.toLowerCase();
        if (letter.length !== 1 || !/^[a-z0-9]$/.test(letter)) {
            return;
        }

        const allAs = [...document.querySelectorAll('a, [id]')].filter(a => {
            const rect = a.getBoundingClientRect();
            return a.offsetParent != null && rect.width > 0 && rect.height > 0;
        });

        // Filter to elements whose *first visible alphanumeric character* matches the key
        // const letteredAs = allAs.filter(a => {
        //     const words = a.textContent.trim().toLowerCase().split(/\s+/);
        //     return words.some(word => word[0] === letter);
        // });
        const letteredAs = allAs.filter(a => {
            const words = a.textContent.trim().toLowerCase().split(/\s+/);
            return words.some(word => {
                const cleaned = word.replace(/^[^a-z0-9]+/i, ''); // strip leading non-alphanumerics
                return cleaned[0] === letter;
            });
        });

        if (letteredAs.length === 0) return;

        const activeEl = document.activeElement;
        const iActiveEl = [...allAs].indexOf(activeEl);
        const iLetteredA = letteredAs.indexOf(activeEl);

        let iLetter;
        if (letter !== window.lastLetterPressed) {
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

        window.lastLetterPressed = letter;
    });

})