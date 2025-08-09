import React, { useState } from 'react';
import { LuImage, LuX } from 'react-icons/lu';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
      <div>
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg border border-purple-200">
            {icon ? (
              <img src={icon} alt="Icon" className="w-10 h-10 object-contain" />
            ) : (
              <LuImage />
            )}
          </div>
          <p className="text-sm text-gray-700 font-medium">
            {icon ? 'Change Icon' : 'Pick Icon'}
          </p>
        </div>

        {isOpen && (
          <div className="relative mt-4">
            {/* Close Button */}
            <button
              className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 absolute -top-3 -right-3 z-10 rounded-full shadow-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <LuX className="text-gray-600" size={16} />
            </button>

            {/* Emoji Picker */}
            <div className="z-20 shadow-lg border border-gray-200 rounded-lg">
              <EmojiPicker
                open={isOpen}
                onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || '')}
                lazyLoadEmojis
                skinTonesDisabled
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPickerPopup;
