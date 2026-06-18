'use client';

import { useState, useRef, useEffect } from 'react';
import { Button, Input, Avatar, Pill } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { TEAMS_DATA } from '@/lib/data';

type Msg = { id: string; sender: string; text: string; time: string; mine: boolean };

const INIT_MSGS: Record<string, Msg[]> = {
  general: [
    { id: 'm1', sender: 'Khaleda Khatun', text: 'Good morning team! Don\'t forget the Q2 review this Friday at 10am.', time: '9:02 AM', mine: false },
    { id: 'm2', sender: 'Mizanur Rahman', text: 'Got it. Will the meeting room be booked?', time: '9:15 AM', mine: false },
    { id: 'm3', sender: 'Rafiul Islam', text: 'Yes, Conference Room B is reserved from 10–11:30 AM.', time: '9:18 AM', mine: true },
    { id: 'm4', sender: 'Asif Karim', text: 'Perfect. I\'ll prepare the server uptime report before then.', time: '9:22 AM', mine: false },
    { id: 'm5', sender: 'Raihan Kabir', text: 'Same here — I\'ll have the Q2 client acquisition numbers ready.', time: '9:30 AM', mine: false },
  ],
  it: [
    { id: 'i1', sender: 'Nusrat Jahan', text: 'Hey, the ticketing system is slow today. Anyone else noticing?', time: '10:05 AM', mine: false },
    { id: 'i2', sender: 'Tanvir Ahmed', text: 'Yes, I think the DB needs indexing. I\'ll check.', time: '10:08 AM', mine: false },
    { id: 'i3', sender: 'Rafiul Islam', text: 'Good catch. I\'ll restart the service after hours to avoid disruption.', time: '10:12 AM', mine: true },
  ],
  networking: [
    { id: 'n1', sender: 'Fahmida Akter', text: 'Core switch firmware update is scheduled for tonight 12 AM.', time: '11:00 AM', mine: false },
    { id: 'n2', sender: 'Sabbir Hasan', text: 'I\'ll be on standby for monitoring.', time: '11:03 AM', mine: false },
    { id: 'n3', sender: 'Lamia Chowdhury', text: 'NOC is ready. I have the NOC dashboard up.', time: '11:07 AM', mine: false },
  ],
};

const CHANNELS = [
  { id: 'general', name: 'General', icon: 'globe', desc: 'Company-wide announcements' },
  { id: 'it', name: 'IT Team', icon: 'cpu', desc: 'Internal IT discussions' },
  { id: 'networking', name: 'Networking', icon: 'wifi', desc: 'Network ops & issues' },
];

export default function EmployeeChat() {
  const [channel, setChannel] = useState('general');
  const [msgs, setMsgs] = useState(INIT_MSGS);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, channel]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg: Msg = { id: Date.now().toString(), sender: 'Rafiul Islam', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mine: true };
    setMsgs(m => ({ ...m, [channel]: [...(m[channel] || []), newMsg] }));
    setInput('');
  };

  const currentMsgs = msgs[channel] || [];

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: 240, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--surface-2)' }}>
        <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Team Chat</h2>
          <p style={{ color: 'var(--ink-3)', fontSize: 12, margin: '4px 0 0' }}>TVSL Internal</p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
          <p style={{ color: 'var(--ink-3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 8px', marginBottom: 6 }}>Channels</p>
          {CHANNELS.map(c => (
            <button key={c.id} onClick={() => setChannel(c.id)} style={{
              width: '100%', textAlign: 'left', background: channel === c.id ? 'var(--primary)' : 'transparent',
              color: channel === c.id ? 'var(--primary-ink)' : 'var(--ink-2)', border: 'none', borderRadius: 8,
              padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 2, fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13
            }}>
              <Icon name={c.icon} size={14}/>
              # {c.name}
              {(msgs[c.id]?.length || 0) > 0 && (
                <span style={{ marginLeft: 'auto', background: channel === c.id ? 'oklch(1 0 0 / 0.25)' : 'var(--surface-3)', borderRadius: 99, padding: '0 6px', fontSize: 11 }}>
                  {msgs[c.id]?.length}
                </span>
              )}
            </button>
          ))}

          <p style={{ color: 'var(--ink-3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '16px 8px 6px' }}>Team Members</p>
          {TEAMS_DATA[0].members.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 8 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden' }}>
                  <Avatar name={m.name} size={28}/>
                </div>
                <span style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', border: '2px solid var(--surface-2)' }}/>
              </div>
              <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>{m.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
        {/* Header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name={CHANNELS.find(c => c.id === channel)?.icon || 'globe'} size={18} color="var(--primary)"/>
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>#{CHANNELS.find(c => c.id === channel)?.name}</h3>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-3)' }}>{CHANNELS.find(c => c.id === channel)?.desc}</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <Pill tone="success">{currentMsgs.length} messages</Pill>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 8px' }}>
          {currentMsgs.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--ink-3)' }}>
              <Icon name="chat" size={32} color="var(--ink-3)"/>
              <p style={{ marginTop: 12, fontSize: 14 }}>No messages yet. Start the conversation!</p>
            </div>
          )}
          {currentMsgs.map((msg, i) => {
            const showSender = i === 0 || currentMsgs[i - 1]?.sender !== msg.sender;
            return (
              <div key={msg.id} style={{ marginBottom: showSender ? 16 : 4, display: 'flex', gap: 12, flexDirection: msg.mine ? 'row-reverse' : 'row' }}>
                {!msg.mine && showSender && (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, marginTop: 2 }}>
                    <Avatar name={msg.sender} size={36}/>
                  </div>
                )}
                {!msg.mine && !showSender && <div style={{ width: 36, flexShrink: 0 }}/>}
                <div style={{ maxWidth: '65%' }}>
                  {showSender && !msg.mine && (
                    <p style={{ margin: '0 0 4px 2px', fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>{msg.sender}</p>
                  )}
                  <div style={{
                    background: msg.mine ? 'var(--primary)' : 'var(--surface-2)',
                    color: msg.mine ? 'var(--primary-ink)' : 'var(--ink)',
                    borderRadius: msg.mine ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    padding: '10px 14px', fontSize: 14, lineHeight: 1.5
                  }}>
                    {msg.text}
                  </div>
                  <p style={{ margin: '3px 4px 0', fontSize: 11, color: 'var(--ink-3)', textAlign: msg.mine ? 'right' : 'left' }}>{msg.time}</p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={`Message #${CHANNELS.find(c => c.id === channel)?.name}...`}
            style={{ flex: 1, borderRadius: 20 }}
          />
          <Button onClick={send} variant="primary" size="sm" disabled={!input.trim()}>
            <Icon name="arrowRight" size={16}/>
          </Button>
        </div>
      </div>
    </div>
  );
}
