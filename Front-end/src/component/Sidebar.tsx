
import React, { useState } from 'react';
import LogoutButton from "./logOutButton.tsx";

interface Contact {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'away' | 'offline';
    lastMessage: string;
    time: string;
    unreadCount: number;
}

interface SidebarProps {
    contacts: Contact[];
    selectedContact: string;
    onSelectContact: (contactId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ contacts, selectedContact, onSelectContact }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1 className="sidebar-title">Messages</h1>
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="chat-list">
                {filteredContacts.map(contact => (
                    <div
                        key={contact.id}
                        className={`chat-item ${selectedContact === contact.id ? 'active' : ''}`}
                        onClick={() => onSelectContact(contact.id)}
                    >
                        <div className="avatar">
                            {contact.avatar}
                            <div className={`status-indicator status-${contact.status}`}></div>
                        </div>

                        <div className="chat-info">
                            <div className="chat-name">{contact.name}</div>
                            <div className="chat-preview">{contact.lastMessage}</div>
                        </div>

                        <div className="chat-meta">
                            <div className="chat-time">{contact.time}</div>
                            {contact.unreadCount > 0 && (
                                <div className="unread-count">{contact.unreadCount}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <LogoutButton/>
        </div>
    );
};

export default Sidebar;