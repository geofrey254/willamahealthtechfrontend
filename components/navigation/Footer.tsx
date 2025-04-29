export default function Footer() {
  return (
    <footer className="bg-[#214842] border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-[#f4d392]">
            © {new Date().getFullYear()} MedAnalyzer. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-white hover:text-[#f4d392]">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-white hover:text-[#f4d392]">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-white hover:text-[#f4d392]">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
