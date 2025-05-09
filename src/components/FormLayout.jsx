import PropTypes from "prop-types";

// Props: title (string), description (string, optional), children (ReactNode)
export default function FormLayout({ title, description, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center m-2" dir="rtl">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg flex flex-col gap-6">
        <div className="flex flex-col gap-4 p-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex flex-col gap-4 p-2">
          {children}
        </div>
      </div>
    </div>
  );
}

FormLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
}; 