import { useState, useRef } from 'react';
import { Event } from '../types';
import html2canvas from 'html2canvas';

interface TicketModalProps {
  event: Event;
  onClose: () => void;
  darkMode: boolean;
  ticketQuantity?: number;
  attendeeName?: string;
}

export default function TicketModal({ event, onClose, darkMode, ticketQuantity = 1, attendeeName = 'Guest' }: TicketModalProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  
  const eventDate = new Date(event.date);
  const ticketId = `${event.id.substring(0, 8).toUpperCase()}`;

  const getCategoryEmoji = (category?: string) => {
    const emojis: Record<string, string> = {
      Technology: '💻',
      Outdoor: '🏕️',
      Business: '💼',
      Arts: '🎨',
      Sports: '⚽',
      Food: '🍕',
      Wellness: '🧘',
      Education: '📚',
    };
    return emojis[category || ''] || '📅';
  };

  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    
    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: '#f4e8c1',
        scale: 3,
        logging: false,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `SLANUP-Ticket-${ticketId}-${attendeeName.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading ticket:', error);
      alert('Failed to download ticket. Please try again.');
    }
  };

  const emailTicket = async () => {
    if (!ticketRef.current) return;
    
    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: '#f4e8c1',
        scale: 3,
        logging: false,
        useCORS: true,
      });
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });
      
      const link = document.createElement('a');
      link.download = `SLANUP-Ticket-${ticketId}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
      
      const subject = `Your ${ticketQuantity} Ticket(s) for ${event.title}`;
      const body = `Hi ${attendeeName},

Your ticket for ${event.title} has been confirmed!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 TICKET DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎫 Ticket ID: #${ticketId}
👤 Attendee: ${attendeeName}
🎟️ Tickets: ${ticketQuantity}

📅 Event: ${event.title}
📍 Location: ${event.location}
🗓️ Date: ${eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
⏰ Time: ${eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📎 IMPORTANT: Your ticket image has been downloaded. Please attach it to this email before sending.

See you at the event! 🎉

Best regards,
SLANUP Team`;

      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      alert('✅ Ticket downloaded!\n\n📧 Your email app will open. Please attach the downloaded ticket image before sending.');
      
    } catch (error) {
      console.error('Error preparing email:', error);
      alert('Failed to prepare email. Please try again.');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50" 
      onClick={onClose}
    >
      {/* TICKET */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative max-w-3xl w-full"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* TICKET CONTENT */}
        <div 
          ref={ticketRef}
          className="bg-[#f4e8c1] rounded-md overflow-hidden shadow-2xl border-[6px] border-[#2c3e50]" 
          style={{ borderStyle: 'double' }}
        >
          <div className="flex">
            {/* LEFT SIDE - MAIN TICKET */}
            <div className="flex-1 p-8 relative">
              {/* Decorative Corners */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-[#2c3e50]"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-[#2c3e50]"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-[#2c3e50]"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-[#2c3e50]"></div>

              {/* Header */}
              <div className="mb-6">
                <div className="text-xs font-bold text-gray-700 mb-1 tracking-widest">SLANUP PRESENTS</div>
                <h1 className="text-3xl font-black text-[#2c3e50] leading-tight mb-3 uppercase tracking-tight" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                  {event.title}
                </h1>
                <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span>{getCategoryEmoji(event.category)}</span>
                  <span>{event.category}</span>
                </div>
              </div>

              {/* Attendee Name */}
              <div className="bg-white/60 border-2 border-[#2c3e50] p-3 mb-4">
                <div className="text-xs font-bold text-gray-600 uppercase mb-1">Attendee Name</div>
                <div className="text-2xl font-black text-[#2c3e50]" style={{ fontFamily: 'Impact, sans-serif' }}>
                  {attendeeName.toUpperCase()}
                </div>
                {ticketQuantity > 1 && (
                  <div className="text-sm font-bold text-gray-700 mt-1">
                    + {ticketQuantity - 1} additional {ticketQuantity - 1 === 1 ? 'guest' : 'guests'}
                  </div>
                )}
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">📅</span>
                    <div className="text-xs font-bold text-gray-600 uppercase">Date</div>
                  </div>
                  <div className="text-xl font-black text-[#2c3e50]" style={{ fontFamily: 'Impact, sans-serif' }}>
                    {eventDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()}
                  </div>
                  <div className="text-sm font-bold text-gray-700">
                    {eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">📍</span>
                    <div className="text-xs font-bold text-gray-600 uppercase">Venue</div>
                  </div>
                  <div className="text-base font-bold text-[#2c3e50]">
                    {event.location}
                  </div>
                </div>
              </div>

              {/* Ticket Quantity */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">🎫</span>
                  <div className="text-xs font-bold text-gray-600 uppercase">Tickets</div>
                </div>
                <div className="text-lg font-bold text-[#2c3e50]">
                  {ticketQuantity} {ticketQuantity > 1 ? 'Tickets' : 'Ticket'}
                </div>
              </div>

              {/* Description Box */}
              <div className="border-2 border-[#2c3e50] bg-white/40 p-3 mb-6">
                <p className="text-xs text-gray-800 leading-relaxed line-clamp-2">
                  {event.description}
                </p>
              </div>

              {/* Bottom Section */}
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-0.5">Ticket ID</div>
                  <div className="font-mono font-bold text-xl text-[#2c3e50]">
                    #{ticketId}
                  </div>
                </div>
                <div className="bg-[#2c3e50] text-[#f4e8c1] px-6 py-2 font-black text-lg tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>
                  ADMIT {ticketQuantity > 1 ? ticketQuantity : 'ONE'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={downloadTicket}
                  className="bg-[#2c3e50] hover:bg-[#34495e] text-[#f4e8c1] px-4 py-2.5 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>📥</span>
                  <span>DOWNLOAD</span>
                </button>
                <button
                  onClick={emailTicket}
                  className="bg-[#2c3e50] hover:bg-[#34495e] text-[#f4e8c1] px-4 py-2.5 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>📧</span>
                  <span>EMAIL</span>
                </button>
              </div>
            </div>

            {/* VERTICAL PERFORATION */}
            <div className="relative w-3 bg-[#2c3e50]">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col justify-around py-4">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-[#f4e8c1] rounded-full"></div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - STUB */}
            <div className="w-48 bg-[#f4e8c1] p-6 flex flex-col items-center justify-between relative">
              <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#2c3e50]"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#2c3e50]"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#2c3e50]"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#2c3e50]"></div>

              <div className="bg-[#2c3e50] text-[#f4e8c1] px-5 py-3 font-black text-3xl text-center" style={{ fontFamily: 'Impact, sans-serif' }}>
                ZONE<br/>A
              </div>

              <div className="flex-1 flex items-center justify-center my-4">
                <div className="transform -rotate-90 origin-center whitespace-nowrap">
                  <div className="text-2xl font-black text-[#2c3e50] uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>
                    {event.category}
                  </div>
                </div>
              </div>

              <div className="text-center border-t-2 border-dashed border-[#2c3e50] pt-4 w-full">
                <div className="text-xs font-bold text-gray-600 uppercase mb-1">Date</div>
                <div className="text-2xl font-black text-[#2c3e50]" style={{ fontFamily: 'Impact, sans-serif' }}>
                  {eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </div>
                <div className="text-4xl font-black text-[#2c3e50]" style={{ fontFamily: 'Impact, sans-serif' }}>
                  {eventDate.getDate()}
                </div>
              </div>

              <div className="text-center mt-4 w-full">
                <div className="text-xs font-bold text-gray-600 uppercase mb-1">Time</div>
                <div className="text-lg font-black text-[#2c3e50]" style={{ fontFamily: 'Impact, sans-serif' }}>
                  {eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-dashed border-[#2c3e50] w-full text-center">
                <div className="text-xs font-bold text-gray-600 uppercase mb-1">Ticket #</div>
                <div className="font-mono font-bold text-sm text-[#2c3e50]">
                  {ticketId}
                </div>
                {ticketQuantity > 1 && (
                  <div className="text-xs font-bold text-gray-700 mt-1">
                    x{ticketQuantity}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="bg-[#2c3e50] text-[#f4e8c1] py-2 px-6 text-center border-t-4 border-double border-[#1a252f]">
            <p className="text-xs font-bold uppercase tracking-wider">
              Valid for {ticketQuantity} {ticketQuantity > 1 ? 'people' : 'person'} • Present at venue entrance • No refunds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
