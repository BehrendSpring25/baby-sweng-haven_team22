export const useToast = () => {
  const showToast = ({ title, description, position = 'top-right' }: { title: string; description: string; position?: string }) => {
    const toastContainer = document.querySelector('.toast-container');
    if (toastContainer) {
      toastContainer.className = `toast-container ${position}`; // Apply position class
    }
    const toastElement = document.createElement('div');
    toastElement.className = 'toast';
    toastElement.innerHTML = `
      <strong>${title}</strong>
      <p>${description}</p>
    `;
    if (toastContainer) {
      toastContainer.appendChild(toastElement);
    }

    setTimeout(() => {
      toastElement.remove();
    }, 3000); // Remove toast after 3 seconds
  };

  return { showToast };
};