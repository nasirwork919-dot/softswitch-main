"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Server, Key, Send } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const EmailSettingsForm = () => {
    const [smtpHost, setSmtpHost] = useState('');
    const [smtpPort, setSmtpPort] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [encryption, setEncryption] = useState('SSL');
    const [fromName, setFromName] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [testEmailRecipient, setTestEmailRecipient] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/settings`);
                const smtpSettings = response.data.smtp;
                if (smtpSettings) {
                    setSmtpHost(smtpSettings.host || '');
                    setSmtpPort(smtpSettings.port || '');
                    setUsername(smtpSettings.user || '');
                    setPassword(smtpSettings.pass || ''); // Note: Passwords should ideally not be sent back to frontend
                    setEncryption(smtpSettings.encryption || 'SSL');
                    setFromName(smtpSettings.fromName || '');
                    setFromEmail(smtpSettings.fromEmail || '');
                }
            } catch (error) {
                console.error('Failed to fetch SMTP settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const handleSaveSettings = async () => {
        try {
            const smtpData = {
                host: smtpHost,
                port: smtpPort,
                user: username,
                pass: password,
                encryption: encryption,
                fromName: fromName,
                fromEmail: fromEmail,
            };
            await axios.put(`${API_BASE_URL}/settings`, { smtp: smtpData });
            alert('SMTP settings saved successfully!');
        } catch (error) {
            console.error('Failed to save SMTP settings:', error);
            alert('Failed to save SMTP settings. Please check console for details.');
        }
    };

    const handleSendTestEmail = async () => {
        if (!testEmailRecipient) {
            alert('Please enter a recipient email for the test.');
            return;
        }
        try {
            await axios.post(`${API_BASE_URL}/settings/test-smtp`, { recipientEmail: testEmailRecipient });
            alert('Test email sent successfully!');
        } catch (error) {
            console.error('Failed to send test email:', error);
            alert(`Failed to send test email: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="p-6 sm:p-8 space-y-8">
            <div className="bg-[var(--color-card-background)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
                <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">SMTP Configuration</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                    Configure your SMTP server details for all outgoing system emails.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SMTP Host */}
                    <div>
                        <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-700 mb-2">
                            SMTP Host
                        </label>
                        <div className="relative">
                            <Server className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                id="smtpHost"
                                value={smtpHost}
                                onChange={(e) => setSmtpHost(e.target.value)}
                                placeholder="e.g., smtp.yourprovider.com"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* SMTP Port */}
                    <div>
                        <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700 mb-2">
                            SMTP Port
                        </label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="number"
                                id="smtpPort"
                                value={smtpPort}
                                onChange={(e) => setSmtpPort(e.target.value)}
                                placeholder="e.g., 587 or 465"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Email / Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Email / Username
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="email"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="your-email@example.com"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Password / App Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password (or App Password)
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Encryption Type */}
                    <div>
                        <label htmlFor="encryption" className="block text-sm font-medium text-gray-700 mb-2">
                            Encryption Type
                        </label>
                        <select
                            id="encryption"
                            value={encryption}
                            onChange={(e) => setEncryption(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1rem center'
                            }}
                        >
                            <option value="SSL">SSL</option>
                            <option value="TLS">TLS</option>
                            <option value="None">None</option>
                        </select>
                    </div>

                    {/* From Name (Optional) */}
                    <div>
                        <label htmlFor="fromName" className="block text-sm font-medium text-gray-700 mb-2">
                            From Name (Optional)
                        </label>
                        <input
                            type="text"
                            id="fromName"
                            value={fromName}
                            onChange={(e) => setFromName(e.target.value)}
                            placeholder="e.g., Your App Name"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* From Email (Optional) */}
                    <div>
                        <label htmlFor="fromEmail" className="block text-sm font-medium text-gray-700 mb-2">
                            From Email (Optional)
                        </label>
                        <input
                            type="email"
                            id="fromEmail"
                            value={fromEmail}
                            onChange={(e) => setFromEmail(e.target.value)}
                            placeholder="noreply@yourdomain.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-8">
                    <button
                        onClick={handleSaveSettings}
                        className="px-8 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-[var(--color-primary-hover)] transition-all active:scale-95"
                    >
                        Save SMTP Settings
                    </button>
                </div>
            </div>

            {/* Test Email Section */}
            <div className="bg-[var(--color-card-background)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
                <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">Test Email Configuration</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                    Send a test email to verify your SMTP settings are working correctly.
                </p>

                <div className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="flex-1 w-full">
                        <label htmlFor="testEmailRecipient" className="block text-sm font-medium text-gray-700 mb-2">
                            Recipient Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="email"
                                id="testEmailRecipient"
                                value={testEmailRecipient}
                                onChange={(e) => setTestEmailRecipient(e.target.value)}
                                placeholder="test@example.com"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSendTestEmail}
                        className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 transition-all active:scale-95 w-full sm:w-auto justify-center"
                    >
                        <Send className="h-5 w-5" />
                        Send Test Email
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailSettingsForm;