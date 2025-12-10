import { createContext, useState, useContext, useEffect } from 'react';

const ConfigContext = createContext();

const initialConfig = {
    general: {
        systemName: 'ERP System 2024',
        timezone: 'UTC (Coordinated Universal Time)',
        language: 'English (US)',
    },
    notifications: {
        email: true,
        push: true,
        slack: false,
        reports: true,
    },
    security: {
        twoFactor: false,
    },
    preferences: {
        emailAlerts: true,
        mobileAlerts: false,
    }
};

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(() => {
        const storedConfig = localStorage.getItem('erp_config');
        return storedConfig ? JSON.parse(storedConfig) : initialConfig;
    });

    useEffect(() => {
        localStorage.setItem('erp_config', JSON.stringify(config));
    }, [config]);

    const updateConfig = (section, key, value) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const updateSection = (section, data) => {
        setConfig(prev => ({
            ...prev,
            [section]: { ...prev[section], ...data }
        }));
    };

    return (
        <ConfigContext.Provider value={{ config, updateConfig, updateSection }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
