import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const variants = {
  primary: 'bg-gold-500 text-dark-900 hover:bg-gold-400 font-semibold',
  secondary: 'bg-dark-600 text-warm-50 hover:bg-dark-500 border border-dark-400',
  outline: 'bg-transparent text-gold-500 border border-gold-500 hover:bg-gold-500 hover:text-dark-900',
  ghost: 'bg-transparent text-warm-50 hover:text-gold-500',
  white: 'bg-warm-50 text-dark-900 hover:bg-warm-100 font-semibold',
};

const sizes = {
  sm: 'px-4 py-2 text-xs tracking-wider',
  md: 'px-6 py-3 text-sm tracking-wider',
  lg: 'px-8 py-4 text-sm tracking-widest',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  withArrow = false,
  type = 'button',
  disabled = false,
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 uppercase transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link to={to} className={`${baseClasses} group`}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} group`}>
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseClasses} group`}
    >
      {content}
    </motion.button>
  );
}
