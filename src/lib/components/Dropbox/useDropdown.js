import { useState, useEffect, useRef } from 'react'

const useDropdown = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({});
  const target = useRef();
  const dropdown = useRef();

  useEffect(() => {
    setDropdownPosition();
  }, []);

  const setDropdownPosition = () => {
    const rect = target.current.getBoundingClientRect();
    const maxWidth = target.current.firstChild.getBoundingClientRect().width;
    const p = { left: 0, right: null, maxWidth };
    if (rect.x + 200 > window.innerWidth) {
      p.left = null;
      p.right = '0';
    }
    if (rect.bottom + 300 > window.innerHeight) {
      p.bottom = 30;
    }
    setPosition(p);
  };

  const open = () => {
    setDropdownPosition();
    if (!visible) {
      setVisible(true);
      document.addEventListener('click', hide);
      window.addEventListener('blur', blur);
    }
  };

  const blur = () => {
    setVisible(false);
    document.removeEventListener('click', hide);
    window.removeEventListener('blur', blur);
  };

  const hide = e => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setVisible(false);
    }
    if (!dropdown.current) {
      document.removeEventListener('click', hide);
      window.removeEventListener('blur', blur);
    }
  };

  const close = () => {
    setVisible(false);
    document.removeEventListener('click', hide);
    window.removeEventListener('blur', blur);
  };

  return { open, close, position, target, dropdown, visible }
}

export default useDropdown
