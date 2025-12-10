import { createContext, useState, useContext, useEffect } from 'react';

const DocumentContext = createContext();

const initialFiles = [
    { id: 1, name: 'Project Requirements.pdf', type: 'PDF', size: '2.4 MB', date: 'Dec 20, 2024', owner: 'John Doe' },
    { id: 2, name: 'Design Assets', type: 'Folder', size: '-', date: 'Dec 19, 2024', owner: 'Jane Smith' },
    { id: 3, name: 'Q4 Report.docx', type: 'DOCX', size: '1.2 MB', date: 'Dec 18, 2024', owner: 'Mike Johnson' },
    { id: 4, name: 'Budget 2025.xlsx', type: 'XLSX', size: '850 KB', date: 'Dec 15, 2024', owner: 'Sarah Wilson' },
];

export const DocumentProvider = ({ children }) => {
    const [files, setFiles] = useState(() => {
        const storedFiles = localStorage.getItem('erp_files');
        return storedFiles ? JSON.parse(storedFiles) : initialFiles;
    });

    useEffect(() => {
        localStorage.setItem('erp_files', JSON.stringify(files));
    }, [files]);

    const uploadFile = (fileData) => {
        setFiles([{ ...fileData, id: Date.now() }, ...files]);
    };

    const deleteFile = (id) => {
        setFiles(files.filter(file => file.id !== id));
    };

    return (
        <DocumentContext.Provider value={{ files, uploadFile, deleteFile }}>
            {children}
        </DocumentContext.Provider>
    );
};

export const useDocuments = () => useContext(DocumentContext);
