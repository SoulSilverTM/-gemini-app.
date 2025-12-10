import React, { useState } from 'react';
import { FileText, Folder, MoreVertical, Download, Share2, Trash2, Upload } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';

const Documents = () => {
    const { files, uploadFile, deleteFile } = useDocuments();
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = () => {
        setIsUploading(true);
        // Simulate upload delay
        setTimeout(() => {
            uploadFile({
                name: `New Document ${files.length + 1}.pdf`,
                type: 'PDF',
                size: '1.5 MB',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                owner: 'Admin User'
            });
            setIsUploading(false);
        }, 1000);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
                    <p className="text-white/60">Manage and share project files</p>
                </div>
                <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Upload size={20} className={isUploading ? "animate-bounce" : ""} />
                    <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                </button>
            </div>

            <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/10 text-white/60 font-medium text-sm">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Owner</div>
                    <div className="col-span-2">Date Modified</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-white/5">
                    {files.map((file) => (
                        <div key={file.id} className="grid grid-cols-12 gap-4 p-6 hover:bg-white/5 transition-colors items-center group">
                            <div className="col-span-5 flex items-center space-x-4">
                                <div className="p-2 rounded-lg bg-white/10 text-white">
                                    {file.type === 'Folder' ? <Folder size={20} /> : <FileText size={20} />}
                                </div>
                                <span className="text-white font-medium">{file.name}</span>
                            </div>
                            <div className="col-span-2 text-white/60 text-sm">{file.owner}</div>
                            <div className="col-span-2 text-white/60 text-sm">{file.date}</div>
                            <div className="col-span-2 text-white/60 text-sm">{file.size}</div>
                            <div className="col-span-1 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                                    <Download size={18} />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                                    <Share2 size={18} />
                                </button>
                                <button
                                    onClick={() => deleteFile(file.id)}
                                    className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {files.length === 0 && (
                        <div className="p-8 text-center text-white/40">
                            No documents found. Upload a file to get started.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Documents;
