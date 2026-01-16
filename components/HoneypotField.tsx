'use client';

import React, { useEffect, useState } from 'react';

interface HoneypotFieldProps {
    fieldName?: string; // e.g. "website" or "_gotcha". Default to something tempting like "website" or "confirm_email"
}

export const HoneypotField: React.FC<HoneypotFieldProps> = ({ fieldName = 'confirm_website_url' }) => {
    // We can also use a "time-to-complete" check here or in the parent form.
    // For this component, we just render the hidden input.

    return (
        <div
            className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-50 overflow-hidden"
            aria-hidden="true"
        >
            <label htmlFor={fieldName} className="hidden">Do not fill this field</label>
            <input
                type="text"
                id={fieldName}
                name={fieldName}
                tabIndex={-1}
                autoComplete="off"
            // No "required" attribute, of course
            />
        </div>
    );
};
