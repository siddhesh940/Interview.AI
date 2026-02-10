// Company logo paths mapping
export const COMPANY_LOGO_PATHS: Record<string, string> = {
  'tcs': '/company-logos/TCS.NS_BIG.png',
  'infosys': '/company-logos/INFY_BIG.png',
  'wipro': '/company-logos/WIT.png',
  'accenture': '/company-logos/ACN_BIG.png',
  'cognizant': '/company-logos/CTSH_BIG.png',
  'capgemini': '/company-logos/CAP.PA_BIG.png',
};

// Updated CompanyLogos component with actual logo images
export const CompanyLogos = {
  tcs: (
    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-lg border p-2">
      <img 
        src={COMPANY_LOGO_PATHS.tcs}
        alt="TCS Logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center text-white font-bold text-lg">TCS</div>`;
        }}
      />
    </div>
  ),
  infosys: (
    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-lg border p-2">
      <img 
        src={COMPANY_LOGO_PATHS.infosys}
        alt="Infosys Logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">INFOSYS</div>`;
        }}
      />
    </div>
  ),
  wipro: (
    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-lg border p-2">
      <img 
        src={COMPANY_LOGO_PATHS.wipro}
        alt="Wipro Logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-orange-500 to-orange-700 rounded flex items-center justify-center text-white font-bold text-sm">WIPRO</div>`;
        }}
      />
    </div>
  ),
  accenture: (
    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-lg border p-2">
      <img 
        src={COMPANY_LOGO_PATHS.accenture}
        alt="Accenture Logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded flex items-center justify-center text-white font-bold text-xs">ACCENTURE</div>`;
        }}
      />
    </div>
  ),
  cognizant: (
    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-lg border p-2">
      <img 
        src={COMPANY_LOGO_PATHS.cognizant}
        alt="Cognizant Logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center text-white font-bold text-xs">COGNIZANT</div>`;
        }}
      />
    </div>
  ),
  capgemini: (
    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-lg border p-2">
      <img 
        src={COMPANY_LOGO_PATHS.capgemini}
        alt="Capgemini Logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-700 to-blue-900 rounded flex items-center justify-center text-white font-bold text-xs">CAPGEMINI</div>`;
        }}
      />
    </div>
  ),
};
