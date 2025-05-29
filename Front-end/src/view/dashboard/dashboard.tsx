import './dashboard.css';
import Sidebar from '../../component/Sidebar';
import ChatWindow from '../../component/ChatWindow';

interface Contact {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'away' | 'offline';
    lastMessage: string;
    time: string;
    unreadCount: number;
}

interface Message {
    id: string;
    text: string;
    timestamp: string;
    type: 'sent' | 'received';
}

interface DashboardViewProps {
    contacts: Contact[];
    selectedContact: string;
    onSelectContact: (id: string) => void;
    contact?: Contact;
    messages: Message[];
    onSendMessage: (text: string) => void;
}

const DashboardView = ({
                           contacts,
                           selectedContact,
                           onSelectContact,
                           contact,
                           messages,
                           onSendMessage
                       }: DashboardViewProps) => {
    return (
        <div className="messaging-app">
            <Sidebar
                contacts={contacts}
                selectedContact={selectedContact}
                onSelectContact={onSelectContact}

            />
            <ChatWindow
                contact={contact}
                messages={messages}
                onSendMessage={onSendMessage}
            />

        </div>
    );
};

export default DashboardView;
