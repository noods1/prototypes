function BackToLauncher() {
  const handleBackToLauncher = () => {
    window.location.href = '/';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] bg-blue-600 text-white px-4 py-2 h-[40px] flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <button
          onClick={handleBackToLauncher}
          className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Launcher
        </button>
      </div>
    </div>
  );
}

export default BackToLauncher;
