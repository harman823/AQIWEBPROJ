import React from 'react';

// AwarenessPage Component
const AwarenessPage = () => {
    return (
        <div className="card bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <i data-feather="book-open" className="mr-2 text-primary-400"></i>
                Air Quality Awareness
            </h2>
            
            <div className="space-y-6">
                <section>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <i data-feather="wind" className="mr-2 text-primary-400"></i>
                        Understanding Air Pollution
                    </h3>
                    <p className="text-slate-300 mb-3">
                        Air pollution refers to the presence of substances in the atmosphere that are harmful to human health and the environment. 
                        Common pollutants include particulate matter (PM2.5, PM10), nitrogen dioxide (NO2), sulfur dioxide (SO2), 
                        carbon monoxide (CO), and ground-level ozone (O3).
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                        <li>PM2.5: Fine particles less than 2.5 micrometers in diameter</li>
                        <li>PM10: Coarse particles less than 10 micrometers in diameter</li>
                        <li>NO2: Emitted from vehicles and power plants</li>
                        <li>O3: Ground-level ozone formed when pollutants react with sunlight</li>
                    </ul>
                </section>
                
                <section>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <i data-feather="user" className="mr-2 text-primary-400"></i>
                        Individual Actions
                    </h3>
                    <p className="text-slate-300 mb-3">
                        You can reduce your exposure to air pollution and contribute to cleaner air through simple daily actions:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="flex items-start">
                            <i data-feather="check-circle" className="text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                            <span>Use public transportation, walk, or bike instead of driving</span>
                        </li>
                        <li className="flex items-start">
                            <i data-feather="check-circle" className="text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                            <span>Avoid outdoor activities during high pollution days</span>
                        </li>
                        <li className="flex items-start">
                            <i data-feather="check-circle" className="text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                            <span>Use energy-efficient appliances and lighting</span>
                        </li>
                        <li className="flex items-start">
                            <i data-feather="check-circle" className="text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                            <span>Reduce, reuse, and recycle materials</span>
                        </li>
                    </ul>
                </section>
                
                <section>
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <i data-feather="users" className="mr-2 text-primary-400"></i>
                        Community & City-Level Solutions
                    </h3>
                    <p className="text-slate-300 mb-3">
                        Collective action is essential for significant improvements in air quality:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                            <i data-feather="home" className="text-primary-400 mb-2"></i>
                            <h4 className="font-medium mb-1">Urban Planning</h4>
                            <p className="text-sm text-slate-300">Green spaces, efficient public transport, and zoning regulations</p>
                        </div>
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                            <i data-feather="factory" className="text-primary-400 mb-2"></i>
                            <h4 className="font-medium mb-1">Industrial Regulations</h4>
                            <p className="text-sm text-slate-300">Emission standards and cleaner production technologies</p>
                        </div>
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                            <i data-feather="globe" className="text-primary-400 mb-2"></i>
                            <h4 className="font-medium mb-1">Renewable Energy</h4>
                            <p className="text-sm text-slate-300">Transition to solar, wind, and other clean energy sources</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AwarenessPage;

