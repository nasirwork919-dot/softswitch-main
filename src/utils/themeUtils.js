export const applyThemeToDOM = (themeMode, primaryColor) => {
  const htmlElement = document.documentElement;

  // Apply dark/light mode class
  if (themeMode === 'dark') {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  // Apply primary color
  htmlElement.style.setProperty('--color-primary', primaryColor);
  
  // Function to darken a hex color for hover states
  const darkenColor = (hex, percent) => {
    let f = parseInt(hex.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      c = f & 0x00ff00,
      s = f & 0x0000ff,
      l = f & 0xff0000;
    return (
      "#" +
      (
        0x1000000 +
        (l + (t - l) * p) & 0xff0000 |
        (c + (t - c) * p) & 0x00ff00 |
        (s + (t - s) * p) & 0x0000ff
      )
      .toString(16)
      .slice(1)
    );
  };
  htmlElement.style.setProperty('--color-primary-hover', darkenColor(primaryColor, -0.1)); // Darken by 10%
};

export const loadThemeFromLocalStorage = () => {
  const savedThemeMode = localStorage.getItem('themeMode') || 'light';
  const savedPrimaryColor = localStorage.getItem('primaryColor') || '#2563eb'; // Default blue-600
  applyThemeToDOM(savedThemeMode, savedPrimaryColor);
};