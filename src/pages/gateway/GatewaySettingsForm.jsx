"use client";

import React, { useState, useEffect } from 'react';
import { CreditCard, Key, Lock, DollarSign, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import ModulePage from '../../components/common/ModulePage';

const GatewaySettingsForm = () => {
    const [provider, setProvider] = useState('Stripe');
    const [apiKey, setApiKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [showSecretKey, setShowSecretKey] = useState(false);
    const [currency, setCurrency] = useState('USD');
    const [webhookUrl, setWebhookUrl] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/settings`);
                const gatewaySettings = response.data.gateway;
                if (gatewaySettings) {
                    setProvider(gatewaySettings.provider || 'Stripe');
                    setApiKey(gatewaySettings.apiKey || '');
                    setSecretKey(gatewaySettings.secretKey || ''); // Note: Secret keys should ideally not be sent back to frontend
                    setCurrency(gatewaySettings.currency || 'USD');
                    setWebhookUrl(gatewaySettings.webhookUrl || '');
                }
            } catch (error) {
                console.error('Failed to fetch Gateway settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const handleSaveSettings = async () => {
        try {
            const gatewayData = {
                provider: provider,
                apiKey: apiKey,
                secretKey: secretKey,
                currency: currency,
                webhookUrl: webhookUrl,
            };
            await axios.put(`${API_BASE_URL}/settings`, { gateway: gatewayData });
            alert('Gateway settings saved successfully!');
        } catch (error) {
            console.error('Failed to save Gateway settings:', error);
            alert('Failed to save Gateway settings. Please check console for details.');
        }
    };

    return (
        <ModulePage
            title="Payment Gateway"
            description="Configure your payment gateway for secure transactions."
            icon={CreditCard}
        >
            <div className="p-6 sm:p-8 space-y-8">
                <div className="bg-[var(--color-card-background)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
                    <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">Gateway Configuration</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                        Set up your preferred payment gateway and API credentials.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Provider */}
                        <div>
                            <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
                                Payment Provider
                            </label>
                            <select
                                id="provider"
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 1rem center'
                                }}
                            >
                                <option value="Stripe">Stripe</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Square">Square</option>
                            </select>
                        </div>

                        {/* API Key */}
                        <div>
                            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                                API Key
                            </label>
                            <div className="relative">
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    id="apiKey"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Enter API Key"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Secret Key */}
                        <div>
                            <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700 mb-2">
                                Secret Key
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type={showSecretKey ? 'text' : 'password'}
                                    id="secretKey"
                                    value={secretKey}
                                    onChange={(e) => setSecretKey(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowSecretKey(!showSecretKey)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showSecretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Currency */}
                        <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                                Default Currency
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <select
                                    id="currency"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 1rem center'
                                    }}
                                >
                                    <option value="USD">USD - United States Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="PKR">PKR - Pakistani Rupee</option>
                                </select>
                            </div>
                        </div>

                        {/* Webhook URL */}
                        <div className="md:col-span-2">
                            <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                Webhook URL (Optional)
                            </label>
                            <input
                                type="text"
                                id="webhookUrl"
                                value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)}
                                placeholder="e.g., https://yourdomain.com/webhook"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                                Endpoint for receiving payment notifications.
                            </p>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handleSaveSettings}
                            className="px-8 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-[var(--color-primary-hover)] transition-all active:scale-95"
                        >
                            Save Gateway Settings
                        </button>
                    </div>
                </div>
            </div>
        </ModulePage>
    );
};

export default GatewaySettingsForm;