import React from 'react';
import { User, Lock, Bell, Smartphone, Monitor } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

const Settings = () => {
    const { config, updateConfig } = useConfig();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">User Settings</h1>
                <p className="text-white/60">Manage your profile and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white/5 rounded-[2rem] border border-white/10 p-6 text-center">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center mb-4 shadow-lg ring-4 ring-white/10">
                            <span className="text-3xl font-bold text-white">A</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-1">Admin User</h2>
                        <p className="text-white/60 mb-6">admin@example.com</p>
                        <button className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/10">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Settings Sections */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Account Security */}
                    <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                <Lock size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Security</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                                <div>
                                    <h4 className="text-white font-medium">Change Password</h4>
                                    <p className="text-sm text-white/40">Last changed 3 months ago</p>
                                </div>
                                <button className="text-blue-400 hover:text-blue-300">Update</button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                                <div>
                                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                                    <p className="text-sm text-white/40">Add an extra layer of security</p>
                                </div>
                                <button className="text-blue-400 hover:text-blue-300">Enable</button>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                                <Monitor size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Preferences</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center space-x-3">
                                    <Bell size={20} className="text-white/60" />
                                    <span className="text-white">Email Notifications</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={config.preferences.emailAlerts}
                                        onChange={(e) => updateConfig('preferences', 'emailAlerts', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center space-x-3">
                                    <Smartphone size={20} className="text-white/60" />
                                    <span className="text-white">Mobile Alerts</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={config.preferences.mobileAlerts}
                                        onChange={(e) => updateConfig('preferences', 'mobileAlerts', e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
