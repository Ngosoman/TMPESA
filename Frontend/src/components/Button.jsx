const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false, 
  variant = 'primary' // 'primary' or 'secondary' for styling variations
}) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors duration-200';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );
};

export default Button;