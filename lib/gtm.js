import { sendGTMEvent } from '@next/third-parties/google';

/**
 * Utility to push events to GTM and Meta Pixel.
 * @param eventName - The name of the custom event
 * @param label - The human-readable label
 * @param extraData - Additional parameters
 */
export const pushGTMEvent = (
    eventName,
    label,
    extraData = {}
) => {
    // 1. Send to GTM using your existing library
    sendGTMEvent({
        event: eventName,
        value: label,
        ...extraData,
    });

    // 2. Send to Meta Pixel (Manual Installation)
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        
        // Map internal events to Meta Standard or Custom events
        if (eventName === 'form_submit_success') {
            // Track as a Standard 'Lead' event for better Meta optimization
            window.fbq('track', 'Lead', {
                content_name: label,
                ...extraData,
            });
        } else {
            // Track everything else (clicks/nav) as a Custom Event
            window.fbq('trackCustom', eventName, {
                button_label: label,
                ...extraData,
            });
        }
    }
};