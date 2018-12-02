const getCaretPosition = (field) => {
    // Initialize
    let iCaretPos = 0;

    // IE Support
    if (document.selection) {
    // Set focus on the element
        field.focus();

        // To get cursor position, get empty selection range
        const oSel = document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character', -field.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
    } else if (field.selectionStart || field.selectionStart === '0') {
        // Firefox support

        iCaretPos = field.selectionStart;
    }

    // Return results
    return iCaretPos;
};
const setCursorPosition = (field, pos) => {
    const type = field.getAttribute('type');

    if (type === 'text' || type === 'password') {
        if (field.setSelectionRange) {
            field.setSelectionRange(pos, pos);
        } else if (field.createTextRange) {
            const range = field.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
};

export {
    getCaretPosition,
    setCursorPosition,
};
