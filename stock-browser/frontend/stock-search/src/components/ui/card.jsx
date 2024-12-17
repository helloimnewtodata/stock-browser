export default function Card({ title, children, className }) {
    return (
      <div className={`border p-4 rounded shadow-md bg-white ${className}`}>
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        {children}
      </div>
    );
  }
  