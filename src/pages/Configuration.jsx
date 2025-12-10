import React, { useState } from 'react';
import { Bell, Globe, Shield, Database, Mail, Save } from 'lucide-react';
import clsx from 'clsx';
import { useConfig } from '../context/ConfigContext';

const Configuration = () => {
    const { config, updateConfig, updateSection } = useConfig();
    const [activeTab, setActiveTab] = useState('general');
    const [localConfig, setLocalConfig] = useState(config);
    const [isSaved, setIsSaved] = useState(false);

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'database', label: 'Database', icon: Database },
        { id: 'email', label: 'Email', icon: Mail },
    ];

    const handleSave = () => {
        updateSection('general', localConfig.general);
        updateSection('notifications', localConfig.notifications);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleChange = (section, key, value) => {
        setLocalConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">System Configuration</h1>
                <p className="text-white/60">Manage global system settings and preferences</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300",
                                activeTab === tab.id
                                    ? "bg-white/10 text-white shadow-lg border border-white/10"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <tab.icon size={20} />
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white/5 rounded-[2rem] border border-white/10 p-8">
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-6">General Settings</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2">System Name</label>
                                    <input
                                        type="text"
                                        value={localConfig.general.systemName}
                                        onChange={(e) => handleChange('general', 'systemName', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2">Timezone</label>
                                    <select
                                        value={localConfig.general.timezone}
                                        onChange={(e) => handleChange('general', 'timezone', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option>UTC (Coordinated Universal Time)</option>
                                        <option>EST (Eastern Standard Time)</option>
                                        <option>PST (Pacific Standard Time)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2">Language</label>
                                    <select
                                        value={localConfig.general.language}
                                        onChange={(e) => handleChange('general', 'language', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option>English (US)</option>
                                        <option>Spanish (ES)</option>
                                        <option>French (FR)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>

                            <div className="space-y-4">
                                {[
                                    { key: 'email', label: 'Email Notifications' },
                                    { key: 'push', label: 'Push Notifications' },
                                    { key: 'slack', label: 'Slack Integration' },
                                    { key: 'reports', label: 'Weekly Reports' }
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-white font-medium">{item.label}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={localConfig.notifications[item.key]}
                                                onChange={(e) => handleChange('notifications', item.key, e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-end items-center space-x-4">
                        {isSaved && <span className="text-green-400 text-sm">Changes saved successfully!</span>}
                        <button
                            onClick={handleSave}
                            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                        >
                            <Save size={20} />
                            <span>Save Changes</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuration;
