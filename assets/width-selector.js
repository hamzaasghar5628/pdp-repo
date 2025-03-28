class WidthSelector extends HTMLElement {
  constructor() {
    super();
    this.widthSelector = document.getElementById('width-selector');
    
    if (this.widthSelector) {
      // Add change event listener
      this.widthSelector.addEventListener('change', () => this.updateFabricPanel());

      // Initialize on page load
      document.addEventListener('DOMContentLoaded', () => this.updateFabricPanel());
    }
  }

  updateFabricPanel() {
    const selectedOption = this.widthSelector.options[this.widthSelector.selectedIndex];
    const panelCount = selectedOption.getAttribute('data-panel-count');
    const selectedWidth = selectedOption.value; // Get the selected width value
    
    // Update the hidden input with the selected width
    const widthInput = document.getElementById('product-width');
    if (widthInput) {
      widthInput.value = selectedWidth;
    }
    // Add loading state to price
    const priceElement = document.querySelector('.price');
    if (priceElement) {
      priceElement.style.opacity = '0.5';
      priceElement.classList.add('loading');  
    }
    
    // Find the Fabric Panels variant selector
    const fabricPanelSelect = document.querySelector('select.select__select[name="options[Fabric Panel]"]');
    
    if (fabricPanelSelect) {
      const optionToSelect = Array.from(fabricPanelSelect.options).find(option => {
        const optionText = option.textContent.trim();
        const optionValue = option.value;
        
        // Try different matching patterns
        return optionText === panelCount || // Exact match
               optionText === `${panelCount} Panels` || // With "Panels" suffix
               optionText === `${panelCount} Panel` || // With "Panel" suffix
               optionValue === panelCount || // Match value
               optionText.includes(panelCount); // Partial match
      });
            
      if (optionToSelect) {
        fabricPanelSelect.value = optionToSelect.value;
        // Trigger change event to update any dependent logic
        fabricPanelSelect.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Remove loading state after a short delay
        setTimeout(() => {
          if (priceElement) {
            priceElement.style.opacity = '1';
            priceElement.classList.remove('loading');
          }
        }, 500);
      }
    }
  }
}
// Register the custom element
customElements.define('width-selector', WidthSelector);