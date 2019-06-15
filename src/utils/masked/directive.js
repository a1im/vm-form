import masker from './masker';
import tokens from './tokens';

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
function event(name) {
    const evt = document.createEvent('Event');

    evt.initEvent(name, true, true);

    return evt;
}

export default function (el, binding) {
    let config = binding.value;

    if (Array.isArray(config) || typeof config === 'string') {
        config = {
            mask: config,
            tokens,
            masked: true,
        };
    }

    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        const els = el.getElementsByTagName('input');

        if (els.length !== 1) {
            throw new Error(`v-mask directive requires 1 input, found ${els.length}`);
        }
    }

    el.oninput = function (evt) {
        // avoid infinite loop
        if (!evt.isTrusted) {
            return;
        }
        // by default, keep cursor at same position as before the mask
        let { selectionEnd: position } = el;
        // save the character just inserted
        const digit = el.value[position - 1];

        el.value = masker(el.value, config.mask, true, config.tokens);
        // if the digit was changed, increment position until find the digit again
        while (position < el.value.length && el.value.charAt(position - 1) !== digit) {
            position++;
        }
        if (el === document.activeElement) {
            el.setSelectionRange(position, position);
            setTimeout(() => {
                el.setSelectionRange(position, position);
            });
        }
        el.dispatchEvent(event('input'));
        el.dispatchEvent(event('inputMasked'));
    };

    const newDisplay = masker(el.value, config.mask, true, config.tokens);

    if (newDisplay !== el.value) {
        el.value = newDisplay;
        el.dispatchEvent(event('input'));
        el.dispatchEvent(event('inputMasked'));
    }
}
