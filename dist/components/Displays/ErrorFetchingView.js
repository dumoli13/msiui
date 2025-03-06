import React from 'react';
/**
 * ErrorFetchingView Component
 *
 * This component provides a styled placeholder for error states, particularly when a request cannot be processed.
 * It is designed to convey the issue clearly and provide context or guidance to the user.
 *
 */
function ErrorFetchingView() {
    return (React.createElement("div", { className: "flex flex-col items-center justify-center gap-6 py-24" },
        React.createElement("img", { src: "/icons/ic-warning.svg", alt: "warning", width: 70, height: 70 }),
        React.createElement("div", { className: "text-center" },
            React.createElement("p", { className: "text-24px text-neutral-100/85" }, "We couldn't process your request."),
            React.createElement("p", { className: "text-14px text-neutral-100/45" }, "Cloud server configuration takes 1-3 minutes, please wait."))));
}
export default ErrorFetchingView;
//# sourceMappingURL=ErrorFetchingView.js.map