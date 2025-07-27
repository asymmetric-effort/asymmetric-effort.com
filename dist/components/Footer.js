// (c) 2025 Asymmetric Effort, LLC. All Rights Reserved.
import React from 'react';
/** Application footer with dynamic year. */
export default function Footer() {
    var year = new Date().getFullYear();
    return (React.createElement("footer", null,
        React.createElement("span", null,
            "\u00A9 2022-",
            year,
            " Asymmetric Effort, LLC. All Rights Reserved.")));
}
