import React, { useRef, useEffect } from 'react';

export default function EditableText({ value, onChange, tag: Tag = 'span', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value]);

  const handleBlur = () => {
    if (ref.current && onChange) {
      const newVal = ref.current.innerText.trim();
      if (newVal !== value) {
        onChange(newVal);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && Tag !== 'p' && Tag !== 'div') {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`outline-none focus:ring-2 focus:ring-purple-500/30 focus:rounded-sm cursor-text ${className}`}
    />
  );
}
