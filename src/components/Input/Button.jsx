import clsx from "clsx";
import PropTypes from "prop-types";


function Button({ children, label = "", onClick, className, type ,variant}) {
        const variants = {
                'primary' : 'bg-black text-white',
                'second' : 'bg-black/30 text-white'
        }
    return (
        <button
            className={clsx(className,
                variants[variant] ?? variants.primary, // Update variant property to use the primary value if it is not defined
                " text-sm px-3 rounded-lg py-2 font-medium  ")}
            onClick={onClick}
            type={type}
        >
            {label}
            {children}
        </button>
    )
}

export default Button

Button.propTypes = {
        children: PropTypes.node,
        label: PropTypes.string,
        onClick: PropTypes.func,
        className: PropTypes.string,
        type: PropTypes.string,
        variant: PropTypes.string,
    };
