const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-center items-center h-12 bg-[#438883] text-white">
      <span className="text-sm">
        Copyright © {currentYear} ExpenseGURU. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
