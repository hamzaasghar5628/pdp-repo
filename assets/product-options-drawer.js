class ProductOptionsDrawer extends HTMLElement {
  constructor() {
    super();
    this.drawer = this.querySelector('.product-options-drawer');
    this.closeButton = this.querySelector('.drawer-close');
    this.triggers = document.querySelectorAll('.product-option-trigger');
    this.fabricItems = this.querySelectorAll('.fabric-item');
    this.colorItems = this.querySelectorAll('.color-item');
    this.confirmButton = this.querySelector('.confirm-choices');
    this.selectedFabric = null;
    this.selectedColor = null;

    this.init();
  }

  init() {
    // Hide all color sections initially
    this.hideAllColorSections();

    // Show colors for first fabric by default
    if (this.fabricItems.length > 0) {
      const firstFabric = this.fabricItems[0];
      this.selectFabric(firstFabric);
    }

    // Event Listeners
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.openDrawer());
    });

    this.closeButton.addEventListener('click', () => this.closeDrawer());

    this.fabricItems.forEach(item => {
      item.addEventListener('click', () => this.selectFabric(item));
    });

    this.colorItems.forEach(item => {
      item.addEventListener('click', () => this.selectColor(item));
    });

    this.confirmButton.addEventListener('click', () => this.confirmChoices());
  }

  hideAllColorSections() {
    const colorSections = this.querySelectorAll('.fabric-colors');
    colorSections.forEach(section => {
      section.style.display = 'none';
    });
  }

  selectFabric(fabricItem) {
    // Remove selected class from all fabric items
    this.fabricItems.forEach(item => item.classList.remove('selected'));
    
    // Add selected class to clicked fabric
    fabricItem.classList.add('selected');
    
    // Store selected fabric
    this.selectedFabric = fabricItem.dataset.value;
    
    // Hide all color sections
    this.hideAllColorSections();
    
    // Show colors for selected fabric
    const fabricColors = this.querySelector(`.fabric-colors[data-fabric="${this.selectedFabric}"]`);
    if (fabricColors) {
      fabricColors.style.display = 'block';
    }

    // Update the fabric trigger text and hidden input
    const fabricTrigger = document.querySelector('.product-option-trigger[data-option-type="fabric"] .selected-value');
    const fabricInput = document.getElementById('product-fabric');
    if (fabricTrigger) {
      fabricTrigger.textContent = this.selectedFabric;
    }
    if (fabricInput) {
      fabricInput.value = this.selectedFabric;
    }

    // Reset color selection when fabric changes
    this.colorItems.forEach(item => item.classList.remove('selected'));
    this.selectedColor = null;
    const colorTrigger = document.querySelector('.product-option-trigger[data-option-type="color"] .selected-value');
    if (colorTrigger && fabricColors) {
      const firstColor = fabricColors.querySelector('.color-item');
      if (firstColor) {
        this.selectColor(firstColor);
      }
    }
  }

  selectColor(colorItem) {
    // Only allow selection if color belongs to selected fabric
    if (colorItem.dataset.fabric === this.selectedFabric) {
      // Remove selected class from all color items
      this.colorItems.forEach(item => item.classList.remove('selected'));
      
      // Add selected class to clicked color
      colorItem.classList.add('selected');
      
      // Store selected color
      this.selectedColor = colorItem.dataset.value;
      
      // Update the color trigger text and hidden input
      const colorTrigger = document.querySelector('.product-option-trigger[data-option-type="color"] .selected-value');
      const colorInput = document.getElementById('product-colour');
      if (colorTrigger) {
        colorTrigger.textContent = this.selectedColor;
      }
      if (colorInput) {
        colorInput.value = this.selectedColor;
      }

      // If both fabric and color are selected, close the drawer after a short delay
      if (this.selectedFabric && this.selectedColor) {
        setTimeout(() => {
          this.closeDrawer();
        }, 300);
      }
    }
  }

  openDrawer() {
    this.drawer.classList.add('active');
    this.drawer.setAttribute('aria-hidden', 'false');
  }

  closeDrawer() {
    this.drawer.classList.remove('active');
    this.drawer.setAttribute('aria-hidden', 'true');
  }

  confirmChoices() {
    if (this.selectedFabric && this.selectedColor) {
      // Here you can add logic to update the product variant or handle the selections
      this.closeDrawer();
    }
  }
}

customElements.define('product-options-drawer', ProductOptionsDrawer); 