import React, { useState, useEffect } from 'react';
import ModulePage from '../../components/common/ModulePage';
import HeroSection from '../../components/settings/HeroSection';
import { Palette, Sun, Moon, Check, Plus } from 'lucide-react';
import { applyThemeToDOM, loadThemeFromLocalStorage } from '../../utils/themeUtils'; // Import theme utilities

const Theme = () => {
    const [themeMode, setThemeMode] = useState('light');
    const [primaryColor, setPrimaryColor] = useState('#2563eb');
    const [customColorInput, setCustomColorInput] = useState('');
    const [userDefinedColors, setUserDefinedColors] = useState([]);

    // Load theme from localStorage on component mount
    useEffect(() => {
        const savedThemeMode = localStorage.getItem('themeMode');
        const savedPrimaryColor = localStorage.getItem('primaryColor');
        const savedUserColors = JSON.parse(localStorage.getItem('userDefinedColors')) || [];

        if (savedThemeMode) setThemeMode(savedThemeMode);
        if (savedPrimaryColor) setPrimaryColor(savedPrimaryColor);
        if (savedUserColors) setUserDefinedColors(savedUserColors);

        // Apply theme immediately on load
        applyThemeToDOM(savedThemeMode || 'light', savedPrimaryColor || '#2563eb');
    }, []);

    const defaultColors = [
        { name: 'Blue', hex: '#2563eb' },
        { name: 'Teal', hex: '#0d9488' },
        { name: 'Purple', hex: '#9333ea' },
        { name: 'Rose', hex: '#e11d48' },
        { name: 'Green', hex: '#16a34a' },
    ];

    const allAvailableColors = [...defaultColors, ...userDefinedColors];

    const handleAddCustomColor = () => {
        const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
        if (customColorInput && hexRegex.test(customColorInput)) {
            const newColor = { name: customColorInput.toUpperCase(), hex: customColorInput };
            setUserDefinedColors(prev => [...prev, newColor]);
            setCustomColorInput('');
            // Also save to localStorage
            localStorage.setItem('userDefinedColors', JSON.stringify([...userDefinedColors, newColor]));
        } else {
            alert('Please enter a valid hex color code (e.g., #RRGGBB or #RGB).');
        }
    };

    const handleSaveTheme = () => {
        localStorage.setItem('themeMode', themeMode);
        localStorage.setItem('primaryColor', primaryColor);
        applyThemeToDOM(themeMode, primaryColor);
        alert('Theme settings saved and applied!');
    };

    return (
        <ModulePage
            title="Theme Settings"
            description="Customize the visual appearance and branding of the panel."
            icon={Palette}
        >
            <div className="p-6 sm:p-8 space-y-8">
                <HeroSection />

                {/* Theme Mode Selection */}
                <div className="bg-[var(--color-card-background)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
                    <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">Interface Theme</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">Choose between light and dark mode for the admin panel.</p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setThemeMode('light')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                themeMode === 'light'
                                    ? 'bg-[var(--color-primary)] text-[var(--color-button-text)] shadow-md shadow-blue-200'
                                    : 'bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] hover:bg-[var(--color-button-secondary-hover-bg)]'
                            }`}
                        >
                            <Sun className="w-4 h-4" />
                            Light Mode
                        </button>
                        <button
                            onClick={() => setThemeMode('dark')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                themeMode === 'dark'
                                    ? 'bg-[var(--color-primary)] text-[var(--color-button-text)] shadow-md shadow-blue-200'
                                    : 'bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] hover:bg-[var(--color-button-secondary-hover-bg)]'
                            }`}
                        >
                            <Moon className="w-4 h-4" />
                            Dark Mode
                        </button>
                    </div>
                </div>

                {/* Primary Color Selection */}
                <div className="bg-[var(--color-card-background)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
                    <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">Primary Color</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">Select a primary accent color for the interface elements.</p>

                    <div className="flex flex-wrap gap-4">
                        {allAvailableColors.map((color) => (
                            <button
                                key={color.hex}
                                onClick={() => setPrimaryColor(color.hex)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                                    primaryColor === color.hex ? 'border-[var(--color-primary)] scale-110' : 'border-[var(--color-border)] hover:scale-105'
                                }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            >
                                {primaryColor === color.hex && (
                                    <Check className="w-6 h-6 text-white" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Custom Color Input */}
                    <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                        <h3 className="text-base font-semibold text-[var(--color-text)] mb-3">Add Custom Color</h3>
                        <div className="flex gap-3">
                            <input
                                type="color"
                                value={customColorInput}
                                onChange={(e) => setCustomColorInput(e.target.value)}
                                className="w-12 h-12 p-0 border-none rounded-lg cursor-pointer"
                                title="Choose your color"
                            />
                            <input
                                type="text"
                                value={customColorInput}
                                onChange={(e) => setCustomColorInput(e.target.value)}
                                placeholder="#RRGGBB"
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                            <button
                                onClick={handleAddCustomColor}
                                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSaveTheme}
                        className="px-8 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-[var(--color-primary-hover)] transition-all active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </ModulePage>
    );
};

export default Theme;