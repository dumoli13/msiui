import React from 'react';

/**
 * ErrorFetchingView Component
 *
 * This component provides a styled placeholder for error states, particularly when a request cannot be processed.
 * It is designed to convey the issue clearly and provide context or guidance to the user.
 *
 */

function ErrorFetchingView() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <img src="/icons/ic-warning.svg" alt="warning" width={70} height={70} />
      <div className="text-center">
        <p className="text-24px text-neutral-100/85 dark:text-neutral-100-dark/85">
          We couldn&apos;t process your request.
        </p>
        <p className="text-14px text-neutral-100/45 dark:text-neutral-100-dark/45">
          Cloud server configuration takes 1-3 minutes, please wait.
        </p>
      </div>
    </div>
  );
}

export default ErrorFetchingView;
